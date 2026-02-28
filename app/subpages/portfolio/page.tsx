"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import RegisterPanel from "../../../components/RegisterPanel";
import NuxtStyleHero from "../../../components/sections/NuxtStyleHero";
import { Search, Loader2 } from "lucide-react";

export default function PortfolioPage() {
  const [showRegister, setShowRegister] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Vše");
  
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(0);
  const limit = 12;

  const fetchProjects = async (currentOffset: number, append = false) => {
    try {
      if (append) setLoadingMore(true);
      else setLoading(true);

      const res = await fetch(`/api/portfolio?limit=${limit}&offset=${currentOffset}`);
      const data = await res.json();
      
      if (data.items) {
        if (append) {
          setProjects(prev => [...prev, ...data.items]);
        } else {
          setProjects(data.items);
        }
        setTotal(data.total);
      }
    } catch (error) {
      console.error("Failed to fetch portfolio", error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchProjects(0);
  }, []);

  const handleLoadMore = () => {
    const newOffset = offset + limit;
    setOffset(newOffset);
    fetchProjects(newOffset, true);
  };

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (project.description && project.description.toLowerCase().includes(searchQuery.toLowerCase()));
      // We don't have categories in DB yet, so we ignore activeCategory for now
      return matchesSearch;
    });
  }, [searchQuery, activeCategory, projects]);

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
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="w-8 h-8 text-[#5885fa] animate-spin" />
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProjects.map((project) => (
                    <div
                      key={project.id}
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
                        {project.image_url ? (
                          <Image
                            src={project.image_url}
                            alt={project.title}
                            fill
                            className="object-cover"
                            quality={80}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-500">
                            Bez obrázku
                          </div>
                        )}
                      </div>
                      <div className="p-5 flex flex-col gap-2 bg-slate-900/60">
                        <h3 className="text-lg font-bold text-white group-hover:text-[#5885fa] transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-sm text-slate-200 leading-relaxed line-clamp-2">{project.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Load More Button */}
                {projects.length < total && !searchQuery && (
                  <div className="mt-12 flex justify-center">
                    <button
                      onClick={handleLoadMore}
                      disabled={loadingMore}
                      className="flex items-center gap-2 px-8 py-3 bg-[#5885fa]/10 text-[#5885fa] border border-[#5885fa]/20 rounded-xl hover:bg-[#5885fa]/20 transition-colors font-medium"
                    >
                      {loadingMore ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Načítání...
                        </>
                      ) : (
                        "Načíst další projekty"
                      )}
                    </button>
                  </div>
                )}
              </>
            )}

            {/* Empty State */}
            {!loading && filteredProjects.length === 0 && (
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
