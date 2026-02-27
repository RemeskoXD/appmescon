import SectionContainer from '../ui/SectionContainer';
import { useEffect, useState } from 'react';

export default function TrustedBySection() {
  const [partners, setPartners] = useState<Array<{id: number, src: string, alt: string}>>([]);

  useEffect(() => {
    // Použijeme loga ze složky /public/images/homepage_logos/ (1-11)
    const partnersList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((id) => ({
      id,
      src: `https://web2.itnahodinu.cz/mescon/images/homepage_logos/${id}.svg`,
      alt: `Partner ${id}`
    }));
    setPartners(partnersList);
  }, []);

  return (
    <SectionContainer className="py-12 sm:py-16">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-6">
          Důvěřuje nám více než 500 firemních týmů
        </h2>
      </div>

      {/* Partners slider: redukovaný, auto-scroll, grey -> color on hover */}
      <div className="relative clients-carousel bg-[#060c1c] border border-slate-800/60 rounded-2xl overflow-hidden py-6">
        <div className="clients-carousel-track">
          {[...partners, ...partners, ...partners].map((partner, idx) => (
            <div key={`${partner.id}-${idx}`} className="clients-carousel-item">
              <img
                src={partner.src}
                alt={partner.alt}
                className="w-28 h-12 sm:w-32 sm:h-14 lg:w-40 lg:h-16 object-contain"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}
