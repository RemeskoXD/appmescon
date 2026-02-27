import SectionContainer from '../ui/SectionContainer';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { UsersRound, Briefcase, Handshake, UserRound } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TeamGridSection() {
  const cards = [
    { icon: UserRound, title: 'Vedení', desc: 'Strategie a odpovědnost za provoz', href: '/subpages/o-nas', cta: 'Poznejte vedení', color: 'from-accent-500 to-accent-500' },
    { icon: UsersRound, title: 'Tým', desc: 'Cloud, vývoj a provozní specialisté', href: '/subpages/o-nas', cta: 'Seznamte se', color: 'from-accent-500 to-accent-500' },
    { icon: Briefcase, title: 'Kariéra', desc: 'Dlouhodobé projekty a stabilní prostředí', href: '/subpages/kariera', cta: 'Volné pozice', color: 'from-accent-500 to-accent-500' },
    { icon: Handshake, title: 'Partnerství', desc: 'Selektivní spolupráce pro B2B týmy', href: '#partner', cta: 'Podmínky partnerství', color: 'from-accent-500 to-accent-500' }
  ];

  return (
    <SectionContainer id="team-grid" className="py-16 lg:py-24 relative overflow-hidden border-t border-[#1e2334]">
      {/* Decorative floating orb */}
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-accent-500/10 to-accent-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '7s' }} />
      
      <div className="relative z-10 text-center mb-12 sm:mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl lg:text-4xl font-bold text-white mb-4"
        >
          Tým a odpovědnost
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-slate-300 max-w-2xl mx-auto"
        >
          Za stabilním provozem stojí zkušení lidé a jasné procesy.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {cards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <Card hover glow className="p-6 text-center group relative overflow-hidden h-full flex flex-col">
              <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
              
              <div className="relative z-10 flex-1 flex flex-col">
                <div className="mb-4 relative mx-auto">
                <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-20 rounded-xl blur-lg group-hover:opacity-40 transition-opacity duration-500`} />
                <div className={`relative w-12 h-12 rounded-xl border bg-gradient-to-br from-slate-900/80 to-slate-800/60 flex items-center justify-center group-hover:scale-110 transition-all duration-300`}
                  style={{ borderColor: 'rgba(88,133,250, 0.3)' }}
                >
                    <card.icon className="w-6 h-6 text-white transition-colors" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{card.title}</h3>
                <p className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors mb-4 flex-1">{card.desc}</p>
                <Button variant="outline" size="sm" href={card.href}>{card.cta}</Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </SectionContainer>
  );
}
