"use client";
import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import CountUp from 'react-countup';
import { ArrowRight, Bot, Search, ShieldCheck } from 'lucide-react';
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

// Interaktivní kruhový graf komponenta
function CircularProgress({ percentage, label, color }: { percentage: number; label: string; color: string }) {
  const circumference = 2 * Math.PI * 45;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative w-32 h-32 mx-auto">
      <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke="currentColor"
          strokeWidth="8"
          fill="none"
          className="text-slate-700"
        />
        {/* Progress circle */}
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke="currentColor"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          className={`${color} transition-all duration-1000 ease-out`}
        />
      </svg>
      {/* Center text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <span className="text-2xl font-bold text-white">{percentage}%</span>
          <div className="text-xs text-slate-400 mt-1">{label}</div>
        </div>
      </div>
    </div>
  );
}

export default function DigitalniAuditPage() {
  const [showRegister, setShowRegister] = useState(false);
  const parallaxRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: parallaxRef, offset: ["start end", "end start"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  const auditStats = [
    { percentage: 85, label: "Výkon", color: "text-[#799dfb]" },
    { percentage: 72, label: "SEO", color: "text-green-400" },
    { percentage: 91, label: "Bezpečnost", color: "text-cyan-400" },
    { percentage: 68, label: "UX/UI", color: "text-[#8aaafc]" }
  ];

  const services = [
    {
      icon: Search,
      title: "Rychlá analýza",
      description: "Přehled výkonnosti webu, hostingu a SEO",
      features: ["Performance audit", "SEO analýza", "Mobile responsivity", "Accessibility"]
    },
    {
      icon: ShieldCheck,
      title: "Hloubková kontrola",
      description: "Odhalíme slabiny v bezpečnosti a výkonu",
      features: ["Server monitoring", "Security scan", "Load testing", "Backup analýza"]
    },
    {
      icon: Bot,
      title: "Doporučení AI",
      description: "Inteligentní návrhy na zlepšení",
      features: ["PPC kampaně", "Social media", "Email marketing", "Conversion tracking"]
    }
  ];

  const statsData = [
    { value: 250, suffix: "+", label: "audited webs" },
    { value: 99, suffix: "%", label: "accuracy v reportingu" },
    { value: 24, suffix: "h", label: "delivery time" }
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
          <div className="absolute -top-32 -left-32 size-[32rem] rounded-full bg-[#5885fa]/25 blur-3xl animate-pulse" style={{ animationDuration: "8s" }} />
          <div className="absolute -bottom-32 -right-24 size-[28rem] rounded-full bg-[#5885fa]/20 blur-3xl animate-pulse" style={{ animationDuration: "10s", animationDelay: "2s" }} />
          <div className="absolute inset-0 [mask-image:radial-gradient(circle_at_center,white,transparent_75%)] bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:32px_32px] opacity-30" />
        </div>

        <div className="relative z-10 w-full max-w-5xl text-center">
          <motion.h1
            variants={fadeUp}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-100 leading-tight"
          >
            Digitální audit <br />
            <span className="bg-gradient-to-r from-[#5885fa] via-[#8aaafc] to-[#799dfb] bg-clip-text text-transparent">
              pro vaši firmu
            </span>
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-6 max-w-3xl mx-auto text-xl text-slate-400 leading-relaxed">
            Získejte jasný přehled o výkonnosti vašeho digitálního ekosystému.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-10">
            <button
              onClick={() => setShowRegister(true)}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#5885fa] text-white font-semibold text-lg hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl hover:shadow-[0_0_50px_rgba(88,133,250,0.4)]"
            >
              Zahájit audit zdarma
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
              Co zahrnuje náš <span className="text-[#5885fa]">digitální audit</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-lg text-slate-400 max-w-2xl mx-auto">
              Komplexní analýza všech aspektů vašeho digitálního prostředí
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => (
              <motion.div
                key={service.title}
                variants={fadeUp}
                className="group relative overflow-hidden rounded-2xl p-8 border border-slate-800 bg-slate-900/50 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#5885fa]/20"
              >
                <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-[#5885fa]/30 to-[#5885fa]/30" style={{ mixBlendMode: "overlay" }} />
                <div className="relative z-10">
                  <div className="mb-4 text-[#acc2fc]">
                    <service.icon className="w-9 h-9" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-100 mb-3">{service.title}</h3>
                  <p className="text-slate-400 mb-6 text-sm leading-relaxed">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center text-sm text-slate-400">
                        <svg className="w-4 h-4 text-[#5885fa] mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
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
              AI Dashboard
            </span>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-100 tracking-tight">
              Přehledný AI audit dashboard
            </h3>
            <p className="text-slate-400 leading-relaxed">
              Kompletní analýza vašeho digitálního prostředí. Odhalíme slabá místa a navrhneme řešení pro maximální výkon. Získejte data-driven insights a konkrétní doporučení pro zlepšení.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-4">
              {auditStats.map((stat) => (
                <div key={stat.label} className="rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-md p-4">
                  <CircularProgress percentage={stat.percentage} label={stat.label} color={stat.color.replace('text-[#799dfb]', 'text-[#5885fa]').replace('text-green-400', 'text-[#5885fa]').replace('text-cyan-400', 'text-[#5885fa]').replace('text-[#8aaafc]', 'text-[#5885fa]')} />
                </div>
              ))}
            </div>
            <div className="pt-4">
              <button
                onClick={() => setShowRegister(true)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#5885fa] text-white font-semibold hover:scale-105 transition-all duration-300"
              >
                Spustit audit
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </motion.div>

          {/* Parallax Visual */}
          <motion.div
            style={{ y: parallaxY }}
            className="relative h-[400px] sm:h-[500px] rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/50 backdrop-blur-md"
          >
            <div className="absolute inset-0 bg-[radial-gradient(50%_50%_at_40%_40%,rgba(88,133,250,0.35),transparent_70%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:24px_24px] opacity-40" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-48 h-48 sm:w-64 sm:h-64 rounded-full border border-[#5885fa]/40 bg-gradient-to-br from-[#5885fa]/30 to-[#5885fa]/20 shadow-[0_0_80px_rgba(88,133,250,0.4)]" />
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
                Chcete vědět, kde ztrácíte výkon?
              </h3>
              <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto">
                Získejte bezplatný přehled během 24 hodin.
              </p>
              <button
                onClick={() => setShowRegister(true)}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#5885fa] text-white font-semibold text-lg hover:scale-105 transition-all duration-300 shadow-xl"
              >
                Spustit digitální audit
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
                <CountUp end={stat.value} duration={2.5} />
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
          <span className="text-slate-400">Vaše digitální strategie začíná u dat.</span>
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
