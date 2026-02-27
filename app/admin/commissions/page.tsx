"use client";

import { useState, useEffect } from "react";
import { Wallet, Search, Plus, Loader2, DollarSign, TrendingUp, Calendar, X } from "lucide-react";

interface Commission {
  id: number;
  user_name: string;
  website_name: string | null;
  amount: number;
  status: "PENDING" | "APPROVED" | "PAID";
  description: string | null;
  created_at: string;
}

const statusColors = {
  PENDING: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  APPROVED: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  PAID: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
};

export default function CommissionsPage() {
  const [commissions, setCommissions] = useState<Commission[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [users, setUsers] = useState<{id: number, first_name: string, last_name: string}[]>([]);
  const [formData, setFormData] = useState({
    user_id: "",
    amount: "",
    description: "",
  });

  const fetchCommissions = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (statusFilter !== "ALL") params.append("status", statusFilter);

      const res = await fetch(`/api/commissions?${params.toString()}`);
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
    const debounce = setTimeout(fetchCommissions, 300);
    return () => clearTimeout(debounce);
  }, [search, statusFilter]);

  useEffect(() => {
    if (isModalOpen && users.length === 0) {
      fetch("/api/users")
        .then(res => res.json())
        .then(data => setUsers(data))
        .catch(console.error);
    }
  }, [isModalOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/commissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      if (res.ok) {
        setIsModalOpen(false);
        setFormData({ user_id: "", amount: "", description: "" });
        fetchCommissions();
      }
    } catch (error) {
      console.error("Failed to create commission:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const stats = {
    paid: commissions.filter(c => c.status === "PAID").reduce((sum, c) => sum + Number(c.amount), 0),
    pending: commissions.filter(c => c.status === "PENDING").reduce((sum, c) => sum + Number(c.amount), 0),
    approved: commissions.filter(c => c.status === "APPROVED").reduce((sum, c) => sum + Number(c.amount), 0),
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Wallet className="h-8 w-8 text-emerald-500" />
            Provize
          </h1>
          <p className="text-slate-400 mt-1">Správa a přehled provizí pro obchodníky a externisty</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Přidat provizi
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
              placeholder="Hledat provizi..."
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
        ) : commissions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-800/50 text-slate-400 uppercase text-xs">
                <tr>
                  <th className="px-6 py-4 font-medium">Uživatel</th>
                  <th className="px-6 py-4 font-medium">Web / Popis</th>
                  <th className="px-6 py-4 font-medium">Částka</th>
                  <th className="px-6 py-4 font-medium">Datum</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium text-right">Akce</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {commissions.map((commission) => (
                  <tr key={commission.id} className="hover:bg-slate-800/20 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-white">{commission.user_name}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-white">{commission.website_name || "Obecná provize"}</div>
                      {commission.description && (
                        <div className="text-xs text-slate-500 mt-0.5">{commission.description}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 font-medium text-white">
                      {Number(commission.amount).toLocaleString("cs-CZ")} Kč
                    </td>
                    <td className="px-6 py-4">
                      {new Date(commission.created_at).toLocaleDateString("cs-CZ")}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${statusColors[commission.status]}`}>
                        {commission.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-slate-400 hover:text-white transition-colors text-sm font-medium">
                        Detail
                      </button>
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

      {/* Create Commission Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-lg overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-slate-800">
              <h2 className="text-xl font-bold text-white">Nová provize</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">
                  Uživatel (Partner/Obchodník)
                </label>
                <select
                  required
                  value={formData.user_id}
                  onChange={(e) => setFormData({...formData, user_id: e.target.value})}
                  className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:border-emerald-500 transition-colors"
                >
                  <option value="">Vyberte uživatele...</option>
                  {users.map(u => (
                    <option key={u.id} value={u.id}>{u.first_name} {u.last_name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">
                  Částka (Kč)
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  step="0.01"
                  value={formData.amount}
                  onChange={(e) => setFormData({...formData, amount: e.target.value})}
                  className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">
                  Popis
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:border-emerald-500 transition-colors resize-none"
                  placeholder="Za co je tato provize..."
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-slate-300 hover:text-white transition-colors"
                >
                  Zrušit
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Ukládám...
                    </>
                  ) : (
                    "Přidat provizi"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
