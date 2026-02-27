import { Globe, Handshake } from 'lucide-react';
import Button from '../ui/Button';
import SectionContainer from '../ui/SectionContainer';

export default function PartnerSection() {
  return (
    <SectionContainer id="partners" background="dark" className="py-20 md:py-32">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        
        {/* Left column - Content */}
        <div>
          <div className="inline-flex items-center px-4 py-2 bg-[#5885fa]/10 border border-[#799dfb]/20 rounded-full text-[#799dfb] text-sm font-medium mb-6">
            <Handshake className="w-4 h-4 mr-2" />
            Partnerská síť
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Partnerství pro{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#799dfb] to-cyan-400">
              B2B týmy
            </span>
          </h2>
          
          <p className="text-lg text-slate-300 mb-8 leading-relaxed">
            Spolupracujeme s více než 200 partnery po celém světě. 
            Partnerství otevíráme firmám, které chtějí dlouhodobě nést odpovědnost za klienty. 
            Není to program pro jednorázové předávání kontaktů.
          </p>

          <div className="grid sm:grid-cols-2 gap-6 mb-10">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#5885fa] to-cyan-500 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-white mb-1">Globální dosah</h4>
                <p className="text-sm text-slate-400">Přístup do 50+ zemí světa</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#5885fa] to-cyan-500 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-white mb-1">Technická podpora</h4>
                <p className="text-sm text-slate-400">24/7 podpora ve vašem jazyce</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#5885fa] to-cyan-500 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-white mb-1">Atraktivní provize</h4>
                <p className="text-sm text-slate-400">Provizní model až 30 % z kontraktu</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#5885fa] to-cyan-500 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-white mb-1">Marketing podpora</h4>
                <p className="text-sm text-slate-400">Materiály a kampaně pro společné projekty</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="primary" size="lg" href="/subpages/apply-partner">
              Probrat partnerství
            </Button>
            <Button variant="secondary" size="lg" href="/partneri">
              Zobrazit partnery
            </Button>
          </div>
        </div>

        {/* Right column - Globe illustration */}
        <div className="relative flex items-center justify-center">
          <div className="relative">
            {/* Main globe */}
            <div className="w-80 h-80 rounded-full bg-gradient-to-br from-[#5885fa]/20 to-cyan-500/20 border-2 border-[#799dfb]/30 flex items-center justify-center relative overflow-hidden">
              <Globe className="w-32 h-32 text-[#799dfb]/60" />
              
              {/* Rotating rings */}
              <div className="absolute inset-0 border-2 border-[#799dfb]/20 rounded-full animate-spin-slow" />
              <div className="absolute inset-4 border border-cyan-400/20 rounded-full animate-spin-reverse" />
              
              {/* Connection points */}
              <div className="absolute top-8 left-8 w-3 h-3 bg-[#799dfb] rounded-full animate-pulse" />
              <div className="absolute top-16 right-12 w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
              <div className="absolute bottom-12 left-16 w-2 h-2 bg-[#799dfb] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
              <div className="absolute bottom-8 right-8 w-3 h-3 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
              <div className="absolute top-1/2 left-2 w-2 h-2 bg-[#799dfb] rounded-full animate-pulse" style={{ animationDelay: '1.5s' }} />
              <div className="absolute top-1/2 right-2 w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '2.5s' }} />
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-[#5885fa]/10 rounded-full blur-xl animate-bounce" style={{ animationDelay: '1s' }} />
            <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-cyan-500/10 rounded-full blur-lg animate-bounce" style={{ animationDelay: '2s' }} />
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
