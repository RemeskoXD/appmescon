"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { Activity, BadgePercent, BarChart3, LineChart, Rocket, Settings, Target } from 'lucide-react';
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

const platformLogos = [
  {
    name: 'Seznam.cz',
    src: 'https://web2.itnahodinu.cz/mescon/images/ppc_platformy/13.svg'
  },
  {
    name: 'Google Ads',
    src: 'https://web2.itnahodinu.cz/mescon/images/ppc_platformy/12.svg'
  },
  {
    name: 'Meta',
    src: 'https://web2.itnahodinu.cz/mescon/images/ppc_platformy/14.svg'
  },
  {
    name: 'YouTube',
    src: 'https://web2.itnahodinu.cz/mescon/images/ppc_platformy/15.svg'
  }
];

export default function PpcReklamyPage() {
  const [showRegister, setShowRegister] = useState(false);

  return (
    <main className="bg-[#020617] text-slate-100 overflow-hidden">
      {/* Hero */}
      <section className="relative border-b border-slate-800/60 pt-20 pb-24 lg:pt-32 lg:pb-40">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[500px] bg-[#5885fa]/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="page-container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div {...blurIn} className="text-center lg:text-left">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#5885fa] to-[#eef3fe]">
                  PPC reklamy
                </span>
                které doručují výsledky.
              </h1>
              <p className="text-lg sm:text-xl text-slate-300 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Strategie, správa a reporting orientované na výkon a ziskovost.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button variant="primary" size="lg" onClick={() => setShowRegister(true)} className="min-w-[160px]">
                  Získat audit kampaní zdarma →
                </Button>
                <Button variant="outline" size="lg" href="/subpages/portfolio" className="min-w-[160px]">
                  Portfolio
                </Button>
              </div>
            </motion.div>

            <motion.div {...blurIn} transition={{ delay: 0.1, duration: 0.8 }} className="relative mx-auto w-full max-w-lg lg:max-w-none">
              <div className="relative w-full bg-[#0b1024]/70 border border-slate-800 rounded-2xl p-6 backdrop-blur-md shadow-[0_20px_60px_rgba(0,0,0,0.35)] overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                  <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    {[...Array(5)].map((_, i) => (
                      <motion.path
                        key={`curve-${i}`}
                        d={`M ${i * 25} 80 Q ${i * 25 + 20} 40 ${i * 25 + 40} 20`}
                        stroke="#5885fa"
                        strokeWidth="2"
                        fill="none"
                        strokeDasharray="4 4"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{
                          pathLength: [0, 1],
                          opacity: [0, 0.6, 0.3],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          delay: i * 0.4,
                          ease: "easeInOut"
                        }}
                      />
                    ))}
                  </svg>
                </div>
                <div className="relative grid grid-cols-2 gap-4">
                  <div className="h-32 rounded-xl bg-gradient-to-br from-[#0f172a] via-[#0b1024] to-[#0b132a] border border-slate-800 flex items-center justify-center">
                    <div className="w-full px-6">
                      <div className="h-2 rounded-full bg-slate-800 mb-3 overflow-hidden">
                        <div className="h-full w-[72%] bg-gradient-to-r from-[#5885fa] to-[#8aaafc]" />
                      </div>
                      <div className="h-2 rounded-full bg-slate-800 mb-3 overflow-hidden">
                        <div className="h-full w-[64%] bg-gradient-to-r from-[#8aaafc] to-[#799dfb]" />
                      </div>
                      <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                        <div className="h-full w-[48%] bg-gradient-to-r from-[#799dfb] to-[#5885fa]" />
                      </div>
                    </div>
                  </div>
                  <div className="h-32 rounded-xl bg-[#0f172a] border border-slate-800 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#5885fa] to-[#8aaafc] opacity-80" />
                  </div>
                  <div className="col-span-2 h-28 rounded-xl bg-[#0f172a] border border-slate-800 flex items-center justify-center gap-3 px-6">
                    <div className="flex-1 h-2 rounded-full bg-slate-800 overflow-hidden">
                      <div className="h-full w-[80%] bg-gradient-to-r from-[#4f78e1] to-[#8aaafc]" />
                    </div>
                    <div className="flex-1 h-2 rounded-full bg-slate-800 overflow-hidden">
                      <div className="h-full w-[55%] bg-gradient-to-r from-[#799dfb] to-[#5885fa]" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sekce 1 – Jaké platformy spravujeme */}
      <section className="border-b border-slate-800/60 bg-[#030712] py-16">
        <div className="page-container">
          <motion.div {...fadeUp} className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-100 mb-4">
              Jaké platformy spravujeme
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Správa kampaní v klíčových reklamních systémech.
            </p>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 items-center justify-items-center">
            {platformLogos.map((platform) => (
              <div
                key={platform.name}
                className="grid h-16 w-full place-items-center rounded-xl border border-slate-800 bg-[#0f172a]"
              >
                <img
                  src={platform.src}
                  alt={platform.name}
                  className="block h-14 w-auto max-w-[220px] opacity-90"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sekce 2 – PPC strategie a optimalizace */}
      <section className="border-b border-slate-800/60 bg-[#020617] py-20 lg:py-24 relative">
        <div className="page-container space-y-16">
          <motion.div {...fadeUp} className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-100 mb-4">
              PPC strategie a optimalizace
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Analýza dat, optimalizace rozpočtů, testování kreativ a práce s konverzemi.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Target,
                title: "Strategie",
                desc: "Cílení, segmentace a plánování rozpočtů na míru vašim cílům"
              },
              {
                icon: Settings,
                title: "Správa kampaní",
                desc: "Google Ads, Sklik, Meta – struktura účtů, tracking a řízení bidů"
              },
              {
                icon: Rocket,
                title: "Optimalizace",
                desc: "Bidding, negativa, kvalita inzerátů a testy kreativ pro vyšší výkon"
              },
              {
                icon: BarChart3,
                title: "Reporting",
                desc: "KPI, ROAS a dashboard v reálném čase pro jasná rozhodnutí"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                {...fadeUp}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                viewport={{ once: true }}
                className="relative group h-full"
              >
                <div className="relative bg-slate-900/50 backdrop-blur-md rounded-2xl p-8 border border-slate-800 hover:border-[#5885fa]/50 transition-all duration-300 hover:translate-y-[-5px] h-full flex flex-col">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#5885fa] via-[#5885fa] to-[#5885fa] rounded-2xl opacity-0 group-hover:opacity-20 blur transition duration-300"></div>
                  
                  <div className="relative flex flex-col h-full">
                    <div className="mb-4 text-[#acc2fc]">
                      <feature.icon className="w-9 h-9" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-100 mb-3">{feature.title}</h3>
                    <p className="text-slate-400 leading-relaxed mt-auto">{feature.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="space-y-12">
            <motion.div {...fadeUp} className="text-center">
              <h3 className="text-3xl md:text-4xl font-bold text-slate-100 mb-3">Proces řízení kampaní</h3>
              <p className="text-lg text-slate-400 max-w-3xl mx-auto">
                Od auditu po škálování – transparentní kroky a kontrola nad výsledky.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  step: "1",
                  title: "Audit",
                  desc: "Analýza konkurence, keyword research, identifikace příležitostí"
                },
                {
                  step: "2",
                  title: "Nastavení",
                  desc: "Setup kampaní, tracking, struktury účtů a cílení"
                },
                {
                  step: "3",
                  title: "Testování",
                  desc: "A/B testy inzerátů, bidding strategií a landing pages"
                },
                {
                  step: "4",
                  title: "Škálování",
                  desc: "Zvyšování rozpočtů na winning kampaních a expanze"
                }
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="relative text-center"
                >
                  <div className="relative bg-slate-900/50 backdrop-blur-md rounded-2xl p-6 border border-slate-800 hover:border-[#5885fa]/50 transition-all duration-300">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-[#5885fa] to-[#4f78e1] flex items-center justify-center text-white text-2xl font-bold shadow-[0_0_20px_rgba(88,133,250,0.3)]">
                      {step.step}
                    </div>
                    <h3 className="text-2xl font-bold text-slate-100 mb-3">{step.title}</h3>
                    <p className="text-slate-400 leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div {...fadeUp} viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { end: 300, suffix: "%", label: "Růst konverzí", sublabel: "průměrný nárůst", icon: LineChart },
                { end: 5.2, suffix: "×", label: "ROAS", sublabel: "návratnost investic", icon: BadgePercent, decimals: 1 },
                { end: 24, suffix: "/7", label: "Monitoring", sublabel: "real-time sledování", icon: Activity }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.15, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="relative group"
                >
                  <div className="relative bg-slate-900/50 backdrop-blur-md rounded-2xl p-8 border border-slate-800 text-center hover:border-[#5885fa]/50 transition-all duration-300">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#5885fa] via-[#5885fa] to-[#5885fa] rounded-2xl opacity-0 group-hover:opacity-20 blur transition duration-300"></div>
                    
                    <div className="relative">
                      <div className="mb-4 text-[#acc2fc]">
                        <stat.icon className="w-8 h-8" />
                      </div>
                      <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#5885fa] via-[#8aaafc] to-[#799dfb] mb-2">
                        <CountUp end={stat.end} duration={2.5} suffix={stat.suffix} decimals={stat.decimals || 0} />
                      </div>
                      <div className="text-lg font-semibold text-slate-100 mb-1">{stat.label}</div>
                      <div className="text-sm text-slate-500">{stat.sublabel}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sekce 3 – Jaký problém řeší PPC reklamy */}
      <section className="border-b border-slate-800/60 bg-[#02091b] py-20 lg:py-24 relative overflow-hidden">
        <div className="page-container">
          <motion.div {...fadeUp} className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-100 mb-4">
              Jaký problém řeší PPC reklamy
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Řešíme nízkou viditelnost značky, neefektivní marketing, špatnou návratnost rozpočtů a chybějící data pro rozhodování.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Viditelnost", desc: "Posilujeme brand i výkon v klíčových kanálech, abyste byli vidět." },
              { title: "Efektivita", desc: "Eliminujeme zbytečné výdaje a řídíme rozpočty podle výsledků." },
              { title: "Návratnost", desc: "Optimalizujeme kampaně na ROAS, CPA a profitabilitu." },
              { title: "Data", desc: "Přesné měření a reporting, aby rozhodnutí vycházela z faktů." }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 backdrop-blur-md"
              >
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
