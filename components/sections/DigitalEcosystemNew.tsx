"use client";
import SectionContainer from '../ui/SectionContainer';
import { motion } from 'framer-motion';
import { useCallback } from 'react';
import ParticleBackground from '../ParticleBackground';
import { Activity, BarChart3, ShieldCheck, Layers } from 'lucide-react';

interface Pillar {
  key: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  hue: string; // Tailwind hue class for dynamic glow
}

const PILLARS: Pillar[] = [
  {
    key: 'analytics',
    title: 'Měřitelnost',
    subtitle: 'Přehled o výkonu, nákladech a přínosu.',
    icon: <BarChart3 className="w-7 h-7" />,
    hue: 'from-accent-500 to-accent-500'
  },
  {
    key: 'performance',
    title: 'Stabilní výkon',
    subtitle: 'Rychlé weby a aplikace i v zátěži.',
    icon: <Activity className="w-7 h-7" />,
    hue: 'from-accent-500 to-accent-500'
  },
  {
    key: 'security',
    title: 'Bezpečný provoz',
    subtitle: 'Monitoring, zálohy a prevence incidentů.',
    icon: <ShieldCheck className="w-7 h-7" />,
    hue: 'from-accent-500 to-accent-500'
  },
  {
    key: 'scalability',
    title: 'Škálování bez přestaveb',
    subtitle: 'Infrastruktura roste s byznysem.',
    icon: <Layers className="w-7 h-7" />,
    hue: 'from-accent-500 to-accent-500'
  }
];

// 3D tilt glass card component
function PillarCard({ pillar }: { pillar: Pillar }) {
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y / rect.height) - 0.5) * -10; // invert Y for natural tilt
    const rotateY = ((x / rect.width) - 0.5) * 10;
    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  }, []);

  const handleMouseLeave = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)';
  }, []);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: [0.25,0.46,0.24,1] }}
      className="group relative rounded-2xl p-6 overflow-hidden border border-slate-700/50 bg-slate-800/40 backdrop-blur-xl will-change-transform shadow-[0_8px_24px_-8px_rgba(0,0,0,0.6)] hover:shadow-[0_12px_32px_-8px_rgba(0,0,0,0.65)] transition-shadow duration-400"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Neon border glow on hover */}
      <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r ${pillar.hue} blur-xl`} style={{ zIndex: -1 }} />
      
      {/* Glow gradient */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${pillar.hue} mix-blend-soft-light`} />
      {/* Glass highlight overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0)_60%)] pointer-events-none" />
      {/* Subtle grid / noise */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.18),transparent_60%)] opacity-30 group-hover:opacity-50 transition-opacity" />

      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="mb-5 w-16 h-16 rounded-xl flex items-center justify-center bg-gradient-to-br from-slate-900/80 to-slate-800/60 border border-slate-600/40 group-hover:border-slate-500/40 shadow-inner">
          <div className="text-white transition-colors duration-300">
            {pillar.icon}
          </div>
        </div>
        <h3 className="text-lg font-semibold text-white mb-2 tracking-tight">{pillar.title}</h3>
        <p className="text-sm text-slate-300/80 group-hover:text-slate-200 transition-colors duration-300">{pillar.subtitle}</p>
      </div>

      {/* Border accent on hover */}
      <div className={`pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r ${pillar.hue}`} style={{ mixBlendMode: 'overlay' }} />
    </motion.div>
  );
}

export default function DigitalEcosystem() {
  return (
    <SectionContainer id="digital-ecosystem" className="py-20 lg:py-28 relative overflow-hidden">
      {/* Animated particle network */}
      <ParticleBackground />
      
      {/* Decorative gradient orbs */}
      <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(circle_at_center,white,transparent_70%)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(88,133,250,0.25),transparent_60%)] animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(88,133,250,0.22),transparent_65%)] animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }} />
      </div>
      <div className="relative z-10 text-center mb-16">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight">
          Propojený <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-500 via-accent-500 to-accent-500 animate-gradient">digitální ekosystém</span> pro stabilní provoz
        </h2>
        <p className="text-lg lg:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
          Jeden provozní celek místo desítek dodavatelů. Hosting, vývoj, data i bezpečnost běží na stejných standardech — méně chaosu, více stability a jasná škálovatelnost.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {PILLARS.map(p => <PillarCard key={p.key} pillar={p} />)}
      </div>
    </SectionContainer>
  );
}
