"use client";
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface LoginPanelProps {
  open: boolean;
  onClose: () => void;
}

export default function LoginPanel({ open, onClose }: LoginPanelProps) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const canSubmit = email && password && !submitting;

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    if (open) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const handleCredentialsLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Neplatný e-mail nebo heslo");
      } else {
        onClose();
        router.refresh();
      }
    } catch (err) {
      setError("Něco se nepovedlo. Zkuste to znovu.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleLogin = () => {
    signIn("google", { callbackUrl: "/" });
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            aria-hidden="true"
            className="fixed inset-0 z-[160] bg-black/60 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Přihlášení"
            className="fixed inset-0 z-[170] flex items-start justify-center overflow-y-auto pt-28 pb-16 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ y: 26, opacity: 0, scale: 0.96 }}
              animate={{ y: 0, opacity: 1, scale: 1, transition: { duration: 0.32, ease: [0.4, 0.08, 0.2, 1] } }}
              exit={{ y: 18, opacity: 0, scale: 0.97, transition: { duration: 0.2 } }}
              className="relative w-full max-w-md rounded-2xl border border-white/8 bg-gradient-to-br from-[#10131d]/95 to-[#0b0e15]/95 shadow-[0_18px_50px_-15px_rgba(0,0,0,.65)] px-8 py-9 backdrop-blur-md"
            >
              <button
                onClick={onClose}
                className="absolute top-3 right-3 rounded-md px-3 py-1 text-xs font-medium text-slate-400 hover:text-white hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500"
              >
                Zavřít
              </button>
              <h2 className="text-xl font-semibold tracking-tight mb-1">Přihlášení</h2>
              <p className="text-slate-400 text-xs mb-7">Zadejte přístupové údaje k vašemu účtu.</p>
              
              {error && (
                <div className="mb-4 rounded-lg bg-red-500/10 border border-red-500/20 p-3 text-xs text-red-400">
                  {error}
                </div>
              )}

              <div className="space-y-4">
                <button
                  onClick={handleGoogleLogin}
                  className="flex w-full items-center justify-center gap-3 rounded-lg border border-[#273042] bg-[#181c27] px-4 py-2.5 text-sm font-medium text-slate-200 transition-colors hover:bg-[#1e2432]"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Přihlásit se přes Google
                </button>

                <div className="relative flex items-center py-2">
                  <div className="flex-grow border-t border-[#273042]"></div>
                  <span className="mx-4 flex-shrink text-[10px] font-medium uppercase tracking-widest text-slate-500">Nebo e-mailem</span>
                  <div className="flex-grow border-t border-[#273042]"></div>
                </div>

                <form onSubmit={handleCredentialsLogin} className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-[12px] font-medium uppercase tracking-wider text-slate-300">E‑mail</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full rounded-lg bg-[#181c27] border border-[#273042] px-3 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-accent-500/60"
                      placeholder="uzivatel@firma.cz"
                      autoComplete="email"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-[12px] font-medium uppercase tracking-wider text-slate-300">Heslo</label>
                      <button
                        type="button"
                        onClick={() => setShowPass(s => !s)}
                        className="text-[11px] font-medium text-accent-400 hover:text-accent-300 focus:outline-none"
                      >
                        {showPass ? 'skrýt' : 'zobrazit'}
                      </button>
                    </div>
                    <div className="relative">
                      <input
                        type={showPass ? 'text' : 'password'}
                        required
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="w-full rounded-lg bg-[#181c27] border border-[#273042] pr-28 px-3 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-accent-500/60"
                        placeholder="••••••••"
                        autoComplete="current-password"
                        minLength={6}
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <label className="inline-flex items-center gap-2 text-[11px] text-slate-400 cursor-pointer">
                      <input type="checkbox" className="accent-accent-500" />
                      <span>Zapamatovat</span>
                    </label>
                    <button type="button" className="text-[11px] font-medium text-accent-400 hover:text-accent-300 focus:outline-none">
                      Zapomenuté heslo
                    </button>
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
                      disabled={!canSubmit}
                      className="rounded-lg bg-accent-500 hover:bg-accent-500/90 px-5 py-2 text-xs font-semibold text-white shadow-inner shadow-black/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 disabled:opacity-40"
                    >
                      {submitting ? 'Přihlašuji…' : 'Přihlásit'}
                    </button>
                  </div>
                </form>
              </div>
              <p className="mt-6 text-[11px] text-slate-500">Nemáte účet? <span className="text-accent-400">Použijte sekci Registrace.</span></p>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
