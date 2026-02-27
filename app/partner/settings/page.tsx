"use client";

import { useState, useEffect } from "react";
import { Settings, Save, Loader2, User, Building, CreditCard, Bell } from "lucide-react";
import { useSession } from "next-auth/react";

export default function PartnerSettingsPage() {
  const { update } = useSession();
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("profile");
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    company_name: "",
    ico: "",
    dic: "",
    street: "",
    city: "",
    zip: "",
    bank_account: "",
    referral_code: ""
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch("/api/partner/settings");
        if (res.ok) {
          const data = await res.json();
          setFormData(data);
        }
      } catch (error) {
        console.error("Failed to fetch settings:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/partner/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        alert("Nastavení bylo úspěšně uloženo.");
        // Optional: update session if name changed
        if (update) await update();
      } else {
        alert("Chyba při ukládání nastavení.");
      }
    } catch (error) {
      console.error("Save settings error:", error);
      alert("Něco se nepovedlo.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          <Settings className="h-8 w-8 text-slate-400" />
          Nastavení účtu
        </h1>
        <p className="text-slate-400 mt-1">Správa vašeho profilu, fakturačních údajů a notifikací</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Tabs */}
        <div className="w-full md:w-64 flex-shrink-0 space-y-2">
          <button
            onClick={() => setActiveTab("profile")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
              activeTab === "profile" 
                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
                : "text-slate-400 hover:bg-slate-800/50 hover:text-white"
            }`}
          >
            <User className="w-5 h-5" />
            Osobní údaje
          </button>
          <button
            onClick={() => setActiveTab("billing")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
              activeTab === "billing" 
                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
                : "text-slate-400 hover:bg-slate-800/50 hover:text-white"
            }`}
          >
            <Building className="w-5 h-5" />
            Fakturační údaje
          </button>
          <button
            onClick={() => setActiveTab("payout")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
              activeTab === "payout" 
                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
                : "text-slate-400 hover:bg-slate-800/50 hover:text-white"
            }`}
          >
            <CreditCard className="w-5 h-5" />
            Výplaty provizí
          </button>
          <button
            onClick={() => setActiveTab("notifications")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
              activeTab === "notifications" 
                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
                : "text-slate-400 hover:bg-slate-800/50 hover:text-white"
            }`}
          >
            <Bell className="w-5 h-5" />
            Notifikace
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 bg-slate-900/50 border border-slate-800 rounded-xl backdrop-blur-sm overflow-hidden">
          <form onSubmit={handleSubmit} className="p-6 md:p-8">
            
            {activeTab === "profile" && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-white mb-6 border-b border-slate-800 pb-4">Osobní údaje</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Jméno</label>
                    <input 
                      type="text" 
                      name="first_name"
                      value={formData.first_name || ""} 
                      onChange={handleChange}
                      className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:border-emerald-500 transition-colors" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Příjmení</label>
                    <input 
                      type="text" 
                      name="last_name"
                      value={formData.last_name || ""} 
                      onChange={handleChange}
                      className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:border-emerald-500 transition-colors" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">E-mail</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email || ""} 
                      disabled
                      className="w-full bg-slate-800/50 border border-slate-700 text-slate-400 rounded-lg px-4 py-2 focus:outline-none cursor-not-allowed" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Telefon</label>
                    <input 
                      type="tel" 
                      name="phone"
                      value={formData.phone || ""} 
                      onChange={handleChange}
                      className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:border-emerald-500 transition-colors" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Unikátní kód partnera (pro affiliate link)</label>
                    <input 
                      type="text" 
                      name="referral_code"
                      value={formData.referral_code || ""} 
                      onChange={handleChange}
                      placeholder="Např. partner123"
                      className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:border-emerald-500 transition-colors" 
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "billing" && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-white mb-6 border-b border-slate-800 pb-4">Fakturační údaje</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-300 mb-1">Název společnosti / Jméno</label>
                    <input 
                      type="text" 
                      name="company_name"
                      value={formData.company_name || ""} 
                      onChange={handleChange}
                      className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:border-emerald-500 transition-colors" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">IČO</label>
                    <input 
                      type="text" 
                      name="ico"
                      value={formData.ico || ""} 
                      onChange={handleChange}
                      className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:border-emerald-500 transition-colors" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">DIČ</label>
                    <input 
                      type="text" 
                      name="dic"
                      value={formData.dic || ""} 
                      onChange={handleChange}
                      className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:border-emerald-500 transition-colors" 
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-300 mb-1">Ulice a číslo popisné</label>
                    <input 
                      type="text" 
                      name="street"
                      value={formData.street || ""} 
                      onChange={handleChange}
                      className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:border-emerald-500 transition-colors" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Město</label>
                    <input 
                      type="text" 
                      name="city"
                      value={formData.city || ""} 
                      onChange={handleChange}
                      className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:border-emerald-500 transition-colors" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">PSČ</label>
                    <input 
                      type="text" 
                      name="zip"
                      value={formData.zip || ""} 
                      onChange={handleChange}
                      className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:border-emerald-500 transition-colors" 
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "payout" && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-white mb-6 border-b border-slate-800 pb-4">Výplaty provizí</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Číslo bankovního účtu</label>
                    <input 
                      type="text" 
                      name="bank_account"
                      value={formData.bank_account || ""} 
                      onChange={handleChange}
                      className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:border-emerald-500 transition-colors" 
                    />
                    <p className="text-xs text-slate-500 mt-2">Na tento účet vám budeme zasílat schválené provize.</p>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <h4 className="text-blue-400 font-medium mb-1">Informace k výplatám</h4>
                    <p className="text-sm text-slate-300">
                      Provize jsou vypláceny vždy k 15. dni v měsíci za předchozí kalendářní měsíc. 
                      Minimální částka pro výplatu je 1 000 Kč. Pokud částky nedosáhnete, převádí se do dalšího měsíce.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "notifications" && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-white mb-6 border-b border-slate-800 pb-4">Nastavení notifikací</h2>
                <div className="space-y-4">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <div className="relative flex items-center justify-center mt-1">
                      <input type="checkbox" defaultChecked className="peer sr-only" />
                      <div className="w-5 h-5 border-2 border-slate-600 rounded bg-slate-900 peer-checked:bg-emerald-500 peer-checked:border-emerald-500 transition-colors"></div>
                      <svg className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    <div>
                      <div className="text-white font-medium group-hover:text-emerald-400 transition-colors">Nový doporučený klient</div>
                      <div className="text-sm text-slate-400">Upozornění při registraci nového klienta přes váš odkaz</div>
                    </div>
                  </label>
                  
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <div className="relative flex items-center justify-center mt-1">
                      <input type="checkbox" defaultChecked className="peer sr-only" />
                      <div className="w-5 h-5 border-2 border-slate-600 rounded bg-slate-900 peer-checked:bg-emerald-500 peer-checked:border-emerald-500 transition-colors"></div>
                      <svg className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    <div>
                      <div className="text-white font-medium group-hover:text-emerald-400 transition-colors">Schválení provize</div>
                      <div className="text-sm text-slate-400">Upozornění, když je vaše provize schválena k výplatě</div>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer group">
                    <div className="relative flex items-center justify-center mt-1">
                      <input type="checkbox" defaultChecked className="peer sr-only" />
                      <div className="w-5 h-5 border-2 border-slate-600 rounded bg-slate-900 peer-checked:bg-emerald-500 peer-checked:border-emerald-500 transition-colors"></div>
                      <svg className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    <div>
                      <div className="text-white font-medium group-hover:text-emerald-400 transition-colors">Měsíční přehled</div>
                      <div className="text-sm text-slate-400">Pravidelný e-mail s přehledem vašich výsledků a provizí</div>
                    </div>
                  </label>
                </div>
              </div>
            )}

            <div className="mt-8 pt-6 border-t border-slate-800 flex justify-end">
              <button
                type="submit"
                disabled={submitting}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Ukládám...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Uložit změny
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
