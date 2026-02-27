"use client";
import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import CountUp from 'react-countup';
import { ArrowRight, BarChart3, Check, CheckCircle, Database, Globe, Headphones, Lock, MapPin, RefreshCw, ShieldCheck, Zap } from 'lucide-react';
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

export default function WebhostingPage() {
  const [showRegister, setShowRegister] = useState(false);
  const parallaxRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: parallaxRef, offset: ["start end", "end start"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  const features = [
    {
      icon: Zap,
      title: "Rychlost SSD",
      description: "Moderní NVMe disky pro maximální rychlost",
      features: ["10x rychlejší než HDD", "Vysoká odolnost", "Nízká latence", "Optimalizované pro WordPress"]
    },
    {
      icon: ShieldCheck,
      title: "Zabezpečení",
      description: "Denní zálohy a antivirus",
      features: ["DDoS ochrana", "SSL certifikáty zdarma", "Malware scanner", "Firewall WAF"]
    },
    {
      icon: Headphones,
      title: "Podpora 24/7",
      description: "Reakce do 5 minut",
      features: ["Český support", "Email & chat", "Telefonická linka", "Vzdálená správa"]
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
        {/* Particle / Wave Background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0d1a3f]/20 via-[#020617] to-[#0d1a3f]/20" />
          <div className="absolute -top-32 -left-32 size-[36rem] rounded-full bg-[#5885fa]/10 blur-3xl animate-pulse" style={{ animationDuration: "10s" }} />
          <div className="absolute -bottom-32 -right-24 size-[32rem] rounded-full bg-[#4f78e1]/10 blur-3xl animate-pulse" style={{ animationDuration: "12s", animationDelay: "2s" }} />
          <div className="absolute inset-0 [mask-image:radial-gradient(circle_at_center,white,transparent_75%)] bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px] opacity-20" />
        </div>

        <div className="relative z-10 w-full max-w-5xl text-center">
          <motion.h1
            variants={fadeUp}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-100 leading-tight"
          >
            Stabilní a rychlý <br />
            <span className="bg-gradient-to-r from-[#5885fa] via-[#8aaafc] to-[#799dfb] bg-clip-text text-transparent">
              webhosting
            </span>
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-6 max-w-3xl mx-auto text-xl text-slate-400 leading-relaxed">
            Zajistěte svému webu maximální výkon a dostupnost 99,9 %.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-10">
            <button
              onClick={() => setShowRegister(true)}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#5885fa] to-[#4f78e1] text-white font-semibold text-lg hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl hover:shadow-[0_0_50px_rgba(88,133,250,0.4)]"
            >
              Objednat hosting
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
              Klíčové vlastnosti <span className="text-[#5885fa]">hostingu</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-lg text-slate-400 max-w-2xl mx-auto">
              Profesionální infrastruktura pro maximální výkon vašeho webu
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                variants={fadeUp}
                className="group relative overflow-hidden rounded-2xl p-6 border border-slate-800 bg-slate-900/50 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_25px_rgba(88,133,250,0.2)]"
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

      {/* 3. Info sekce s parallaxem */}
      <motion.section
        ref={parallaxRef}
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="relative py-20 border-t border-white/10 overflow-hidden px-6 sm:px-12 lg:px-20"
      >
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* Text + CTA */}
          <motion.div variants={slideFromLeft} className="space-y-6">
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-slate-400">
              <span className="inline-block w-2 h-2 rounded-full bg-[#5885fa]" />
              Spolehlivost a infrastruktura
            </span>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-100 tracking-tight">
              Hosting bez kompromisů
            </h3>
            <p className="text-slate-400 leading-relaxed">
              Moderní serverová infrastruktura v českých datových centrech. NVMe SSD úložiště, redundantní síťové připojení a automatické zálohy zajišťují maximální dostupnost vašeho webu.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-md p-4">
                <MapPin className="w-9 h-9 text-[#5885fa] mb-2" />
                <div className="text-sm font-semibold text-slate-100">České servery</div>
                <div className="text-xs text-slate-400">Praha a Brno DC</div>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-md p-4">
                <Zap className="w-9 h-9 text-[#5885fa] mb-2" />
                <div className="text-sm font-semibold text-slate-100">NVMe disky</div>
                <div className="text-xs text-slate-400">Ultra rychlé</div>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-md p-4">
                <Database className="w-9 h-9 text-[#5885fa] mb-2" />
                <div className="text-sm font-semibold text-slate-100">Zálohy</div>
                <div className="text-xs text-slate-400">Denně 30 dní</div>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-md p-4">
                <Lock className="w-9 h-9 text-[#5885fa] mb-2" />
                <div className="text-sm font-semibold text-slate-100">SSL zdarma</div>
                <div className="text-xs text-slate-400">Let's Encrypt</div>
              </div>
            </div>
            <div className="pt-4">
              <button
                onClick={() => setShowRegister(true)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#5885fa] to-[#4f78e1] text-white font-semibold hover:scale-105 transition-all duration-300"
              >
                Zjistit více
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

          {/* Parallax Visual - Server/Infrastructure */}
          <motion.div
            style={{ y: parallaxY }}
            className="relative h-[400px] sm:h-[500px] rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/50 backdrop-blur-md"
          >
            <div className="absolute inset-0 bg-[radial-gradient(50%_50%_at_40%_40%,rgba(88,133,250,0.1),transparent_70%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px] opacity-20" />
            
            {/* Server rack visualization */}
            <div className="absolute inset-0 p-6 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="text-xs text-slate-400 font-medium">Server Status</div>
                <div className="px-2 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Online
                </div>
              </div>
              
              <div className="flex-1 rounded-xl border border-slate-800 bg-slate-900/30 backdrop-blur-sm p-4">
                <div className="space-y-3">
                  {[
                    { label: "CPU Usage", value: 23, color: "from-[#5885fa] to-cyan-500", status: "Normal" },
                    { label: "RAM Usage", value: 45, color: "from-[#5885fa] to-[#5885fa]", status: "Normal" },
                    { label: "Disk I/O", value: 18, color: "from-emerald-500 to-teal-500", status: "Low" },
                    { label: "Network", value: 67, color: "from-orange-500 to-red-500", status: "High" }
                  ].map((stat) => (
                    <div key={stat.label} className="space-y-1">
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="text-slate-400">{stat.label}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-slate-200 font-semibold">{stat.value}%</span>
                          <span className="text-slate-500">({stat.status})</span>
                        </div>
                      </div>
                      <div className="h-2 rounded-full bg-slate-800">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${stat.value}%` }}
                          transition={{ duration: 1.5, delay: 0.3 }}
                          className={`h-full rounded-full bg-gradient-to-r ${stat.color}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {[
                  { icon: CheckCircle, label: "Active" },
                  { icon: BarChart3, label: "Monitor" },
                  { icon: RefreshCw, label: "Backup" },
                  { icon: ShieldCheck, label: "Secure" }
                ].map((item) => (
                  <div key={item.label} className="flex flex-col items-center gap-1 text-center py-2 rounded-lg border border-slate-800 bg-slate-900/30 backdrop-blur-sm">
                    <item.icon className="w-3.5 h-3.5 text-[#5885fa]" />
                    <div className="text-[10px] text-slate-400 font-medium">{item.label}</div>
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
            className="relative rounded-3xl border border-slate-800 bg-slate-900/50 backdrop-blur-md p-12 shadow-[0_0_60px_rgba(88,133,250,0.2)] hover:shadow-[0_0_80px_rgba(88,133,250,0.3)] transition-shadow duration-500"
          >
            <div className="pointer-events-none absolute -inset-1 rounded-3xl opacity-50 bg-gradient-to-r from-[#5885fa]/40 via-[#5885fa]/40 to-[#5885fa]/40 blur-xl" />
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold text-slate-100 mb-4">
                Potřebujete hosting, který nezklame?
              </h3>
              <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
                Vyberte si balíček na míru svým potřebám.
              </p>
              <button
                onClick={() => setShowRegister(true)}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#5885fa] to-[#4f78e1] text-white font-semibold text-lg hover:scale-105 transition-all duration-300 shadow-xl"
              >
                Získat MESCON hosting
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
            { value: 99.9, suffix: "%", label: "garantovaný uptime", icon: Zap },
            { value: 2000, suffix: "+", label: "hostovaných webů", icon: Globe },
            { value: 24, suffix: "/7", label: "technická podpora", icon: Headphones }
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
                    <CountUp end={stat.value} duration={2.5} decimals={stat.value === 99.9 ? 1 : 0} suffix={stat.suffix} />
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
          <span className="w-2 h-2 rounded-full bg-[#5885fa]" />
          <span className="text-slate-300">MESCON – hosting bez kompromisů.</span>
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
