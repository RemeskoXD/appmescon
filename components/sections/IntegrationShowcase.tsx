"use client";

import { useState } from "react";
import { 
  Database, 
  Users, 
  CreditCard, 
  Package, 
  Truck, 
  Globe, 
  Search,
  ArrowRight
} from "lucide-react";

// Combine existing logos for the marquee
const crmLogos = Array.from({ length: 6 }, (_, i) => `https://web2.itnahodinu.cz/mescon/images/crm_logos/${14 + i}.svg`);
const erpLogos = Array.from({ length: 12 }, (_, i) => `https://web2.itnahodinu.cz/mescon/images/erp_logos/${1 + i}.svg`);
const paymentLogos = Array.from({ length: 12 }, (_, i) => `https://web2.itnahodinu.cz/mescon/images/plat_brany/${21 + i}.svg`);

// Create 4 rows of mixed logos
const allLogos = [...crmLogos, ...erpLogos, ...paymentLogos];
const row1 = [...allLogos].sort(() => Math.random() - 0.5);
const row2 = [...allLogos].sort(() => Math.random() - 0.5);
const row3 = [...allLogos].sort(() => Math.random() - 0.5);
const row4 = [...allLogos].sort(() => Math.random() - 0.5);

const categories = [
  { id: "erp", name: "ERP Systémy", icon: Database, desc: "SAP, Helios, Pohoda, K2..." },
  { id: "crm", name: "CRM Systémy", icon: Users, desc: "Raynet, HubSpot, Salesforce..." },
  { id: "payments", name: "Platební brány", icon: CreditCard, desc: "Stripe, GoPay, Comgate..." },
  { id: "warehouse", name: "Skladová řešení", icon: Package, desc: "WMS, čtečky, automatizace" },
  { id: "carriers", name: "Dopravci", icon: Truck, desc: "PPL, Zásilkovna, DPD..." },
  { id: "standards", name: "Komunikační standardy", icon: Globe, desc: "EDI, API, XML feedy..." },
];

export default function IntegrationShowcase() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <div className="relative w-full overflow-hidden py-20">
      
      {/* Background Marquee Section */}
      <div className="relative h-[500px] w-full overflow-hidden">
        {/* Radial Gradient Overlay for fading edges */}
        <div className="absolute inset-0 z-20 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_20%,#020617_100%)]" />
        
        {/* Skewed Container */}
        <div className="absolute inset-0 -my-20 transform -skew-y-3 scale-110 opacity-40 z-10">
          {/* Row 1 - LTR */}
          <div className="flex space-x-8 animate-marquee-ltr mb-8 w-max">
            {[...row1, ...row1].map((src, i) => (
              <div key={`r1-${i}`} className="w-32 h-16 bg-slate-900/50 border border-slate-800 rounded-lg flex items-center justify-center p-2 backdrop-blur-sm">
                <img src={src} alt="" className="max-h-full max-w-full opacity-70 grayscale hover:grayscale-0 transition-all" />
              </div>
            ))}
          </div>

          {/* Row 2 - RTL */}
          <div className="flex space-x-8 animate-marquee-rtl mb-8 w-max">
            {[...row2, ...row2].map((src, i) => (
              <div key={`r2-${i}`} className="w-32 h-16 bg-slate-900/50 border border-slate-800 rounded-lg flex items-center justify-center p-2 backdrop-blur-sm">
                <img src={src} alt="" className="max-h-full max-w-full opacity-70 grayscale hover:grayscale-0 transition-all" />
              </div>
            ))}
          </div>

          {/* Row 3 - LTR */}
          <div className="flex space-x-8 animate-marquee-ltr mb-8 w-max">
            {[...row3, ...row3].map((src, i) => (
              <div key={`r3-${i}`} className="w-32 h-16 bg-slate-900/50 border border-slate-800 rounded-lg flex items-center justify-center p-2 backdrop-blur-sm">
                <img src={src} alt="" className="max-h-full max-w-full opacity-70 grayscale hover:grayscale-0 transition-all" />
              </div>
            ))}
          </div>

          {/* Row 4 - RTL */}
          <div className="flex space-x-8 animate-marquee-rtl mb-8 w-max">
            {[...row4, ...row4].map((src, i) => (
              <div key={`r4-${i}`} className="w-32 h-16 bg-slate-900/50 border border-slate-800 rounded-lg flex items-center justify-center p-2 backdrop-blur-sm">
                <img src={src} alt="" className="max-h-full max-w-full opacity-70 grayscale hover:grayscale-0 transition-all" />
              </div>
            ))}
          </div>
        </div>

        {/* Search Bar Overlay */}
        <div className="absolute inset-0 z-30 flex items-center justify-center px-4">
          <div className="relative w-full max-w-2xl group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#5885fa] to-[#00DC82] rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
            <div className="relative flex items-center bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-2 shadow-2xl">
              <Search className="w-6 h-6 text-slate-400 ml-4" />
              <input 
                type="text" 
                placeholder="Vyhledat konkrétní integraci..." 
                className="w-full bg-transparent border-none focus:ring-0 text-slate-200 placeholder-slate-500 text-lg px-4 py-3"
              />
              <button className="bg-[#5885fa] hover:bg-[#466dd1] text-white px-6 py-3 rounded-xl font-medium transition-colors">
                Hledat
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="page-container relative z-40 -mt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`
                group relative overflow-hidden rounded-2xl border p-6 text-left transition-all duration-300
                ${activeCategory === cat.id 
                  ? 'bg-slate-900/90 border-[#00DC82] shadow-[0_0_30px_-10px_rgba(0,220,130,0.3)]' 
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-600 hover:bg-slate-800/60'
                }
              `}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`
                  p-3 rounded-xl transition-colors
                  ${activeCategory === cat.id ? 'bg-[#00DC82]/10 text-[#00DC82]' : 'bg-slate-800 text-slate-400 group-hover:text-slate-200'}
                `}>
                  <cat.icon className="w-6 h-6" />
                </div>
                <ArrowRight className={`w-5 h-5 transition-all ${activeCategory === cat.id ? 'text-[#00DC82] translate-x-0' : 'text-slate-600 -translate-x-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0'}`} />
              </div>
              
              <h3 className={`text-lg font-semibold mb-2 ${activeCategory === cat.id ? 'text-white' : 'text-slate-200'}`}>
                {cat.name}
              </h3>
              <p className="text-sm text-slate-400">
                {cat.desc}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
