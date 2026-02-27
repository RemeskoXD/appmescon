"use client";
import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import CountUp from 'react-countup';
import { ArrowRight, Globe, Headphones, ShieldCheck, Zap } from 'lucide-react';
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

export default function GlobalniSitPage() {
  const [showRegister, setShowRegister] = useState(false);
  const parallaxRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: parallaxRef, offset: ["start end", "end start"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  const features = [
    {
      icon: Globe,
      title: "Globální dosah",
      description: "Partneři ve více než 50 zemích",
      features: ["Europa, Asie, Amerika", "Lokální týmy", "Časové zóny 24/7", "Multikulturní podpora"]
    },
    {
      icon: Headphones,
      title: "Lokální podpora",
      description: "Týmy dostupné ve vašem jazyce",
      features: ["15+ jazyků", "Místní experti", "Kulturní znalost", "Osobní přístup"]
    },
    {
      icon: ShieldCheck,
      title: "Bezpečná infrastruktura",
      description: "Propojení dat přes zabezpečené kanály",
      features: ["End-to-end šifrování", "Compliance GDPR", "ISO certifikace", "Redundantní systémy"]
    },
    {
      icon: Zap,
      title: "Rychlá expanze",
      description: "Snadné rozšiřování do nových regionů",
      features: ["Plug & play systémy", "Cloudová infrastruktura", "Automatická škálování", "Zero-downtime deploy"]
    }
  ];

  const statsData = [
    { value: 50, suffix: "+", label: "zemí" },
    { value: 200, suffix: "+", label: "partnerů" },
    { value: 500, suffix: "+", label: "úspěšných projektů" }
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
        {/* Interactive 3D globe background with data connections */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 opacity-90" />
          
          {/* Animated light connections mimicking data flow between continents */}
          <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#5885fa" stopOpacity="0.5" />
                <stop offset="50%" stopColor="#5885fa" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#5885fa" stopOpacity="0.5" />
              </linearGradient>
            </defs>
            {/* Connection lines */}
            {[
              { x1: "20%", y1: "30%", x2: "45%", y2: "25%", delay: "0s" },
              { x1: "45%", y1: "25%", x2: "70%", y2: "35%", delay: "0.5s" },
              { x1: "20%", y1: "30%", x2: "35%", y2: "60%", delay: "1s" },
              { x1: "70%", y1: "35%", x2: "80%", y2: "50%", delay: "1.5s" },
              { x1: "45%", y1: "25%", x2: "60%", y2: "55%", delay: "2s" }
            ].map((line, index) => (
              <motion.line
                key={index}
                x1={line.x1}
                y1={line.y1}
                x2={line.x2}
                y2={line.y2}
                stroke="url(#lineGradient)"
                strokeWidth="2"
                strokeDasharray="10,5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ 
                  pathLength: [0, 1, 0],
                  opacity: [0, 0.8, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: parseFloat(line.delay),
                  ease: "linear"
                }}
              />
            ))}
          </svg>

          {/* Globe dots representing network nodes */}
          <div className="absolute inset-0">
            {[
              { x: "20%", y: "30%" }, { x: "45%", y: "25%" }, { x: "70%", y: "35%" },
              { x: "35%", y: "60%" }, { x: "80%", y: "50%" }, { x: "60%", y: "55%" },
              { x: "15%", y: "45%" }, { x: "90%", y: "40%" }
            ].map((pos, index) => (
              <motion.div
                key={index}
                className="absolute w-3 h-3 rounded-full bg-[#5885fa] shadow-[0_0_20px_rgba(88,133,250,0.8)]"
                style={{ left: pos.x, top: pos.y }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.3
                }}
              />
            ))}
          </div>

          <div className="absolute -top-32 -left-32 size-[36rem] rounded-full bg-[#5885fa]/20 blur-3xl animate-pulse" style={{ animationDuration: "10s" }} />
          <div className="absolute -bottom-32 -right-24 size-[32rem] rounded-full bg-[#5885fa]/20 blur-3xl animate-pulse" style={{ animationDuration: "12s", animationDelay: "2s" }} />
          <div className="absolute inset-0 [mask-image:radial-gradient(circle_at_center,white,transparent_75%)] bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:32px_32px] opacity-30" />
        </div>

        <div className="relative z-10 w-full max-w-5xl text-center">
          <motion.h1
            variants={fadeUp}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-100 leading-tight"
          >
            MESCON – <br />
            <span className="bg-gradient-to-r from-[#5885fa] via-[#5885fa] to-[#5885fa] bg-clip-text text-transparent">
              Globální síť partnerů
            </span>
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-6 max-w-3xl mx-auto text-xl text-slate-300 leading-relaxed">
            Propojujeme firmy, data a technologie napříč 50+ zeměmi světa.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-10">
            <button
              onClick={() => setShowRegister(true)}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#5885fa] text-white font-semibold text-lg hover:bg-[#6991fa] hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl hover:shadow-[0_0_50px_rgba(88,133,250,0.4)]"
            >
              Připojit se k síti
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
              Proč se <span className="text-[#5885fa]">připojit k síti</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-lg text-slate-400 max-w-2xl mx-auto">
              Globální dosah s lokální experti zí a bezpečnou infrastrukturou
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
                  <div className="mb-3">
                    <feature.icon className="w-7 h-7 text-[#acc2fc]" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-100 mb-2">{feature.title}</h3>
                  <p className="text-slate-300 mb-4 text-sm leading-relaxed">{feature.description}</p>
                  <ul className="space-y-1.5">
                    {feature.features.map((item) => (
                      <li key={item} className="flex items-center text-xs text-slate-300">
                        <svg className="w-3.5 h-3.5 text-emerald-400 mr-1.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

      {/* 3. Mapa / Vizualizace sekce */}
      <motion.section
        ref={parallaxRef}
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="relative py-20 border-t border-slate-800 overflow-hidden px-6 sm:px-12 lg:px-20"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-slate-100 mb-4">
              Naše síť <span className="text-[#5885fa]">roste každým dnem</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-lg text-slate-400 max-w-2xl mx-auto">
              Sledujte naši expanzi po celém světě
            </motion.p>
          </div>

          {/* Stylized map visualization with grid and dots */}
          <motion.div
            style={{ y: parallaxY }}
            className="relative h-[500px] rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/50 backdrop-blur-md"
          >
            <div className="absolute inset-0 bg-[radial-gradient(50%_50%_at_50%_50%,rgba(88,133,250,0.35),transparent_70%)]" />
            
            {/* Grid pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:40px_40px] opacity-40" />
            
            {/* Moving gradient overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-[#5885fa]/10 via-[#5885fa]/10 to-[#5885fa]/10"
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"]
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{ backgroundSize: "200% 200%" }}
            />

            {/* Network nodes visualization */}
            <div className="absolute inset-0 p-12">
              <div className="relative w-full h-full">
                {/* Continents represented as clusters of dots */}
                {[
                  { region: "Europa", x: "35%", y: "25%", nodes: 15 },
                  { region: "Asia", x: "70%", y: "35%", nodes: 18 },
                  { region: "Amerika", x: "15%", y: "40%", nodes: 12 },
                  { region: "Afrika", x: "42%", y: "55%", nodes: 8 },
                  { region: "Oceánie", x: "80%", y: "70%", nodes: 6 }
                ].map((cluster, clusterIndex) => (
                  <div key={clusterIndex} className="absolute" style={{ left: cluster.x, top: cluster.y }}>
                    {/* Region label */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: clusterIndex * 0.2 }}
                      className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-semibold text-[#5885fa]"
                    >
                      {cluster.region}
                    </motion.div>
                    
                    {/* Node dots */}
                    <div className="relative w-16 h-16">
                      {Array.from({ length: cluster.nodes }).map((_, nodeIndex) => {
                        const angle = (nodeIndex / cluster.nodes) * 2 * Math.PI;
                        const radius = 20 + Math.random() * 15;
                        const x = Math.cos(angle) * radius;
                        const y = Math.sin(angle) * radius;
                        
                        return (
                          <motion.div
                            key={nodeIndex}
                            className="absolute w-1.5 h-1.5 rounded-full bg-[#5885fa]"
                            style={{
                              left: `calc(50% + ${x}px)`,
                              top: `calc(50% + ${y}px)`
                            }}
                            initial={{ scale: 0, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{
                              delay: clusterIndex * 0.2 + nodeIndex * 0.05,
                              duration: 0.3
                            }}
                            animate={{
                              boxShadow: [
                                "0 0 5px rgba(88,133,250,0.5)",
                                "0 0 15px rgba(88,133,250,0.8)",
                                "0 0 5px rgba(88,133,250,0.5)"
                              ],
                              transition: {
                                duration: 2,
                                repeat: Infinity,
                                delay: nodeIndex * 0.1
                              }
                            }}
                          />
                        );
                      })}
                      {/* Central hub */}
                      <motion.div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-yellow-400"
                        animate={{
                          scale: [1, 1.5, 1],
                          boxShadow: [
                            "0 0 10px rgba(250,204,21,0.5)",
                            "0 0 25px rgba(250,204,21,0.9)",
                            "0 0 10px rgba(250,204,21,0.5)"
                          ]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats overlay */}
            <div className="absolute bottom-6 left-6 right-6 grid grid-cols-3 gap-3">
              {[
                { label: "Aktivní uzly", value: "59" },
                { label: "Spojení/sec", value: "1.2K" },
                { label: "Uptime", value: "99.9%" }
              ].map((stat, index) => (
                <div key={index} className="rounded-lg border border-slate-800 bg-slate-900/50 backdrop-blur-sm p-3 text-center">
                  <div className="text-[#5885fa] font-bold text-sm">{stat.value}</div>
                  <div className="text-[10px] text-slate-400">{stat.label}</div>
                </div>
              ))}
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
                Staňte se součástí globální sítě MESCON Digital.
              </h3>
              <p className="text-lg text-slate-300 mb-2">
                Rozšiřte své podnikání na mezinárodní úroveň.
              </p>
              <p className="text-sm text-slate-400 mb-8">
                Přístup k partnerům, expertům a technologiím po celém světě
              </p>
              <button
                onClick={() => setShowRegister(true)}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#5885fa] text-white font-semibold text-lg hover:bg-[#6991fa] hover:scale-105 transition-all duration-300 shadow-xl"
              >
                Získat partnerství
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
              className="relative rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-md p-10 shadow-[0_0_30px_rgba(88,133,250,0.2)]"
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
          <span className="text-slate-300">Propojování technologií a lidí bez hranic.</span>
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
