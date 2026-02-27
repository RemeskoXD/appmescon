"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronUp, ChevronDown, ShieldCheck, Scale } from "lucide-react";

interface SubSection {
  id: string;
  title: string;
  contentHtml: string;
}

interface Section {
  id: string;
  title: string;
  contentHtml: string;
  subSections: SubSection[];
}

interface TermsClientProps {
  sections: Section[];
  title?: string;
  description?: React.ReactNode;
  icon?: React.ReactNode;
}

export default function TermsClient({ 
  sections, 
  title = "Obchodní podmínky", 
  description,
  icon
}: TermsClientProps) {
  const [activeSection, setActiveSection] = useState<string>(sections[0]?.id || "");
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const showBackToTopRef = useRef(false);

  // Initialize expanded sections (open the first one by default)
  useEffect(() => {
    if (sections.length > 0) {
      setExpandedSections([sections[0].id]);
    }
  }, [sections]);

  // ScrollSpy Logic
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const intersecting = entries.filter((e) => e.isIntersecting);
        if (intersecting.length === 0) return;

        // Pick the element closest to the top of viewport
        intersecting.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        const topEntry = intersecting[0];
        const id = topEntry.target.id;

        setActiveSection((prev) => (prev === id ? prev : id));

        // Find the parent section ID to keep expanded
        let parentId = id;
        if (id.startsWith("sub-")) {
          const parent = sections.find((s) => s.subSections.some((sub) => sub.id === id));
          if (parent) parentId = parent.id;
        }

        // Auto-expand ONLY the current section (close others)
        setExpandedSections((prev) => (prev.length === 1 && prev[0] === parentId ? prev : [parentId]));
      },
      {
        rootMargin: "-10% 0px -80% 0px", // Adjusted for better triggering
        threshold: 0,
      }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
      
      section.subSections.forEach(sub => {
         const subElement = document.getElementById(sub.id);
         if (subElement) observer.observe(subElement);
      });
    });

    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        const next = window.scrollY > 400;
        if (showBackToTopRef.current !== next) {
          showBackToTopRef.current = next;
          setShowBackToTop(next);
        }
        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [sections]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActiveSection(id);
    }
  };

  const toggleSection = (id: string) => {
    setExpandedSections(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-[#020617] min-h-screen text-slate-300 font-sans selection:bg-[#5885fa]/30 relative">
      
      {/* Nuxt-like Aurora Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#5885fa]/10 rounded-full blur-[120px] opacity-40 mix-blend-screen" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#5885fa]/10 rounded-full blur-[100px] opacity-30 mix-blend-screen" />
        <div className="absolute top-[20%] left-[20%] w-[300px] h-[300px] bg-[#5885fa]/5 rounded-full blur-[80px] opacity-20" />
      </div>

      <div className="page-container py-12 lg:py-20 relative z-10">
        
        {/* Header */}
        <div className="max-w-4xl mx-auto mb-20 text-center">
          <div className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-[#5885fa]/10 to-[#5885fa]/5 rounded-2xl mb-8 border border-[#5885fa]/20 shadow-[0_0_30px_-10px_rgba(88,133,250,0.3)]">
            {icon || <Scale className="w-10 h-10 text-[#5885fa]" />}
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-8 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-slate-400">
            {title}
          </h1>
          <div className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-light">
            {description || (
              <>
                Tyto obchodní podmínky upravují vztahy mezi společností <span className="text-[#5885fa] font-medium">MESCON DIGITAL s.r.o.</span> a jejími klienty.
              </>
            )}
          </div>
          <div className="mt-10 flex items-center justify-center gap-6 text-sm font-medium text-slate-500">
            <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/50 border border-slate-800">
              <ShieldCheck className="w-4 h-4 text-[#5885fa]" />
              Platné od 1. 1. 2026
            </span>
            <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/50 border border-slate-800">
              <span className="w-2 h-2 bg-[#5885fa] rounded-full animate-pulse" />
              Verze 1.2
            </span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 relative items-start">
          
          {/* Sidebar Navigation - Sticky (Nuxt Style) */}
          <aside className="hidden lg:block w-72 flex-shrink-0 sticky top-28 h-[calc(100vh-7rem)] overflow-y-auto pr-4 custom-scrollbar z-20">
            <div className="pl-4 border-l border-slate-800/50">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-6 pl-4">
                  Obsah
                </h3>
                <nav className="space-y-0.5">
                  {sections.map((section) => {
                    const isExpanded = expandedSections.includes(section.id);
                    const isActive = activeSection === section.id || section.subSections.some(sub => sub.id === activeSection);

                    return (
                      <div key={section.id} className="relative">
                        <button
                          onClick={() => {
                            scrollToSection(section.id);
                            toggleSection(section.id);
                          }}
                          className={cn(
                            "group flex items-center w-full text-left px-4 py-2 text-sm transition-all duration-200 justify-between border-l -ml-[17px]",
                            isActive
                              ? "border-[#5885fa] text-[#5885fa] font-medium bg-[#5885fa]/5"
                              : "border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-600"
                          )}
                        >
                          <span className="truncate">{section.title}</span>
                        </button>
                        
                        {/* Submenu */}
                        {isExpanded && section.subSections.length > 0 && (
                          <div className="mt-1 space-y-0.5">
                            {section.subSections.map((sub) => (
                              <button
                                key={sub.id}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  scrollToSection(sub.id);
                                }}
                                className={cn(
                                  "block w-full text-left pl-8 pr-4 py-1.5 text-xs transition-colors border-l -ml-[17px]",
                                  activeSection === sub.id
                                    ? "border-[#5885fa] text-[#5885fa] bg-[#5885fa]/5"
                                    : "border-transparent text-slate-500 hover:text-slate-300 hover:border-slate-700"
                                )}
                              >
                                {sub.title}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </nav>
              </div>
          </aside>

          {/* Mobile Navigation Dropdown */}
          <div className="lg:hidden mb-8 sticky top-20 z-30 w-full">
            <div className="bg-[#020617]/80 backdrop-blur-xl border border-slate-800 rounded-xl p-4 shadow-2xl ring-1 ring-white/10">
              <label htmlFor="mobile-nav" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Přejít na sekci:
              </label>
              <div className="relative">
                <select
                  id="mobile-nav"
                  value={activeSection}
                  onChange={(e) => scrollToSection(e.target.value)}
                  className="block w-full bg-slate-900/50 border border-slate-700 text-slate-200 rounded-lg py-3 px-4 focus:ring-2 focus:ring-[#5885fa] focus:border-transparent outline-none appearance-none"
                >
                  {sections.map((section) => (
                    <optgroup key={section.id} label={section.title}>
                      <option value={section.id}>
                        {section.title}
                      </option>
                      {section.subSections.map(sub => (
                        <option key={sub.id} value={sub.id}>
                          — {sub.title}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <div className="space-y-20">
              {sections.map((section) => (
                <section 
                  key={section.id} 
                  id={section.id} 
                  className="scroll-mt-32"
                >
                  <div className="relative mb-10 group">
                    <div className="absolute -left-6 top-1 bottom-1 w-1 bg-gradient-to-b from-[#5885fa] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
                    <h2 className="text-3xl lg:text-4xl font-bold text-white tracking-tight flex items-center gap-4">
                      <span className="text-[#5885fa]/50 text-2xl lg:text-3xl">#</span>
                      {section.title}
                    </h2>
                  </div>
                  
                  {/* Section Intro Content */}
                  {section.contentHtml && (
                    <div 
                      className="prose prose-invert prose-lg max-w-none 
                        prose-headings:text-white prose-headings:font-bold prose-headings:tracking-tight
                        prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4
                        prose-p:text-slate-400 prose-p:leading-relaxed prose-p:mb-6
                        prose-a:text-[#5885fa] prose-a:no-underline prose-a:border-b prose-a:border-[#5885fa]/30 hover:prose-a:border-[#5885fa] prose-a:transition-colors
                        prose-strong:text-slate-200 prose-strong:font-semibold
                        
                        /* Hide HRs */
                        prose-hr:hidden

                        /* Card-like Lists */
                        prose-ul:grid prose-ul:gap-3 prose-ul:grid-cols-1 prose-ul:md:grid-cols-2 prose-ul:my-8 prose-ul:list-none prose-ul:pl-0
                        prose-li:bg-slate-900/40 prose-li:backdrop-blur-sm prose-li:p-5 prose-li:rounded-xl prose-li:border prose-li:border-slate-800/60 
                        prose-li:m-0 prose-li:transition-all prose-li:duration-300 hover:prose-li:border-[#5885fa]/40 hover:prose-li:bg-[#5885fa]/5 hover:prose-li:-translate-y-1
                        prose-li:flex prose-li:items-start prose-li:gap-3
                        
                        /* Custom List Marker for List Items */
                        prose-li:before:content-['•'] prose-li:before:flex-shrink-0 prose-li:before:flex prose-li:before:items-center prose-li:before:justify-center
                        prose-li:before:w-6 prose-li:before:h-6 prose-li:before:rounded-full prose-li:before:bg-[#5885fa]/10 prose-li:before:text-[#5885fa] prose-li:before:text-xs prose-li:before:font-bold
                        prose-li:before:static prose-li:before:mr-0 prose-li:before:bg-none
                        
                        mb-10"
                      dangerouslySetInnerHTML={{ __html: section.contentHtml }}
                    />
                  )}

                  {/* Subsections */}
                  <div className="space-y-12 border-l border-slate-800/50 pl-8 ml-2">
                    {section.subSections.map((sub) => (
                      <div 
                        key={sub.id} 
                        id={sub.id} 
                        className="scroll-mt-32 relative"
                      >
                        <h3 className="text-xl font-semibold text-slate-100 mb-6 flex items-center gap-3 group">
                          <span className="w-2 h-2 rounded-full bg-slate-700 group-hover:bg-[#5885fa] transition-colors duration-300" />
                          {sub.title}
                        </h3>
                        <div 
                          className="prose prose-invert prose-slate max-w-none 
                            prose-p:text-slate-400 prose-p:leading-7 prose-p:mb-4
                            prose-strong:text-slate-200 prose-strong:font-semibold
                            
                            /* Hide HRs */
                            prose-hr:hidden

                            /* Card-like Lists for Subsections too */
                            prose-ul:grid prose-ul:gap-3 prose-ul:grid-cols-1 prose-ul:md:grid-cols-2 prose-ul:my-6 prose-ul:list-none prose-ul:pl-0
                            prose-li:bg-slate-900/40 prose-li:p-4 prose-li:rounded-lg prose-li:border prose-li:border-slate-800/60 
                            prose-li:m-0 prose-li:transition-all hover:prose-li:border-[#5885fa]/40 hover:prose-li:bg-[#5885fa]/5
                            prose-li:flex prose-li:items-start prose-li:gap-3
                            
                            prose-li:before:content-['•'] prose-li:before:flex-shrink-0 prose-li:before:flex prose-li:before:items-center prose-li:before:justify-center
                            prose-li:before:w-5 prose-li:before:h-5 prose-li:before:rounded-full prose-li:before:bg-[#5885fa]/10 prose-li:before:text-[#5885fa] prose-li:before:text-[10px] prose-li:before:font-bold
                            prose-li:before:static prose-li:before:mr-0"
                          dangerouslySetInnerHTML={{ __html: sub.contentHtml }}
                        />
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </div>
            
            {/* Footer of content */}
            <div className="mt-24 pt-10 border-t border-slate-800 flex justify-between items-center text-sm text-slate-500">
              <p>© 2025 MESCON DIGITAL s.r.o.</p>
              <a href="#" className="hover:text-[#5885fa] transition-colors">Zpět nahoru</a>
            </div>
          </div>

        </div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={cn(
          "fixed bottom-8 right-8 p-3 bg-[#5885fa] text-white rounded-full shadow-[0_0_20px_rgba(88,133,250,0.4)] transition-all duration-300 hover:bg-[#4263eb] hover:scale-110 z-50",
          showBackToTop ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0 pointer-events-none"
        )}
        aria-label="Zpět nahoru"
      >
        <ChevronUp className="w-6 h-6" />
      </button>

    </div>
  );
}
