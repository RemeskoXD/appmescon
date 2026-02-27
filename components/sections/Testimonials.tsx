'use client';

import { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import Card from '../ui/Card';
import SectionContainer from '../ui/SectionContainer';

const testimonials = [
  {
    name: 'Pavel Novák',
    position: 'CEO',
    company: 'TechStart s.r.o.',
    avatar: 'PN',
    rating: 5,
    text: 'Mescon nám pomohl vybudovat robustní e-commerce platformu, která zvládá tisíce objednávek denně. Jejich tým je skutečně profesionální.'
  },
  {
    name: 'Jana Svobodová',
    position: 'Marketing Manager',
    company: 'Fashion Brand',
    avatar: 'JS',
    rating: 5,
    text: 'Webhosting od Mescon běží bez problémů už 3 roky. Rychlá podpora a skvělá dostupnost. Rozhodně doporučuji!'
  },
  {
    name: 'Tomáš Procházka',
    position: 'Majitel',
    company: 'Local Business',
    avatar: 'TP',
    rating: 5,
    text: 'Díky jejich digitálnímu marketingu se naše tržby zvýšily o 200%. ROI je výborné a komunikace perfektní.'
  }
];

export default function Testimonials() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  return (
    <SectionContainer background="gradient">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
          Reference našich <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#799dfb] to-cyan-400">klientů</span>
        </h2>
        <p className="text-lg text-slate-300 max-w-2xl mx-auto">
          Důvěra našich klientů je naší největší odměnou
        </p>
      </div>

      {/* Slider container */}
      <div className="relative max-w-4xl mx-auto mb-16">
        {/* Navigation arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700/80 border border-slate-600/50 text-white transition-all duration-300 group"
        >
          <ChevronLeft className="w-6 h-6 group-hover:scale-110 transition-transform" />
        </button>
        
        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700/80 border border-slate-600/50 text-white transition-all duration-300 group"
        >
          <ChevronRight className="w-6 h-6 group-hover:scale-110 transition-transform" />
        </button>

        {/* Slider track */}
        <div className="overflow-hidden rounded-2xl">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {testimonials.map((testimonial, index) => (
              <div key={index} className="w-full flex-shrink-0">
                <Card hover glow className="relative mx-4 text-center">
                  {/* Quote decoration */}
                  <div className="absolute top-4 right-4 text-6xl text-[#799dfb]/20 font-serif">"</div>
                  
                  {/* Avatar and info */}
                  <div className="flex flex-col items-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#5885fa]/20 to-cyan-500/20 border border-[#799dfb]/30 flex items-center justify-center text-xl font-bold text-[#799dfb] mb-4">
                      {testimonial.avatar}
                    </div>
                    <h4 className="text-xl font-semibold text-white">{testimonial.name}</h4>
                    <p className="text-sm text-slate-300">{testimonial.position}</p>
                    <p className="text-sm text-[#799dfb]">{testimonial.company}</p>
                  </div>

                  {/* Rating stars */}
                  <div className="flex justify-center mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 text-yellow-400" />
                    ))}
                  </div>

                  {/* Testimonial text */}
                  <blockquote className="text-lg text-slate-300 leading-relaxed italic max-w-2xl mx-auto">
                    "{testimonial.text}"
                  </blockquote>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Slide indicators */}
        <div className="flex justify-center space-x-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSlide === index 
                  ? 'bg-[#799dfb] scale-125' 
                  : 'bg-slate-600 hover:bg-slate-500'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Trust indicators */}
      <div className="mt-16 text-center">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-[#799dfb] mb-2">500+</div>
            <div className="text-sm text-slate-400">Spokojených klientů</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-cyan-400 mb-2">99.9%</div>
            <div className="text-sm text-slate-400">Dostupnost služeb</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-[#799dfb] mb-2">24/7</div>
            <div className="text-sm text-slate-400">Technická podpora</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-cyan-400 mb-2">5</div>
            <div className="text-sm text-slate-400">Průměrné hodnocení</div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
