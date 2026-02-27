"use client";

import { useState } from "react";
import Button from "../../../components/ui/Button";
import RegisterPanel from "../../../components/RegisterPanel";

const heroHighlights = [
  { title: "Konverze a marže", desc: "Jasné KPI, optimalizovaný checkout, návratnost" },
  { title: "Automatizace provozu", desc: "Sklad, fakturace, notifikace bez ruční práce" },
  { title: "Bezpečnost a compliance", desc: "PCI-DSS, 3D Secure, monitoring podvodů" }
];

const benefits = [
  {
    title: "Výkon a stabilita",
    desc: "Rychlé načítání a škálování pro sezónní špičky."
  },
  {
    title: "Data pro rozhodování",
    desc: "Přehled konverzí, marží a retence v čase."
  },
  {
    title: "Marketing s kontrolou",
    desc: "Kampaně, feedy a měření v jednom toku dat."
  },
  {
    title: "Zákaznická péče",
    desc: "Chat, helpdesk i samoobsluha napojená na CRM."
  }
];

const crmLogos = Array.from({ length: 6 }, (_, i) => `https://web2.itnahodinu.cz/mescon/images/crm_logos/${14 + i}.svg`);
const erpLogos = Array.from({ length: 12 }, (_, i) => `https://web2.itnahodinu.cz/mescon/images/erp_logos/${1 + i}.svg`);
const paymentLogos = Array.from({ length: 12 }, (_, i) => `https://web2.itnahodinu.cz/mescon/images/plat_brany/${21 + i}.svg`);

export default function EshopPage() {
  const [showRegister, setShowRegister] = useState(false);

  return (
    <main className="bg-[#020617] text-slate-100 overflow-hidden">
      {/* Hero Section - Nuxt-like */}
      <section className="relative border-b border-slate-800 pt-20 pb-24 lg:pt-32 lg:pb-40">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[500px] bg-[#5885fa]/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="page-container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left */}
            <div className="text-center lg:text-left">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-100 mb-6 leading-[1.1]">
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#5885fa] via-[#5885fa] to-[#5885fa]">E-shop pro firmy</span>
                které potřebují stabilní provoz.
              </h1>
              <p className="text-lg sm:text-xl text-slate-400 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Navrhujeme a provozujeme e-shopy s důrazem na rychlost, bezpečnost a integrace. Připojíme sklad, fakturaci, marketing i zákaznickou podporu.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button variant="primary" size="lg" onClick={() => setShowRegister(true)} className="min-w-[160px]">Získat nabídku</Button>
                <Button variant="outline" size="lg" href="/subpages/portfolio" className="min-w-[160px]">Naše práce</Button>
              </div>

              <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
                {heroHighlights.map((item) => (
                  <div key={item.title} className="border-l-2 border-[#5885fa]/30 pl-4">
                    <h3 className="font-semibold text-slate-100">{item.title}</h3>
                    <p className="text-sm text-slate-400 mt-1">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Code/editor */}
            <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
              <div className="relative rounded-xl bg-slate-900/50 border border-slate-800 shadow-2xl overflow-hidden transform rotate-1 hover:rotate-0 transition-transform duration-500">
                <div className="flex items-center px-4 py-3 bg-slate-800/50 border-b border-slate-800">
                  <div className="w-3 h-3 rounded-full bg-red-500/80 mr-2" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80 mr-2" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  <span className="ml-4 text-xs text-slate-400">analytics/ecommerce.tsx</span>
                </div>
                <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-800">
                  <div className="p-6 font-mono text-sm leading-relaxed text-slate-300">
{`export const dashboard = {
  orders: 247,
  conversion: '3.8%',
  repeat: '34%',
  aov: '2430 Kč'
};`}
                  </div>
                  <div className="p-6 space-y-3">
                    <div className="rounded-xl border border-slate-700 bg-slate-950/50 p-3">
                      <p className="text-xs text-slate-400">Objednávky</p>
                      <p className="text-xl font-semibold text-slate-100">247 dnes</p>
                      <p className="text-sm text-slate-400">+12 % vs. včera</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-lg border border-slate-700 bg-slate-950/50 p-3">
                        <p className="text-xs text-slate-400">AOV</p>
                        <p className="text-xl font-semibold text-slate-100">2 430 Kč</p>
                      </div>
                      <div className="rounded-lg border border-slate-700 bg-slate-950/50 p-3">
                        <p className="text-xs text-slate-400">Checkout SLA</p>
                        <p className="text-xl font-semibold text-slate-100">230 ms</p>
                      </div>
                    </div>
                    <div className="rounded-lg border border-slate-700 bg-slate-950/50 p-3">
                      <p className="text-xs text-slate-400">Automatizace</p>
                      <p className="text-sm text-slate-300">Sklad live sync, fakturace, upozornění zákazníkům.</p>
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

      {/* Benefits Section */}
      <section className="border-b border-slate-800 bg-[#020617]">
        <div className="page-container py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((item) => (
              <div key={item.title} className="text-center lg:text-left">
                <p className="text-lg font-semibold text-slate-100 mb-1">{item.title}</p>
                <p className="text-sm text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-slate-800 bg-[#020617]">
        <div className="page-container py-16 space-y-16">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-slate-100">Integrace, které drží provoz</h2>
            <p className="text-slate-400 mt-4 text-lg">
              Propojíme e-shop s klíčovými systémy pro řízení obchodu, skladu i marketingu.
            </p>
          </div>

          {/* CRM Systems */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-slate-100 border-l-4 border-[#5885fa] pl-4">CRM Systémy</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {crmLogos.map((src) => (
                <div key={src} className="rounded-xl border border-slate-800 bg-slate-900/50 p-4 flex items-center justify-center hover:border-[#5885fa]/30 transition-colors h-24">
                  <img src={src} alt="CRM Integrace" className="max-h-12 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </div>

          {/* ERP Systems */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-slate-100 border-l-4 border-[#5885fa] pl-4">ERP Systémy</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {erpLogos.map((src) => (
                <div key={src} className="rounded-xl border border-slate-800 bg-slate-900/50 p-4 flex items-center justify-center hover:border-[#5885fa]/30 transition-colors h-24">
                  <img src={src} alt="ERP Integrace" className="max-h-12 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </div>

          {/* Payment Gateways */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-slate-100 border-l-4 border-[#5885fa] pl-4">Platební brány</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {paymentLogos.map((src) => (
                <div key={src} className="rounded-xl border border-slate-800 bg-slate-900/50 p-4 flex items-center justify-center hover:border-[#5885fa]/30 transition-colors h-24">
                  <img src={src} alt="Platební brána" className="max-h-12 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {showRegister && (
        <RegisterPanel open={showRegister} onClose={() => setShowRegister(false)} />
      )}
    </main>
  );
}
