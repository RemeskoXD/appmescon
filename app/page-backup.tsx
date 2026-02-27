import FullScreenSlider from "../components/FullScreenSlider";

// Loga partnerů (stejná sada jako na /partneri)
const partners = [10, 11, 12, 13, 14, 15];

export default function Page() {
  return (
    <>
  <FullScreenSlider />
  {/* Partnerský úvod byl odstraněn dle požadavku – ponechán pouze karusel log níže */}

      {/* Karusel partnerů – uvnitř containeru, větší loga a gradientové okraje */}
      <section className="relative">
        <div className="page-container px-6 md:px-10">
          <div className="relative overflow-hidden rounded-xl border border-[#23283a] bg-[#10131d]/60 backdrop-blur-sm">
            <span className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-24 bg-gradient-to-r from-[#0c0e16] via-[#0c0e16]/50 to-transparent" />
            <span className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-24 bg-gradient-to-l from-[#0c0e16] via-[#0c0e16]/50 to-transparent" />
            <div className="flex gap-10 animate-partner-marquee will-change-transform py-5 pl-6 partner-rail">
              {partners.map((n) => (
                // eslint-disable-next-line @next/next/no-img-element
        <img key={`s1-${n}`} src={`/images/partner_badget/${n}.svg`} alt={`Logo partnera ${n}`} className="h-14 sm:h-16 md:h-20 w-auto opacity-95" />
              ))}
              {partners.map((n) => (
                // eslint-disable-next-line @next/next/no-img-element
        <img key={`s2-${n}`} src={`/images/partner_badget/${n}.svg`} alt="" aria-hidden="true" className="h-14 sm:h-16 md:h-20 w-auto opacity-95" />
              ))}
              {partners.map((n) => (
                // eslint-disable-next-line @next/next/no-img-element
        <img key={`s3-${n}`} src={`/images/partner_badget/${n}.svg`} alt="" aria-hidden="true" className="h-14 sm:h-16 md:h-20 w-auto opacity-95" />
              ))}
            </div>
          </div>
        </div>
      </section>
  {/* Hero sekce odstraněna dle požadavku */}
      {/* Produktové karty (2x2) */}
      <section className="relative py-16 sm:py-20 md:py-28">
  <div className="page-container px-6 md:px-10">
          <div className="text-center mb-14 md:mb-20">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight reveal">
              Propojený Ekosystém Produktů
            </h2>
            <p className="mt-5 max-w-2xl mx-auto text-slate-300 text-base leading-relaxed reveal reveal-delay-1">
              Vyberte si modul a rozšiřte audit do akční analytiky, optimalizace a automatizace.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 lg:gap-8 w-full">
            {/* Karta 1: Akademie */}
            <div className="product-card product-card--square p-4 md:p-5 flex flex-col reveal product-square transition-transform duration-150 ease-in-out hover:scale-[1.02] hover:shadow-2xl focus-within:scale-[1.02] focus-within:shadow-2xl">
              <div className="mb-6 product-graphic flex items-center justify-center">
                {/* Ikona Akademie */}
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-label="Akademie" className="mx-auto">
                  <rect x="8" y="16" width="32" height="20" rx="4" fill="#5885fa" fillOpacity="0.15" />
                  <rect x="12" y="20" width="24" height="12" rx="2" fill="#5885fa" fillOpacity="0.25" />
                  <path d="M24 28v-4" stroke="#5885fa" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white tracking-tight mb-3">Akademie</h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-6">Vzdělávací platforma pro týmy, rozvoj znalostí a školení.</p>
              <a href="https://www.mesconacademy.cz/" target="_blank" rel="noopener noreferrer" className="product-cta text-accent-500 hover:text-accent-400 mt-auto focus:outline-none focus:ring-2 focus:ring-accent-500" role="button">Navštívit Akademii <span>→</span></a>
            </div>
            {/* Karta 2: Web Hosting */}
            <div className="product-card product-card--square p-4 md:p-5 flex flex-col reveal reveal-delay-1 product-square">
              <div className="mb-6 product-graphic">
                <div className="grid grid-cols-3 gap-1">
                  {Array.from({ length: 9 }).map((_,i) => (
                    <div key={i} className="h-8 rounded-md bg-gradient-to-br from-[#1a1f2e] to-[#121722] border border-[#23283a]" />
                  ))}
                </div>
                <div className="absolute top-3 right-3 h-10 w-10 rounded-full bg-accent-500/20 border border-accent-500/30" />
                <div className="product-micro-row mt-3">
                  <div className="product-bar w-16" />
                  <div className="product-bar w-10 opacity-60" />
                  <div className="product-bar w-8 opacity-40" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white tracking-tight mb-3">Profesionální Web Hosting</h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-6">Rychlé, škálovatelné a bezpečné hostingové řešení pro moderní aplikace.</p>
              <a href="#" className="product-cta text-accent-500 hover:text-accent-400 mt-auto">Zobrazit plány <span>→</span></a>
            </div>
            {/* Karta 3: SEO Optimalizace */}
            <div className="product-card product-card--square p-4 md:p-5 flex flex-col reveal reveal-delay-2 product-square">
              <div className="mb-6 product-graphic">
                <svg viewBox="0 0 320 140" className="w-full h-full" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="seoGrad" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#799dfb" stopOpacity="0.85" />
                      <stop offset="100%" stopColor="#799dfb" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <rect x="12" y="82" width="20" height="40" rx="3" fill="#1d2333" stroke="#2b3245" />
                  <rect x="52" y="66" width="20" height="56" rx="3" fill="#1d2333" stroke="#2b3245" />
                  <rect x="92" y="50" width="20" height="72" rx="3" fill="#1d2333" stroke="#2b3245" />
                  <rect x="132" y="34" width="20" height="88" rx="3" fill="#1d2333" stroke="#2b3245" />
                  <rect x="172" y="26" width="20" height="96" rx="3" fill="#1d2333" stroke="#2b3245" />
                  <rect x="212" y="18" width="20" height="104" rx="3" fill="#1d2333" stroke="#2b3245" />
                  <rect x="252" y="10" width="20" height="112" rx="3" fill="#1d2333" stroke="#2b3245" />
                  <path d="M16 78 C60 60 120 42 170 46 C220 50 250 30 300 20" stroke="#799dfb" strokeWidth="2.4" fill="none" strokeLinecap="round" />
                </svg>
                <div className="product-micro-row mt-1">
                  <div className="product-bar w-10" />
                  <div className="product-bar w-14 opacity-60" />
                  <div className="product-bar w-8 opacity-40" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white tracking-tight mb-3">SEO & Optimalizace</h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-6">Zvyšte viditelnost ve vyhledávačích a dominujte klíčovým dotazům.</p>
              <a href="#" className="product-cta text-accent-500 hover:text-accent-400 mt-auto">Začít audit <span>→</span></a>
            </div>
            {/* Karta 4: Marketing Automation */}
            <div className="product-card product-card--square p-4 md:p-5 flex flex-col reveal reveal-delay-3 product-square">
              <div className="mb-6 product-graphic">
                <div className="absolute inset-0 opacity-80">
                  <svg viewBox="0 0 320 140" className="w-full h-full" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="flowGrad" x1="0" x2="1" y1="0" y2="1">
                        <stop offset="0%" stopColor="#5885fa" stopOpacity="0.15" />
                        <stop offset="100%" stopColor="#799dfb" stopOpacity="0.05" />
                      </linearGradient>
                    </defs>
                    <rect x="0" y="0" width="320" height="140" fill="url(#flowGrad)" />
                    <path d="M40 30 H120 V50 H180 V70 H240 V90 H280" stroke="#5885fa" strokeWidth="2" fill="none" strokeLinecap="round" />
                    <path d="M40 48 H100 V68 H160 V88 H220 V108 H260" stroke="#799dfb" strokeWidth="2" fill="none" strokeLinecap="round" />
                    <circle cx="120" cy="40" r="4" fill="#5885fa" />
                    <circle cx="180" cy="60" r="4" fill="#5885fa" />
                    <circle cx="240" cy="80" r="4" fill="#5885fa" />
                    <circle cx="100" cy="58" r="3" fill="#799dfb" />
                    <circle cx="160" cy="78" r="3" fill="#799dfb" />
                    <circle cx="220" cy="98" r="3" fill="#799dfb" />
                  </svg>
                </div>
                <div className="product-micro-row mt-auto">
                  <div className="product-bar w-14" />
                  <div className="product-bar w-10 opacity-60" />
                  <div className="product-bar w-8 opacity-40" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white tracking-tight mb-3">Marketing Automation</h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-6">Automatizace kampaní, segmentace a škálování výkonu.</p>
              <a href="#" className="product-cta text-accent-500 hover:text-accent-400 mt-auto">Prozkoumat <span>→</span></a>
            </div>
          </div>
        </div>
      </section>
      {/* How it works sekce */}
      <section className="relative py-20 sm:py-24 md:py-32">
  <div className="page-container px-6 md:px-10">
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight reveal">
              Jak to Funguje
            </h2>
            <p className="mt-5 max-w-2xl mx-auto text-slate-300 text-base leading-relaxed reveal reveal-delay-1">
              Jednoduchý proces pro rychlé výsledky a komplexní analýzu vašeho digitálního marketingu.
            </p>
          </div>
          {/* 4 kroky */}
          <div className="grid md:grid-cols-4 gap-6 md:gap-8 mb-24">
            {[
              { step: 1, title: 'Automatický Sběr Dat', text: 'Propojíme sociální sítě, web, reklamní účty a další kanály.' },
              { step: 2, title: 'AI-Powered Analýza', text: 'Algoritmy projdou signály a identifikují slabiny i příležitosti.' },
              { step: 3, title: 'Výsledky & Insights', text: 'Kompletní report s metrikami a výkonnostními ukazateli do 30 dnů.' },
              { step: 4, title: 'Doporučení na Zlepšení', text: 'Konkrétní kroky a strategie pro optimalizaci kanálů.' }
            ].map((k, i) => (
              <div key={k.step} className={`reveal reveal-delay-${i}`}> 
                <div className="h-full rounded-xl border border-[#23283a] bg-[#10131d]/70 backdrop-blur-sm p-6 flex flex-col hover:border-[#2d3347] transition-colors relative">
                  <div className="absolute -top-3 -left-3 h-10 w-10 rounded-lg bg-accent-500 text-white font-semibold flex items-center justify-center shadow-md text-sm">
                    {k.step}
                  </div>
                  <h3 className="mt-6 mb-3 text-[16px] font-semibold tracking-tight text-white leading-snug">{k.title}</h3>
                  <p className="text-sm text-slate-300 leading-relaxed">{k.text}</p>
                </div>
              </div>
            ))}
          </div>
          {/* Flow diagram */}
          <div className="relative rounded-2xl border border-[#23283a] bg-[#10131d]/70 backdrop-blur-sm p-8 md:p-12 overflow-hidden reveal">
            <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-accent-500/10 blur-3xl" />
            <div className="grid md:grid-cols-3 gap-10 items-center">
              {/* Vstupy */}
              <div className="space-y-6 text-sm">
                {[
                  'Social Media Data',
                  'Website Analytics',
                  'Ads Performance',
                  'SEO Metrics'
                ].map(src => (
                  <div key={src} className="group relative pl-4">
                    <span className="absolute left-0 top-1.5 h-2 w-2 rounded-full bg-accent-500 group-hover:scale-110 transition-transform" />
                    <span className="text-slate-300 group-hover:text-white transition-colors">{src}</span>
                  </div>
                ))}
              </div>
              {/* Střední engine */}
              <div className="relative">
                <div className="mx-auto w-48 h-48 rounded-2xl border border-[#2d3347] bg-gradient-to-br from-[#161b27] to-[#0f121a] flex flex-col items-center justify-center text-center shadow-mega">
                  <div className="mb-3 h-10 w-10 rounded-full bg-accent-500/15 flex items-center justify-center">
                    <div className="h-4 w-4 rounded-full bg-accent-500 animate-pulse" />
                  </div>
                  <h3 className="text-sm font-semibold tracking-wide text-white">AI Analysis<br />Engine</h3>
                  <p className="mt-2 text-[11px] leading-relaxed text-slate-400 px-4">Korelace signálů, segmentace, skórování anomálií.</p>
                </div>
                {/* Spojovací čáry */}
                <svg className="pointer-events-none absolute inset-0 -z-10" viewBox="0 0 400 400" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="flowLine" x1="0" x2="1" y1="0" y2="0">
                      <stop offset="0%" stopColor="#5885fa" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#799dfb" stopOpacity="0.9" />
                    </linearGradient>
                  </defs>
                  {/* Vstupní linie z levé strany */}
                  <path d="M0 60 C150 60 150 120 200 140" stroke="url(#flowLine)" strokeWidth="2" fill="none" strokeLinecap="round" />
                  <path d="M0 130 C140 130 150 150 200 170" stroke="url(#flowLine)" strokeWidth="2" fill="none" strokeLinecap="round" />
                  <path d="M0 200 C140 200 150 180 200 210" stroke="url(#flowLine)" strokeWidth="2" fill="none" strokeLinecap="round" />
                  <path d="M0 270 C150 270 160 240 200 240" stroke="url(#flowLine)" strokeWidth="2" fill="none" strokeLinecap="round" />
                  {/* Výstupní linie vpravo */}
                  <path d="M200 160 C260 150 280 120 400 120" stroke="url(#flowLine)" strokeWidth="2" fill="none" strokeLinecap="round" />
                  <path d="M200 220 C280 220 300 250 400 250" stroke="url(#flowLine)" strokeWidth="2" fill="none" strokeLinecap="round" />
                </svg>
              </div>
              {/* Výstupy */}
              <div className="space-y-10 text-sm">
                <div className="group relative pl-4">
                  <span className="absolute left-0 top-1.5 h-2 w-2 rounded-full bg-accent-500 group-hover:scale-110 transition-transform" />
                  <span className="text-slate-300 group-hover:text-white transition-colors">Performance Report</span>
                  <div className="mt-2 ml-4 text-[11px] leading-relaxed text-slate-400">Detailní skóre, segmenty, trendové grafy.</div>
                </div>
                <div className="group relative pl-4">
                  <span className="absolute left-0 top-1.5 h-2 w-2 rounded-full bg-accent-500 group-hover:scale-110 transition-transform" />
                  <span className="text-slate-300 group-hover:text-white transition-colors">Optimization Plan</span>
                  <div className="mt-2 ml-4 text-[11px] leading-relaxed text-slate-400">Prioritizované kroky, odhadovaný dopad, časová náročnost.</div>
                </div>
                <div>
                  <button className="mt-4 focus-ring rounded-lg bg-white px-6 py-3 text-sm font-medium text-navy-900 transition-colors hover:bg-slate-100">
                    Začít Audit Zdarma
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  {/* Features sekce */}
  <section className="relative py-20 sm:py-24 md:py-32">
  <div className="page-container px-6 md:px-10">
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight reveal">
              S Nejlepšími Audit Features Váš Business Poroste Rychle
            </h2>
            <p className="mt-5 max-w-2xl mx-auto text-slate-300 text-base leading-relaxed reveal reveal-delay-1">
              Robustní sada nástrojů propojuje data z výkonu, SEO a konverzí. Získejte jasné priority a rychlejší růst.
            </p>
          </div>
          {/* 3 sloupce */}
          <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-24">
            {[
              {
                title: 'Analýza Výkonu',
                desc: 'Konsolidovaný přehled technických a behaviorálních metrik. Zjistěte, kde ztrácíte výkon a proč.',
                icon: (
                  <svg viewBox="0 0 48 48" className="h-12 w-12 text-accent-500" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M6 38h36" strokeLinecap="round" />
                    <rect x="10" y="22" width="6" height="12" rx="1" className="fill-current text-accent-500/20" />
                    <rect x="21" y="16" width="6" height="18" rx="1" className="fill-current text-accent-500/20" />
                    <rect x="32" y="10" width="6" height="24" rx="1" className="fill-current text-accent-500/20" />
                    <path d="M10 22V12c0-1.1.9-2 2-2h24" strokeLinecap="round" />
                  </svg>
                )
              },
              {
                title: 'SEO Audit',
                desc: 'Technické faktory, indexace, obsahové clustery i SERP pokrytí – prioritizované podle dopadu.',
                icon: (
                  <svg viewBox="0 0 48 48" className="h-12 w-12 text-accent-500" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <circle cx="22" cy="22" r="12" />
                    <path d="M31 31l9 9" strokeLinecap="round" />
                    <path d="M18 20h8M18 24h5" strokeLinecap="round" />
                  </svg>
                )
              },
              {
                title: 'Konverze Tracking',
                desc: 'Analýza funnelu, dropout body a atribuční model. Zvyšte míru dokončení klíčových akcí.',
                icon: (
                  <svg viewBox="0 0 48 48" className="h-12 w-12 text-accent-500" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M8 10h32M8 18h26M8 26h18M8 34h10" strokeLinecap="round" />
                    <path d="M30 18v22l6-6 6 6V18" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )
              }
            ].map((f, i) => (
              <div key={f.title} className={`reveal reveal-delay-${i}`}>
                <div className="h-full rounded-xl border border-[#23283a] bg-[#10131d]/70 backdrop-blur-sm p-6 flex flex-col hover:border-[#2d3347] transition-colors">
                  <div className="mb-6 inline-flex items-center justify-center rounded-lg bg-accent-500/10 h-16 w-16 text-accent-500">
                    {f.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3 tracking-tight">{f.title}</h3>
                  <p className="text-sm text-slate-300 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
          {/* 2 půlky */}
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
            <div className="space-y-6 reveal">
              <h3 className="text-2xl md:text-3xl font-semibold tracking-tight leading-tight">
                Preciznost v Digitální Éře - Váš Audit Začíná Zde
              </h3>
              <p className="text-base text-slate-300 leading-relaxed">
                Naše AI vrstvy korelují výkon kanálů, stránek a kampaní, aby odhalily skutečné příčiny stagnace. Od
                technického zdraví po obsahovou relevanci a konverzní tření – vše v jednotném přehledu.
              </p>
              <ul className="space-y-3 text-sm text-slate-300 leading-relaxed list-disc pl-5">
                <li>Dynamické benchmarky dle segmentu a velikosti</li>
                <li>Prioritizace podle dopadu a náročnosti implementace</li>
                <li>Kontinuální sledování a re‑score po změnách</li>
              </ul>
              <div>
                <button className="focus-ring rounded-lg bg-white px-6 py-3 text-sm font-medium text-navy-900 transition-colors hover:bg-slate-100">
                  Spustit audit
                </button>
              </div>
            </div>
            <div className="reveal reveal-delay-2">
              <div className="relative rounded-xl border border-[#23283a] bg-[#10131d]/70 backdrop-blur-sm p-6 md:p-8 shadow-mega overflow-hidden">
                <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-accent-500/10 blur-3xl" />
                <div className="flex items-center gap-3 mb-6 text-[10px] tracking-wide text-slate-400">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" /> LIVE METRIKY
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                  {[
                    { k: 'Core Web Vitals', v: 'Good 89%' },
                    { k: 'Index Coverage', v: '97%' },
                    { k: 'Content Gaps', v: '12' },
                    { k: 'Funnels OK', v: '3 / 5' },
                    { k: 'Attribution Model', v: 'DDA' },
                    { k: 'Anomálie', v: '2' }
                  ].map(d => (
                    <div key={d.k} className="rounded-md border border-[#23283a] bg-[#141823] p-3 hover:border-[#2d3347] transition-colors">
                      <div className="text-[10px] uppercase tracking-wide text-slate-500">{d.k}</div>
                      <div className="mt-1 font-semibold text-white text-sm">{d.v}</div>
                    </div>
                  ))}
                </div>
                <div className="h-40 relative">
                  <svg viewBox="0 0 420 160" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="grad2" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#5885fa" stopOpacity="0.9" />
                        <stop offset="100%" stopColor="#5885fa" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path d="M0 110 C40 98 55 90 80 86 C110 82 120 74 150 60 C180 48 195 42 220 50 C250 60 255 86 280 90 C310 94 320 78 350 68 C370 62 385 64 420 76 V160 H0 Z" fill="url(#grad2)" />
                    <path d="M0 110 C40 98 55 90 80 86 C110 82 120 74 150 60 C180 48 195 42 220 50 C250 60 255 86 280 90 C310 94 320 78 350 68 C370 62 385 64 420 76" stroke="#799dfb" strokeWidth="2.2" fill="none" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
  </section>
  {/* Skript pro scroll reveal (inline, malý) – umístěn po obsahu kvůli výběru elementů */}
  <script dangerouslySetInnerHTML={{ __html: `(()=>{const els=[...document.querySelectorAll('.reveal')];if(!('IntersectionObserver' in window)){els.forEach(e=>e.classList.add('in-view'));return;}const io=new IntersectionObserver((entries)=>{entries.forEach(en=>{if(en.isIntersecting){en.target.classList.add('in-view');io.unobserve(en.target);}})},{threshold:.2});els.forEach(el=>io.observe(el));})();` }} />
    </>
  );
}