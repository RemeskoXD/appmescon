"use client";

import { Megaphone, Download, Link as LinkIcon, Copy, CheckCircle2, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";

export default function MarketingPage() {
  const [copied, setCopied] = useState(false);
  const [referralCode, setReferralCode] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReferralCode = async () => {
      try {
        const res = await fetch("/api/partner/settings");
        if (res.ok) {
          const data = await res.json();
          setReferralCode(data.referral_code || `partner${data.id || "123"}`);
        }
      } catch (error) {
        console.error("Failed to fetch referral code:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchReferralCode();
  }, []);

  const referralLink = `https://mescon.cz/ref/${referralCode}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const materials = [
    {
      id: 1,
      title: "Logo manuál a loga",
      description: "Oficiální loga Mescon ve všech formátech (SVG, PNG, PDF) a pravidla pro jejich použití.",
      type: "ZIP",
      size: "12 MB"
    },
    {
      id: 2,
      title: "Prezentace pro klienty",
      description: "Obchodní prezentace představující hlavní výhody a funkce našeho řešení.",
      type: "PDF",
      size: "4.5 MB"
    },
    {
      id: 3,
      title: "Bannery pro sociální sítě",
      description: "Sada předpřipravených bannerů pro Facebook, LinkedIn a Instagram.",
      type: "ZIP",
      size: "28 MB"
    },
    {
      id: 4,
      title: "Případové studie",
      description: "Úspěšné příběhy našich klientů, které můžete využít při prodeji.",
      type: "PDF",
      size: "8.2 MB"
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          <Megaphone className="h-8 w-8 text-purple-500" />
          Marketingové materiály
        </h1>
        <p className="text-slate-400 mt-1">Vše, co potřebujete pro úspěšnou propagaci a prodej</p>
      </div>

      {/* Affiliate Link Section */}
      <div className="bg-gradient-to-br from-purple-900/40 to-slate-900/50 border border-purple-500/20 rounded-xl p-6 md:p-8 backdrop-blur-sm">
        <div className="max-w-3xl">
          <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
            <LinkIcon className="w-5 h-5 text-purple-400" />
            Váš unikátní partnerský odkaz
          </h2>
          <p className="text-slate-300 mb-6 leading-relaxed">
            Sdílejte tento odkaz na svých webových stránkách, sociálních sítích nebo v e-mailech. 
            Každý návštěvník, který přes tento odkaz přijde a stane se naším klientem, bude automaticky 
            přiřazen k vašemu účtu a vy získáte provizi.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3">
             <div className="relative flex-1">
              {loading ? (
                <div className="w-full bg-slate-950 border border-slate-800 text-slate-500 rounded-lg pl-4 pr-12 py-3 flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Načítám váš odkaz...
                </div>
              ) : (
                <>
                  <input 
                    type="text" 
                    readOnly 
                    value={referralLink} 
                    className="w-full bg-slate-950 border border-slate-800 text-slate-300 rounded-lg pl-4 pr-12 py-3 focus:outline-none focus:border-purple-500 transition-colors"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    {copied ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    ) : (
                      <Copy className="w-5 h-5 text-slate-500" />
                    )}
                  </div>
                </>
              )}
            </div>
            <button 
              onClick={handleCopy}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 sm:w-auto w-full"
            >
              {copied ? "Zkopírováno!" : "Kopírovat odkaz"}
            </button>
          </div>
        </div>
      </div>

      {/* Materials Grid */}
      <div>
        <h2 className="text-xl font-bold text-white mb-4">Ke stažení</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {materials.map((material) => (
            <div key={material.id} className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 backdrop-blur-sm flex flex-col h-full group hover:border-slate-700 transition-colors">
              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-white group-hover:text-purple-400 transition-colors">
                    {material.title}
                  </h3>
                  <span className="px-2.5 py-1 rounded-md bg-slate-800 text-xs font-medium text-slate-400 border border-slate-700">
                    {material.type}
                  </span>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  {material.description}
                </p>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-slate-800/50 mt-auto">
                <span className="text-xs text-slate-500 font-medium">
                  Velikost: {material.size}
                </span>
                <button className="flex items-center gap-2 text-sm font-medium text-purple-400 hover:text-purple-300 transition-colors">
                  <Download className="w-4 h-4" />
                  Stáhnout
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
