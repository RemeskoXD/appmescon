import SectionContainer from '../ui/SectionContainer';
import Button from '../ui/Button';

export default function CEOSection() {
  return (
    <SectionContainer className="py-12 sm:py-16 lg:py-20">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        
        {/* CEO Photo - levá strana */}
        <div className="order-2 lg:order-1 flex justify-center lg:justify-start">
          <div className="relative">
            <img
              src="https://web2.itnahodinu.cz/mescon/images/ceo_photo.svg"
              alt="Náš tým"
              className="w-full max-w-lg h-auto rounded-2xl border border-slate-800/60 shadow-2xl bg-slate-900/20"
              loading="lazy"
            />
            {/* Decorative glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#5885fa]/14 via-[#4f78e1]/12 to-[#3e5daf]/12 blur-3xl -z-10 scale-110" />
          </div>
        </div>

        {/* Content - pravá strana */}
        <div className="order-1 lg:order-2 text-center lg:text-left">
          <div className="mb-6">
            <span className="inline-flex items-center rounded-full bg-[#5885fa]/10 px-4 py-2 text-sm font-medium text-[#cddafe] ring-1 ring-[#5885fa]/20">
              Vedení společnosti
            </span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-6">
            Vedení, které <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#cddafe] via-[#799dfb] to-[#5885fa]">
              nese odpovědnost
            </span>
          </h2>
          
          <p className="text-sm sm:text-base lg:text-lg text-slate-300 leading-relaxed mb-8 max-w-2xl">
            Opíráme se o více než 15 let zkušeností s provozem digitálních platforem. 
            Zaměřujeme se na stabilitu, bezpečnost a dlouhodobé vztahy s klienty.
          </p>

          <div className="space-y-4 mb-8">
            <div className="flex items-center justify-center lg:justify-start gap-3">
              <div className="w-2 h-2 bg-[#5885fa] rounded-full"></div>
              <span className="text-sm sm:text-base text-slate-300">15+ let zkušeností s provozem platforem</span>
            </div>
            <div className="flex items-center justify-center lg:justify-start gap-3">
              <div className="w-2 h-2 bg-[#acc2fc] rounded-full"></div>
              <span className="text-sm sm:text-base text-slate-300">200+ realizovaných projektů a provozů</span>
            </div>
            <div className="flex items-center justify-center lg:justify-start gap-3">
              <div className="w-2 h-2 bg-[#5885fa] rounded-full"></div>
              <span className="text-sm sm:text-base text-slate-300">Certifikovaní odborníci pro cloud a bezpečnost</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Button variant="primary" size="md" href="/subpages/o-nas">
              Poznejte náš tým
            </Button>
            <Button variant="outline" size="md" href="/subpages/kariera">
              Kariéra s námi
            </Button>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
