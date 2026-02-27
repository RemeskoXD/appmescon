"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { Activity, ArrowRight, BarChart3, Bot, CheckCircle, Gem, Search, Target, TrendingUp, Zap } from 'lucide-react';
import RegisterPanel from '../../../components/RegisterPanel';
import Button from '../../../components/ui/Button';

// Animační varianty
const fadeUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const blurIn = {
  initial: { opacity: 0, filter: 'blur(10px)' },
  animate: { opacity: 1, filter: 'blur(0px)' },
  transition: { duration: 0.8 }
};

export default function MarketingFunnelPage() {
  const [showRegister, setShowRegister] = useState(false);

  return (
    <main className="bg-[#020617] text-slate-100 overflow-hidden">
      {/* Hero sekce */}
      <section className="relative border-b border-slate-800/60 pt-20 pb-24 lg:pt-32 lg:pb-40">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[500px] bg-[#5885fa]/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="page-container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div {...blurIn} className="text-center lg:text-left">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#5885fa] to-[#eef3fe]">
                  Marketingový funnel
                </span>
                pro stabilní růst.
              </h1>
              <p className="text-lg sm:text-xl text-slate-300 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Jasná cesta od návštěvníka k zákazníkovi. Přehledně měříme každý krok a průběžně ladíme konverze.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button variant="primary" size="lg" onClick={() => setShowRegister(true)} className="min-w-[160px]">
                  Nechat si navrhnout funnel
                </Button>
                <Button variant="outline" size="lg" href="/subpages/portfolio" className="min-w-[160px]">
                  Portfolio
                </Button>
              </div>
            </motion.div>

            <motion.div {...blurIn} transition={{ delay: 0.2, duration: 0.8 }} className="relative mx-auto w-full max-w-lg lg:max-w-none">
              <div className="relative">
                <svg viewBox="0 0 400 500" className="w-full" xmlns="http://www.w3.org/2000/svg">
                  <motion.path
                    d="M 50 50 L 350 50 L 320 150 L 80 150 Z"
                    fill="url(#funnelGrad1)"
                    stroke="#5885fa"
                    strokeWidth="2"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  />
                  <text x="200" y="90" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">10,000</text>
                  <text x="200" y="110" textAnchor="middle" fill="#5885fa" fontSize="12">Návštěvníci</text>

                  <motion.path
                    d="M 80 150 L 320 150 L 280 280 L 120 280 Z"
                    fill="url(#funnelGrad2)"
                    stroke="#5885fa"
                    strokeWidth="2"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                  />
                  <text x="200" y="205" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">2,500</text>
                  <text x="200" y="225" textAnchor="middle" fill="#5885fa" fontSize="12">Leady</text>

                  <motion.path
                    d="M 120 280 L 280 280 L 240 420 L 160 420 Z"
                    fill="url(#funnelGrad3)"
                    stroke="#5885fa"
                    strokeWidth="2"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                  />
                  <text x="200" y="340" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">500</text>
                  <text x="200" y="360" textAnchor="middle" fill="#5885fa" fontSize="12">Zákazníci</text>

                  {[...Array(12)].map((_, i) => (
                    <motion.circle
                      key={`particle-${i}`}
                      r="3"
                      fill="#5885fa"
                      initial={{ cx: 50 + i * 25, cy: 30, opacity: 0 }}
                      animate={{
                        cy: [30, 450],
                        cx: [50 + i * 25, 160 + Math.sin(i) * 20],
                        opacity: [0, 0.8, 0]
                      }}
                      transition={{
                        duration: 3 + i * 0.2,
                        repeat: Infinity,
                        delay: i * 0.3,
                        ease: "easeInOut"
                      }}
                    />
                  ))}

                  <defs>
                    <linearGradient id="funnelGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#5885fa" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#5885fa" stopOpacity="0.4" />
                    </linearGradient>
                    <linearGradient id="funnelGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#5885fa" stopOpacity="0.7" />
                      <stop offset="100%" stopColor="#5885fa" stopOpacity="0.4" />
                    </linearGradient>
                    <linearGradient id="funnelGrad3" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#5885fa" stopOpacity="0.7" />
                      <stop offset="100%" stopColor="#5885fa" stopOpacity="0.5" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute right-6 top-28 space-y-20">
                  <div className="text-right">
                    <div className="text-2xl font-bold text-[#5885fa]">25%</div>
                    <div className="text-xs text-slate-500">konverze</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-[#5885fa]">20%</div>
                    <div className="text-xs text-slate-500">konverze</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sekce 1 – hlavní funnel fáze */}
      <section className="border-b border-slate-800/60 bg-[#030712] py-20 lg:py-24">
        <div className="page-container">
          <motion.div {...fadeUp} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-100 mb-4">
              Hlavní funnel fáze
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Čtyři místa, kde firmy nejčastěji ztrácí poptávky. Funnel je propojí do jedné jasné a měřitelné cesty.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-[#5885fa] via-[#8aaafc] to-[#799dfb] opacity-30 blur-sm -translate-y-1/2"></div>
            
            {[
              {
                phase: "Awareness",
                title: "1. Pozornost",
                desc: "Přitáhneme správné publikum přes SEO, PPC a sociální sítě a dáme mu jasnou nabídku vstupu.",
                icon: Target
              },
              {
                phase: "Consideration",
                title: "2. Zvažování",
                desc: "Lead magnety, obsah a retargeting drží zájemce ve hře a posouvají je k poptávce.",
                icon: Search
              },
              {
                phase: "Conversion",
                title: "3. Konverze",
                desc: "Optimalizované landing page, formuláře a checkout snižují tření a navyšují odeslané poptávky.",
                icon: CheckCircle
              },
              {
                phase: "Retention",
                title: "4. Udržení",
                desc: "Remarketing, onboarding a péče o zákazníka promění jednorázové nákupy v dlouhodobou hodnotu.",
                icon: Gem
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                {...fadeUp}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                className="relative"
              >
                <div className="relative bg-slate-900/50 backdrop-blur-md rounded-2xl p-6 border border-slate-800 hover:border-[#5885fa]/50 transition-all duration-300 hover:scale-105 group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#5885fa] via-[#5885fa] to-[#5885fa] rounded-2xl opacity-0 group-hover:opacity-20 blur transition duration-300"></div>
                  <div className="relative">
                    <step.icon className="w-10 h-10 text-[#5885fa] mb-4" />
                    <div className="text-sm font-bold text-[#5885fa] mb-2">{step.phase}</div>
                    <h3 className="text-2xl font-bold text-slate-100 mb-3">{step.title}</h3>
                    <p className="text-slate-400 leading-relaxed">{step.desc}</p>
                    <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 w-3 h-3 bg-gradient-to-r from-[#5885fa] to-[#8aaafc] rounded-full shadow-[0_0_15px_rgba(88,133,250,0.6)]"></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sekce 2 – AI / automatizace / výhody */}
      <section className="border-b border-slate-800/60 bg-[#020617] py-20 lg:py-24 relative overflow-hidden">
        <div className="page-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <motion.div {...fadeUp} className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-100 leading-tight">
                AI analýza konverzí{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5885fa] via-[#8aaafc] to-[#799dfb]">
                  v reálném čase
                </span>
              </h2>
              <p className="text-lg text-slate-400 leading-relaxed">
                Náš AI systém sleduje každou interakci ve funnelu a automaticky optimalizuje messaging, timing a targeting pro maximální konverze.
              </p>
              <div className="space-y-4">
                {[
                  { icon: Target, text: "Prediktivní analýza chování uživatelů" },
                  { icon: Zap, text: "Automatické A/B testování na všech stupních" },
                  { icon: BarChart3, text: "Real-time dashboard s live konverzemi" },
                  { icon: Bot, text: "AI doporučení pro zlepšení každé fáze" }
                ].map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3"
                  >
                    <feature.icon className="w-5 h-5 text-[#5885fa] mt-1" />
                    <p className="text-slate-400 pt-1">{feature.text}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div {...fadeUp} className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  { end: 300, suffix: "%", label: "Nárůst konverzí", sublabel: "průměrné zlepšení", icon: TrendingUp },
                  { end: 90, suffix: "%", label: "Automatizace procesů", sublabel: "AI-driven workflow", icon: Bot },
                  { end: 24, suffix: "/7", label: "Sledování výkonu", sublabel: "real-time analytics", icon: Activity }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    viewport={{ once: true }}
                    className="relative group"
                  >
                    <div className="relative bg-slate-900/50 backdrop-blur-md rounded-2xl p-6 border border-slate-800 text-center hover:border-[#5885fa]/50 transition-all duration-300">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#5885fa] via-[#5885fa] to-[#5885fa] rounded-2xl opacity-0 group-hover:opacity-20 blur transition duration-300"></div>
                      <div className="relative">
                        <stat.icon className="w-8 h-8 text-[#5885fa] mb-3 mx-auto" />
                        <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#5885fa] via-[#8aaafc] to-[#799dfb] mb-1">
                          <CountUp end={stat.end} duration={2.5} suffix={stat.suffix} />
                        </div>
                        <div className="text-base font-semibold text-slate-100">{stat.label}</div>
                        <div className="text-xs text-slate-500">{stat.sublabel}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="relative bg-slate-900/50 backdrop-blur-md rounded-3xl p-10 border border-slate-800 overflow-hidden group hover:border-[#5885fa]/50 transition-all duration-500">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#5885fa] via-[#5885fa] to-[#5885fa] rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition duration-500"></div>
                <div className="relative text-center space-y-4">
                  <h3 className="text-3xl md:text-4xl font-bold text-slate-100">
                    Získejte AI marketingový funnel{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5885fa] via-[#8aaafc] to-[#799dfb]">
                      na míru
                    </span>
                  </h3>
                  <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                    Zvyšte konverze až o 300% s automatizovaným AI funnelem od MESCON Digital
                  </p>
                  <motion.button
                    onClick={() => setShowRegister(true)}
                    className="inline-flex items-center gap-2 px-8 py-4 bg-[#5885fa] text-white rounded-full font-bold text-lg hover:scale-105 transition-all duration-300 shadow-[0_0_50px_rgba(88,133,250,0.4)] hover:shadow-[0_0_70px_rgba(88,133,250,0.6)]"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Domluvit konzultaci
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                  <p className="text-sm text-slate-500">
                    MESCON – vaše AI řešení pro konverze bez limitů
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sekce 3 – Jaký problém funnel řeší */}
      <section className="border-b border-slate-800/60 bg-[#02091b] py-20 lg:py-24 relative">
        <div className="page-container">
          <motion.div {...fadeUp} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-100 mb-4">
              Jaký problém funnel řeší
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Čtyři místa, kde firmy ztrácí poptávky: málo návštěvníků, odliv zájemců, nedokončené akce a slabá loajalita.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Málo návštěvníků", desc: "Přitáhneme správné publikum a dáme mu jasnou nabídku vstupu." },
              { title: "Odliv zájemců", desc: "Lead magnety a retargeting drží zájemce ve hře a posouvají je k poptávce." },
              { title: "Nedokončené akce", desc: "Optimalizujeme landing page, formuláře a checkout, aby se snížilo tření." },
              { title: "Slabá loajalita", desc: "Remarketing a onboarding promění jednorázové nákupy v dlouhodobou hodnotu." },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 backdrop-blur-md"
              >
                <div className="text-sm font-bold text-[#5885fa] mb-2">Problém {index + 1}</div>
                <h3 className="text-2xl font-bold text-slate-100 mb-3">{item.title}</h3>
                <p className="text-slate-400 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {showRegister && <RegisterPanel onClose={() => setShowRegister(false)} />}
    </main>
  );
}
