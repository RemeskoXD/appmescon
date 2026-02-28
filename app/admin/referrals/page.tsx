"use client";

import { useState, useEffect } from "react";
import { 
  Users, 
  Search, 
  Loader2, 
  Building2, 
  User, 
  Mail, 
  Phone
} from "lucide-react";

interface Referral {
  id: number;
  company_name: string | null;
  contact_name: string;
  email: string;
  phone: string | null;
  customer_status: string;
  partner_name: string;
  partner_email: string;
  created_at: string;
}

const statusColors: Record<string, string> = {
  NEW: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  POTENTIAL: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  VIP: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  BIG: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  STANDARD: "bg-slate-500/10 text-slate-400 border-slate-500/20",
};

export default function AdminReferralsPage() {
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchReferrals = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/referrals");
      if (res.ok) {
        const data = await res.json();
        setReferrals(data);
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

  const filteredReferrals = referrals.filter(r => 
    (r.company_name?.toLowerCase() || "").includes(search.toLowerCase()) ||
    r.contact_name.toLowerCase().includes(search.toLowerCase()) ||
    r.partner_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Users className="h-8 w-8 text-[#5885fa]" />
            Doporučení od partnerů
          </h1>
          <p className="text-slate-400 mt-1">Správa klientů doporučených externími partnery</p>
        </div>
      </div>

      <div className="bg-slate-900/50 border border-slate-800 rounded-xl backdrop-blur-sm overflow-hidden">
        <div className="p-4 border-b border-slate-800/50">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input 
              type="text"
              placeholder="Hledat firmu, kontakt nebo partnera..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-[#5885fa] transition-colors"
            />
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
                  <th className="px-6 py-4 font-medium">Klient</th>
                  <th className="px-6 py-4 font-medium">Kontakt</th>
                  <th className="px-6 py-4 font-medium">Partner (Doporučil)</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium text-right">Datum</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {filteredReferrals.map((ref) => (
                  <tr key={ref.id} className="hover:bg-slate-800/20 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 border border-slate-700">
                          {ref.company_name ? <Building2 className="w-4 h-4" /> : <User className="w-4 h-4" />}
                        </div>
                        <div>
                          <div className="font-medium text-white">{ref.company_name || ref.contact_name}</div>
                          {ref.company_name && <div className="text-xs text-slate-500">{ref.contact_name}</div>}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs">
                          <Mail className="w-3 h-3 text-slate-500" />
                          {ref.email}
                        </div>
                        {ref.phone && (
                          <div className="flex items-center gap-2 text-xs">
                            <Phone className="w-3 h-3 text-slate-500" />
                            {ref.phone}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-white">{ref.partner_name}</div>
                      <div className="text-xs text-slate-500">{ref.partner_email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${statusColors[ref.customer_status] || statusColors.STANDARD}`}>
                        {ref.customer_status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right text-xs text-slate-500">
                      {new Date(ref.created_at).toLocaleDateString("cs-CZ")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center">
            <Users className="w-16 h-16 text-slate-700 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-white mb-2">Žádná doporučení</h3>
            <p className="text-slate-400 max-w-md mx-auto">
              Zatím nebyla nalezena žádná doporučení od partnerů.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
