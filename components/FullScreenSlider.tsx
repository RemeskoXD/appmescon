"use client";
import { useEffect, useMemo, useState, useCallback } from "react";
import { SLIDES } from "./SliderData";
import Button from "./ui/Button";

export default function FullScreenSlider() {
  const slides = useMemo(() => SLIDES, []);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const DURATION = 4000; // 4s interval

  // Navigation function
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setProgress(0);
  }, [slides.length]);

  // Kontinuální auto-play progress animation
  useEffect(() => {
    setProgress(0);
    let start = Date.now();
    let frame: number;
    
    function animate() {
      const elapsed = Date.now() - start;
      const pct = Math.min(elapsed / DURATION, 1);
      setProgress(pct);
      
      if (pct < 1) {
        frame = requestAnimationFrame(animate);
      } else {
        nextSlide();
      }
    }
    
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [currentSlide, nextSlide]);

  // Keyboard navigation (pouze doprava)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        nextSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide]);

  const currentSlideData = slides[currentSlide];

  return (
    <section 
      className="relative border-b border-[#1e2334]" 
      aria-label="Úvodní slider"
    >
      {/* Mobilně optimalizovaný fullscreen container */}
      <div className="relative h-screen -mt-[58px] pt-[58px] isolate overflow-hidden">
        
        {/* Background layers */}
        <div className="absolute inset-0">
          {slides.map((slide, idx) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-out ${
                currentSlide === idx ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {/* Background image */}
              <div
                className="absolute inset-0 bg-center bg-cover"
                style={{
                  backgroundImage: `url('${slide.background.source}')`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  backgroundPosition: "center"
                }}
              />
              
              {/* Responzivní overlay - sjednocená barva bez gradientu */}
              <div className="absolute inset-0 bg-[#040a18]/55" />
            </div>
          ))}
        </div>

        {/* Main content - plně responzivní layout */}
        <div className="relative z-10 h-full flex items-center">
          <div className="page-container">
              <div className="flex flex-col lg:flex-row items-center justify-between min-h-[calc(100vh-140px)]">
            
              {/* Content section */}
              <div className="flex-1 text-left pt-4 sm:pt-8 lg:pt-0 pb-20 sm:pb-24 lg:pb-0 lg:pr-12">
                <div className="space-y-5 sm:space-y-7 lg:space-y-9">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-tight drop-shadow-xl tracking-tight">
                    {currentSlideData.content.headline.split('\n').map((line, idx) => (
                      <span key={idx} className="block">
                        {line}
                      </span>
                    ))}
                  </h1>
                  
                  <p className="text-base sm:text-lg lg:text-xl text-slate-200 leading-relaxed max-w-xl lg:max-w-3xl mx-0 drop-shadow-lg font-medium opacity-90">
                    {currentSlideData.content.subtext}
                  </p>
                  
                  {/* CTA Buttons - mobilní optimalizace */}
                  <div className="flex flex-col sm:flex-row items-start gap-3 lg:gap-4 justify-start">
                    <Button
                      href={currentSlideData.content.cta.primary.href}
                      variant="primary"
                      size="lg"
                      className="w-full sm:w-[260px] justify-center"
                    >
                      {currentSlideData.content.cta.primary.text}
                    </Button>
                    {currentSlideData.content.cta.secondary && (
                      <Button
                        href={currentSlideData.content.cta.secondary.href}
                        variant="outline"
                        size="lg"
                        className="w-full sm:w-[260px] justify-center"
                      >
                        {currentSlideData.content.cta.secondary.text}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Foreground image - skryté na mobilech a menších tabletech */}
              <div className="hidden xl:flex flex-1 items-center justify-center h-full max-w-lg">
                {currentSlideData.foregroundImage && (
                  <img
                    key={`img-${currentSlide}`}
                    src={currentSlideData.foregroundImage}
                    alt={`Vizuál pro ${currentSlideData.content.headline}`}
                    className="max-h-[65vh] w-auto drop-shadow-2xl animate-fadeInUp"
                    loading="eager"
                    decoding="async"
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation - Cards Style */}
        <div className="absolute bottom-0 left-0 z-20 w-full border-t border-white/10 bg-[#020617]/80 backdrop-blur-md">
          <div className="page-container">
            <div className="flex overflow-x-auto md:grid md:grid-cols-3 lg:grid-cols-6 no-scrollbar snap-x snap-mandatory">
              {slides.map((slide, idx) => (
                <button
                  key={slide.id}
                  onClick={() => { setCurrentSlide(idx); setProgress(0); }}
                  className={`group relative min-w-[160px] md:min-w-0 flex-shrink-0 snap-start h-20 sm:h-24 px-4 text-left transition-colors hover:bg-white/5 focus:outline-none border-r border-white/5 md:border-none ${
                    currentSlide === idx ? 'bg-white/10' : ''
                  }`}
                >
                  {/* Progress Bar for active slide */}
                  {currentSlide === idx && (
                    <span
                      className="absolute top-0 left-0 h-[2px] w-full bg-[#5885fa]"
                      style={{
                        transform: `scaleX(${progress})`,
                        transformOrigin: 'left',
                        transition: progress === 0 ? 'none' : 'transform 0.1s linear'
                      }}
                    />
                  )}
                  
                  <div className="flex h-full flex-col justify-center">
                    <span className={`block text-xs font-bold uppercase tracking-wider ${
                      currentSlide === idx ? 'text-[#5885fa]' : 'text-slate-400 group-hover:text-slate-300'
                    }`}>
                      {slide.footTitle}
                    </span>
                    <span className={`mt-1 block text-xs sm:text-sm leading-tight ${
                      currentSlide === idx ? 'text-white' : 'text-slate-500 group-hover:text-slate-400'
                    }`}>
                      {slide.footSubtitle}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
