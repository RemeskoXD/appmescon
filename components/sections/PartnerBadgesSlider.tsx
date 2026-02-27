import SectionContainer from '../ui/SectionContainer';
import { useEffect, useState } from 'react';

export default function PartnerBadgesSlider() {
  const [badges, setBadges] = useState<Array<{id: number, src: string, alt: string}>>([]);

  useEffect(() => {
    // Použijeme dostupné SVG z /public/images/partner_badget/ 10-15
    const base = [10,11,12,13,14,15].map(id => ({ id, src: `https://web2.itnahodinu.cz/mescon/images/partner_badget/${id}.svg`, alt: `Partner ${id}` }));
    setBadges([...base]);
  }, []);

  return (
    <SectionContainer className="py-12 sm:py-16">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-6">
          Technologičtí partneři
        </h2>
      </div>

      <div className="relative clients-carousel bg-[#0b1024]/80 border border-[#1e2334] rounded-2xl overflow-hidden py-6 shadow-[0_18px_60px_rgba(8,11,22,0.45)]">
        <div className="clients-carousel-track">
          {[...badges, ...badges].map((badge, idx) => (
            <div key={`${badge.id}-${idx}`} className="clients-carousel-item">
              <img
                src={badge.src}
                alt={badge.alt}
                className="w-40 h-16 sm:w-48 sm:h-20 lg:w-56 lg:h-24 object-contain"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}
