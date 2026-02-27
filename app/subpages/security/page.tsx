"use client";
import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import CountUp from 'react-countup';
import { ArrowRight, BarChart3, Flame, Lock, Search, Shield, ShieldCheck, Zap } from 'lucide-react';
import RegisterPanel from '../../../components/RegisterPanel';

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const slideFromLeft = {
  hidden: { opacity: 0, x: -60 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } }
};

const blurIn = {
  hidden: { opacity: 0, filter: "blur(12px)" },
  show: { opacity: 1, filter: "blur(0px)", transition: { duration: 0.8 } }
};

const pulseGlow = {
  hidden: { opacity: 0.5, scale: 0.95 },
  show: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 2,
      repeat: Infinity,
      repeatType: "reverse" as const
    }
  }
};

export default function CyberSecurityPage() {
  const [showRegister, setShowRegister] = useState(false);
  const parallaxRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: parallaxRef, offset: ["start end", "end start"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  const features = [
    {
      icon: ShieldCheck,
      title: "Monitoring 24/7",
      description: "Nepřetržité sledování serverů",
      features: ["Real-time analýza", "AI detekce anomálií", "Automatické zálohy", "Instant notifikace"]
    },
    {
      icon: Lock,
      title: "Pokročilé šifrování",
      description: "Ochrana proti úniku dat",
      features: ["AES-256 standard", "End-to-end encryption", "Quantum-resistant", "Zero-knowledge policy"]
    },
    {
      icon: Flame,
      title: "Firewall nové generace",
      description: "Aktivní obrana v reálném čase",
      features: ["ML-powered detekce", "Geo-blocking", "DDoS mitigation", "Custom pravidla"]
    },
    {
      icon: Search,
      title: "Penetrační testy",
      description: "Odhalíme zranitelnosti dřív než útočníci",
      features: ["White-hat testing", "Vulnerability scan", "Security audit", "Reporting"]
    }
  ];

  const statsData = [
    { value: 250, suffix: "+", label: "zabezpečených systémů" },
    { value: 99.99, suffix: "%", label: "detekční přesnost" },
    { value: 0, suffix: "", label: "vážných incidentů za poslední rok" }
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
        {/* Matrix / Particle Background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0d1a3f]/20 via-[#020617] to-[#0d1a3f]/20" />
          <div className="absolute -top-32 -left-32 size-[36rem] rounded-full bg-[#5885fa]/10 blur-3xl animate-pulse" style={{ animationDuration: "10s" }} />
          <div className="absolute -bottom-32 -right-24 size-[32rem] rounded-full bg-[#5885fa]/10 blur-3xl animate-pulse" style={{ animationDuration: "12s", animationDelay: "2s" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[24rem] rounded-full bg-[#4f78e1]/10 blur-3xl animate-pulse" style={{ animationDuration: "8s", animationDelay: "1s" }} />
          <div className="absolute inset-0 [mask-image:radial-gradient(circle_at_center,white,transparent_75%)] bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px] opacity-20" />
        </div>

        {/* Glowing Shield Animation */}
        <motion.div
          variants={pulseGlow}
          initial="hidden"
          animate="show"
          className="absolute inset-0 flex items-center justify-center"
        >
          <Shield className="w-[20rem] h-[20rem] opacity-[0.03] text-slate-200" />
        </motion.div>

        <div className="relative z-10 w-full max-w-5xl text-center">
          <motion.h1
            variants={fadeUp}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-100 leading-tight"
          >
            Ochrana, na kterou <br />
            <span className="bg-gradient-to-r from-[#799dfb] via-[#5885fa] to-[#8aaafc] bg-clip-text text-transparent">
              se můžete spolehnout
            </span>
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-6 max-w-3xl mx-auto text-xl text-slate-400 leading-relaxed">
            Komplexní řešení kybernetické bezpečnosti pro vaše data a infrastrukturu.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-10">
            <button
              onClick={() => setShowRegister(true)}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#5885fa] text-white font-semibold text-lg hover:bg-[#6991fa] transition-all duration-300 shadow-lg shadow-[#0d1a3f]/20"
            >
              Zabezpečit můj systém
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
              Komplexní <span className="text-[#5885fa]">bezpečnostní řešení</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-lg text-slate-400 max-w-2xl mx-auto">
              Ochrana na nejvyšší úrovni s nejmodernějšími technologiemi
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                variants={fadeUp}
                className="group relative overflow-hidden rounded-2xl p-6 border border-slate-800 bg-slate-900/50 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:border-[#5885fa]/30"
              >
                <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-[#5885fa]/10 to-[#4f78e1]/10" />
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
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#5885fa]">
              <span className="inline-block w-2 h-2 rounded-full bg-[#5885fa]" />
              Důležitost bezpečnosti
            </span>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-100 tracking-tight">
              Vaše data, naše zodpovědnost
            </h3>
            <p className="text-slate-400 leading-relaxed">
              V dnešní digitální době je kybernetická bezpečnost kritická. Chráníme vaše systémy před útoky, datovými úniky a kybernetickými hrozbami pomocí nejmodernějších technologií a nepřetržitého monitoringu.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm p-4">
                <div className="mb-2 text-[#acc2fc]"><Lock className="w-7 h-7" /></div>
                <div className="text-sm font-semibold text-slate-100">Zero-day ochrana</div>
                <div className="text-xs text-slate-500">AI detekce hrozeb</div>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm p-4">
                <div className="mb-2 text-[#acc2fc]"><Zap className="w-7 h-7" /></div>
                <div className="text-sm font-semibold text-slate-100">Real-time</div>
                <div className="text-xs text-slate-500">Okamžitá reakce</div>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm p-4">
                <div className="mb-2 text-[#acc2fc]"><Shield className="w-7 h-7" /></div>
                <div className="text-sm font-semibold text-slate-100">Multi-layer</div>
                <div className="text-xs text-slate-500">Vrstvená obrana</div>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm p-4">
                <div className="mb-2 text-[#acc2fc]"><BarChart3 className="w-7 h-7" /></div>
                <div className="text-sm font-semibold text-slate-100">Analytics</div>
                <div className="text-xs text-slate-500">Detailní reporting</div>
              </div>
            </div>
            <div className="pt-4">
              <button
                onClick={() => setShowRegister(true)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#5885fa] text-white font-semibold hover:bg-[#6991fa] transition-all duration-300"
              >
                Zjistit více
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

          {/* Parallax Visual - 3D Shield/Network */}
          <motion.div
            style={{ y: parallaxY }}
            className="relative h-[400px] sm:h-[500px] rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/50 backdrop-blur-sm"
          >
            <div className="absolute inset-0 bg-[radial-gradient(50%_50%_at_40%_40%,rgba(88,133,250,0.1),transparent_70%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px] opacity-20" />
            
            {/* Shield and network visualization */}
            <div className="absolute inset-0 p-6 flex flex-col items-center justify-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <Shield className="w-[12rem] h-[12rem] filter drop-shadow-[0_0_50px_rgba(88,133,250,0.2)] text-slate-200 opacity-80" />
                
                {/* Animated rings around shield */}
                {[0, 1, 2].map((index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ 
                      scale: [1, 1.3, 1],
                      opacity: [0.5, 0.2, 0.5]
                    }}
                    transition={{
                      duration: 3,
                      delay: index * 0.5,
                      repeat: Infinity,
                      repeatType: "loop"
                    }}
                    className="absolute inset-0 rounded-full border-2 border-[#5885fa]/20"
                    style={{ 
                      width: `${100 + index * 30}%`,
                      height: `${100 + index * 30}%`,
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)'
                    }}
                  />
                ))}
              </motion.div>

              {/* Status indicators */}
              <div className="absolute bottom-6 left-6 right-6 grid grid-cols-3 gap-2">
                {[
                  { label: "Firewall", status: "Active", color: "green" },
                  { label: "Monitoring", status: "Live", color: "blue" },
                  { label: "Threats", status: "Blocked", color: "red" }
                ].map((indicator) => (
                  <div key={indicator.label} className="rounded-lg border border-slate-800 bg-slate-900/80 backdrop-blur-sm p-2 text-center">
                    <div className={`text-${indicator.color}-400 text-[10px] font-semibold mb-0.5`}>{indicator.status}</div>
                    <div className="text-[8px] text-slate-500">{indicator.label}</div>
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
            className="relative rounded-3xl border border-slate-800 bg-slate-900/50 backdrop-blur-md p-12 shadow-2xl shadow-[#0d1a3f]/20 hover:shadow-[#0d1a3f]/30 transition-shadow duration-500"
          >
            <div className="pointer-events-none absolute -inset-1 rounded-3xl opacity-20 bg-gradient-to-r from-[#5885fa] via-[#5885fa] to-[#5885fa] blur-xl" />
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold text-slate-100 mb-4">
                Buďte o krok napřed před hrozbami.
              </h3>
              <p className="text-lg text-slate-300 mb-2">
                Audit, zabezpečení i monitoring – vše v jednom řešení.
              </p>
              <p className="text-sm text-slate-400 mb-8">
                Komplexní bezpečnostní audit zdarma při uzavření ročního kontraktu
              </p>
              <button
                onClick={() => setShowRegister(true)}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#5885fa] text-white font-semibold text-lg hover:bg-[#6991fa] transition-all duration-300 shadow-lg"
              >
                Kontaktovat bezpečnostní tým MESCON
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
              className="relative rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-md p-10 hover:border-[#5885fa]/30 transition-colors duration-300"
            >
              <div className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-[#799dfb] to-[#5885fa] bg-clip-text text-transparent mb-3">
                <CountUp end={stat.value} duration={2.5} decimals={stat.value === 99.99 ? 2 : 0} />
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
          <span className="w-2 h-2 rounded-full bg-[#5885fa]" />
          <span className="text-slate-300">Vaše data, naše zodpovědnost.</span>
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
