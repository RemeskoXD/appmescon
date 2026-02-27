"use client";

import { useState, useEffect } from "react";
import { Wallet, Search, Loader2, DollarSign, TrendingUp, Calendar, ArrowUpRight } from "lucide-react";

interface Commission {
  id: number;
  client_name: string;
  amount: number;
  status: "PENDING" | "APPROVED" | "PAID";
  description: string;
  date: string;
}

const statusColors = {
  PENDING: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  APPROVED: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  PAID: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
};

export default function PartnerCommissionsPage() {
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [commissions, setCommissions] = useState<Commission[]>([]);

  const fetchCommissions = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/partner/commissions");
      if (res.ok) {
        const data = await res.json();
        setCommissions(data);
      }
    } catch (error) {
      console.error("Failed to fetch commissions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCommissions();
  }, []);

  const handlePayoutRequest = async () => {
    if (!confirm("Opravdu chcete požádat o výplatu schválených provizí?")) return;
    
    setSubmitting(true);
    try {
      const res = await fetch("/api/partner/payouts", { method: "POST" });
      const data = await res.json();
      if (res.ok) {
        alert(data.message);
      } else {
        alert(data.error || "Chyba při odesílání žádosti.");
      }
    } catch (error) {
      console.error("Payout request error:", error);
      alert("Něco se nepovedlo.");
    } finally {
      setSubmitting(false);
    }
  };

  const filteredCommissions = commissions.filter(c => {
    const matchesSearch = (c.client_name?.toLowerCase() || "").includes(search.toLowerCase()) || 
                          (c.description?.toLowerCase() || "").includes(search.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    paid: commissions.filter(c => c.status === "PAID").reduce((sum, c) => sum + c.amount, 0),
    pending: commissions.filter(c => c.status === "PENDING").reduce((sum, c) => sum + c.amount, 0),
    approved: commissions.filter(c => c.status === "APPROVED").reduce((sum, c) => sum + c.amount, 0),
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Wallet className="h-8 w-8 text-emerald-500" />
            Provize a výplaty
          </h1>
          <p className="text-slate-400 mt-1">Přehled vašich vydělaných provizí a historie výplat</p>
        </div>
        <button 
          onClick={handlePayoutRequest}
          disabled={submitting}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50"
        >
          {submitting ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <ArrowUpRight className="w-5 h-5" />
          )}
          Požádat o výplatu
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Celkem vyplaceno", value: `${stats.paid.toLocaleString("cs-CZ")} Kč`, icon: DollarSign, color: "text-emerald-500" },
          { label: "Čeká na schválení", value: `${stats.pending.toLocaleString("cs-CZ")} Kč`, icon: TrendingUp, color: "text-amber-500" },
          { label: "Schváleno k výplatě", value: `${stats.approved.toLocaleString("cs-CZ")} Kč`, icon: Calendar, color: "text-blue-500" },
        ].map((stat, i) => (
          <div key={i} className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg bg-slate-800 ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
            <p className="text-sm text-slate-400">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-slate-900/50 border border-slate-800 rounded-xl backdrop-blur-sm overflow-hidden">
        <div className="p-4 border-b border-slate-800/50 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input 
              type="text"
              placeholder="Hledat klienta nebo popis..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-slate-800/50 border border-slate-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:border-emerald-500 w-full sm:w-auto"
            >
              <option value="ALL">Všechny stavy</option>
              <option value="PENDING">Čekající</option>
              <option value="APPROVED">Schválené</option>
              <option value="PAID">Vyplacené</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
          </div>
        ) : filteredCommissions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-800/50 text-slate-400 uppercase text-xs">
                <tr>
                  <th className="px-6 py-4 font-medium">Klient / Popis</th>
                  <th className="px-6 py-4 font-medium">Datum</th>
                  <th className="px-6 py-4 font-medium">Částka</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {filteredCommissions.map((commission) => (
                  <tr key={commission.id} className="hover:bg-slate-800/20 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-white">{commission.client_name}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{commission.description}</div>
                    </td>
                    <td className="px-6 py-4">
                      {new Date(commission.date).toLocaleDateString("cs-CZ")}
                    </td>
                    <td className="px-6 py-4 font-medium text-white">
                      {commission.amount.toLocaleString("cs-CZ")} Kč
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${statusColors[commission.status]}`}>
                        {commission.status === "PENDING" ? "Čekající" :
                         commission.status === "APPROVED" ? "Schváleno" : "Vyplaceno"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center">
            <Wallet className="w-16 h-16 text-slate-700 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-white mb-2">Žádné provize</h3>
            <p className="text-slate-400 max-w-md mx-auto">
              Zatím nebyly nalezeny žádné provize odpovídající filtrům.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
