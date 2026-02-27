"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Bot, Cloud, MessageSquare } from "lucide-react";
import RegisterPanel from "../../components/RegisterPanel";

// Použijeme konkrétní loga z "partner_badget" 10–15
const partners = [10, 11, 12, 13, 14, 15];

// Floating particles component
function FloatingParticles() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) return null;
  
  const particles = Array.from({ length: 20 });
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-[#799dfb]/30 rounded-full"
          initial={{
            x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : 0,
            y: typeof window !== 'undefined' ? Math.random() * window.innerHeight : 0,
          }}
          animate={{
            y: [null, Math.random() * -100 - 50],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

// Animated grid background
function AnimatedGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0" style={{
        backgroundImage: `
          linear-gradient(rgba(59, 130, 246, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(59, 130, 246, 0.03) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
      }} />
    </div>
  );
}

// Ceníky a builder jsou na službových podstránkách; tato stránka je informační vstup s CTA na registraci.

export default function PartneriPage() {
  const [openRegister, setOpenRegister] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <main className="relative bg-[#0a0e1a]">
      {/* Hero sekce - Redesigned */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Animated background layers */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e1a] via-[#0f1422] to-[#0a0e1a]" />
        
        {/* Animated grid */}
        <AnimatedGrid />
        
        {/* Floating particles */}
        <FloatingParticles />
        
        {/* Gradient orbs with mouse tracking */}
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, transparent 70%)',
            x: mousePosition.x - 250,
            y: mousePosition.y - 250,
          }}
          transition={{ type: "spring", damping: 30, stiffness: 100 }}
        />
        
        {/* Static gradient orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#5885fa]/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#5885fa]/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        
        {/* Content */}
        <div className="page-container relative z-10 py-20 md:py-24">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            {/* Levý textový blok */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#5885fa]/10 border border-[#5885fa]/20 mb-6"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#799dfb] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#5885fa]"></span>
                </span>
                <span className="text-xs tracking-wider text-[#acc2fc] font-semibold uppercase">Partnerský program</span>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
              >
                <span className="text-white">Staňte se</span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#799dfb] via-cyan-400 to-[#799dfb]">
                  partnerem Mescon
                </span>
              </motion.h1>
              
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-xl md:text-2xl text-slate-300 font-medium mb-6"
              >
                Společná transformace zákaznické zkušenosti
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-lg text-slate-400 leading-relaxed max-w-xl mb-8"
              >
                Věříme v sílu spolupráce. Naše programy jsou navrženy tak, aby odemykaly nové růstové příležitosti.
                Rozšiřte své služby a zvyšte svou konkurenční výhodu.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="flex flex-wrap gap-4"
              >
                <button
                  onClick={() => setOpenRegister(true)}
                  className="group relative overflow-hidden px-8 py-4 rounded-xl bg-gradient-to-r from-[#4f78e1] to-[#4f78e1] text-white font-semibold text-lg shadow-2xl shadow-[#5885fa]/50 transition-all duration-300 hover:shadow-[#5885fa]/80 hover:scale-105 active:scale-95"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Chci se stát partnerem
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-[#799dfb] to-[#799dfb] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Animated shimmer */}
                  <motion.span 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100"
                    initial={false}
                  >
                    <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  </motion.span>
                </button>
                
                <button className="px-8 py-4 rounded-xl bg-slate-800/50 backdrop-blur-sm border border-slate-700 text-white font-semibold text-lg hover:bg-slate-800/80 hover:border-slate-600 transition-all duration-300 hover:scale-105 active:scale-95">
                  Prozkoumat programy
                </button>
              </motion.div>
              
              {/* Stats indicators */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="mt-12 flex flex-wrap gap-8"
              >
                {[
                  { value: '160+', label: 'Aktivních partnerů' },
                  { value: '15', label: 'Zemí' },
                  { value: '30%', label: 'Roční růst' },
                ].map((stat, i) => (
                  <div key={i} className="relative group">
                    <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#799dfb] to-cyan-400">
                      {stat.value}
                    </div>
                    <div className="text-sm text-slate-500 uppercase tracking-wider">
                      {stat.label}
                    </div>
                    <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#799dfb] to-cyan-400 group-hover:w-full transition-all duration-300" />
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Pravý vizuální blok - 3D Globe with connections */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="relative mx-auto"
              style={{ y }}
            >
              <div className="relative w-full max-w-[600px] aspect-square">
                {/* Outer glow ring */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
                  }}
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                
                {/* Rotating rings */}
                <motion.div
                  className="absolute inset-0"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <div className="absolute inset-[10%] rounded-full border border-[#5885fa]/20" />
                </motion.div>
                
                <motion.div
                  className="absolute inset-0"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                >
                  <div className="absolute inset-[20%] rounded-full border border-[#5885fa]/20" />
                </motion.div>
                
                {/* Main globe */}
                <div className="relative z-10 flex items-center justify-center h-full">
                  <motion.img
                    src="/images/globe.svg"
                    alt="Síť partnerů po celém světě"
                    className="w-[70%] h-auto"
                    style={{
                      filter: 'drop-shadow(0 0 60px rgba(59, 130, 246, 0.4))',
                    }}
                  />
                  
                  {/* Connection points with pulse */}
                  {[
                    { left: '22%', top: '38%', color: '#10b981', delay: 0 },
                    { left: '58%', top: '28%', color: '#8aaafc', delay: 0.5 },
                    { left: '68%', top: '44%', color: '#8aaafc', delay: 1 },
                    { left: '34%', top: '56%', color: '#799dfb', delay: 1.5 },
                    { left: '45%', top: '20%', color: '#5885fa', delay: 2 },
                    { left: '80%', top: '60%', color: '#6991fa', delay: 2.5 },
                  ].map((point, i) => (
                    <motion.div
                      key={i}
                      className="absolute"
                      style={{ left: point.left, top: point.top }}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1 + point.delay * 0.2, duration: 0.5 }}
                    >
                      <motion.span
                        className="block h-3 w-3 rounded-full"
                        animate={{
                          boxShadow: [
                            `0 0 0 0 ${point.color}99`,
                            `0 0 0 10px ${point.color}00`,
                          ],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: point.delay,
                        }}
                        style={{
                          backgroundColor: point.color
                        }}
                      />
                    </motion.div>
                  ))}
                </div>
                
                {/* Floating data cards */}
                {[
                  { text: 'Cloud CCaaS', icon: Cloud, position: { top: '10%', left: '-10%' }, delay: 0.5 },
                  { text: 'AI Automation', icon: Bot, position: { top: '70%', right: '-15%' }, delay: 1 },
                  { text: 'Omnichannel', icon: MessageSquare, position: { bottom: '15%', left: '-5%' }, delay: 1.5 },
                ].map((card, i) => (
                  <motion.div
                    key={i}
                    className="absolute px-4 py-2 rounded-lg bg-slate-900/80 backdrop-blur-md border border-slate-700/50 text-white text-sm font-medium shadow-xl hidden md:block"
                    style={card.position}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: 1, 
                      y: [0, -10, 0],
                    }}
                    transition={{
                      opacity: { delay: card.delay, duration: 0.5 },
                      y: { delay: card.delay + 0.5, duration: 3, repeat: Infinity, ease: "easeInOut" }
                    }}
                  >
                    <card.icon className="w-4 h-4 text-[#5885fa] mr-2" />
                    {card.text}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0e1a] to-transparent pointer-events-none" />
      </section>

      {/* Metriky */}
      <section className="page-container px-6 md:px-10 pb-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {[
            { v: '5', l: 'let zkušeností' },
            { v: '160+', l: 'zákazníků' },
            { v: '15', l: 'zemí' },
            { v: '200', l: 'profesionálů' },
            { v: '30%', l: 'meziroční růst' },
          ].map((m) => (
            <div key={m.l} className="rounded-xl border border-[#23283a] bg-[#0f1422]/50 p-4 text-center">
              <div className="text-2xl md:text-3xl font-semibold text-white">{m.v}</div>
              <div className="text-[12px] uppercase tracking-wider text-slate-400">{m.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Marquee – loga partnerů (v kontejneru s gradientovým fade) */}
      <section className="relative py-8">
        <div className="page-container px-6 md:px-10">
          <div className="relative overflow-hidden rounded-xl border border-[#23283a] bg-[#10131d]/60 backdrop-blur-sm partner-rail">
            <span className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-24 bg-gradient-to-r from-[#0c0e16] via-[#0c0e16]/50 to-transparent" />
            <span className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-24 bg-gradient-to-l from-[#0c0e16] via-[#0c0e16]/50 to-transparent" />
            <div className="flex gap-10 animate-partner-marquee will-change-transform py-5 pl-6">
              {/* sekvence 1 */}
              {partners.map((n) => (
                <img key={`s1-${n}`} src={`/images/partner_badget/${n}.svg`} alt={`Logo partnera ${n}`} className="h-14 sm:h-16 md:h-20 w-auto opacity-95" />
              ))}
              {/* sekvence 2 */}
              {partners.map((n) => (
                <img key={`s2-${n}`} src={`/images/partner_badget/${n}.svg`} alt="" aria-hidden="true" className="h-14 sm:h-16 md:h-20 w-auto opacity-95" />
              ))}
              {/* sekvence 3 */}
              {partners.map((n) => (
                <img key={`s3-${n}`} src={`/images/partner_badget/${n}.svg`} alt="" aria-hidden="true" className="h-14 sm:h-16 md:h-20 w-auto opacity-95" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Programy partnerství */}
      <section className="page-container px-6 md:px-10 py-12">
        <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-white text-center mb-2">Vyberte si partnerský program, na míru</h3>
        <p className="text-center text-slate-300 max-w-3xl mx-auto">Objevte flexibilní programy. Vyberte si roli, která nejlépe odpovídá vašemu modelu – od doporučení až po plnou distribuci produktů.</p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {["Affiliate","Reseller","Distributor"].map((kind) => (
            <div key={kind} className="relative rounded-2xl border border-[#23283a] bg-gradient-to-br from-[#0f1422]/80 to-[#0b0f1a]/80 p-6">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-accent-500/15 border border-accent-500/30">
                  <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-accent-300">
                    <path d="M12 2a10 10 0 1 0 .001 20.001A10 10 0 0 0 12 2Zm1 14h-2v-4H7v-2h4V6h2v4h4v2h-4v4Z" />
                  </svg>
                </span>
                <h4 className="text-white text-xl font-semibold">{kind}</h4>
              </div>
              <div className="mt-4 grid gap-3 text-sm text-slate-300">
                <div>
                  <div className="text-slate-400 text-[12px] uppercase tracking-wider">Co děláte</div>
                  <p className="mt-1">{kind === 'Affiliate' ? 'Doporučujete naše produkty potenciálním zákazníkům.' : kind === 'Reseller' ? 'Aktivně prodáváte a podporujete řešení svým zákazníkům.' : 'Distribuujete řešení prostřednictvím sítě prodejců/kanálů.'}</p>
                </div>
                <div>
                  <div className="text-slate-400 text-[12px] uppercase tracking-wider">Vaše role</div>
                  <p className="mt-1">{kind === 'Affiliate' ? 'Bez povinností přímého prodeje či podpory.' : kind === 'Reseller' ? 'Správa licencí a podpora první linie.' : 'Zajištění pokrytí trhu, technická podpora a vztahy.'}</p>
                </div>
                <div>
                  <div className="text-slate-400 text-[12px] uppercase tracking-wider">Benefity</div>
                  <p className="mt-1">{kind === 'Affiliate' ? 'Provize z doporučených obchodů.' : kind === 'Reseller' ? 'Marže dle partnerské úrovně.' : 'Velkoobchodní ceny a rozšířená podpora.'}</p>
                </div>
              </div>
              <div className="mt-5">
                <button onClick={() => setOpenRegister(true)} className="rounded-lg bg-white text-navy-900 px-4 py-2 text-sm font-semibold hover:bg-slate-100">Staňte se {kind.toLowerCase()}</button>
              </div>
              <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-[#5885fa]/5 via-transparent to-[#5885fa]/5" />
            </div>
          ))}
        </div>
      </section>

      {/* Produkt – přehled schopností */}
      <section className="page-container px-6 md:px-10 pb-12">
        <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-white text-center">Náš produkt pomáhá utvářet zákaznickou zkušenost</h3>
        <p className="text-center text-slate-300 mt-2">All‑in‑one řešení pro veškerou komunikaci se zákazníky</p>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {[
            ['Cloudová telefonie','Pro hovory v kanceláři i na cestách'],
            ['Jakékoli zařízení','Web, mobilní i desktopová aplikace'],
            ['Snadná integrace','REST API a SDKs'],
            ['Omnichannel','Hovory, chat, SMS, sociální sítě'],
            ['Vlastní AI','Automatizace botů jako součást řešení'],
            ['Analytika','Přehledy, reporting a KPI'],
          ].map(([title,desc]) => (
            <div key={title} className="rounded-xl border border-[#23283a] bg-[#0f1422]/50 p-5">
              <div className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#5885fa]/15 border border-[#799dfb]/30">
                  <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-[#acc2fc]"><path d="M4 6h16v2H4V6Zm0 5h16v2H4v-2Zm0 5h16v2H4v-2Z"/></svg>
                </span>
                <div>
                  <h4 className="text-white font-semibold">{title}</h4>
                  <p className="mt-1 text-slate-300 text-sm">{desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Výhody být partnerem */}
      <section className="page-container px-6 md:px-10 pb-12">
        <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-white text-center">Jaké jsou výhody být naším partnerem?</h3>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
          {[
            'Rozšiřte své podnikání o nové zdroje příjmů',
            'Rozšiřte své portfolio a konkurenční výhodu',
            'Oslovte nové trhy a zákaznické segmenty',
            'Posilte vztahy se zákazníky',
            'Partnerství s plnou podporou a jistotou',
            'Získejte výhodu díky inteligentní automatizaci',
          ].map((t,i)=>(
            <div key={t} className="rounded-xl border border-[#23283a] bg-[#0f1422]/50 p-5">
              <div className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/15 border border-emerald-400/30">
                  <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4 fill-emerald-300"><path d="M16.7 5.3a1 1 0 0 1 0 1.4l-7 7a1 1 0 0 1-1.4 0l-3-3a1 1 0 1 1 1.4-1.4l2.3 2.29 6.3-6.29a1 1 0 0 1 1.4 0Z"/></svg>
                </span>
                <div>
                  <h4 className="text-white font-semibold">{t}</h4>
                  <p className="mt-1 text-slate-300 text-sm">{i===0?'Vytvořte si příjmové kanály dle zapojení – od doporučení po distribuci.': i===1?'Posilte nabídku pomocí výkonného CCaaS řešení.': i===2?'Pronikejte do nových odvětví s omnichannel nástroji a AI.': i===3?'Nabídněte moderní řešení pro větší spokojenost a loajalitu.': i===4?'Získáte partner manažera, školení, materiály i obchodní podporu.':'Zvyšte efektivitu a snižte náklady díky automatizaci a AI.'}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Kdo je koncový zákazník? - pokračování původního obsahu... */}
      <section className="page-container px-6 md:px-10 pb-12">
        <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-white text-center">Kdo je koncový zákazník?</h3>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Zbývající sekce */}
        </div>
      </section>

      {/* Register Panel */}
      {openRegister && <RegisterPanel onClose={() => setOpenRegister(false)} />}
    </main>
  );
}
