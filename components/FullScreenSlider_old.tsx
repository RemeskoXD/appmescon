"use client";
import { useEffect, useMemo, useState, useCallback } from "react";

import { SLIDES } from "./SliderData";

export default function FullScreenSlider() {
  const slides = useMemo(() => SLIDES, []);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);

  const DURATION = 4000; // 4s interval - rychlejší autoplay

  // Navigation functions


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
      className="relative" 
      aria-label="Úvodní slider"
    >
      {/* Fullscreen container - zvětšeno pro true fullscreen */}
      <div className="relative h-screen -mt-[58px] pt-[58px] isolate flex flex-col justify-center overflow-hidden">
        
        {/* Background layers */}
        <div className="absolute inset-0">
          {slides.map((slide, idx) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-out ${
                currentSlide === idx ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {/* Background image/gradient */}
              <div
                className="absolute inset-0 bg-center bg-cover"
                style={{
                  backgroundImage: `url('${slide.background.source}')`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  backgroundPosition: "center"
                }}
              />
              
              {/* Overlay */}
              <div 
                className="absolute inset-0" 
                style={{
                  background: `linear-gradient(90deg, rgba(11,17,32,${slide.background.overlay ?? 0.45}) 0%, rgba(10,15,28,${(slide.background.overlay ?? 0.45) * 0.85}) 50%, rgba(9,13,24,${(slide.background.overlay ?? 0.45) * 0.92}) 100%)`
                }} 
              />
              
              {/* Gradient accents */}
              <div className="absolute inset-0 opacity-25">
                <div 
                  className="absolute inset-0"
                  style={{
                    backgroundImage: "radial-gradient(circle at 20% 25%, rgba(88,133,250,0.35), transparent 60%), radial-gradient(circle at 80% 30%, rgba(56,189,248,0.25), transparent 65%)"
                  }} 
                />
              </div>
              
              {/* Grid pattern */}
              <div 
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
                  backgroundSize: "46px 46px",
                  maskImage: "linear-gradient(to bottom, rgba(255,255,255,0.65), rgba(255,255,255,0.2) 45%, transparent 85%)"
                }}
              />
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 flex-1">
          <div className="h-full mx-auto w-full max-w-[1000px] lg:max-w-[1100px] xl:max-w-[1200px] 2xl:max-w-[1300px] px-6 md:px-10 grid md:grid-cols-2 gap-8 md:gap-10 items-center">
            
            {/* Left column - Text content */}
            <div className="text-center md:text-left">
              <div 
                key={`content-${currentSlide}`}
                className="animate-fadeInUp"
              >
                <div className="text-sm tracking-widest uppercase text-[#799dfb]/90 font-medium">
                  {currentSlideData.content.kicker}
                </div>
                <h1 className="mt-3 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-white">
                  {currentSlideData.content.headline}
                </h1>
                <p className="mt-5 text-base md:text-lg text-slate-300 leading-relaxed max-w-xl md:max-w-2xl mx-auto md:mx-0">
                  {currentSlideData.content.subtext}
                </p>
                
                {/* CTA Buttons */}
                <div className="mt-10 md:mt-12 flex flex-wrap items-center gap-4 justify-center md:justify-start">
                  <a 
                    href={currentSlideData.content.cta.primary.href} 
                    className="group relative inline-flex items-center justify-center px-8 py-4 text-sm font-semibold text-white bg-gradient-to-r from-[#4f78e1] to-cyan-500 rounded-lg shadow-lg shadow-[#5885fa]/25 transition-all duration-300 hover:shadow-[#5885fa]/40 hover:shadow-xl hover:-translate-y-0.5 focus:ring-2 focus:ring-[#799dfb] focus:ring-offset-2 focus:ring-offset-slate-900"
                  >
                    <span className="relative z-10">{currentSlideData.content.cta.primary.text}</span>
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#5885fa] to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </a>
                  
                  {currentSlideData.content.cta.secondary && (
                    <a 
                      href={currentSlideData.content.cta.secondary.href} 
                      className="text-slate-300 hover:text-white text-sm font-medium transition-colors duration-300 hover:underline"
                    >
                      {currentSlideData.content.cta.secondary.text}
                    </a>
                  )}
                </div>


              </div>
            </div>
            
            {/* Right column - Foreground image */}
            <div className="relative w-full h-[52vh] md:h-[72vh] flex items-center justify-center">
              {currentSlideData.foregroundImage && (
                <img
                  key={`img-${currentSlide}`}
                  src={currentSlideData.foregroundImage}
                  alt={`Vizuál pro ${currentSlideData.content.headline}`}
                  className="max-h-full w-auto drop-shadow-2xl animate-fadeInUp"
                  loading="eager"
                  decoding="async"
                />
              )}
            </div>
          </div>
        </div>

        {/* Indikátory na spodku obrazovky */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <nav aria-label="Slider navigace">
            <div className="flex gap-6">
              {slides.map((slide, idx) => (
                <button
                  key={slide.id}
                  onClick={() => {
                    setCurrentSlide(idx);
                    setProgress(0);
                  }}
                  className="text-center group relative transition-all duration-300 hover:scale-105"
                  aria-current={currentSlide === idx}
                >
                  {/* Progress bar */}
                  <div className={`h-1.5 w-16 rounded-full transition-all duration-300 overflow-hidden relative ${
                    currentSlide === idx 
                      ? "bg-white/20 shadow-md shadow-[#5885fa]/20" 
                      : "bg-white/30 group-hover:bg-white/50"
                  }`}>
                    {currentSlide === idx && (
                      <span
                        className="absolute left-0 top-0 h-full rounded-full"
                        style={{
                          width: `${Math.round(progress * 100)}%`,
                          background: "linear-gradient(90deg, #5885fa 0%, #8aaafc 100%)",
                          boxShadow: '0 0 12px 0 rgba(59, 130, 246, 0.8)',
                          transition: progress === 0 ? 'none' : 'width 0.1s linear'
                        }}
                      />
                    )}
                  </div>
                  
                  {/* Text labels */}
                  <div className="mt-2 select-none min-w-[64px]">
                    <div className={`text-[10px] uppercase tracking-wider font-medium transition-colors ${
                      currentSlide === idx ? "text-white" : "text-slate-200/85 group-hover:text-slate-100"
                    }`}>
                      {slide.footTitle}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </section>
  );
}
