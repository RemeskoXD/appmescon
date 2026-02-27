"use client";
import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import CountUp from 'react-countup';
import { ArrowRight, Bot, Brain, Check, FlaskConical, Settings, TrendingUp, Zap } from 'lucide-react';
import RegisterPanel from '../../../components/RegisterPanel';

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const blurIn = {
  hidden: { opacity: 0, filter: "blur(12px)" },
  show: { opacity: 1, filter: "blur(0px)", transition: { duration: 0.8 } }
};

const neonPulse = {
  initial: { opacity: 0.5, scale: 1 },
  animate: {
    opacity: [0.5, 1, 0.5],
    scale: [1, 1.05, 1],
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
  }
};

export default function MarketingAIPage() {
  const [showRegister, setShowRegister] = useState(false);
  const parallaxRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: parallaxRef, offset: ["start end", "end start"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  const features = [
    {
      icon: Brain,
      title: "Prediktivní analýza",
      description: "AI předvídá chování zákazníků",
      features: ["Behavioral targeting", "Churn prediction", "Next-best action", "Lifetime value scoring"]
    },
    {
      icon: Zap,
      title: "Automatizované kampaně",
      description: "Plná správa reklam a obsahu",
      features: ["Smart bidding", "Dynamic creative", "Auto-optimization", "Budget allocation"]
    },
    {
      icon: FlaskConical,
      title: "A/B testování s AI",
      description: "Výběr nejúčinnějších variant",
      features: ["Multivariate testing", "Real-time decisions", "Statistical significance", "Auto winner selection"]
    },
    {
      icon: Bot,
      title: "Chatbot pro prodej",
      description: "24/7 asistent v reálném čase",
      features: ["Natural language", "Lead qualification", "Product recommendations", "Handoff to humans"]
    }
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
        {/* AI network background with animated connections */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0d1a3f]/20 via-[#020617] to-[#0d1a3f]/20" />
          
          {/* Neural network visualization */}
          <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="neuralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#5885fa" stopOpacity="0.6" />
                <stop offset="50%" stopColor="#5885fa" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#5885fa" stopOpacity="0.6" />
              </linearGradient>
            </defs>
            {/* Neural connections */}
            {Array.from({ length: 12 }).map((_, i) => {
              const startX = (i % 4) * 25 + 10;
              const startY = Math.floor(i / 4) * 33 + 15;
              const endX = ((i + 1) % 4) * 25 + 10;
              const endY = Math.floor((i + 1) / 4) * 33 + 15;
              return (
                <motion.line
                  key={i}
                  x1={`${startX}%`}
                  y1={`${startY}%`}
                  x2={`${endX}%`}
                  y2={`${endY}%`}
                  stroke="url(#neuralGradient)"
                  strokeWidth="1.5"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ 
                    pathLength: [0, 1],
                    opacity: [0, 0.7, 0]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "linear"
                  }}
                />
              );
            })}
          </svg>

          {/* AI nodes */}
          <div className="absolute inset-0">
            {Array.from({ length: 16 }).map((_, i) => {
              const x = (i % 4) * 25 + 10;
              const y = Math.floor(i / 4) * 25 + 12;
              return (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-[#5885fa]"
                  style={{ left: `${x}%`, top: `${y}%` }}
                  animate={{
                    scale: [1, 1.8, 1],
                    opacity: [0.4, 1, 0.4],
                    boxShadow: [
                      "0 0 10px rgba(88,133,250,0.4)",
                      "0 0 25px rgba(88,133,250,0.9)",
                      "0 0 10px rgba(88,133,250,0.4)"
                    ]
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    delay: i * 0.15
                  }}
                />
              );
            })}
          </div>

          {/* Neon glow effects */}
          <motion.div
            className="absolute -top-40 -left-40 size-[40rem] rounded-full bg-[#5885fa]/10 blur-3xl"
            variants={neonPulse}
            initial="initial"
            animate="animate"
          />
          <motion.div
            className="absolute -bottom-40 -right-32 size-[36rem] rounded-full bg-[#4f78e1]/10 blur-3xl"
            variants={neonPulse}
            initial="initial"
            animate="animate"
            transition={{ delay: 1 }}
          />
          
          {/* Grid overlay */}
          <div className="absolute inset-0 [mask-image:radial-gradient(circle_at_center,white,transparent_70%)] bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />
        </div>

        <div className="relative z-10 w-full max-w-5xl text-center">
          <motion.h1
            variants={fadeUp}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-100 leading-tight mb-6"
          >
            Marketing poháněný <br />
            <span className="bg-gradient-to-r from-[#5885fa] via-[#8aaafc] to-[#799dfb] bg-clip-text text-transparent">
              umělou inteligencí
            </span>
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-6 max-w-3xl mx-auto text-xl text-slate-400 leading-relaxed">
            Automatizujte kampaně, analyzujte výsledky a rozvíjejte značku s umělou inteligencí MESCON.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-10">
            <button
              onClick={() => setShowRegister(true)}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#5885fa] to-[#4f78e1] text-white font-semibold text-lg hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl hover:shadow-[0_0_50px_rgba(88,133,250,0.4)]"
            >
              Získat AI analýzu zdarma
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
              AI funkce <span className="text-[#5885fa]">nové generace</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-lg text-slate-400 max-w-2xl mx-auto">
              Čtyři pilíře moderního AI marketingu
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                variants={fadeUp}
                whileHover={{ 
                  y: -5,
                  boxShadow: "0 0 25px rgba(88,133,250,0.2)"
                }}
                transition={{ duration: 0.3 }}
                className="group relative overflow-hidden rounded-2xl p-6 border border-slate-800 bg-slate-900/50 backdrop-blur-md"
              >
                <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-[#5885fa]/10 to-[#5885fa]/10" style={{ mixBlendMode: "overlay" }} />
                <div className="relative z-10">
                  <feature.icon className="w-9 h-9 text-[#5885fa] mb-3" />
                  <h3 className="text-lg font-bold text-slate-100 mb-2">{feature.title}</h3>
                  <p className="text-slate-400 mb-4 text-sm leading-relaxed">{feature.description}</p>
                  <ul className="space-y-1.5">
                    {feature.features.map((item) => (
                      <li key={item} className="flex items-center text-xs text-slate-300">
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

      {/* 3. Info sekce s vizualizací */}
      <motion.section
        ref={parallaxRef}
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="relative py-20 border-t border-white/10 overflow-hidden px-6 sm:px-12 lg:px-20"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* TextColumn */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-6">
                Výhody <span className="text-[#5885fa]">AI marketingu</span>
              </h2>
              <p className="text-lg text-slate-400 mb-6 leading-relaxed">
                Moderní marketing vyžaduje rychlost, přesnost a škálovatelnost. AI vám přináší všechny tři a ještě mnohem více.
              </p>
              <ul className="space-y-4">
                {[
                  { title: "Automatizace na autopilotu", desc: "90% rutinních úkolů zvládne AI bez lidského zásahu" },
                  { title: "Predikce s 95% přesností", desc: "Dopředu víte, které kampaně budou fungovat" },
                  { title: "Personalizace v reálném čase", desc: "Každý zákazník dostane unikátní zkušenost" },
                  { title: "ROI tracking na úrovni pixels", desc: "Sledujte každou korunu investovanou do marketingu" }
                ].map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-[#5885fa]/20 flex items-center justify-center">
                      <Check className="w-4 h-4 text-[#5885fa]" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-100">{benefit.title}</div>
                      <div className="text-sm text-slate-400">{benefit.desc}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Visualization Column */}
            <motion.div
              style={{ y: parallaxY }}
              className="relative h-[500px]"
            >
              <div className="absolute inset-0 rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-md overflow-hidden">
                {/* AI Neural Network 3D Visualization */}
                <div className="absolute inset-0 bg-[radial-gradient(50%_50%_at_50%_50%,rgba(88,133,250,0.15),transparent_70%)]" />
                
                {/* Neural layers */}
                <div className="absolute inset-0 flex items-center justify-center p-12">
                  <div className="relative w-full h-full">
                    {/* Input layer */}
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 space-y-8">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <motion.div
                          key={`input-${i}`}
                          className="w-4 h-4 rounded-full bg-[#5885fa]"
                          animate={{
                            boxShadow: [
                              "0 0 8px rgba(88,133,250,0.5)",
                              "0 0 20px rgba(88,133,250,0.9)",
                              "0 0 8px rgba(88,133,250,0.5)"
                            ]
                          }}
                          transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                        />
                      ))}
                    </div>

                    {/* Hidden layer 1 */}
                    <div className="absolute left-1/3 top-1/2 -translate-y-1/2 space-y-6">
                      {Array.from({ length: 7 }).map((_, i) => (
                        <motion.div
                          key={`hidden1-${i}`}
                          className="w-3 h-3 rounded-full bg-[#5885fa]"
                          animate={{
                            boxShadow: [
                              "0 0 8px rgba(168,85,247,0.5)",
                              "0 0 20px rgba(168,85,247,0.9)",
                              "0 0 8px rgba(168,85,247,0.5)"
                            ]
                          }}
                          transition={{ duration: 2, repeat: Infinity, delay: 0.5 + i * 0.15 }}
                        />
                      ))}
                    </div>

                    {/* Hidden layer 2 */}
                    <div className="absolute left-2/3 top-1/2 -translate-y-1/2 space-y-6">
                      {Array.from({ length: 7 }).map((_, i) => (
                        <motion.div
                          key={`hidden2-${i}`}
                          className="w-3 h-3 rounded-full bg-[#5885fa]"
                          animate={{
                            boxShadow: [
                              "0 0 8px rgba(88,133,250,0.5)",
                              "0 0 20px rgba(88,133,250,0.9)",
                              "0 0 8px rgba(88,133,250,0.5)"
                            ]
                          }}
                          transition={{ duration: 2, repeat: Infinity, delay: 1 + i * 0.15 }}
                        />
                      ))}
                    </div>

                    {/* Output layer */}
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 space-y-10">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <motion.div
                          key={`output-${i}`}
                          className="w-5 h-5 rounded-full bg-[#5885fa]"
                          animate={{
                            boxShadow: [
                              "0 0 10px rgba(88,133,250,0.5)",
                              "0 0 25px rgba(88,133,250,0.9)",
                              "0 0 10px rgba(88,133,250,0.5)"
                            ]
                          }}
                          transition={{ duration: 2, repeat: Infinity, delay: 1.5 + i * 0.3 }}
                        />
                      ))}
                    </div>

                    {/* Connection lines (simplified) */}
                    <svg className="absolute inset-0 w-full h-full opacity-20">
                      <defs>
                        <linearGradient id="connectionGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#5885fa" />
                          <stop offset="50%" stopColor="#5885fa" />
                          <stop offset="100%" stopColor="#5885fa" />
                        </linearGradient>
                      </defs>
                      {Array.from({ length: 20 }).map((_, i) => (
                        <motion.line
                          key={i}
                          x1={`${10 + (i % 3) * 30}%`}
                          y1={`${20 + (i % 5) * 15}%`}
                          x2={`${40 + (i % 3) * 30}%`}
                          y2={`${25 + ((i + 1) % 5) * 15}%`}
                          stroke="url(#connectionGrad)"
                          strokeWidth="1"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: [0, 1, 0] }}
                          transition={{ duration: 3, repeat: Infinity, delay: i * 0.1 }}
                        />
                      ))}
                    </svg>
                  </div>
                </div>

                {/* Labels */}
                <div className="absolute bottom-4 left-4 right-4 grid grid-cols-3 gap-2 text-[10px]">
                  <div className="text-center p-2 rounded border border-slate-800 bg-slate-900/30 backdrop-blur-sm">
                    <div className="text-[#5885fa] font-semibold">Input</div>
                    <div className="text-slate-400">Data vstup</div>
                  </div>
                  <div className="text-center p-2 rounded border border-slate-800 bg-slate-900/30 backdrop-blur-sm">
                    <div className="text-[#8aaafc] font-semibold">Processing</div>
                    <div className="text-slate-400">AI analýza</div>
                  </div>
                  <div className="text-center p-2 rounded border border-slate-800 bg-slate-900/30 backdrop-blur-sm">
                    <div className="text-[#799dfb] font-semibold">Output</div>
                    <div className="text-slate-400">Akce</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
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
            className="relative rounded-3xl border border-slate-800 bg-slate-900/50 backdrop-blur-md p-12 shadow-[0_0_60px_rgba(88,133,250,0.2)] hover:shadow-[0_0_80px_rgba(88,133,250,0.3)] transition-shadow duration-500"
          >
            <div className="pointer-events-none absolute -inset-1 rounded-3xl opacity-50 bg-gradient-to-r from-[#5885fa]/40 via-[#5885fa]/40 to-[#5885fa]/40 blur-xl" />
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold text-slate-100 mb-4">
                Posuňte marketing na <span className="text-[#5885fa]">úplně novou úroveň</span>
              </h3>
              <p className="text-lg text-slate-300 mb-2">
                Začněte s inteligentní analýzou ještě dnes.
              </p>
              <p className="text-sm text-slate-400 mb-8">
                Aktivujte AI marketing během 24 hodin – bez implementačních poplatků
              </p>
              <button
                onClick={() => setShowRegister(true)}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#5885fa] to-[#4f78e1] text-white font-semibold text-lg hover:scale-105 transition-all duration-300 shadow-xl"
              >
                Vyzkoušet MESCON Marketing AI
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
        className="relative py-20 border-t border-slate-800 bg-[#020617]"
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          {[
            { value: 300, suffix: "%", label: "zvýšení konverzí", prefix: "+", icon: TrendingUp },
            { value: 95, suffix: "%", label: "automatizace procesů", icon: Settings },
            { value: 24, suffix: "/7", label: "AI analytika", icon: Brain }
          ].map((stat, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              className="relative group"
            >
              <div className="relative bg-slate-900/50 backdrop-blur-md rounded-2xl p-10 border border-slate-800 hover:border-[#5885fa]/50 transition-all duration-300">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#5885fa] via-[#5885fa] to-[#5885fa] rounded-2xl opacity-0 group-hover:opacity-20 blur transition duration-300"></div>
                <div className="relative">
                  <stat.icon className="w-10 h-10 text-[#5885fa] mb-4 mx-auto" />
                  <div className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-[#5885fa] to-[#8aaafc] bg-clip-text text-transparent mb-3">
                    {stat.prefix}
                    <CountUp end={stat.value} duration={2.5} suffix={stat.suffix} />
                  </div>
                  <div className="text-slate-400 text-sm uppercase tracking-wider">{stat.label}</div>
                </div>
              </div>
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
        className="relative py-16 text-center px-6 sm:px-12 lg:px-20 bg-[#020617] border-t border-slate-800"
      >
        <motion.div variants={fadeUp} className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-[#5885fa] animate-pulse" />
          <span className="text-slate-300">Umělá inteligence mění marketing – my měníme vaši budoucnost.</span>
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
