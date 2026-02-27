'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { MenuDefinition } from './NavData';
import { useId, useLayoutEffect, useState, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import type { Route } from 'next';
import { Lock } from 'lucide-react';

interface MegaMenuProps {
  active?: string | null;
  menus: MenuDefinition[];
  onClose: () => void;
  anchorEl?: HTMLElement | null;
  direction?: 1 | -1 | 0;
  onPanelEnter?: () => void;
  onPanelLeave?: () => void;
}

export default function MegaMenu({ active, menus, onClose, anchorEl, direction = 0, onPanelEnter, onPanelLeave }: MegaMenuProps) {
  const idBase = useId();
  const activeMenu = menus.find(m => m.key === active);
  const reduce = useReducedMotion();
  const [coords, setCoords] = useState<{ anchorCenter: number; top: number } | null>(null);
  const [panelPos, setPanelPos] = useState<{ left: number; arrowOffset: number; width: number } | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  // Prefetch cílové partnerské stránky pro okamžitou navigaci
  useLayoutEffect(() => {
    router.prefetch?.('/partners' as Route);
  }, [router]);

  // Při otevření panelu prefetchnu všechny interní href v aktivním menu
  useLayoutEffect(() => {
    if (!activeMenu) return;
    for (const section of activeMenu.sections) {
      for (const item of section.items) {
        if (item.locked) continue;
        if (item.href && !/^https?:\/\//.test(item.href) && item.href !== '#') {
          router.prefetch?.(item.href as Route);
        }
      }
    }
  }, [activeMenu, router]);

  useLayoutEffect(() => {
    if (anchorEl && activeMenu) {
      const rect = anchorEl.getBoundingClientRect();
      setCoords({ anchorCenter: rect.left + rect.width / 2, top: rect.bottom });
    } else if (!activeMenu) {
      setCoords(null);
    }
  }, [anchorEl, activeMenu]);

  // Recompute on resize/scroll
  useLayoutEffect(() => {
    function handler() {
      if (anchorEl && activeMenu) {
        const rect = anchorEl.getBoundingClientRect();
        setCoords({ anchorCenter: rect.left + rect.width / 2, top: rect.bottom });
      }
    }
    window.addEventListener('resize', handler);
    window.addEventListener('scroll', handler, true);
    return () => {
      window.removeEventListener('resize', handler);
      window.removeEventListener('scroll', handler, true);
    };
  }, [anchorEl, activeMenu]);

  // Recalculate placement + adaptive width
  useLayoutEffect(() => {
    if (!coords || !activeMenu) {
      setPanelPos(null);
      return;
    }
    const margin = 16;
    const vw = window.innerWidth;
    const sections = activeMenu.sections.length;
    const gap = 40; // gap-10
    const paddingX = 64; // px-8 *2
    const base = 260;
    let width = sections * base + (sections - 1) * gap + paddingX;
    if (sections === 1) width = 400;
    width = Math.min(width, 920, vw - margin * 2);
    const half = width / 2;
    let left = coords.anchorCenter - half;
    if (left < margin) left = margin;
    if (left + width > vw - margin) left = vw - margin - width;
    const arrowOffset = coords.anchorCenter - left;
    setPanelPos({ left, arrowOffset, width });
  }, [coords, activeMenu]);

  return (
    <div aria-live="polite" className="relative z-30 pointer-events-none hidden lg:block">
      <AnimatePresence mode="wait" initial={false}>
        {activeMenu && coords && panelPos && (
          <motion.div
            key={activeMenu.key}
            role="group"
            aria-label={`Mega menu: ${activeMenu.label}`}
            initial={reduce ? false : { opacity: 0, y: -6, scale: 0.985, x: direction * 10 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: 8, scale: 1, x: 0, transition: { duration: 0.16, ease: [0.45, 0.05, 0.2, 0.95] } }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6, scale: 0.985, x: -direction * 10, transition: { duration: 0.12, ease: [0.45, 0.05, 0.2, 0.95] } }}
            style={{
              position: 'fixed',
              top: Math.round(coords!.top + 4),
              left: Math.round(panelPos!.left),
              width: Math.round(panelPos!.width)
            }}
            ref={panelRef}
            className={clsx(
              'pointer-events-auto rounded-2xl border border-[#272a3d]/90 bg-gradient-to-br from-[#10131d]/95 to-[#0c0e16]/95 backdrop-blur-sm shadow-[0_16px_40px_-12px_rgba(0,0,0,.55)] px-8 py-8 grid gap-10',
              activeMenu!.sections.length === 3 ? 'md:grid-cols-3' : activeMenu!.sections.length === 2 ? 'md:grid-cols-2' : 'grid-cols-1'
            )}
            onMouseEnter={(e) => {
              e.stopPropagation();
              onPanelEnter?.();
            }}
            onMouseLeave={(e) => {
              e.stopPropagation();
              onPanelLeave?.();
            }}
          >
            {activeMenu!.sections.map(section => (
              <div key={section.id} className="space-y-3">
                <h4 className="text-[12.5px] font-semibold tracking-wider text-slate-300/90 uppercase">
                  {section.heading}
                </h4>
                <motion.ul
                  className="space-y-1"
                  initial={reduce ? false : 'hidden'}
                  animate={reduce ? 'visible' : 'visible'}
                  variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.035, delayChildren: 0.05 } }
                  }}
                >
                  {section.items.map(item => {
                    const isLocked = !!item.locked;
                    return (
                    <motion.li
                      key={item.id}
                      variants={reduce ? {} : { hidden: { opacity: 0, y: -3 }, visible: { opacity: 1, y: 0 } }}
                    >
                      <button
                        type="button"
                        aria-disabled={isLocked || undefined}
                        className={clsx(
                          'group relative w-full text-left flex items-start gap-3 px-3 py-2 rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500',
                          isLocked ? 'menu-locked' : 'hover:bg-[#181b29]'
                        )}
                        aria-describedby={`${idBase}-${item.id}-desc`}
                        onClick={(event) => {
                          if (isLocked) {
                            event.preventDefault();
                            event.stopPropagation();
                            return;
                          }
                          if (item.href && /^https?:\/\//.test(item.href)) {
                            // externí odkaz – otevřít ve stejném okně
                            window.location.href = item.href;
                          } else if (item.href && item.href !== '#') {
                            router.push(item.href as Route);
                          } else {
                            router.push(`/subpages/${item.id}` as Route);
                          }
                          onClose();
                        }}
                      >
                        <item.icon
                          className={clsx(
                            'h-5 w-5 transition-transform duration-150 will-change-transform',
                            isLocked ? 'text-slate-500/70' : 'text-slate-400 group-hover:text-white group-hover:scale-[1.07]'
                          )}
                        />
                        <span className="flex flex-col pr-2">
                          <span className="flex items-center gap-2 leading-none">
                            <span
                              className={clsx(
                                'text-[13.5px] font-medium tracking-tight',
                                isLocked ? 'text-slate-300/70' : 'text-slate-200 group-hover:text-white'
                              )}
                            >
                              {item.title}
                            </span>
                            {isLocked && (
                              <Lock className="h-3.5 w-3.5 text-slate-500/80" aria-hidden="true" />
                            )}
                          </span>
                          <span
                            id={`${idBase}-${item.id}-desc`}
                            className={clsx(
                              'text-[11.5px] mt-1 leading-snug',
                              isLocked ? 'text-slate-500/60' : 'text-slate-400/70'
                            )}
                          >
                            {item.desc}
                          </span>
                        </span>
                        {isLocked && (
                          <span className="menu-locked__tooltip">Připravujeme / Coming soon</span>
                        )}
                        {!isLocked && (
                          <span className="pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gradient-to-r from-[#5885fa]/5 via-transparent to-[#5885fa]/5" />
                        )}
                      </button>
                    </motion.li>
                    );
                  })}
                </motion.ul>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
