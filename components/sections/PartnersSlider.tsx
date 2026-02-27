import SectionContainer from '../ui/SectionContainer';

// Partners z /public/images/partnes/
const partners = [
  { id: 17, src: 'https://web2.itnahodinu.cz/mescon/images/partnes/17.svg', alt: 'Partner 17' },
  { id: 18, src: 'https://web2.itnahodinu.cz/mescon/images/partnes/18.svg', alt: 'Partner 18' },
  { id: 19, src: 'https://web2.itnahodinu.cz/mescon/images/partnes/19.svg', alt: 'Partner 19' },
  { id: 20, src: 'https://web2.itnahodinu.cz/mescon/images/partnes/20.svg', alt: 'Partner 20' },
  { id: 21, src: 'https://web2.itnahodinu.cz/mescon/images/partnes/21.svg', alt: 'Partner 21' },
  { id: 22, src: 'https://web2.itnahodinu.cz/mescon/images/partnes/22.svg', alt: 'Partner 22' },
  { id: 23, src: 'https://web2.itnahodinu.cz/mescon/images/partnes/23.svg', alt: 'Partner 23' },
  { id: 24, src: 'https://web2.itnahodinu.cz/mescon/images/partnes/24.svg', alt: 'Partner 24' },
  { id: 25, src: 'https://web2.itnahodinu.cz/mescon/images/partnes/25.svg', alt: 'Partner 25' },
  { id: 26, src: 'https://web2.itnahodinu.cz/mescon/images/partnes/26.svg', alt: 'Partner 26' },
];

// Partner badges z /public/images/partner badget/
const partnerBadges = [
  { id: 10, src: 'https://web2.itnahodinu.cz/mescon/images/partner badget/10.svg', alt: 'Partner Badge 10' },
  { id: 11, src: 'https://web2.itnahodinu.cz/mescon/images/partner badget/11.svg', alt: 'Partner Badge 11' },
  { id: 12, src: 'https://web2.itnahodinu.cz/mescon/images/partner badget/12.svg', alt: 'Partner Badge 12' },
  { id: 13, src: 'https://web2.itnahodinu.cz/mescon/images/partner badget/13.svg', alt: 'Partner Badge 13' },
  { id: 14, src: 'https://web2.itnahodinu.cz/mescon/images/partner badget/14.svg', alt: 'Partner Badge 14' },
  { id: 15, src: 'https://web2.itnahodinu.cz/mescon/images/partner badget/15.svg', alt: 'Partner Badge 15' },
];

export default function PartnersSlider() {
  return (
    <SectionContainer className="py-8 sm:py-12 lg:py-16">
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
          Naši <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#799dfb] to-cyan-400">partneři</span>
        </h2>
        <p className="text-sm sm:text-base lg:text-lg text-slate-300 max-w-2xl mx-auto">
          Spolupracujeme s předními společnostmi a technologiemi
        </p>
      </div>

      {/* Partners slider - neustále se posouvající */}
      <div className="relative overflow-hidden -mx-4 sm:-mx-6 lg:-mx-10 mb-8 lg:mb-12">
        {/* Gradient fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 lg:w-24 bg-gradient-to-r from-slate-900 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 lg:w-24 bg-gradient-to-l from-slate-900 to-transparent z-10 pointer-events-none"></div>
        
        {/* Partners row - kontinuální scroll */}
        <div className="flex animate-marquee" style={{width: 'max-content'}}>
          {Array.from({length: 6}).map((_, setIndex) => 
            partners.map((partner) => (
              <div
                key={`partner-${setIndex}-${partner.id}`}
                className="flex-shrink-0 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-4 lg:py-6 min-w-[120px] sm:min-w-[150px] lg:min-w-[180px] group"
              >
                <img
                  src={partner.src}
                  alt={partner.alt}
                  className="h-8 sm:h-10 lg:h-12 w-auto object-contain opacity-60 group-hover:opacity-100 transition-opacity duration-300 filter grayscale group-hover:grayscale-0"
                  loading="lazy"
                />
              </div>
            ))
          )}
        </div>
      </div>

      {/* Partner badges slider - opačný směr */}
      <div className="relative overflow-hidden -mx-4 sm:-mx-6 lg:-mx-10">
        {/* Gradient fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 lg:w-24 bg-gradient-to-r from-slate-900 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 lg:w-24 bg-gradient-to-l from-slate-900 to-transparent z-10 pointer-events-none"></div>
        
        {/* Partner badges row - opačný směr, pomalejší */}
        <div className="flex animate-marquee-reverse" style={{width: 'max-content'}}>
          {Array.from({length: 8}).map((_, setIndex) => 
            partnerBadges.map((badge) => (
              <div
                key={`badge-${setIndex}-${badge.id}`}
                className="flex-shrink-0 flex items-center justify-center px-6 sm:px-8 lg:px-10 py-3 lg:py-4 min-w-[140px] sm:min-w-[170px] lg:min-w-[200px] group"
              >
                <img
                  src={badge.src}
                  alt={badge.alt}
                  className="h-6 sm:h-8 lg:h-10 w-auto object-contain opacity-50 group-hover:opacity-90 transition-opacity duration-300"
                  loading="lazy"
                />
              </div>
            ))
          )}
        </div>
      </div>
    </SectionContainer>
  );
}