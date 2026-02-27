"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import CountUp from "react-countup";
import { useRef } from "react";
import { ArrowRight, BadgePercent, Globe, LifeBuoy, Megaphone } from "lucide-react";

// Local animation helpers
const fadeUp = {
  hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.25, 0.46, 0.24, 1] } }
};

export default function ZadostPartnerstviPage() {
  const highlightRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: highlightRef, offset: ["start end", "end start"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const features = [
    { title: "Až 30% provize", desc: "Z každého kontraktu pro naše certifikované partnery.", icon: BadgePercent },
    { title: "24/7 podpora", desc: "Technická i obchodní asistence ve vašem jazyce.", icon: LifeBuoy },
    { title: "Marketing zdarma", desc: "Materiály, kampaně a co‑branding bez poplatků.", icon: Megaphone },
    { title: "Globální dosah", desc: "Možnost expanze ve 45+ zemích světa.", icon: Globe }
  ];

  const stats = [
    { value: 200, suffix: "+", label: "partnerů" },
    { value: 45, suffix: " zemí", label: "globální síť" },
    { value: 15, suffix: " let", label: "zkušeností" }
  ];

  return (
    <motion.main
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-slate-900 text-slate-50"
    >
      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center min-h-screen text-center px-6 overflow-hidden">
        {/* Soft particles / gradient motion background */}
        <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(circle_at_center,white,transparent_70%)]">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#5885fa]/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: "6s" }} />
          <div className="absolute -bottom-32 -right-24 w-[28rem] h-[28rem] bg-[#799dfb]/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: "7s", animationDelay: "1s" }} />
        </div>

        <motion.h1 variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-5xl md:text-6xl font-bold leading-tight">
          <span className="bg-gradient-to-r from-[#799dfb] to-[#5885fa] bg-clip-text text-transparent">Staňte se Mescon partnerem</span>
        </motion.h1>
        <motion.p variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="max-w-2xl mt-5 text-slate-300">
          Rozšiřte své podnikání v globální síti více než 200 partnerů.
        </motion.p>
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <a href="#apply" className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#5885fa] text-white font-semibold hover:scale-105 active:scale-95 transition transform shadow-lg shadow-[#5885fa]/20">
            Začít spolupráci
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </section>

      {/* Features */}
      <section className="relative py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f) => (
            <motion.div
              key={f.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="group relative overflow-hidden rounded-2xl p-6 border border-slate-700/50 bg-slate-800/40 backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#5885fa]/20"
            >
              {/* Neon border on hover */}
              <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-[#5885fa] to-[#5885fa]" style={{ mixBlendMode: "overlay" }} />
              <div className="relative z-10">
                <div className="mb-3">
                  <f.icon className="w-7 h-7 text-[#acc2fc]" />
                </div>
                <h3 className="text-lg font-semibold">{f.title}</h3>
                <p className="text-sm text-slate-300/80 mt-1">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Highlight / Info (parallax image-like block) */}
      <section ref={highlightRef} className="relative py-16 md:py-24 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-10 items-center">
          {/* Text */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-slate-300">
              <span className="inline-block w-2 h-2 rounded-full" style={{ background: "#FFD700" }} /> Proč právě Mescon
            </span>
            <h3 className="mt-3 text-3xl md:text-4xl font-bold">Partnerství, které roste s vámi</h3>
            <p className="mt-3 text-slate-300">Získáte provizní model, marketingové zázemí i technický tým. Soustřeďte se na obchod – zbytek zajistíme my.</p>
            <ul className="mt-6 space-y-2 text-slate-300/90 text-sm">
              <li className="flex items-start gap-2"><span className="mt-1 inline-block w-1.5 h-1.5 rounded-full bg-[#799dfb]"/> Certifikace a enablement</li>
              <li className="flex items-start gap-2"><span className="mt-1 inline-block w-1.5 h-1.5 rounded-full bg-[#799dfb]"/> Sdílené leady a deal‑registration</li>
              <li className="flex items-start gap-2"><span className="mt-1 inline-block w-1.5 h-1.5 rounded-full bg-[#799dfb]"/> Přístup k produktové roadmapě</li>
            </ul>
          </motion.div>

          {/* Parallax visual */}
          <div className="relative h-72 sm:h-80 lg:h-[420px] rounded-2xl overflow-hidden border border-slate-700/50 bg-slate-800/50">
            <motion.div style={{ y: parallaxY }} className="absolute inset-0">
              <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_30%_30%,rgba(88,133,250,0.25),transparent_60%)]" />
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:24px_24px] opacity-30" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-40 h-40 sm:w-56 sm:h-56 rounded-full border border-[#799dfb]/40 bg-[#5885fa]/20 shadow-[0_0_60px_rgba(88,133,250,0.35)]" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA dark */}
      <section id="apply" className="relative py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h4 className="text-2xl md:text-3xl font-bold">Chcete se přidat? Kontaktujte nás ještě dnes.</h4>
          <p className="mt-3 text-slate-300">Náš partnerský tým se vám ozve do 24 hodin a domluví další kroky.</p>
          <a href="/partneri" className="mt-8 inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-[#5885fa] text-white font-semibold hover:shadow-[0_0_40px_rgba(88,133,250,0.35)] hover:scale-105 transition">
            Kontaktovat tým
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* Stats / reference */}
      <section className="relative py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          {stats.map((s) => (
            <motion.div key={s.label} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="relative rounded-2xl border border-slate-700/60 bg-slate-800/40 backdrop-blur-xl p-8">
              <div className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-[#799dfb] to-[#8aaafc] bg-clip-text text-transparent mb-2">
                <CountUp end={s.value} duration={2} />{s.suffix}
              </div>
              <div className="text-slate-400">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="relative py-12 md:py-16 text-center">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl border border-slate-700/50 bg-slate-800/40 backdrop-blur-xl">
          <span className="w-2 h-2 rounded-full" style={{ background: "#FFD700" }} />
          <span className="text-slate-300">Mescon Digital – inovace s jistotou</span>
        </motion.div>
        <div className="mt-6">
          <a href="/" className="text-[#799dfb] hover:text-[#acc2fc] transition">Zpět na hlavní stránku</a>
        </div>
      </section>
    </motion.main>
  );
}
