'use client';

import { useEffect, useRef, useState } from 'react';
import CountUp from 'react-countup';
import SectionContainer from '../ui/SectionContainer';
import { motion } from 'framer-motion';

export default function StatsSection() {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !inView) {
          setInView(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [inView]);

  const stats = [
    { value: 500, suffix: '+', label: 'Aktivních klientů', color: 'from-accent-500 to-accent-500', glow: 'rgba(88,133,250, 0.4)' },
    { value: 99.9, suffix: '%', label: 'Dostupnost služeb', color: 'from-accent-500 to-accent-500', glow: 'rgba(88,133,250, 0.4)', decimals: 1 },
    { value: 24, suffix: '/7', label: 'Technická podpora', color: 'from-accent-500 to-accent-500', glow: 'rgba(88,133,250, 0.4)' },
    { value: 5, suffix: '', label: 'Průměrné hodnocení z referencí', color: 'from-accent-500 to-accent-500', glow: 'rgba(88,133,250, 0.4)' }
  ];

  return (
    <SectionContainer background="dark" className="py-16 lg:py-24 relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-500/30 via-slate-950 to-accent-500/30 animate-gradient" style={{ backgroundSize: '200% 200%' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-accent-500/10 to-accent-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
      
      <div ref={sectionRef} className="relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-white mb-4"
          >
            Důvěra v číslech, která drží dlouhodobý provoz
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-300 max-w-2xl mx-auto"
          >
            Reálné hodnoty z provozu a podpory — bez nadsázky
          </motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="text-center group"
            >
              <div className="relative inline-block">
                {/* Glow effect */}
                <div 
                  className="absolute inset-0 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"
                  style={{ boxShadow: `0 0 60px 20px ${stat.glow}` }}
                />
                
                <div className={`relative text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform duration-300`}>
                  {inView && (
                    <CountUp
                      end={stat.value}
                      duration={2.5}
                      decimals={stat.decimals || 0}
                      suffix={stat.suffix}
                      useEasing={true}
                    />
                  )}
                </div>
              </div>
              
              <div className="text-sm md:text-base text-slate-400 group-hover:text-slate-300 transition-colors">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}
