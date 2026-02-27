"use client";

import { useState, useEffect } from "react";
import { 
  UserPlus, 
  Search, 
  Loader2, 
  MoreVertical,
  Mail,
  Phone,
  ArrowRightLeft
} from "lucide-react";

interface Lead {
  id: number;
  user_id: number | null;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  source: string;
  status: "NEW" | "CONTACTED" | "CONVERTED" | "REJECTED";
  notes: string | null;
  created_at: string;
}

const statusColors = {
  NEW: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  CONTACTED: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  CONVERTED: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  REJECTED: "bg-red-500/10 text-red-400 border-red-500/20",
};

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [submitting, setSubmitting] = useState<number | null>(null);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/leads");
      if (res.ok) {
        const data = await res.json();
        setLeads(data);
      }
    } catch (error) {
      console.error("Failed to fetch leads:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleConvert = async (leadId: number) => {
    if (!confirm("Opravdu chcete převést tohoto leada na kontakt (zákazníka)?")) return;

    setSubmitting(leadId);
    try {
      const res = await fetch("/api/admin/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leadId }),
      });

      if (res.ok) {
        alert("Lead byl úspěšně převeden na kontakt.");
        fetchLeads();
      } else {
        const data = await res.json();
        alert(data.error || "Chyba při převodu leada.");
      }
    } catch (error) {
      console.error("Conversion error:", error);
      alert("Něco se nepovedlo.");
    } finally {
      setSubmitting(null);
    }
  };

  const filteredLeads = leads.filter(l => 
    `${l.first_name} ${l.last_name}`.toLowerCase().includes(search.toLowerCase()) ||
    l.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <UserPlus className="h-8 w-8 text-blue-500" />
            Leady (Potenciální klienti)
          </h1>
          <p className="text-slate-400 mt-1">Správa nově registrovaných uživatelů a poptávek</p>
        </div>
      </div>

      <div className="bg-slate-900/50 border border-slate-800 rounded-xl backdrop-blur-sm overflow-hidden">
        <div className="p-4 border-b border-slate-800/50">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
            <input 
              type="text"
              placeholder="Hledat leada..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
          </div>
        ) : filteredLeads.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-800/50 text-slate-400 uppercase text-xs">
                <tr>
                  <th className="px-6 py-4 font-medium">Jméno</th>
                  <th className="px-6 py-4 font-medium">Kontakt</th>
                  <th className="px-6 py-4 font-medium">Zdroj</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">Datum</th>
                  <th className="px-6 py-4 font-medium text-right">Akce</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-800/20 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-white">{lead.first_name} {lead.last_name}</div>
                      {lead.user_id && (
                        <div className="text-[10px] text-blue-400 mt-0.5">Registrovaný uživatel</div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-xs">
                          <Mail className="w-3 h-3 text-slate-500" />
                          {lead.email}
                        </div>
                        {lead.phone && (
                          <div className="flex items-center gap-2 text-xs">
                            <Phone className="w-3 h-3 text-slate-500" />
                            {lead.phone}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs text-slate-400">{lead.source}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-medium border ${statusColors[lead.status]}`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-500">
                      {new Date(lead.created_at).toLocaleDateString("cs-CZ")}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        {lead.status !== 'CONVERTED' && (
                          <button 
                            onClick={() => handleConvert(lead.id)}
                            disabled={submitting === lead.id}
                            className="p-2 bg-emerald-600/10 text-emerald-500 hover:bg-emerald-600/20 rounded-lg transition-colors title='Převést na kontakt'"
                          >
                            {submitting === lead.id ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <ArrowRightLeft className="w-4 h-4" />
                            )}
                          </button>
                        )}
                        <button className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center">
            <UserPlus className="w-16 h-16 text-slate-700 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-white mb-2">Žádné leady</h3>
            <p className="text-slate-400 max-w-md mx-auto">
              Zatím nebyly nalezeny žádné nové leady.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
