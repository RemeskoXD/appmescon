"use client";

import { useState, useEffect } from "react";
import { Plus, Search, Eye, Mail, Phone, Building2, User } from "lucide-react";
import Link from "next/link";

export default function AdminCustomers() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState<any[]>([]); // For owner selection

  const [formData, setFormData] = useState({
    company_name: "",
    contact_name: "",
    email: "",
    phone: "",
    customer_status: "NEW",
    owner_id: ""
  });

  const statuses = [
    { id: "ALL", label: "Všichni" },
    { id: "VIP", label: "VIP ZK" },
    { id: "BIG", label: "Velký ZK" },
    { id: "NEW", label: "Nový ZK" },
    { id: "POTENTIAL", label: "Potencionální" },
    { id: "TEAM", label: "Tým" },
    { id: "NEW_WEB", label: "Web nové" },
    { id: "STANDARD", label: "Standardní" }
  ];

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/admin/customers?status=${statusFilter}&search=${search}`);
      const data = await res.json();
      setCustomers(data.customers || []);
    } catch (error) {
      console.error("Failed to fetch customers", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/admin/users"); // We'll need to create this or use a generic users endpoint
      const data = await res.json();
      setUsers(data.users || []);
    } catch (error) {
      console.error("Failed to fetch users", error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, [statusFilter]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchCustomers();
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/customers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          owner_id: formData.owner_id ? parseInt(formData.owner_id) : null
        })
      });
      if (res.ok) {
        setIsModalOpen(false);
        setFormData({ company_name: "", contact_name: "", email: "", phone: "", customer_status: "NEW", owner_id: "" });
        fetchCustomers();
      } else {
        alert("Chyba při vytváření zákazníka");
      }
    } catch (error) {
      console.error("Error creating customer", error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "VIP": return "bg-purple-500/10 text-purple-400 border-purple-500/20";
      case "BIG": return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "NEW": return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "POTENTIAL": return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "TEAM": return "bg-slate-500/10 text-slate-400 border-slate-500/20";
      case "NEW_WEB": return "bg-cyan-500/10 text-cyan-400 border-cyan-500/20";
      default: return "bg-slate-800 text-slate-300 border-slate-700";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-white">Zákazníci (CRM)</h1>
        <button
          onClick={() => {
            fetchUsers();
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-[#5885fa] text-white rounded-lg hover:bg-[#406ee0] transition-colors"
        >
          <Plus className="w-4 h-4" />
          Nový zákazník
        </button>
      </div>

      {/* Filters & Search */}
      <div className="bg-[#0f1420] border border-slate-800 rounded-xl p-4 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input
              type="text"
              placeholder="Hledat podle jména, firmy nebo e-mailu..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-[#5885fa]"
            />
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {statuses.map((status) => (
            <button
              key={status.id}
              onClick={() => setStatusFilter(status.id)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border ${
                statusFilter === status.id
                  ? "bg-[#5885fa]/20 text-[#5885fa] border-[#5885fa]/30"
                  : "bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800"
              }`}
            >
              {status.label}
            </button>
          ))}
        </div>
      </div>

      {/* Customers List */}
      <div className="bg-[#0f1420] border border-slate-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/50">
                <th className="p-4 text-sm font-medium text-slate-400">Zákazník</th>
                <th className="p-4 text-sm font-medium text-slate-400">Kontakt</th>
                <th className="p-4 text-sm font-medium text-slate-400">Status</th>
                <th className="p-4 text-sm font-medium text-slate-400">Vlastník</th>
                <th className="p-4 text-sm font-medium text-slate-400">Útrata</th>
                <th className="p-4 text-sm font-medium text-slate-400 text-right">Akce</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500">Načítání...</td>
                </tr>
              ) : customers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500">Žádní zákazníci nenalezeni</td>
                </tr>
              ) : (
                customers.map((customer) => (
                  <tr key={customer.id} className="border-b border-slate-800/50 hover:bg-slate-800/20 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 shrink-0">
                          {customer.company_name ? <Building2 className="w-5 h-5" /> : <User className="w-5 h-5" />}
                        </div>
                        <div>
                          <p className="font-medium text-white">{customer.company_name || customer.contact_name}</p>
                          {customer.company_name && <p className="text-xs text-slate-500">{customer.contact_name}</p>}
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-sm text-slate-300">
                          <Mail className="w-3.5 h-3.5 text-slate-500" />
                          {customer.email}
                        </div>
                        {customer.phone && (
                          <div className="flex items-center gap-2 text-sm text-slate-400">
                            <Phone className="w-3.5 h-3.5 text-slate-500" />
                            {customer.phone}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(customer.customer_status)}`}>
                        {statuses.find(s => s.id === customer.customer_status)?.label || customer.customer_status}
                      </span>
                    </td>
                    <td className="p-4">
                      {customer.owner_first_name ? (
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-[#5885fa]/20 text-[#5885fa] flex items-center justify-center text-xs font-bold">
                            {customer.owner_first_name[0]}
                          </div>
                          <span className="text-sm text-slate-300">{customer.owner_first_name} {customer.owner_last_name}</span>
                        </div>
                      ) : (
                        <span className="text-sm text-slate-500 italic">Nepřiřazeno</span>
                      )}
                    </td>
                    <td className="p-4">
                      <p className="text-sm font-medium text-white">{Number(customer.total_spent).toLocaleString("cs-CZ")} Kč</p>
                      <p className="text-xs text-slate-500">Věrnost: {customer.loyalty_status}</p>
                    </td>
                    <td className="p-4 text-right">
                      <Link 
                        href={`/admin/customers/${customer.id}`}
                        className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-[#0f1420] border border-slate-800 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-slate-800">
              <h2 className="text-xl font-bold text-white">Nový zákazník</h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Název firmy (volitelné)</label>
                  <input
                    type="text"
                    value={formData.company_name}
                    onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#5885fa]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Kontaktní osoba *</label>
                  <input
                    type="text"
                    required
                    value={formData.contact_name}
                    onChange={(e) => setFormData({ ...formData, contact_name: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#5885fa]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">E-mail *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#5885fa]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Telefon</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#5885fa]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Status zákazníka</label>
                  <select
                    value={formData.customer_status}
                    onChange={(e) => setFormData({ ...formData, customer_status: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#5885fa]"
                  >
                    {statuses.filter(s => s.id !== "ALL").map(s => (
                      <option key={s.id} value={s.id}>{s.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Vlastník (Obchodník)</label>
                  <select
                    value={formData.owner_id}
                    onChange={(e) => setFormData({ ...formData, owner_id: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#5885fa]"
                  >
                    <option value="">-- Nepřiřazeno --</option>
                    {users.map(u => (
                      <option key={u.id} value={u.id}>{u.first_name} {u.last_name} ({u.role_name})</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-slate-300 hover:text-white transition-colors"
                >
                  Zrušit
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#5885fa] text-white rounded-lg hover:bg-[#406ee0] transition-colors"
                >
                  Vytvořit zákazníka
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
