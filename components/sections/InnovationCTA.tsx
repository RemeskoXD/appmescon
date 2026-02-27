"use client";
import { Sparkles } from 'lucide-react';
import Button from '../ui/Button';
import SectionContainer from '../ui/SectionContainer';

interface InnovationCTAProps {
  onRegister?: () => void;
}

export default function InnovationCTA({ onRegister }: InnovationCTAProps) {
  return (
    <SectionContainer className="py-20 md:py-32">
      <div className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#4f78e1]/20 via-slate-900 to-cyan-600/20 rounded-3xl" />
        
        {/* Decorative elements */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-[#5885fa]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl" />
        
        <div className="relative px-8 md:px-16 py-16 md:py-20 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-[#5885fa]/20 to-cyan-500/20 border border-[#799dfb]/30 mb-8">
            <Sparkles className="w-10 h-10 text-[#799dfb]" />
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Inovativní řešení pro 
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#799dfb] to-cyan-400">
              moderní podnikání
            </span>
          </h2>
          
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed">
            Využíváme nejnovější technologie jako AI, machine learning a cloudové řešení 
            k vytvoření nástrojů, které vám pomohou být před konkurencí. 
            Připojte se k digital transformation.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              variant="primary" 
              size="lg" 
              onClick={onRegister}
            >
              Začít hned teď
            </Button>
            <Button variant="outline" size="lg" href="/subpages/o-nas">
              Více o našich technologiích
            </Button>
          </div>

          {/* Tech badges - 6 čárek */}
                    {/* Tech badges */}
          <div className="mt-12 flex flex-wrap justify-center gap-4 text-sm text-slate-400">
            <div className="px-3 py-1 bg-slate-800/50 rounded-full border border-slate-700/50">
              Next.js 14
            </div>
            <div className="px-3 py-1 bg-slate-800/50 rounded-full border border-slate-700/50">
              AI Integration
            </div>
            <div className="px-3 py-1 bg-slate-800/50 rounded-full border border-slate-700/50">
              Cloud Native
            </div>
            <div className="px-3 py-1 bg-slate-800/50 rounded-full border border-slate-700/50">
              Security First
            </div>
            <div className="px-3 py-1 bg-slate-800/50 rounded-full border border-slate-700/50">
              Analytics
            </div>
            <div className="px-3 py-1 bg-slate-800/50 rounded-full border border-slate-700/50">
              Performance
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
