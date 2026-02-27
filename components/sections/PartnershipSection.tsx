import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import SectionContainer from '../ui/SectionContainer';
import Button from '../ui/Button';

export default function PartnershipSection() {
  return (
    <SectionContainer className="py-12 sm:py-16 lg:py-20">
      <div className="text-center max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <span className="inline-flex items-center rounded-full bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-300 ring-1 ring-cyan-500/20 mb-4">
            Partnerství
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-6">
            Selektivní <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-[#799dfb]">
              partnerství
            </span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-slate-300 leading-relaxed max-w-3xl mx-auto">
            Partnerství otevíráme firmám s vlastním obchodním a technickým zázemím. 
            Není to program pro jednorázové předávání kontaktů ani pro přeprodej bez odpovědnosti za provoz.
          </p>
        </div>

        {/* Partnership benefits grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-12">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-[#5885fa]/20 to-cyan-500/20 border border-[#799dfb]/30 mb-4">
              <ArrowRight className="w-6 h-6 sm:w-8 sm:h-8 text-[#799dfb]" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white mb-2">Dlouhodobost</h3>
            <p className="text-xs sm:text-sm text-slate-400">Stabilní spolupráce postavená na odpovědnosti</p>
          </div>
          
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-[#5885fa]/20 border border-cyan-400/30 mb-4">
              <svg className="w-6 h-6 sm:w-8 sm:h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white mb-2">Technická opora</h3>
            <p className="text-xs sm:text-sm text-slate-400">Sdílené standardy, provoz a dohled</p>
          </div>
          
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-[#5885fa]/20 to-cyan-500/20 border border-[#799dfb]/30 mb-4">
              <svg className="w-6 h-6 sm:w-8 sm:h-8 text-[#799dfb]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white mb-2">Kvalita</h3>
            <p className="text-xs sm:text-sm text-slate-400">Jednotná úroveň služeb napříč projekty</p>
          </div>
          
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-[#5885fa]/20 border border-cyan-400/30 mb-4">
              <svg className="w-6 h-6 sm:w-8 sm:h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white mb-2">Spolupráce</h3>
            <p className="text-xs sm:text-sm text-slate-400">Transparentní komunikace a sdílení know-how</p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-cyan-500/10 to-[#5885fa]/10 rounded-2xl p-6 sm:p-8 border border-cyan-500/20">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-4">
            Zajímá vás selektivní partnerství?
          </h3>
          <p className="text-sm sm:text-base text-slate-300 mb-6 max-w-2xl mx-auto">
            Ozvěte se a ověříme společné nastavení, standardy a způsob spolupráce.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="primary" size="md" href="/subpages/apply-partner">
              Probrat partnerství
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            
            <Link 
              href="/subpages/o-nas" 
              className="inline-flex items-center text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors duration-300 group"
            >
              Více o nás
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
