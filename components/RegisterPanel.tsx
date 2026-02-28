"use client";
import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { menuDefinitions } from './NavData';
import clsx from 'clsx';

interface RegisterPanelProps {
  open?: boolean;
  onClose: () => void;
}

type ProductPick = {
  id: string;
  title: string;
  desc: string;
  category: string;
};

const BUDGET_MIN = 10_000;
const BUDGET_MAX = 100_000_000; // 100 mil

function formatBudget(v: number) {
  if (v >= 1_000_000) return (v / 1_000_000).toFixed(v % 1_000_000 === 0 ? 0 : 1) + ' mil';
  if (v >= 1_000) return (v / 1_000).toFixed(v % 1_000 === 0 ? 0 : 1) + ' tis';
  return v.toString();
}

export default function RegisterPanel({ open = true, onClose }: RegisterPanelProps) {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [budget, setBudget] = useState(80_000);
  const [showProducts, setShowProducts] = useState(false); // full-screen selector
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [language, setLanguage] = useState('cs');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const productsBoxRef = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);

  const allProducts = useMemo<ProductPick[]>(() => {
    const arr: ProductPick[] = [];
    for (const menu of menuDefinitions) {
      for (const section of menu.sections) {
        for (const item of section.items) {
          arr.push({ id: item.id, title: item.title, desc: item.desc, category: section.heading });
        }
      }
    }
    return arr;
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        if (showProducts) { setShowProducts(false); return; }
        onClose();
      }
    }
    function onDoc() {
      // outside click handler reserved (no-op for fullscreen variant)
    }
    if (open) {
      document.addEventListener('keydown', onKey);
      document.addEventListener('mousedown', onDoc);
    }
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onDoc);
    };
  }, [open, onClose, showProducts]);

  const overLimit = selected.size > 3;
  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            aria-hidden="true"
            className="fixed inset-0 z-[120] bg-black/60 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Registrace"
            className="fixed inset-0 z-[130] flex items-start justify-center overflow-y-auto pt-24 pb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ y: 30, opacity: 0, scale: 0.96 }}
              animate={{ y: 0, opacity: 1, scale: 1, transition: { duration: 0.35, ease: [0.4, 0.08, 0.2, 1] } }}
              exit={{ y: 20, opacity: 0, scale: 0.97, transition: { duration: 0.22 } }}
              className="relative w-full max-w-3xl mx-auto rounded-2xl border border-white/8 bg-gradient-to-br from-[#10131d]/95 to-[#0b0e15]/95 shadow-[0_18px_50px_-15px_rgba(0,0,0,.65)] px-8 md:px-10 py-10 backdrop-blur-md"
            >
              <button
                onClick={onClose}
                className="absolute top-3 right-3 rounded-md px-3 py-1 text-xs font-medium text-slate-400 hover:text-white hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500"
              >
                Zavřít
              </button>
              <h2 className="text-2xl font-semibold tracking-tight mb-6">Registrace / Poptávka</h2>
              <p className="text-slate-400 text-sm mb-8 max-w-prose">
                Vyplňte kontaktní údaje a oblast zájmu. Čím více služeb zkombinujete, tím výhodnější balíček vám nabídneme.
              </p>
              <form
                onSubmit={async e => {
                  e.preventDefault();
                  setSubmitting(true);
                  setError('');
                  
                  try {
                    const res = await fetch('/api/register', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        email,
                        password,
                        first_name: firstName,
                        last_name: lastName,
                        phone,
                        budget,
                        language,
                        services: Array.from(selected)
                      })
                    });

                    const data = await res.json();
                    if (res.ok) {
                      onClose();
                      alert('Registrace proběhla úspěšně. Nyní se můžete přihlásit.');
                    } else {
                      setError(data.error || 'Chyba při registraci');
                    }
                  } catch (err) {
                    setError('Něco se nepovedlo. Zkuste to znovu.');
                  } finally {
                    setSubmitting(false);
                  }
                }}
                className="space-y-8"
              >
                {error && (
                  <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-3 text-xs text-red-400">
                    {error}
                  </div>
                )}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[12.5px] font-medium uppercase tracking-wider text-slate-300">Jméno</label>
                    <input
                      type="text"
                      required
                      value={firstName}
                      onChange={e => setFirstName(e.target.value)}
                      className="w-full rounded-lg bg-[#181c27] border border-[#273042] px-3 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-accent-500/60"
                      placeholder="Jan"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[12.5px] font-medium uppercase tracking-wider text-slate-300">Příjmení</label>
                    <input
                      type="text"
                      required
                      value={lastName}
                      onChange={e => setLastName(e.target.value)}
                      className="w-full rounded-lg bg-[#181c27] border border-[#273042] px-3 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-accent-500/60"
                      placeholder="Novák"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[12.5px] font-medium uppercase tracking-wider text-slate-300">E‑mail</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full rounded-lg bg-[#181c27] border border-[#273042] px-3 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-accent-500/60"
                      placeholder="vas@email.cz"
                      pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[12.5px] font-medium uppercase tracking-wider text-slate-300">Telefon na správce</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      className="w-full rounded-lg bg-[#181c27] border border-[#273042] px-3 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-accent-500/60"
                      placeholder="+420 777 000 000"
            pattern="^[+0-9()\\s\\-]{7,}$"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[12.5px] font-medium uppercase tracking-wider text-slate-300">Heslo</label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        minLength={8}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="w-full rounded-lg bg-[#181c27] border border-[#273042] px-3 py-2.5 pr-12 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-accent-500/60"
                        placeholder="Minimálně 8 znaků"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(s => !s)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white px-2 py-1 focus:outline-none"
                      >
                        {showPassword ? 'skrýt' : 'ukázat'}
                      </button>
                    </div>
                    {password && password.length > 0 && password.length < 8 && (
                      <div className="text-[11px] text-amber-300 mt-1">Heslo musí obsahovat alespoň 8 znaků.</div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="text-[12.5px] font-medium uppercase tracking-wider text-slate-300">Potvrzení hesla</label>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                      className="w-full rounded-lg bg-[#181c27] border border-[#273042] px-3 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-accent-500/60"
                      placeholder="Znovu zadejte heslo"
                    />
                    {confirmPassword && password !== confirmPassword && (
                      <div className="text-[11px] text-amber-300 mt-1">Hesla se neshodují.</div>
                    )}
                  </div>
                  <div className="space-y-3 md:col-span-2">
                    <label className="flex items-center justify-between text-[12.5px] font-medium uppercase tracking-wider text-slate-300">
                      <span>Rozpočet (orientačně)</span>
                      <span className="text-accent-400 text-xs font-semibold">{formatBudget(budget)} Kč</span>
                    </label>
                    <input
                      type="range"
                      min={BUDGET_MIN}
                      max={BUDGET_MAX}
                      step={5_000}
                      value={budget}
                      onChange={e => {
                        let v = parseInt(e.target.value, 10);
                        // citlivější do 250k: kroky po 5k
                        if (v <= 250_000) {
                          v = Math.round(v / 5_000) * 5_000;
                        } else {
                          // nad 250k zaokrouhlit na 10k
                          v = Math.round(v / 10_000) * 10_000;
                        }
                        setBudget(v);
                      }}
                      className="w-full accent-accent-500"
                    />
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                          <span>{formatBudget(BUDGET_MIN)}</span>
                          <span>{formatBudget(BUDGET_MAX)}</span>
                        </div>
                      </div>
                      <div className="w-40">
                        <label className="sr-only">Manuální rozpočet</label>
                        <div className="relative">
                          <input
                            type="number"
                            inputMode="numeric"
                            min={BUDGET_MIN}
                            max={BUDGET_MAX}
                            step={5000}
                            value={budget}
                            onChange={e => {
                              const raw = e.target.value.replace(/[^0-9]/g, '');
                              let v = raw ? parseInt(raw, 10) : 0;
                              if (isNaN(v)) v = BUDGET_MIN;
                              // clamp
                              if (v < BUDGET_MIN) v = BUDGET_MIN;
                              if (v > BUDGET_MAX) v = BUDGET_MAX;
                              setBudget(v);
                            }}
                            onBlur={() => {
                              // apply rounding rules on blur
                              let v = parseInt(String(budget), 10) || BUDGET_MIN;
                              if (v <= 250_000) v = Math.round(v / 5_000) * 5_000;
                              else v = Math.round(v / 10_000) * 10_000;
                              if (v < BUDGET_MIN) v = BUDGET_MIN;
                              if (v > BUDGET_MAX) v = BUDGET_MAX;
                              setBudget(v);
                            }}
                            className="w-full rounded-lg bg-[#0f1622] border border-[#273042] px-3 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-accent-500/60"
                          />
                          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-slate-400">Kč</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[12.5px] font-medium uppercase tracking-wider text-slate-300">Preferovaný jazyk</label>
                    <select
                      value={language}
                      onChange={e => setLanguage(e.target.value)}
                      className="w-full rounded-lg bg-[#181c27] border border-[#273042] px-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-accent-500/60"
                    >
                      <option value="cs">Čeština</option>
                      <option value="en">English</option>
                      <option value="de">Deutsch</option>
                      <option value="sk">Slovenština</option>
                      <option value="es">Español</option>
                    </select>
                  </div>
                  <div className="space-y-2" ref={productsBoxRef}>
                    <label className="text-[12.5px] font-medium uppercase tracking-wider text-slate-300 flex items-center justify-between">
                      <span>Výběr služeb / produktů</span>
                      <button
                        type="button"
                        onClick={() => setShowProducts(true)}
                        className="text-[11px] font-medium text-accent-400 hover:text-accent-300 focus:outline-none"
                      >
                        otevřít
                      </button>
                    </label>
                    <div className="rounded-lg border border-[#273042] bg-[#181c27] px-3 py-2 text-xs text-slate-400">
                      {selected.size === 0 ? 'Nic nevybráno' : `${selected.size} vybraných položek`}
                    </div>
                    {overLimit && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        className="text-[11.5px] text-amber-300/90 mt-2 font-medium"
                      >
                        Vybrali jste více než 3 položky – nabídneme zvýhodněný balíček.
                      </motion.div>
                    )}
                    <p className="text-[11px] text-slate-500 mt-2">
                      Čím více řešení zkombinujete, tím lepší jednotková cena oproti nákupu samostatně.
                    </p>
                  </div>
                </div>
                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="rounded-lg border border-[#2b3045] bg-transparent px-4 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500"
                  >
                    Zrušit
                  </button>
                  <button
                    type="submit"
                    className="rounded-lg bg-accent-500 hover:bg-accent-500/90 px-5 py-2 text-xs font-semibold text-white shadow-inner shadow-black/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 disabled:opacity-40"
                    disabled={
                      !email || !phone || !password || password.length < 8 || password !== confirmPassword || submitting
                    }
                  >
                    {submitting ? 'Odesílám…' : 'Odeslat poptávku'}
                  </button>
                </div>
              </form>
              {/* Full-screen product selector overlay */}
      <AnimatePresence>
                {showProducts && (
                  <motion.div
                    key="product-selector"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex flex-col bg-[#090c12]/95 backdrop-blur-xl p-6 md:p-10 overflow-hidden"
                  >
                    <div className="flex items-start justify-between gap-6 mb-6">
                      <div>
                        <h3 className="text-xl font-semibold tracking-tight">Výběr služeb & produktů</h3>
                        <p className="text-slate-400 text-xs mt-1 max-w-prose">Zaškrtněte vše, co vás zajímá – kombinace více než 3 aktivuje individuální balíček.</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[11px] text-slate-500">{selected.size} vybraných</span>
                        <button
                          type="button"
                          onClick={() => setShowProducts(false)}
                          className="rounded-lg border border-[#2b3045] bg-transparent px-4 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500"
                        >
                          Hotovo
                        </button>
                      </div>
                    </div>
                    <div className="flex-1 overflow-y-auto custom-scroll pr-1">
                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
                        {allProducts.map(p => {
                          const active = selected.has(p.id);
                          return (
                            <button
                              type="button"
                              key={p.id}
                              onClick={() => {
                                setSelected(prev => {
                                  const next = new Set(prev);
                                  active ? next.delete(p.id) : next.add(p.id);
                                  return next;
                                });
                              }}
                              className={clsx(
                                'relative flex flex-col items-start gap-2 border p-4 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500',
                                active ? 'border-accent-500 bg-accent-500/10' : 'border-[#1e2432] hover:border-accent-500/40 hover:bg-white/5'
                              )}
                            >
                              <span className="text-[11px] uppercase tracking-wider text-slate-500 font-medium">{p.category}</span>
                              <span className="text-sm font-semibold text-slate-100 tracking-tight leading-tight">{p.title}</span>
                              <span className="text-[11.5px] text-slate-400 leading-snug line-clamp-3">{p.desc}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                    {overLimit && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="mt-5 rounded-lg border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-[12px] text-amber-200"
                      >
                        Více než 3 položky – připravíme zvýhodněnou kombinovanou nabídku.
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
