import SectionContainer from '../ui/SectionContainer';

const partners = [
  { name: 'Global Tech', logo: 'GT', category: 'Technology' },
  { name: 'Cloud Systems', logo: 'CS', category: 'Infrastructure' },
  { name: 'AI Solutions', logo: 'AI', category: 'Artificial Intelligence' },
  { name: 'Security First', logo: 'SF', category: 'Cybersecurity' },
  { name: 'Data Analytics', logo: 'DA', category: 'Big Data' },
  { name: 'Mobile Apps', logo: 'MA', category: 'Mobile Development' },
  { name: 'E-commerce Pro', logo: 'EP', category: 'Online Retail' },
  { name: 'Marketing Hub', logo: 'MH', category: 'Digital Marketing' }
];

export default function PartnersLogos() {
  return (
    <SectionContainer className="py-8 sm:py-12 lg:py-16">
      {/* Nekonečný marquee efekt - mobilní optimalizace */}
      <div className="relative overflow-hidden -mx-4 sm:-mx-6 lg:-mx-10">
        {/* Gradient fade edges - responsivní šířka */}
        <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 lg:w-24 bg-gradient-to-r from-slate-900 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 lg:w-24 bg-gradient-to-l from-slate-900 to-transparent z-10 pointer-events-none"></div>
        
        {/* První řada - kontinuální scroll */}
        <div className="flex animate-marquee mb-4 sm:mb-6" style={{width: 'max-content'}}>
          {Array.from({length: 6}).map((_, setIndex) => 
            partners.map((partner, index) => (
              <div
                key={`row1-${setIndex}-${index}`}
                className="flex-shrink-0 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-3 sm:py-4 min-w-[100px] sm:min-w-[120px] lg:min-w-[140px] group"
              >
                <div className="text-2xl sm:text-3xl lg:text-4xl mb-1 sm:mb-2 opacity-60 group-hover:opacity-100 transition-opacity duration-300 filter grayscale group-hover:grayscale-0">
                  {partner.logo}
                </div>
                <div className="text-center">
                  <div className="text-xs sm:text-sm font-medium text-slate-300 group-hover:text-white transition-colors duration-300 whitespace-nowrap">
                    {partner.name}
                  </div>
                  <div className="text-[10px] sm:text-xs text-slate-500 group-hover:text-slate-400 transition-colors duration-300 whitespace-nowrap">
                    {partner.category}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Druhá řada - opačný směr, rychlejší */}
        <div className="flex animate-marquee-reverse" style={{width: 'max-content'}}>
          {Array.from({length: 6}).map((_, setIndex) => 
            partners.slice(0, 5).map((partner, index) => (
              <div
                key={`row2-${setIndex}-${index}`}
                className="flex-shrink-0 flex items-center justify-center px-6 sm:px-8 lg:px-10 py-2 sm:py-3 min-w-[120px] sm:min-w-[140px] lg:min-w-[160px] group"
              >
                <div className="text-xl sm:text-2xl lg:text-3xl mr-2 sm:mr-3 opacity-40 group-hover:opacity-80 transition-opacity duration-300">
                  {partner.logo}
                </div>
                <div className="text-xs sm:text-sm text-slate-400 group-hover:text-slate-200 transition-colors duration-300 whitespace-nowrap">
                  {partner.name}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Partnership stats - mobilní optimalizace */}
      <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-slate-700/30">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 text-center">
          <div>
            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-[#799dfb] mb-1">200+</div>
            <div className="text-[10px] sm:text-xs text-slate-500">Partnerů</div>
          </div>
          <div>
            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-cyan-400 mb-1">50+</div>
            <div className="text-[10px] sm:text-xs text-slate-500">Zemí</div>
          </div>
          <div>
            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-[#799dfb] mb-1">1M+</div>
            <div className="text-[10px] sm:text-xs text-slate-500">Zákazníků</div>
          </div>
          <div>
            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-cyan-400 mb-1">24/7</div>
            <div className="text-[10px] sm:text-xs text-slate-500">Podpora</div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}