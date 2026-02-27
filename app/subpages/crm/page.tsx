"use client";
import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import CountUp from 'react-countup';
import { ArrowRight, Bell, Briefcase, Check, Link2, Users } from 'lucide-react';
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

export default function CRMPage() {
  const [showRegister, setShowRegister] = useState(false);
  const parallaxRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: parallaxRef, offset: ["start end", "end start"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  const features = [
    {
      icon: Users,
      title: "Klientská data",
      description: "Rychlý přístup ke všem kontaktům a historii",
      features: ["360° pohled na klienta", "Segmentace kontaktů", "Import/Export dat", "Duplikáty kontrola"]
    },
    {
      icon: Briefcase,
      title: "Obchodní příležitosti",
      description: "Automatické pipeline a sledování stavu",
      features: ["Lead scoring", "Workflow automation", "Follow-up reminder", "Deal tracking"]
    },
    {
      icon: Bell,
      title: "Notifikace & úkoly",
      description: "Připomínky a správa v reálném čase",
      features: ["Task management", "Meeting scheduler", "Deadline tracking", "Email sekvence"]
    },
    {
      icon: Link2,
      title: "Integrace",
      description: "Napojení na e-mail a marketing AI",
      features: ["Email synchronizace", "Marketing automation", "API integrace", "Reporty a analytics"]
    }
  ];

  const statsData = [
    { value: 5000, suffix: "+", label: "aktivních uživatelů" },
    { value: 98, suffix: "%", label: "spokojenost zákazníků" },
    { value: 24, suffix: "/7", label: "podpora" }
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
          <div className="absolute -top-32 -left-32 size-[34rem] rounded-full bg-[#5885fa]/25 blur-3xl animate-pulse" style={{ animationDuration: "9s" }} />
          <div className="absolute -bottom-32 -right-24 size-[30rem] rounded-full bg-[#5885fa]/20 blur-3xl animate-pulse" style={{ animationDuration: "11s", animationDelay: "2s" }} />
          <div className="absolute inset-0 [mask-image:radial-gradient(circle_at_center,white,transparent_75%)] bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:32px_32px] opacity-30" />
        </div>

        <div className="relative z-10 w-full max-w-5xl text-center">
          <motion.h1
            variants={fadeUp}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-100 leading-tight"
          >
            <span className="bg-gradient-to-r from-[#5885fa] via-[#8aaafc] to-[#799dfb] bg-clip-text text-transparent">
              CRM systém
            </span>
            , který roste s vámi
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-6 max-w-3xl mx-auto text-xl text-slate-400 leading-relaxed">
            Spravujte klienty, obchod a komunikaci v jediném prostředí MESCON.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-10">
            <button
              onClick={() => setShowRegister(true)}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#5885fa] text-white font-semibold text-lg hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl hover:shadow-[0_0_50px_rgba(88,133,250,0.4)]"
            >
              Vyzkoušet MESCON CRM
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
              Klíčové funkce <span className="text-[#5885fa]">CRM systému</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-lg text-slate-400 max-w-2xl mx-auto">
              Vše co potřebujete pro efektivní řízení vztahů se zákazníky
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
                  <feature.icon className="w-9 h-9 text-[#5885fa] mb-3" />
                  <h3 className="text-lg font-bold text-slate-100 mb-2">{feature.title}</h3>
                  <p className="text-slate-400 mb-4 text-sm leading-relaxed">{feature.description}</p>
                  <ul className="space-y-1.5">
                    {feature.features.map((item) => (
                      <li key={item} className="flex items-center text-xs text-slate-400">
                        <Check className="w-3.5 h-3.5 text-[#5885fa] mr-1.5 flex-shrink-0" />
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
              Přínosy pro vaši firmu
            </span>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-100 tracking-tight">
              Mějte všechny klienty na jednom místě
            </h3>
            <p className="text-slate-400 leading-relaxed">
              Moderní CRM řešení pro efektivní správu vztahů se zákazníky. Automatizujte procesy, zvyšte prodeje a mějte přehled o každém kontaktu. Centralizovaná databáze s kompletní historií komunikace a interakcí.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-md p-4">
                <div className="text-2xl font-bold text-[#5885fa] mb-1">
                  <CountUp end={127} duration={2.5} />
                </div>
                <div className="text-xs text-slate-400 uppercase tracking-wide">Kontakty</div>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-md p-4">
                <div className="text-2xl font-bold text-[#5885fa] mb-1">
                  <CountUp end={45} duration={2.5} />
                </div>
                <div className="text-xs text-slate-400 uppercase tracking-wide">Aktivní dealy</div>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-md p-4">
                <div className="text-2xl font-bold text-[#5885fa] mb-1">
                  <CountUp end={321} duration={2.5} />K
                </div>
                <div className="text-xs text-slate-400 uppercase tracking-wide">Měsíční tržby</div>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-md p-4">
                <div className="text-2xl font-bold text-[#5885fa] mb-1">
                  <CountUp end={89} duration={2.5} />%
                </div>
                <div className="text-xs text-slate-400 uppercase tracking-wide">Conversion rate</div>
              </div>
            </div>
            <div className="pt-4">
              <button
                onClick={() => setShowRegister(true)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#5885fa] text-white font-semibold hover:scale-105 transition-all duration-300"
              >
                Vyzkoušet demo
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

          {/* Parallax Visual - 3D Dashboard */}
          <motion.div
            style={{ y: parallaxY }}
            className="relative h-[400px] sm:h-[500px] rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/50 backdrop-blur-md"
          >
            <div className="absolute inset-0 bg-[radial-gradient(50%_50%_at_40%_40%,rgba(88,133,250,0.35),transparent_70%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:24px_24px] opacity-40" />
            
            {/* Dashboard elements */}
            <div className="absolute inset-0 p-6 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <div className="text-xs text-slate-400 font-medium">Live CRM Dashboard</div>
              </div>
              
              <div className="grid grid-cols-3 gap-2 mt-2">
                {[
                  { label: "Leads", value: "1.2K", color: "from-[#5885fa] to-[#8aaafc]" },
                  { label: "Deals", value: "345", color: "from-[#5885fa] to-[#5885fa]" },
                  { label: "Won", value: "89%", color: "from-[#5885fa] to-[#5885fa]" }
                ].map((stat) => (
                  <div key={stat.label} className="rounded-lg border border-slate-800 bg-slate-800/50 backdrop-blur-sm p-3">
                    <div className={`text-lg font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                      {stat.value}
                    </div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-wide">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="flex-1 rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm p-4 mt-2">
                <div className="space-y-2">
                  {[75, 45, 100, 60].map((progress, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="flex-1 h-2 rounded-full bg-slate-800">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${progress}%` }}
                          transition={{ duration: 1.5, delay: i * 0.2 }}
                          className="h-full rounded-full bg-gradient-to-r from-[#5885fa] to-[#5885fa]"
                        />
                      </div>
                      <span className="text-[10px] text-slate-400 w-8">{progress}%</span>
                    </div>
                  ))}
                </div>
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
                Chcete mít všechny klienty na jednom místě?
              </h3>
              <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto">
                Vyzkoušejte MESCON CRM na 7 dní zdarma.
              </p>
              <button
                onClick={() => setShowRegister(true)}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#5885fa] text-white font-semibold text-lg hover:scale-105 transition-all duration-300 shadow-xl"
              >
                Získat demo verzi CRM
                <ArrowRight className="w-5 h-5" />
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
          <span className="text-slate-400">Data jsou srdcem vašeho byznysu – MESCON je vaše centrála.</span>
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
