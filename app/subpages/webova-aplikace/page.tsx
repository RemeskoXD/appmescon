"use client";

import { useState } from "react";
import Button from "../../../components/ui/Button";
import RegisterPanel from "../../../components/RegisterPanel";

const heroHighlights = [
  { title: "Architektura", desc: "Mikroservisy, event-driven, CI/CD a observabilita." },
  { title: "Bezpečnost", desc: "SSO, OAuth2, audit logy, šifrování a rate limiting." },
  { title: "Integrace", desc: "REST/GraphQL API, webhooks, ERP/CRM konektory." }
];

const features = [
  { title: "Škálovatelnost", desc: "Kontejnery, horizontální škálování a autoscaling bez výpadků." },
  { title: "Bezpečnost", desc: "Hardening, SSO, secrets management, audit a řízení přístupů." },
  { title: "Integrace", desc: "API gateway, webhooks, napojení na interní systémy i SaaS." },
  { title: "UX a rychlost", desc: "Real-time data, responzivní UI, optimalizace Core Web Vitals." }
];

const solutions = [
  { title: "Interní systémy", text: "Procesy, schvalování, reporting a řízení přístupu." },
  { title: "Klientské portály", text: "Self-service zóny, notifikace a bezpečné přihlášení." },
  { title: "B2B / B2C", text: "Objednávky, partnerství, katalogy i cenové hladiny." },
  { title: "Automatizace & AI", text: "Workflow engine, AI asistenti a integrační scénáře." },
  { title: "Platformy / SaaS", text: "Modulární architektura, multitenant a monetizace." },
  { title: "Integrace & API", text: "Napojení na třetí strany, ETL, datové sklady a API management." }
];

const steps = [
  { title: "Analýza", desc: "Mapujeme cíle, procesy, rizika a integrační body." },
  { title: "Návrh", desc: "UX, datové modely, architektura a roadmapa releasů." },
  { title: "Vývoj", desc: "Iterace s code review, CI/CD a průběžným testováním." },
  { title: "Testy", desc: "E2E, performance, bezpečnostní a regresní scénáře." },
  { title: "Nasazení", desc: "Automatizované deploymenty, monitoring a alerting." },
  { title: "Správa", desc: "SLAs, incident response a plánování rozvoje." }
];

export default function WebAppPage() {
  const [showRegister, setShowRegister] = useState(false);

  return (
    <main className="bg-[#020617] text-slate-100 overflow-hidden">
      {/* Hero Section - Nuxt-like */}
      <section className="relative border-b border-slate-800/60 pt-20 pb-24 lg:pt-32 lg:pb-40">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[500px] bg-[#5885fa]/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="page-container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left */}
            <div className="text-center lg:text-left">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#5885fa] to-[#eef3fe]">Webové aplikace</span>
                pro interní týmy i zákazníky.
              </h1>
              <p className="text-lg sm:text-xl text-slate-300 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Od portálů přes workflow nástroje až po robustní integrační platformy. Důraz na bezpečnou architekturu, stabilitu, škálování a měřitelné výsledky.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button variant="primary" size="lg" onClick={() => setShowRegister(true)} className="min-w-[160px]">Poptat vývoj</Button>
                <Button variant="outline" size="lg" href="/subpages/portfolio" className="min-w-[160px]">Portfolio</Button>
              </div>

              <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
                {heroHighlights.map((item) => (
                  <div key={item.title} className="border-l-2 border-[#5885fa]/30 pl-4">
                    <h3 className="font-semibold text-white">{item.title}</h3>
                    <p className="text-sm text-slate-400 mt-1">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Code/editor */}
            <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
              <div className="relative rounded-xl bg-[#0f1420] border border-slate-800 shadow-2xl overflow-hidden transform rotate-1 hover:rotate-0 transition-transform duration-500">
                <div className="flex items-center px-4 py-3 bg-[#1e2334]/50 border-b border-slate-800">
                  <div className="w-3 h-3 rounded-full bg-red-500/80 mr-2" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80 mr-2" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  <span className="ml-4 text-xs text-slate-400">apps/control-plane.tsx</span>
                </div>
                <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-800">
                  <div className="p-6 font-mono text-sm leading-relaxed text-slate-200">
{`const status = {
  uptime: '99.95%',
  latency: '62 ms',
  api: 32,
  users: 8420
};`}
                  </div>
                  <div className="p-6 space-y-3">
                    <div className="rounded-xl border border-slate-700 bg-[#0e1530] p-3">
                      <p className="text-xs text-slate-400">Uptime</p>
                      <p className="text-xl font-semibold text-white">99,95 %</p>
                      <p className="text-sm text-slate-300">monitoring + alerting</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-lg border border-slate-700 bg-[#0e1530] p-3">
                        <p className="text-xs text-slate-400">API Req</p>
                        <p className="text-xl font-semibold text-white">32/s</p>
                      </div>
                      <div className="rounded-lg border border-slate-700 bg-[#0e1530] p-3">
                        <p className="text-xs text-slate-400">Users</p>
                        <p className="text-xl font-semibold text-white">8.4k</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -z-10 top-10 -right-10 w-40 h-40 bg-[#5885fa]/20 blur-3xl rounded-full" />
              <div className="absolute -z-10 -bottom-10 -left-10 w-40 h-40 bg-[#5885fa]/20 blur-3xl rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-b border-slate-800/60 bg-[#030712]">
        <div className="page-container py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((item) => (
              <div key={item.title} className="text-center lg:text-left">
                <p className="text-lg font-semibold text-white mb-1">{item.title}</p>
                <p className="text-sm text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-20 lg:py-28">
        <div className="page-container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Řešení na míru</h2>
            <p className="text-slate-400">
              Vyvíjíme systémy, které rostou s vaším byznysem. Od interních nástrojů po globální SaaS platformy.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {solutions.map((sol) => (
              <div key={sol.title} className="group p-6 rounded-2xl border border-slate-800 bg-[#0f1420] hover:border-[#5885fa]/30 transition-colors">
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-[#5885fa] transition-colors">{sol.title}</h3>
                <p className="text-slate-400">{sol.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="border-t border-slate-800/60 bg-[#02091b] py-20">
        <div className="page-container">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Jak pracujeme</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div key={step.title} className="relative pl-8 border-l border-slate-800">
                <span className="absolute -left-[9px] top-0 flex h-4 w-4 items-center justify-center rounded-full bg-[#5885fa] ring-4 ring-[#02091b]" />
                <h3 className="text-lg font-semibold text-white mb-1">{step.title}</h3>
                <p className="text-sm text-slate-400">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {showRegister && (
        <RegisterPanel open={showRegister} onClose={() => setShowRegister(false)} />
      )}
    </main>
  );
}
