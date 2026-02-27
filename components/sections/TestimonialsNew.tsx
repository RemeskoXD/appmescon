'use client';

import { useMemo, useState } from 'react';
import { Star } from 'lucide-react';
import Card from '../ui/Card';
import SectionContainer from '../ui/SectionContainer';

const testimonials = [
  {
    name: 'Tomáš Duraj',
    position: 'Majitel',
    company: 'GTAuta',
    website: 'https://www.gtauta.cz',
    photo: 'https://web2.itnahodinu.cz/mescon/images/fotky_recenzi/1.svg',
    rating: 5,
    text: 'Společnost, která webové stránky realizovala, si zaslouží pochvalu za profesionalitu, kreativní přístup a rychlost práce. Tým prokázal vysokou odbornost a schopnost naslouchat potřebám klienta. Proces vývoje byl transparentní a efektivní, což vedlo ke kvalitnímu výsledku splňujícímu moderní standardy. Výsledný web je přehledný, funkční a uživatelsky přívětivý. Spolupráci mohu jednoznačně doporučit jako spolehlivého partnera pro tvorbu webových stránek.'
  },
  {
    name: 'Vitaly Pron',
    position: 'Předseda správní rady',
    company: 'Future for Ukraine',
    website: 'https://www.futureforukraine.cz',
    photo: 'https://web2.itnahodinu.cz/mescon/images/fotky_recenzi/2.svg',
    rating: 5,
    text: 'Měl jsem tu čest spolupracovat s týmem, který vytvořil web futureforukraine. Od prvního kontaktu byla spolupráce profesionální a rychlá. Oceňuji jejich schopnost naslouchat našim potřebám a převést je do moderního designu. Web je uživatelsky přívětivý a plně responzivní. Tým nás průběžně informoval o postupu, takže jsme měli přehled o projektu. Mohu je jen doporučit každému, kdo hledá kvalitní webové řešení.'
  },
  {
    name: 'Světlana Kubelková',
    position: 'Head of office',
    company: 'Aegea Holdings',
    website: 'https://www.aegeaholdings.com',
    photo: 'https://web2.itnahodinu.cz/mescon/images/fotky_recenzi/3.svg',
    rating: 5,
    text: 'Se společností MESCON jsme byli maximálně spokojeni. Logo pro Aegea Holdings dokonale vystihuje naši vizi – moderní, elegantní a profesionální design. Webové stránky jsou přehledné, funkční a skvěle reprezentují naši značku. Skvělá spolupráce s týmem, který vždy rychle reagoval na naše potřeby. Určitě doporučujeme!'
  },
  {
    name: 'Tomáš Zvelebil',
    position: 'Jednatel společnosti',
    company: 'Subscribe s.r.o.',
    photo: 'https://web2.itnahodinu.cz/mescon/images/fotky_recenzi/4.svg',
    rating: 5,
    text: 'Spolupráce s Mescon Digital byla velmi profesionální. Realizovali pro nás webové stránky pro projekt Pokecccamp. Díky expresnímu dodání a funkčnímu řešení se podařilo plně obsadit všechny termíny kempu. Oceňuji hlavně rychlost, komunikaci a tah na výsledek. Velkým přínosem byla také schopnost rychle reagovat na změny a přizpůsobit řešení našim potřebám. Mescon mohu jednoznačně doporučit.'
  }
];

export default function TestimonialsNew() {
  const normalized = useMemo(() => {
    if (testimonials.length % 2 === 0) return testimonials;
    return [...testimonials, testimonials[0]];
  }, []);
  const slideCount = normalized.length / 2;
  const [index, setIndex] = useState(0);

  const getPair = () => {
    const start = (index * 2) % normalized.length;
    const pair = normalized.slice(start, start + 2);
    if (pair.length < 2) {
      pair.push(normalized[0]);
    }
    return pair;
  };

  const currentPair = getPair();

  return (
    <SectionContainer background="gradient" className="overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
        <div>
          <p className="text-[12px] uppercase tracking-[0.18em] text-[#5885fa] mb-2">Reference</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">Zkušenosti klientů z dlouhodobé spolupráce</h2>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIndex((prev) => (prev - 1 + slideCount) % slideCount)}
            className="h-10 w-10 rounded-full border border-[#1e2334] bg-[#0b1024]/80 text-slate-200 hover:border-[#5885fa] hover:text-white transition-colors"
            aria-label="Předchozí recenze"
          >
            ‹
          </button>
          <button
            onClick={() => setIndex((prev) => (prev + 1) % slideCount)}
            className="h-10 w-10 rounded-full border border-[#1e2334] bg-[#0b1024]/80 text-slate-200 hover:border-[#5885fa] hover:text-white transition-colors"
            aria-label="Další recenze"
          >
            ›
          </button>
        </div>
      </div>

      <div className="relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 transition-transform duration-300">
          {currentPair.map((testimonial) => (
            <Card key={`${testimonial.name}-${testimonial.company}`} hover glow className="relative h-full border border-[#1e2334] bg-[#0b1024]/80">
              <div className="absolute top-6 right-6 text-5xl text-[#5885fa]/15 font-serif">"</div>
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-[#0f172a] border border-[#5885fa]/35 overflow-hidden flex items-center justify-center">
                  <img
                    src={testimonial.photo}
                    alt={testimonial.name}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white leading-tight">{testimonial.name}</h4>
                  <p className="text-sm text-slate-300">{testimonial.position}</p>
                  <p className="text-sm text-[#8aaafc]">{testimonial.company}</p>
                  {'website' in testimonial && testimonial.website && (
                    <a
                      href={testimonial.website}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-1 block text-sm text-slate-400 hover:text-slate-200 underline decoration-slate-600 underline-offset-4"
                    >
                      {testimonial.website.replace(/^https?:\/\//, '')}
                    </a>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-slate-200 leading-relaxed">
                "{testimonial.text}"
              </p>
            </Card>
          ))}
        </div>
      </div>

      <div className="mt-8 flex items-center gap-2">
        {Array.from({ length: slideCount }).map((_, dot) => (
          <span
            key={dot}
            className={`h-1 w-10 rounded-full transition-colors duration-200 ${dot === index ? 'bg-[#5885fa]' : 'bg-[#1e2334]'}`}
            aria-hidden="true"
          />
        ))}
      </div>
    </SectionContainer>
  );
}
