"use client";

import { useEffect, useRef } from "react";
import { Search, Palette, Globe, ShoppingCart, Calendar, Briefcase, Users, Link as LinkIcon } from "lucide-react";
import { initPartnersMarquee } from "../../js/partners-marquee";

interface NuxtStyleHeroProps {
  searchQuery?: string;
  setSearchQuery?: (query: string) => void;
  activeCategory?: string;
  setActiveCategory?: (category: string) => void;
}

export default function NuxtStyleHero({ searchQuery, setSearchQuery, activeCategory, setActiveCategory }: NuxtStyleHeroProps) {
  const marqueeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    initPartnersMarquee(marqueeRef.current);
  }, []);

  const categories = [
    { name: "Vše", icon: Globe },
    { name: "B2B / SaaS", icon: Briefcase },
    { name: "E‑shop", icon: ShoppingCart },
    { name: "Rezervace", icon: Calendar },
    { name: "Kreativa", icon: Palette },
    { name: "Klientský portál", icon: Users },
    { name: "Integrace", icon: LinkIcon }
  ];

  return (
    <div className="relative bg-[#020617] overflow-hidden h-[700px] lg:h-[800px] flex items-center justify-center font-sans text-white">
      {/* Background partners marquee (decorative) */}
      <div ref={marqueeRef} className="partners-marquee-bg" aria-hidden="true">
        <div className="partners-marquee">
          <div
            className="partners-marquee__row partners-marquee__row--1 partners-marquee__row--reverse"
            data-partners-marquee-row
          >
            <div className="partners-marquee__track">
              <div className="partners-marquee__row-content" data-partners-marquee-content="a" />
              <div
                className="partners-marquee__row-content"
                data-partners-marquee-content="b"
                aria-hidden="true"
              />
            </div>
          </div>

          <div className="partners-marquee__row partners-marquee__row--2" data-partners-marquee-row>
            <div className="partners-marquee__track">
              <div className="partners-marquee__row-content" data-partners-marquee-content="a" />
              <div
                className="partners-marquee__row-content"
                data-partners-marquee-content="b"
                aria-hidden="true"
              />
            </div>
          </div>

          <div
            className="partners-marquee__row partners-marquee__row--3 partners-marquee__row--reverse"
            data-partners-marquee-row
          >
            <div className="partners-marquee__track">
              <div className="partners-marquee__row-content" data-partners-marquee-content="a" />
              <div
                className="partners-marquee__row-content"
                data-partners-marquee-content="b"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
        <div className="partners-marquee__overlay" />
      </div>

      {/* Content Overlay */}
      <div className="relative z-20 flex flex-col items-center justify-center px-4 text-center max-w-4xl mx-auto mt-10">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight leading-tight">
          Portfolio webových řešení pro<br className="hidden sm:block" /> stabilní provoz
        </h1>
        <p className="text-lg sm:text-xl text-white max-w-2xl mb-10 leading-relaxed">
          Výběr webových projektů zaměřených na rychlost, bezpečnost a konverze. Přehled pro brand, e‑commerce i klientské portály.
        </p>

        {/* Search Bar */}
        <div className="w-full max-w-xl relative group mb-8">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400 group-focus-within:text-[#5885fa] transition-colors" />
          </div>
          <input
            type="text"
            placeholder="Vyhledat projekt..."
            value={searchQuery}
            onChange={(e) => setSearchQuery?.(e.target.value)}
            className="block w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-12 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#5885fa]/50 focus:border-[#5885fa] transition-all backdrop-blur-md shadow-2xl"
          />
          <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
            <span className="text-slate-500 border border-slate-700 rounded px-2 py-0.5 text-xs font-mono">/</span>
          </div>
        </div>

        {/* Categories / Tags */}
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setActiveCategory?.(cat.name)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-200 ${
                activeCategory === cat.name
                  ? "bg-[#5885fa]/10 border-[#5885fa] text-[#5885fa]"
                  : "bg-slate-900/50 border-slate-800 text-slate-400 hover:border-slate-600 hover:text-slate-200"
              }`}
            >
              <cat.icon className="w-4 h-4" />
              {cat.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
