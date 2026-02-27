"use client";
import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import CountUp from 'react-countup';
import { ArrowRight, BarChart3, Bot, Cloud, FileText, Flag, Headphones, Landmark, Workflow } from 'lucide-react';
import RegisterPanel from '../../../components/RegisterPanel';

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.25, 0.46, 0.24, 1] } }
};

const slideFromLeft = {
  hidden: { opacity: 0, x: -40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.24, 1] } }
};

const blurIn = {
  hidden: { opacity: 0, filter: "blur(12px)" },
  show: { opacity: 1, filter: "blur(0px)", transition: { duration: 0.8 } }
};

export default function UcetniPage() {
  const [showRegister, setShowRegister] = useState(false);
  const parallaxRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: parallaxRef, offset: ["start end", "end start"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  const features = [
    {
      icon: FileText,
      title: "Automatická evidence faktur",
      description: "Bez ručního zadávání",
      features: ["OCR rozpoznání", "Auto-import z emailu", "Párování plateb", "Archivace dokumentů"]
    },
    {
      icon: Bot,
      title: "AI analýza výdajů",
      description: "Přehledné statistiky a upozornění",
      features: ["Kategorizace nákladů", "Trend analýzy", "Predikce cashflow", "Anomálie detection"]
    },
    {
      icon: BarChart3,
      title: "Reporty v reálném čase",
      description: "Export PDF, přehled příjmů/výdajů",
      features: ["Rozvaha a výsledovka", "DPH přehledy", "Custom reporty", "API export"]
    },
    {
      icon: Landmark,
      title: "Napojení na banku",
      description: "Automatická synchronizace plateb",
      features: ["Multi-bank podpora", "Auto-párování", "Real-time stav", "QR platby"]
    }
  ];

  const statsData = [
    { value: 12000, suffix: "+", label: "zpracovaných faktur měsíčně" },
    { value: 99.8, suffix: "%", label: "přesnost automatického párování" },
    { value: 24, suffix: "/7", label: "dostupnost systému" }
  ];

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative overflow-hidden bg-[#020617]"
    >
      {/* 1. Hero sekce */}
      <motion.section
        variants={blurIn}
        initial="hidden"
        animate="show"
        className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 sm:px-12 lg:px-20"
      >
        {/* Particle / Wave Background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#5885fa]/20 via-[#020617] to-[#0d1a3f]/20" />
          <div className="absolute -top-32 -left-32 size-[36rem] rounded-full bg-[#5885fa]/25 blur-3xl animate-pulse" style={{ animationDuration: "10s" }} />
          <div className="absolute -bottom-32 -right-24 size-[32rem] rounded-full bg-[#5885fa]/20 blur-3xl animate-pulse" style={{ animationDuration: "12s", animationDelay: "2s" }} />
          <div className="absolute inset-0 [mask-image:radial-gradient(circle_at_center,white,transparent_75%)] bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:32px_32px] opacity-30" />
        </div>

        <div className="relative z-10 w-full max-w-5xl text-center">
          <motion.h1
            variants={fadeUp}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-100 leading-tight"
          >
            Účetní systém <br />
            <span className="bg-gradient-to-r from-[#5885fa] via-[#8aaafc] to-[#799dfb] bg-clip-text text-transparent">
              nové generace
            </span>
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-6 max-w-3xl mx-auto text-xl text-slate-400 leading-relaxed">
            Automatizujte fakturaci, evidenci i reporting – jednoduše a bezpečně.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-10">
            <button
              onClick={() => setShowRegister(true)}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#5885fa] text-white font-semibold text-lg hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl hover:shadow-[0_0_50px_rgba(88,133,250,0.4)]"
            >
              Vyzkoušet účetní systém zdarma
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </motion.section>

      {/* 2. Feature sekce */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="relative py-20 border-t border-slate-800 px-6 sm:px-12 lg:px-20"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-slate-100 mb-4">
              Klíčové funkce <span className="text-[#5885fa]">účetního systému</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-lg text-slate-400 max-w-2xl mx-auto">
              Vše co potřebujete pro profesionální vedení účetnictví v jednom řešení
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                variants={fadeUp}
                className="group relative overflow-hidden rounded-2xl p-6 border border-slate-800 bg-slate-900/50 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_25px_rgba(88,133,250,0.3)]"
              >
                <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-[#5885fa]/30 to-[#5885fa]/30" style={{ mixBlendMode: "overlay" }} />
                <div className="relative z-10">
                  <div className="mb-3 text-[#acc2fc]">
                    <feature.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-100 mb-2">{feature.title}</h3>
                  <p className="text-slate-400 mb-4 text-sm leading-relaxed">{feature.description}</p>
                  <ul className="space-y-1.5">
                    {feature.features.map((item) => (
                      <li key={item} className="flex items-center text-xs text-slate-400">
                        <svg className="w-3.5 h-3.5 text-[#5885fa] mr-1.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* 3. Info sekce s parallaxem */}
      <motion.section
        ref={parallaxRef}
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="relative py-20 border-t border-slate-800 overflow-hidden px-6 sm:px-12 lg:px-20"
      >
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* Text + CTA */}
          <motion.div variants={slideFromLeft} className="space-y-6">
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-slate-400">
              <span className="inline-block w-2 h-2 rounded-full bg-yellow-400" />
              Bezpečnost a efektivita
            </span>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-100 tracking-tight">
              Mějte své finance pod kontrolou
            </h3>
            <p className="text-slate-400 leading-relaxed">
              Moderní cloudové účetnictví s automatizací, real-time reportingem a compliance s českými standardy. Všechna data jsou šifrovaná a zálohovananá na více místech. Plně v souladu s českou legislativou a GDPR.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-md p-4">
                <div className="mb-2 text-[#acc2fc]"><Flag className="w-7 h-7" /></div>
                <div className="text-sm font-semibold text-slate-100">Česká legislativa</div>
                <div className="text-xs text-slate-400">Plně v souladu</div>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-md p-4">
                <div className="mb-2 text-[#acc2fc]"><Cloud className="w-7 h-7" /></div>
                <div className="text-sm font-semibold text-slate-100">Cloud řešení</div>
                <div className="text-xs text-slate-400">Odkudkoli, kdykoliv</div>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-md p-4">
                <div className="mb-2 text-[#acc2fc]"><Workflow className="w-7 h-7" /></div>
                <div className="text-sm font-semibold text-slate-100">Automatizace</div>
                <div className="text-xs text-slate-400">Min. manuální práce</div>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-md p-4">
                <div className="mb-2 text-[#acc2fc]"><Headphones className="w-7 h-7" /></div>
                <div className="text-sm font-semibold text-slate-100">Podpora 24/7</div>
                <div className="text-xs text-slate-400">Odborná pomoc</div>
              </div>
            </div>
            <div className="pt-4">
              <button
                onClick={() => setShowRegister(true)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#5885fa] text-white font-semibold hover:scale-105 transition-all duration-300"
              >
                Požádat o konzultaci
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

          {/* Parallax Visual - 3D Invoice/Graph */}
          <motion.div
            style={{ y: parallaxY }}
            className="relative h-[400px] sm:h-[500px] rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/50 backdrop-blur-md"
          >
            <div className="absolute inset-0 bg-[radial-gradient(50%_50%_at_40%_40%,rgba(88,133,250,0.35),transparent_70%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:24px_24px] opacity-40" />
            
            {/* Invoice visualization */}
            <div className="absolute inset-0 p-6 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="text-xs text-slate-400 font-medium">Faktura #2024-001</div>
                <div className="px-2 py-1 rounded-full bg-green-500/20 border border-green-500/30 text-green-300 text-[10px]">Zaplaceno</div>
              </div>
              
              <div className="flex-1 rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm p-4">
                <div className="space-y-3">
                  {[
                    { label: "Příjmy", value: "245K", color: "from-[#5885fa] to-[#8aaafc]", width: "85%" },
                    { label: "Výdaje", value: "180K", color: "from-[#5885fa] to-[#5885fa]", width: "65%" },
                    { label: "Zisk", value: "65K", color: "from-[#5885fa] to-[#5885fa]", width: "50%" }
                  ].map((stat) => (
                    <div key={stat.label} className="space-y-1">
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="text-slate-400">{stat.label}</span>
                        <span className="text-slate-100 font-semibold">{stat.value}</span>
                      </div>
                      <div className="h-2 rounded-full bg-slate-800">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: stat.width }}
                          transition={{ duration: 1.5, delay: 0.3 }}
                          className={`h-full rounded-full bg-gradient-to-r ${stat.color}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {["PDF", "CSV", "XML"].map((format) => (
                  <div key={format} className="text-center py-2 rounded-lg border border-slate-800 bg-slate-900/50 backdrop-blur-sm">
                    <div className="text-[10px] text-slate-400 font-medium">{format}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* 4. CTA sekce s glow */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="relative py-20 border-t border-slate-800 px-6 sm:px-12 lg:px-20"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            variants={fadeUp}
            className="relative rounded-3xl border border-slate-800 bg-slate-900/50 backdrop-blur-md p-12 shadow-[0_0_60px_rgba(88,133,250,0.3)] hover:shadow-[0_0_80px_rgba(88,133,250,0.4)] transition-shadow duration-500"
          >
            <div className="pointer-events-none absolute -inset-1 rounded-3xl opacity-50 bg-gradient-to-r from-[#5885fa]/40 via-[#5885fa]/40 to-[#5885fa]/40 blur-xl" />
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold text-slate-100 mb-4">
                Mějte své finance pod kontrolou.
              </h3>
              <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto">
                Vyzkoušejte všechny funkce zdarma na 14 dní.
              </p>
              <button
                onClick={() => setShowRegister(true)}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#5885fa] text-white font-semibold text-lg hover:scale-105 transition-all duration-300 shadow-xl"
              >
                Spustit účetní systém
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* 5. Statistiky s CountUp */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="relative py-20 border-t border-slate-800 px-6 sm:px-12 lg:px-20"
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          {statsData.map((stat) => (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              className="relative rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-md p-10"
            >
              <div className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-[#5885fa] to-[#8aaafc] bg-clip-text text-transparent mb-3">
                <CountUp end={stat.value} duration={2.5} decimals={stat.value === 99.8 ? 1 : 0} />
                {stat.suffix}
              </div>
              <div className="text-slate-400 text-sm uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* 6. Závěrečný blok */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="relative py-16 text-center px-6 sm:px-12 lg:px-20"
      >
        <motion.div variants={fadeUp} className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-yellow-400" />
          <span className="text-slate-400">MESCON – účetnictví, které šetří čas i peníze.</span>
        </motion.div>
      </motion.section>

      {/* Register Panel */}
      {showRegister && (
        <RegisterPanel
          open={showRegister}
          onClose={() => setShowRegister(false)}
        />
      )}
    </motion.main>
  );
}
