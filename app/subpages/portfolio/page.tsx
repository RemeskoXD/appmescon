"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import RegisterPanel from "../../../components/RegisterPanel";
import NuxtStyleHero from "../../../components/sections/NuxtStyleHero";
import { Search } from "lucide-react";

// Ukázky hotových webů (obecné placeholdery)
const projects = [
  {
    title: "Firemní web",
    image: "https://web2.itnahodinu.cz/mescon/images/portfolio/website-1.svg",
    url: "https://example.com",
    tag: "B2B / SaaS",
    desc: "Hotový prezentační web pro firmy s důrazem na přehled služeb a jasné konverzní cesty.",
    downloads: "2.1k",
    stars: "118"
  },
  {
    title: "Produktový web",
    image: "https://web2.itnahodinu.cz/mescon/images/portfolio/website-2.svg",
    url: "https://example.com",
    tag: "Produkt",
    desc: "Jednostránkový web pro představení produktu, klíčových funkcí a poptávkových formulářů.",
    downloads: "940",
    stars: "52"
  },
  {
    title: "Rezervační web",
    image: "https://web2.itnahodinu.cz/mescon/images/portfolio/website-3.svg",
    url: "https://example.com",
    tag: "Rezervace",
    desc: "Web s rezervačním systémem, správou kapacit a automatickými upozorněními pro zákazníky.",
    downloads: "1.3k",
    stars: "90"
  },
  {
    title: "Klientský portál",
    image: "https://web2.itnahodinu.cz/mescon/images/portfolio/website-2.svg",
    url: "https://example.com",
    tag: "Portál",
    desc: "Self‑service portál pro správu účtů, dokumentů a SLA přehledů včetně notifikací.",
    downloads: "520+",
    stars: "36"
  },
  {
    title: "E‑commerce vitrína",
    image: "https://web2.itnahodinu.cz/mescon/images/portfolio/website-3.svg",
    url: "https://example.com",
    tag: "E‑shop",
    desc: "Hotová e‑commerce šablona s katalogem, filtry a připraveným napojením na sklad a ERP.",
    downloads: "3.4k",
    stars: "210"
  },
  {
    title: "Webová aplikace",
    image: "https://web2.itnahodinu.cz/mescon/images/portfolio/website-4.svg",
    url: "https://example.com",
    tag: "Aplikace",
    desc: "Frontend rozhraní webové aplikace se zaměřením na výkon, bezpečnost a jasné toky uživatelů.",
    downloads: "1.8k",
    stars: "130"
  }
];

export default function PortfolioPage() {
  const [showRegister, setShowRegister] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Vše");

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.desc.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === "Vše" || project.tag === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  const openProject = (url?: string) => {
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#020617] text-white">
      {/* Hero / Intro Section with Filtering */}
      <div className="border-b border-slate-800/60">
        <NuxtStyleHero
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
      </div>

      {/* Main Content: Grid Only (No Sidebar) */}
      <div className="page-container py-12">
        <div className="flex flex-col gap-10">
          {/* Úvod portfolia */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h1 className="text-4xl sm:text-5xl font-bold text-white">
              <span className="text-[#5885fa]">Portfolio</span> hotových webů
            </h1>
            <p className="text-lg text-white leading-relaxed">
              Ukázka typů dokončených webů a aplikací, kde lze doplnit fotky, odkazy a krátké informace k nasazeným projektům, které klienti aktivně používají.
            </p>
          </div>

          {/* Grid - Projects */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <div
                  key={project.title}
                  className="group flex flex-col bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl overflow-hidden hover:border-[#5885fa]/50 transition-all duration-300 cursor-pointer"
                  role={project.url ? "link" : undefined}
                  tabIndex={project.url ? 0 : -1}
                  onClick={() => openProject(project.url)}
                  onKeyDown={(e) => {
                    if ((e.key === "Enter" || e.key === " ") && project.url) {
                      e.preventDefault();
                      openProject(project.url);
                    }
                  }}
                >
                  <div className="relative h-48 bg-slate-800">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                      quality={80} // Reduced quality for optimization
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-5 flex flex-col gap-2 bg-slate-900/60">
                    <h3 className="text-lg font-bold text-white group-hover:text-[#5885fa] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-slate-200 leading-relaxed">{project.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {filteredProjects.length === 0 && (
              <div className="text-center py-20">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-800/50 mb-4">
                  <Search className="w-8 h-8 text-slate-500" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Nebyly nalezeny žádné projekty</h3>
                <p className="text-slate-400">Zkuste upravit hledání nebo změnit kategorii.</p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("Vše");
                  }}
                  className="mt-6 text-[#5885fa] hover:underline"
                >
                  Vymazat filtry
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <RegisterPanel open={showRegister} onClose={() => setShowRegister(false)} />
    </main>
  );
}
