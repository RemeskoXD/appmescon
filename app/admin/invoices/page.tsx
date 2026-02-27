"use client";

import { useState, useEffect } from "react";
import { FileText, Search, Plus, Loader2, CheckCircle, AlertCircle, X } from "lucide-react";

interface Invoice {
  id: number;
  invoice_number: string;
  amount: number;
  status: "UNPAID" | "PAID" | "OVERDUE";
  due_date: string;
  company_name: string;
  website_name: string | null;
}

const statusColors = {
  UNPAID: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  PAID: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  OVERDUE: "bg-rose-500/10 text-rose-400 border-rose-500/20",
  loader: <Loader2 className="w-4 h-4 animate-spin" />,
  check: <CheckCircle className="w-4 h-4" />
};

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [customers, setCustomers] = useState<{id: number, company_name: string}[]>([]);
  const [formData, setFormData] = useState({
    invoice_number: "",
    customer_id: "",
    amount: "",
    due_date: "",
  });

  const fetchInvoices = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (statusFilter !== "ALL") params.append("status", statusFilter);

      const res = await fetch(`/api/invoices?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setInvoices(data);
      }
    } catch (error) {
      console.error("Failed to fetch invoices:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const debounce = setTimeout(fetchInvoices, 300);
    return () => clearTimeout(debounce);
  }, [search, statusFilter]);

  useEffect(() => {
    if (isModalOpen && customers.length === 0) {
      fetch("/api/customers")
        .then(res => res.json())
        .then(data => setCustomers(data))
        .catch(console.error);
    }
  }, [isModalOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/invoices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      if (res.ok) {
        setIsModalOpen(false);
        setFormData({ invoice_number: "", customer_id: "", amount: "", due_date: "" });
        fetchInvoices();
      }
    } catch (error) {
      console.error("Failed to create invoice:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleMarkAsPaid = async (id: number) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/admin/invoices/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "PAID" }),
      });
      if (res.ok) {
        fetchInvoices();
      }
    } catch (error) {
      console.error("Failed to update invoice status:", error);
    } finally {
      setUpdatingId(null);
    }
  };

  const stats = {
    unpaid: invoices.filter(i => i.status === "UNPAID").reduce((sum, i) => sum + Number(i.amount), 0),
    overdue: invoices.filter(i => i.status === "OVERDUE").reduce((sum, i) => sum + Number(i.amount), 0),
    paid: invoices.filter(i => i.status === "PAID").reduce((sum, i) => sum + Number(i.amount), 0),
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <FileText className="h-8 w-8 text-cyan-500" />
            Fakturace
          </h1>
          <p className="text-slate-400 mt-1">Správa faktur, plateb a předplatného</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Vystavit fakturu
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Nezaplacené", value: `${stats.unpaid.toLocaleString("cs-CZ")} Kč`, icon: AlertCircle, color: "text-amber-500" },
          { label: "Po splatnosti", value: `${stats.overdue.toLocaleString("cs-CZ")} Kč`, icon: AlertCircle, color: "text-rose-500" },
          { label: "Zaplaceno", value: `${stats.paid.toLocaleString("cs-CZ")} Kč`, icon: CheckCircle, color: "text-emerald-500" },
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
              placeholder="Hledat fakturu..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-slate-800/50 border border-slate-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-500 w-full sm:w-auto"
            >
              <option value="ALL">Všechny stavy</option>
              <option value="UNPAID">Nezaplacené</option>
              <option value="PAID">Zaplacené</option>
              <option value="OVERDUE">Po splatnosti</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
          </div>
        ) : invoices.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-800/50 text-slate-400 uppercase text-xs">
                <tr>
                  <th className="px-6 py-4 font-medium">Číslo faktury</th>
                  <th className="px-6 py-4 font-medium">Zákazník</th>
                  <th className="px-6 py-4 font-medium">Částka</th>
                  <th className="px-6 py-4 font-medium">Splatnost</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium text-right">Akce</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {invoices.map((invoice) => (
                  <tr key={invoice.id} className="hover:bg-slate-800/20 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-white">{invoice.invoice_number}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-white">{invoice.company_name}</div>
                      {invoice.website_name && (
                        <div className="text-xs text-slate-500 mt-0.5">{invoice.website_name}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 font-medium text-white">
                      {Number(invoice.amount).toLocaleString("cs-CZ")} Kč
                    </td>
                    <td className="px-6 py-4">
                      {new Date(invoice.due_date).toLocaleDateString("cs-CZ")}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${statusColors[invoice.status]}`}>
                        {invoice.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {invoice.status !== "PAID" && (
                          <button 
                            onClick={() => handleMarkAsPaid(invoice.id)}
                            disabled={updatingId === invoice.id}
                            className="text-emerald-500 hover:text-emerald-400 transition-colors text-xs font-medium flex items-center gap-1 disabled:opacity-50"
                          >
                            {updatingId === invoice.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <CheckCircle className="w-3 h-3" />}
                            Zaplatit
                          </button>
                        )}
                        <button className="text-slate-400 hover:text-white transition-colors text-sm font-medium">
                          Detail
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
            <FileText className="w-16 h-16 text-slate-700 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-white mb-2">Žádné faktury</h3>
            <p className="text-slate-400 max-w-md mx-auto">
              Zatím nebyly nalezeny žádné faktury odpovídající filtrům.
            </p>
          </div>
        )}
      </div>

      {/* Create Invoice Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-lg overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-slate-800">
              <h2 className="text-xl font-bold text-white">Nová faktura</h2>
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
                  Číslo faktury
                </label>
                <input
                  type="text"
                  required
                  value={formData.invoice_number}
                  onChange={(e) => setFormData({...formData, invoice_number: e.target.value})}
                  className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-500 transition-colors"
                  placeholder="např. 2024001"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">
                  Zákazník
                </label>
                <select
                  required
                  value={formData.customer_id}
                  onChange={(e) => setFormData({...formData, customer_id: e.target.value})}
                  className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-500 transition-colors"
                >
                  <option value="">Vyberte zákazníka...</option>
                  {customers.map(c => (
                    <option key={c.id} value={c.id}>{c.company_name}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
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
                    className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">
                    Datum splatnosti
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.due_date}
                    onChange={(e) => setFormData({...formData, due_date: e.target.value})}
                    className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>
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
                  className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2 rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Ukládám...
                    </>
                  ) : (
                    "Vystavit fakturu"
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
