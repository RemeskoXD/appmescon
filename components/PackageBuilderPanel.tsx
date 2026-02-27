"use client";
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

type Service = {
  id: string;
  title: string;
  prices: number[]; // od nejnižší po nejvyšší
};

export type PackageSummary = {
  selections: Array<{ id: string; title: string; tierIndex: number; price: number }>;
  total: number;
};

interface PackageBuilderPanelProps {
  open: boolean;
  onClose: () => void;
  onProceed?: (summary: PackageSummary) => void;
}

const SERVICES: Service[] = [
  { id: "eshop", title: "E‑shop", prices: [45000, 100000, 250000] },
  { id: "prezentacni-web", title: "Prezentační web", prices: [25000, 40000, 75000] },
  { id: "aplikace", title: "Aplikace", prices: [100000, 250000, 500000] },
  { id: "marketing-funnel", title: "Marketing Funnel (Onepage)", prices: [15000, 25000, 35000] },
  { id: "ppc-reklamy", title: "PPC reklamy", prices: [5000, 15000, 30000] },
  { id: "graficky-design", title: "Grafický design", prices: [1000, 5000, 15000] },
];

function formatCZK(n: number) {
  return new Intl.NumberFormat("cs-CZ").format(n) + " Kč";
}

export default function PackageBuilderPanel({ open, onClose, onProceed }: PackageBuilderPanelProps) {
  const [mounted, setMounted] = useState(false);
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [tiers, setTiers] = useState<Record<string, number>>({}); // index 0..2

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // default tiers to middle (1) if undefined
  useEffect(() => {
    const next: Record<string, number> = { ...tiers };
    for (const s of SERVICES) {
      if (next[s.id] == null) next[s.id] = Math.min(1, s.prices.length - 1);
    }
    setTiers(next);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const summary: PackageSummary = useMemo(() => {
    const picks = SERVICES.filter(s => selected[s.id]).map(s => {
      const idx = Math.min(Math.max(tiers[s.id] ?? 0, 0), s.prices.length - 1);
      const price = s.prices[idx];
      return { id: s.id, title: s.title, tierIndex: idx, price };
    });
    const total = picks.reduce((acc, p) => acc + p.price, 0);
    return { selections: picks, total };
  }, [selected, tiers]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-[220] bg-black/60 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            className="fixed inset-0 z-[230] flex items-start justify-center overflow-y-auto pt-16 pb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label="Sestavit balíček"
          >
            <motion.div
              initial={{ y: 26, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1, transition: { duration: 0.28, ease: [0.4, 0.08, 0.2, 1] } }}
              exit={{ y: 16, opacity: 0, scale: 0.98, transition: { duration: 0.18 } }}
              className="relative w-full max-w-5xl mx-auto rounded-2xl border border-white/8 bg-gradient-to-br from-[#10131d]/95 to-[#0b0e15]/95 shadow-[0_18px_50px_-15px_rgba(0,0,0,.65)] px-6 md:px-8 py-8"
            >
              <button
                onClick={onClose}
                className="absolute top-3 right-3 rounded-md px-3 py-1 text-xs font-medium text-slate-400 hover:text-white hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500"
              >
                Zavřít
              </button>
              <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-white">Sestavit balíček</h3>
              <p className="text-slate-400 text-sm mt-1 mb-6">Vyberte služby a nastavte úroveň. Níže se průběžně počítá orientační cena.</p>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                {SERVICES.map((s) => {
                  const active = !!selected[s.id];
                  const idx = Math.min(Math.max(tiers[s.id] ?? 0, 0), s.prices.length - 1);
                  return (
                    <div
                      key={s.id}
                      className={`relative rounded-xl border p-4 transition-all ${
                        active ? "border-accent-500 bg-accent-500/10" : "border-[#1e2432] hover:border-accent-500/40 hover:bg-white/5"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="text-[11px] uppercase tracking-wider text-slate-500">Služba</div>
                          <div className="text-sm font-semibold text-slate-100 tracking-tight leading-tight">{s.title}</div>
                        </div>
                        <label className="inline-flex items-center gap-2 text-xs text-slate-300">
                          <input
                            type="checkbox"
                            className="accent-accent-500"
                            checked={active}
                            onChange={(e) => setSelected((prev) => ({ ...prev, [s.id]: e.target.checked }))}
                          />
                          Zařadit
                        </label>
                      </div>
                      <div className="mt-3">
                        <div className="text-[11px] uppercase tracking-wider text-slate-500 mb-1">Úroveň</div>
                        <div className="grid grid-cols-3 gap-2">
                          {s.prices.slice(0, 3).map((p, i) => (
                            <button
                              key={i}
                              type="button"
                              onClick={() => setTiers((prev) => ({ ...prev, [s.id]: i }))}
                              className={`rounded-md border px-2.5 py-2 text-[12px] font-medium transition-colors ${
                                idx === i ? "border-accent-500 bg-accent-500/15 text-white" : "border-[#2a2f44] text-slate-300 hover:border-accent-500/40"
                              }`}
                            >
                              {i === 0 ? "Start" : i === 1 ? "Pro" : "Rozšířený"}
                              <div className="text-[11px] font-normal text-slate-400">{formatCZK(p)}</div>
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="mt-3 text-[12px] text-slate-400">
                        Aktuálně: <span className="font-semibold text-slate-200">{formatCZK(s.prices[idx])}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Sticky footer inside card */}
              <div className="mt-6 rounded-xl border border-[#273042] bg-[#0f1622]/80 p-4 flex flex-col md:flex-row items-center justify-between gap-3">
                <div className="text-sm text-slate-300">
                  Vybráno: <span className="font-semibold text-white">{summary.selections.length}</span> &nbsp;|&nbsp; Odhad: <span className="font-semibold text-white">{formatCZK(summary.total)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    className="rounded-lg border border-[#2b3045] bg-transparent px-4 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500"
                    onClick={onClose}
                  >
                    Zavřít
                  </button>
                  <button
                    className="rounded-lg bg-accent-500 hover:bg-accent-500/90 px-5 py-2 text-xs font-semibold text-white shadow-inner shadow-black/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 disabled:opacity-40"
                    disabled={summary.selections.length === 0}
                    onClick={() => onProceed?.(summary)}
                  >
                    Pokračovat v poptávce
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
