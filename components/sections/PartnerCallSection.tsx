import SectionContainer from '../ui/SectionContainer';
import Button from '../ui/Button';
import { ArrowRight } from 'lucide-react';

interface PartnerCallSectionProps {
  onRegister?: () => void;
}

export default function PartnerCallSection({ onRegister }: PartnerCallSectionProps) {
  return (
    <SectionContainer className="relative py-12 sm:py-16 lg:py-20">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0b1226] via-[#060b18] to-[#050a16]" aria-hidden="true" />
      <div className="relative z-10 grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        
          {/* Levá strana - Text a tlačítka */}
        <div className="order-2 lg:order-1">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-6">
            Selektivní <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-500 to-accent-500">
              partnerství
            </span>
            {' '}pro B2B týmy
          </h2>
          
          <p className="text-base sm:text-lg text-slate-300 mb-8 leading-relaxed">
            Partnerství otevíráme firmám s vlastním obchodním a technickým zázemím, které chtějí dlouhodobě pečovat o klienty. 
            Aktivně spolupracujeme s více než 200 partnery po celém světě. 
            Není to program pro jednorázové předávání kontaktů ani pro přeprodej bez odpovědnosti za provoz.
          </p>

          <div className="space-y-4 mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-accent-500 rounded-full"></div>
              <span className="text-slate-300">Globální dosah do 50+ zemí světa</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-accent-500 rounded-full"></div>
              <span className="text-slate-300">Provizní model až 30 % z každého kontraktu</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-accent-500 rounded-full"></div>
              <span className="text-slate-300">24/7 technická podpora ve vašem jazyce</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-accent-500 rounded-full"></div>
              <span className="text-slate-300">Marketingové materiály a kampaně pro společné projekty</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="primary" size="lg" className="group" onClick={onRegister}>
              <span className="flex items-center">
                Probrat partnerství
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </span>
            </Button>
            
            <Button variant="outline" size="lg" className="group">
              <span className="flex items-center">
                Podmínky spolupráce
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </span>
            </Button>
          </div>
        </div>

        {/* Pravá strana - Globe.svg obrázek */}
        <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
          <div className="relative">
            <img
              src="https://web2.itnahodinu.cz/mescon/images/globe.svg"
              alt="Global Partnership Network"
              className="w-80 sm:w-96 lg:w-[28rem] h-auto object-contain"
              loading="lazy"
            />
            {/* Decorative glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-accent-500/12 via-accent-500/8 to-accent-500/12 rounded-2xl blur-3xl -z-10 scale-110" />
          </div>
        </div>

      </div>
    </SectionContainer>
  );
}
