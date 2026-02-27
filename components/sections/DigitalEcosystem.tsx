import { RefreshCw, Cloud, Rocket } from 'lucide-react';
import Card from '../ui/Card';
import SectionContainer from '../ui/SectionContainer';

const ecosystemItems = [
  {
    icon: Cloud,
    title: 'Cloudová infrastruktura',
    description: 'Škálovatelná cloudová řešení s vysokou dostupností a automatickými zálohami pro stabilní chod vašich aplikací.',
    gradient: 'from-[#5885fa]/20 to-cyan-500/20',
    borderColor: 'border-[#799dfb]/30 group-hover:border-[#799dfb]/50',
    shadowColor: 'group-hover:shadow-[#5885fa]/30'
  },
  {
    icon: RefreshCw,
    title: 'Integrace systémů',
    description: 'Propojení všech vašich nástrojů a platforem do jednoho efektivního ekosystému s automatizovanými procesy.',
    gradient: 'from-cyan-500/20 to-[#5885fa]/20',
    borderColor: 'border-cyan-400/30 group-hover:border-cyan-400/50',
    shadowColor: 'group-hover:shadow-cyan-500/30'
  },
  {
    icon: Rocket,
    title: 'Rychlé nasazení',
    description: 'Optimalizované procesy pro rychlé spuštění projektů s možností průběžného škálování podle potřeb.',
    gradient: 'from-[#5885fa]/20 to-[#5885fa]/20',
    borderColor: 'border-[#8aaafc]/30 group-hover:border-[#8aaafc]/50',
    shadowColor: 'group-hover:shadow-[#5885fa]/30'
  }
];

export default function DigitalEcosystem() {
  return (
    <SectionContainer id="ecosystem" background="gradient">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
          Propojený digitální <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#799dfb] to-cyan-400">Ekosystém</span>
        </h2>
        <p className="text-lg text-slate-300 max-w-3xl mx-auto">
          Komplexní řešení, která spolupracují a vytvářejí synergii pro maximální efektivitu vašeho podnikání.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 relative">
        {/* Connecting lines - hidden on mobile */}
        <div className="hidden md:block absolute top-1/2 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-[#5885fa]/50 via-cyan-400/50 to-[#5885fa]/50 -translate-y-1/2 z-0" />
        
        {ecosystemItems.map((item, index) => (
          <Card 
            key={item.title} 
            hover 
            glow 
            className={`relative z-10 text-center ${index === 1 ? 'md:-translate-y-4' : ''}`}
          >
            <div className={`inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br ${item.gradient} border-2 ${item.borderColor} mb-6 group-hover:scale-110 group-hover:shadow-xl ${item.shadowColor} transition-all duration-300`}>
              <item.icon className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">{item.title}</h3>
            <p className="text-slate-300 leading-relaxed">{item.description}</p>
          </Card>
        ))}
      </div>

      {/* Bottom gradient accent */}
      <div className="mt-16 h-1 bg-gradient-to-r from-transparent via-[#5885fa]/50 to-transparent rounded-full" />
    </SectionContainer>
  );
}
