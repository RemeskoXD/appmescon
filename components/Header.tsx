'use client';

import { useSession, signOut } from 'next-auth/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { menuDefinitions } from './NavData';
import MegaMenu from './MegaMenu';
import RegisterPanel from './RegisterPanel';
import LoginPanel from './LoginPanel';
import LanguageSwitcher from './LanguageSwitcher';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { Lock, X, Menu, ChevronDown, User, LogOut, Settings } from 'lucide-react';

type MenuKey = typeof menuDefinitions[number]['key'];

interface NavItem {
  key: MenuKey;
  label: string;
  hasMega: true;
}

const MAIN_ITEMS: NavItem[] = menuDefinitions.map(m => ({ key: m.key as MenuKey, label: m.label, hasMega: true }));

export default function Header() {
  const { data: session, status } = useSession();
  const [openMenu, setOpenMenu] = useState<MenuKey | null>(null);
  const navRef = useRef<HTMLDivElement | null>(null);
  const buttonsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [direction, setDirection] = useState<1 | -1 | 0>(0);
  const closeTimerRef = useRef<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileAccordionOpen, setMobileAccordionOpen] = useState<MenuKey | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const closeMenu = useCallback(() => setOpenMenu(null), []);
  
  const toggleMenu = (key: MenuKey) => {
    setOpenMenu(prev => {
      if (prev === key) return null;
      if (!prev) {
        setDirection(0);
      } else {
        const prevIdx = MAIN_ITEMS.findIndex(i => i.key === prev);
        const nextIdx = MAIN_ITEMS.findIndex(i => i.key === key);
        setDirection(nextIdx > prevIdx ? 1 : -1);
      }
      return key;
    });
  };

  // Klik mimo => zavřít
  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!navRef.current) return;
      if (!navRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
        setShowUserMenu(false);
      }
    }
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  const clearCloseTimer = () => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  // Zavírání pouze když opustíme celou hlavičku (včetně panelu)
  const scheduleClose = () => {
    clearCloseTimer();
    closeTimerRef.current = window.setTimeout(() => {
      setOpenMenu(null);
    }, 200) as unknown as number;
  };

  // Uzamčení scrollu při otevřeném mobilním menu
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Escape => zavřít mobilní menu
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        setMobileAccordionOpen(null);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [mobileMenuOpen]);

  const openMobileMenu = () => {
    setOpenMenu(null);
    setMobileMenuOpen(true);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileAccordionOpen(null);
  };

  return (
    <>
      <header
        ref={navRef}
        className="fixed top-0 inset-x-0 z-50 bg-[#050b1b]/90 backdrop-blur-md border-b border-slate-800/70"
        onMouseEnter={clearCloseTimer}
        onMouseLeave={scheduleClose}
      >
        <div className="page-container flex items-center gap-6 h-[58px]">
          <Link
            href="/"
            prefetch
            className="group flex items-center gap-3 font-bold text-white text-[15px]"
            aria-label="Domů"
            onClick={() => {
              setOpenMenu(null);
              setShowRegister(false);
              setShowLogin(false);
              setMobileMenuOpen(false);
            }}
          >
            {/* Logo only (obsahuje již název značky) */}
            <span className="relative inline-flex h-10 w-auto items-center justify-center overflow-hidden rounded-md">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://web2.itnahodinu.cz/mescon/images/logo.svg"
                alt="Logo"
                className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.04]"
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
            </span>
          </Link>

          <nav className="hidden xl:block" aria-label="Hlavní navigace">
            <ul className="flex items-center gap-1" role="menubar">
              {MAIN_ITEMS.map((item, idx) => {
                const active = openMenu === item.key;
                  return (
                    <li key={item.key}>
                      <button
                        type="button"
                        ref={el => { buttonsRef.current[idx] = el; }}
                        role="menuitem"
                        aria-haspopup="true"
                        aria-expanded={active}
                        onClick={() => toggleMenu(item.key)}
                        onMouseEnter={() => toggleMenu(item.key)}
                        onFocus={() => toggleMenu(item.key)}
                        className={clsx(
                          'group inline-flex items-center gap-1 rounded-md px-3 py-2 text-[15px] font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5885fa]',
                          active ? 'text-white' : 'text-slate-300 hover:text-white'
                        )}
                      >
                        {item.label}
                        <ChevronDown
                          className={clsx(
                            'w-4 h-4 transition-transform duration-200 opacity-70 group-hover:opacity-100',
                            active && 'rotate-180 opacity-100'
                          )}
                        />
                      </button>
                    </li>
                  );
              })}
              <li>
                <Link
                  href="/subpages/podpora"
                  className="inline-flex items-center rounded-md px-3 py-2 text-[15px] font-medium text-slate-300 hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5885fa]"
                >
                  Podpora
                </Link>
              </li>
              <li>
                <Link
                  href="/subpages/portfolio"
                  className="inline-flex items-center rounded-md px-3 py-2 text-[15px] font-medium text-slate-300 hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5885fa]"
                >
                  Portfolio
                </Link>
              </li>
            </ul>
          </nav>

          <div className="ml-auto flex items-center gap-3">
            <div className="hidden xl:flex items-center gap-3">
              <LanguageSwitcher />
              <div className="flex items-center gap-3">
                {status === 'authenticated' ? (
                  <div className="relative">
                    <button
                      onClick={() => setShowUserMenu(!showUserMenu)}
                      className="flex items-center gap-2 rounded-full bg-slate-800/50 border border-slate-700 px-3 py-1.5 text-sm font-medium text-white hover:bg-slate-700 transition-colors"
                    >
                      <div className="w-6 h-6 rounded-full bg-[#5885fa] flex items-center justify-center text-[10px] font-bold">
                        {session?.user?.name?.[0] || 'U'}
                      </div>
                      <span className="max-w-[100px] truncate">{session?.user?.name?.split(' ')[0]}</span>
                      <ChevronDown className={clsx("w-4 h-4 transition-transform", showUserMenu && "rotate-180")} />
                    </button>

                    <AnimatePresence>
                      {showUserMenu && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute right-0 mt-2 w-48 rounded-xl bg-[#0f172a] border border-slate-800 shadow-xl py-2 z-[60]"
                        >
                          <div className="px-4 py-2 border-b border-slate-800 mb-1">
                            <p className="text-xs text-slate-400">Přihlášen jako</p>
                            <p className="text-sm font-medium text-white truncate">{session.user.email}</p>
                          </div>
                          
                          {session.user.role === 'ADMIN' && (
                            <Link
                              href="/admin"
                              className="flex items-center gap-2 px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
                              onClick={() => setShowUserMenu(false)}
                            >
                              <Settings className="w-4 h-4" />
                              Administrace
                            </Link>
                          )}
                          
                          <Link
                            href="/partner"
                            className="flex items-center gap-2 px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
                            onClick={() => setShowUserMenu(false)}
                          >
                            <User className="w-4 h-4" />
                            Můj profil
                          </Link>

                          <button
                            onClick={() => signOut()}
                            className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                          >
                            <LogOut className="w-4 h-4" />
                            Odhlásit se
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <>
                    <button
                      className="focus-ring rounded-md border border-slate-700 bg-transparent px-4 py-2 text-sm font-medium text-slate-200 transition-colors hover:border-[#5885fa] hover:text-white"
                      onClick={() => {
                        setOpenMenu(null);
                        setShowLogin(true);
                      }}
                    >
                      Přihlásit se
                    </button>
                    <button className="focus-ring rounded-md border border-slate-700 bg-transparent px-4 py-2 text-sm font-medium text-slate-200 transition-colors hover:border-[#5885fa] hover:text-white">
                      Kontakt
                    </button>
                    <button
                      className="focus-ring rounded-md bg-[#3b82f6] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#2563eb] shadow-lg shadow-blue-900/20"
                      onClick={() => {
                        setOpenMenu(null);
                        setShowRegister(true);
                      }}
                    >
                      Registrace
                    </button>
                  </>
                )}
              </div>
            </div>
            {/* Mobile/Tablet hamburger menu */}
            <div className="xl:hidden">
              <button
                aria-label={mobileMenuOpen ? 'Zavřít menu' : 'Otevřít menu'}
                className="relative flex h-11 w-11 items-center justify-center rounded-lg border border-slate-700 text-white transition-colors hover:bg-[#0c1324] focus:outline-none focus:ring-2 focus:ring-[#5885fa]"
                onClick={() => (mobileMenuOpen ? closeMobileMenu() : openMobileMenu())}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        <MegaMenu
          active={openMenu}
          menus={menuDefinitions}
          onClose={closeMenu}
          anchorEl={openMenu ? buttonsRef.current[MAIN_ITEMS.findIndex(i => i.key === openMenu)] ?? null : null}
          direction={direction}
          onPanelEnter={clearCloseTimer}
          onPanelLeave={scheduleClose}
        />
        <RegisterPanel open={showRegister} onClose={() => setShowRegister(false)} />
        <LoginPanel open={showLogin} onClose={() => setShowLogin(false)} />
      </header>

      {/* Modern full-screen mobile menu via Portal */}
      {mounted && createPortal(
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="fixed inset-0 z-[9999] flex flex-col bg-[#020617] xl:hidden"
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'tween', duration: 0.3, ease: [0.4, 0.08, 0.2, 1] }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 h-[58px] border-b border-slate-800/60 bg-[#050b1b]">
                <div className="flex items-center gap-3">
                  <img
                    src="https://web2.itnahodinu.cz/mescon/images/logo.svg"
                    alt="Logo"
                    className="h-8 w-auto"
                  />
                </div>
                <button
                  onClick={closeMobileMenu}
                  className="flex h-11 w-11 items-center justify-center rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-all duration-200"
                  aria-label="Zavřít menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto custom-scroll bg-[#020617]">
                <div className="px-6 py-6 pb-32">
                  <nav className="space-y-4">
                    {menuDefinitions.map((menuDef) => {
                      const isOpen = mobileAccordionOpen === (menuDef.key as MenuKey);
                      return (
                        <div key={menuDef.key} className="space-y-2">
                          <button
                            type="button"
                            onClick={() =>
                              setMobileAccordionOpen((prev) => (prev === (menuDef.key as MenuKey) ? null : (menuDef.key as MenuKey)))
                            }
                            className={clsx(
                              "flex items-center justify-between w-full rounded-xl px-4 py-4 text-left transition-all duration-200 group border",
                              isOpen 
                                ? "bg-slate-800/40 border-slate-700 text-white" 
                                : "bg-transparent border-transparent text-slate-200 hover:bg-slate-800/30"
                            )}
                            aria-expanded={isOpen}
                          >
                            <span className="font-semibold text-lg">{menuDef.label}</span>
                            <ChevronDown
                              className={`w-5 h-5 text-slate-400 group-hover:text-white transition-transform duration-300 ${
                                isOpen ? 'rotate-180' : ''
                              }`}
                            />
                          </button>

                          <AnimatePresence initial={false}>
                            {isOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.25, ease: "easeInOut" }}
                                className="overflow-hidden"
                              >
                                <div className="pt-2 pb-4 pl-4 space-y-6">
                                  {menuDef.sections.map((section) => (
                                    <div key={section.id} className="space-y-3">
                                      <h4 className="text-xs font-bold uppercase tracking-widest text-[#5885fa] px-2 opacity-80">
                                        {section.heading}
                                      </h4>
                                      <div className="space-y-1">
                                        {section.items.map((item) => {
                                          const isLocked = !!item.locked;
                                          const rowClass = clsx(
                                            'group relative flex w-full items-start gap-4 rounded-xl px-3 py-3 text-left transition-all duration-150',
                                            isLocked
                                              ? 'opacity-60 cursor-not-allowed'
                                              : 'active:bg-slate-800/50'
                                          );

                                          const content = (
                                            <>
                                              <div className={clsx(
                                                "mt-0.5 p-2 rounded-lg transition-colors",
                                                isLocked ? "bg-slate-800/30 text-slate-500" : "bg-slate-800/60 text-[#5885fa] group-active:bg-[#5885fa] group-active:text-white"
                                              )}>
                                                <item.icon className="w-5 h-5" />
                                              </div>
                                              <span className="min-w-0 flex-1 pr-2">
                                                <span className="flex items-center gap-2 leading-none mb-1.5">
                                                  <span className={clsx(
                                                    'text-[15px] font-medium tracking-tight',
                                                    isLocked ? 'text-slate-400' : 'text-slate-100'
                                                  )}>
                                                    {item.title}
                                                  </span>
                                                  {isLocked && <Lock className="h-3.5 w-3.5 text-slate-500" aria-hidden="true" />}
                                                </span>
                                                <span className="block text-[13px] leading-snug text-slate-400">
                                                  {item.desc}
                                                </span>
                                              </span>
                                            </>
                                          );

                                          if (item.href && /^https?:\/\//.test(item.href)) {
                                            return (
                                              <a
                                                key={item.id}
                                                href={item.href}
                                                target="_blank"
                                                rel="noreferrer"
                                                className={rowClass}
                                                onClick={closeMobileMenu}
                                              >
                                                {content}
                                              </a>
                                            );
                                          }

                                          const href = (item.href && item.href !== '#') ? item.href : `/subpages/${item.id}`;
                                          return (
                                            <Link key={item.id} href={href as any} className={rowClass} onClick={closeMobileMenu}>
                                              {content}
                                            </Link>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}

                    <div className="pt-4 space-y-2 border-t border-slate-800/60 mt-4">
                      <Link
                        href="/subpages/podpora"
                        className="flex items-center justify-between w-full rounded-xl px-4 py-4 text-left text-slate-200 hover:bg-slate-800/30 transition-all duration-200"
                        onClick={closeMobileMenu}
                      >
                        <span className="font-semibold text-lg">Podpora</span>
                      </Link>
                      <Link
                        href="/subpages/portfolio"
                        className="flex items-center justify-between w-full rounded-xl px-4 py-4 text-left text-slate-200 hover:bg-slate-800/30 transition-all duration-200"
                        onClick={closeMobileMenu}
                      >
                        <span className="font-semibold text-lg">Portfolio</span>
                      </Link>
                    </div>
                  </nav>
                </div>
              </div>

              {/* Footer actions - Fixed at bottom */}
              <div className="border-t border-slate-800 bg-[#050b1b] p-6 pb-8 safe-area-pb">
                <div className="flex items-center justify-center mb-6">
                  <LanguageSwitcher />
                </div>
                
                {status === 'authenticated' ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-800/40 border border-slate-700">
                      <div className="w-12 h-12 rounded-full bg-[#5885fa] flex items-center justify-center text-lg font-bold text-white">
                        {session?.user?.name?.[0] || 'U'}
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-base font-semibold text-white truncate">{session?.user?.name}</p>
                        <p className="text-xs text-slate-400 truncate">{session?.user?.email}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <Link
                        href="/partner"
                        onClick={closeMobileMenu}
                        className="flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-3 text-sm font-semibold text-white"
                      >
                        <User className="w-4 h-4" />
                        Profil
                      </Link>
                      <button
                        onClick={() => signOut()}
                        className="flex items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-400"
                      >
                        <LogOut className="w-4 h-4" />
                        Odhlásit
                      </button>
                    </div>
                    
                    {session?.user?.role === 'ADMIN' && (
                      <Link
                        href="/admin"
                        onClick={closeMobileMenu}
                        className="flex items-center justify-center gap-2 w-full rounded-xl bg-indigo-600 px-4 py-3 text-sm font-bold text-white"
                      >
                        <Settings className="w-4 h-4" />
                        Administrace
                      </Link>
                    )}
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <button
                        className="flex items-center justify-center rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-4 text-sm font-semibold text-white transition-all active:bg-slate-700"
                        onClick={() => {
                          closeMobileMenu();
                          setShowLogin(true);
                        }}
                      >
                        Přihlásit se
                      </button>
                      <button
                        className="flex items-center justify-center rounded-xl bg-[#5885fa] px-4 py-4 text-sm font-bold text-white transition-all active:bg-[#406ee0] shadow-lg shadow-blue-900/20"
                        onClick={() => {
                          closeMobileMenu();
                          setShowRegister(true);
                        }}
                      >
                        Registrace
                      </button>
                    </div>
                    <button className="w-full flex items-center justify-center rounded-xl border border-slate-700 bg-transparent px-4 py-4 text-sm font-semibold text-slate-300 transition-all active:bg-slate-800/50">
                      Kontakt
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
