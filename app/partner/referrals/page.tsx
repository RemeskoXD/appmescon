"use client";

import { useState, useEffect } from "react";
import { Users, Search, Plus, Loader2 } from "lucide-react";
import AddReferralModal from "@/components/AddReferralModal";

interface Referral {
  id: number;
  company_name: string;
  contact_name: string;
  status: "NEW" | "IN_PROGRESS" | "CLOSED_WON" | "CLOSED_LOST";
  date: string;
  expected_value: string;
}

const statusColors = {
  NEW: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  IN_PROGRESS: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  CLOSED_WON: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  CLOSED_LOST: "bg-rose-500/10 text-rose-400 border-rose-500/20",
};

export default function ReferralsPage() {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchReferrals = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/partner/referrals");
      if (res.ok) {
        const data = await res.json();
        setReferrals(data.map((r: any) => ({
          ...r,
          expected_value: "Dle smlouvy" // Placeholder if not in DB
        })));
      }
    } catch (error) {
      console.error("Failed to fetch referrals:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReferrals();
  }, []);

  const filteredReferrals = referrals.filter(r => {
    const matchesSearch = (r.company_name?.toLowerCase() || "").includes(search.toLowerCase()) || 
                          (r.contact_name?.toLowerCase() || "").includes(search.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || r.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Users className="h-8 w-8 text-blue-500" />
            Doporučení klienti
          </h1>
          <p className="text-slate-400 mt-1">Přehled klientů, které jste nám doporučili</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Přidat klienta
        </button>
      </div>

      <div className="bg-slate-900/50 border border-slate-800 rounded-xl backdrop-blur-sm overflow-hidden">
        <div className="p-4 border-b border-slate-800/50 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input 
              type="text"
              placeholder="Hledat firmu nebo kontakt..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-slate-800/50 border border-slate-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 w-full sm:w-auto"
            >
              <option value="ALL">Všechny stavy</option>
              <option value="NEW">Nový</option>
              <option value="IN_PROGRESS">V jednání</option>
              <option value="CLOSED_WON">Uzavřeno (Úspěch)</option>
              <option value="CLOSED_LOST">Uzavřeno (Neúspěch)</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
          </div>
        ) : filteredReferrals.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-800/50 text-slate-400 uppercase text-xs">
                <tr>
                  <th className="px-6 py-4 font-medium">Firma / Kontakt</th>
                  <th className="px-6 py-4 font-medium">Datum doporučení</th>
                  <th className="px-6 py-4 font-medium">Očekávaná hodnota</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {filteredReferrals.map((ref) => (
                  <tr key={ref.id} className="hover:bg-slate-800/20 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-white">{ref.company_name}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{ref.contact_name}</div>
                    </td>
                    <td className="px-6 py-4">
                      {new Date(ref.date).toLocaleDateString("cs-CZ")}
                    </td>
                    <td className="px-6 py-4 font-medium text-white">
                      {ref.expected_value}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${statusColors[ref.status]}`}>
                        {ref.status === "NEW" ? "Nový" :
                         ref.status === "IN_PROGRESS" ? "V jednání" :
                         ref.status === "CLOSED_WON" ? "Úspěch" : "Neúspěch"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center">
            <Users className="w-16 h-16 text-slate-700 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-white mb-2">Žádní klienti</h3>
            <p className="text-slate-400 max-w-md mx-auto">
              Zatím jste nedoporučili žádné klienty nebo žádný neodpovídá vyhledávání.
            </p>
          </div>
        )}
      </div>
      
      <AddReferralModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={fetchReferrals} 
      />
    </div>
  );
}
