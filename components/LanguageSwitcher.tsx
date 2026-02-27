'use client';

import { languages, Language } from './NavData';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { ChevronDown } from 'lucide-react';

export default function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<Language>(languages.find(l => l.code === 'cs')!); // Čeština default
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen(o => !o)}
        className={clsx(
          'flex items-center gap-2 rounded-md border border-slate-700 bg-transparent px-3 py-2 text-sm font-medium text-slate-200',
          'hover:border-[#5885fa] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5885fa] transition-colors',
          open && 'border-[#5885fa] text-white'
        )}
      >
        {lang.code.toUpperCase()}
        <ChevronDown
          className={clsx(
            'w-4 h-4 transition-transform duration-200',
            open && 'rotate-180'
          )}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            aria-label="Jazyky"
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 4, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.18, ease: [0.4, 0.08, 0.2, 1] }}
            className="absolute right-0 z-40 mt-1 w-44 rounded-xl border border-[#272a3d] bg-[#050b1b]/95 px-2 py-2 shadow-xl backdrop-blur-md"
          >
            <ul className="max-h-72 overflow-auto">
              {languages.map((l: Language) => (
                <li key={l.code}>
                  <button
                    role="menuitem"
                    className={clsx(
                      'flex w-full items-center gap-2 rounded-lg px-2 py-2 text-[13px] text-slate-300',
                      'hover:bg-[#181b29] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5885fa]'
                    )}
                    onClick={() => {
                      setLang(l);
                      setOpen(false);
                    }}
                  >
                    <span className="text-base leading-none">{l.flag}</span>
                    <span>{l.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}