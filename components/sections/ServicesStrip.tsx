import { Check, Settings, Globe, ShieldCheck } from 'lucide-react';
import SectionContainer from '../ui/SectionContainer';

const services = [
  {
    icon: Globe,
    title: 'Webhosting',
    description: 'Stabilní provoz se SLA a dohledem'
  },
  {
    icon: Settings,
    title: 'Vývoj aplikací',
    description: 'Aplikace pro procesy a klientské portály'
  },
  {
    icon: ShieldCheck,
    title: 'Bezpečnost',
    description: 'Monitoring, zálohy a ochrana dat'
  },
  {
    icon: Check,
    title: 'Konzultace',
    description: 'Jasné rozhodnutí nad architekturou a provozem'
  }
];

export default function ServicesStrip() {
  return (
    <SectionContainer id="services" className="py-12 md:py-16">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
        {services.map((service, index) => (
          <div 
            key={service.title}
            className="group text-center"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#5885fa]/20 to-cyan-500/20 border border-[#799dfb]/20 group-hover:border-[#799dfb]/40 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-[#5885fa]/25">
              <service.icon className="w-8 h-8 text-[#799dfb] group-hover:text-[#acc2fc] transition-colors duration-300" />
            </div>
            <h3 className="mt-4 text-sm font-semibold text-white group-hover:text-[#eef3fe] transition-colors duration-300">
              {service.title}
            </h3>
            <p className="mt-2 text-xs text-slate-400 group-hover:text-slate-300 transition-colors duration-300 leading-snug">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </SectionContainer>
  );
}
