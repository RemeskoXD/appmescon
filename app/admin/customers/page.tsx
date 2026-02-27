"use client";

import { useState, useEffect } from "react";
import { 
  Search, 
  Plus, 
  MoreVertical, 
  User, 
  Building2, 
  Mail, 
  Phone,
  CheckCircle,
  Eye
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Customer {
  id: number;
  company_name: string;
  contact_name: string;
  email: string;
  phone: string;
  customer_status: "VIP" | "BIG" | "NEW" | "POTENTIAL" | "TEAM" | "NEW_WEB" | "STANDARD";
  loyalty_status: "NONE" | "1_YEAR" | "3_YEARS" | "LIFETIME";
  total_spent: number;
  owner_name: string;
  created_at: string;
}

const statusColors = {
  VIP: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  BIG: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  NEW: "bg-green-500/10 text-green-400 border-green-500/20",
  POTENTIAL: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  TEAM: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
  NEW_WEB: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  STANDARD: "bg-slate-500/10 text-slate-400 border-slate-500/20",
};

export default function CustomersPage() {
  const router = useRouter();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [users, setUsers] = useState<{id: number, first_name: string, last_name: string}[]>([]);
  const [formData, setFormData] = useState({
    company_name: "",
    contact_name: "",
    email: "",
    phone: "",
    customer_status: "NEW",
    owner_id: ""
  });

  // Fetch customers and users
  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (search) params.append("search", search);
        if (statusFilter !== "ALL") params.append("status", statusFilter);

        const res = await fetch(`/api/customers?${params.toString()}`);
        if (res.ok) {
          const data = await res.json();
          setCustomers(data);
        }
      } catch (error) {
        console.error("Failed to fetch customers", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/users");
        if (res.ok) {
          const data = await res.json();
          setUsers(data);
        }
      } catch (error) {
        console.error("Failed to fetch users", error);
      }
    };

    const debounce = setTimeout(fetchCustomers, 300);
    fetchUsers();
    return () => clearTimeout(debounce);
  }, [search, statusFilter]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/customers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setIsModalOpen(false);
        setFormData({
          company_name: "",
          contact_name: "",
          email: "",
          phone: "",
          customer_status: "NEW",
          owner_id: ""
        });
        // Refresh list
        const params = new URLSearchParams();
        if (search) params.append("search", search);
        if (statusFilter !== "ALL") params.append("status", statusFilter);
        const refreshRes = await fetch(`/api/customers?${params.toString()}`);
        if (refreshRes.ok) {
          const data = await refreshRes.json();
          setCustomers(data);
        }
      } else {
        alert("Chyba při ukládání zákazníka");
      }
    } catch (error) {
      console.error("Error saving customer", error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Zákazníci</h1>
          <p className="text-slate-400 mt-1">Správa a evidence klientů</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-[#5885fa] hover:bg-[#406ee0] text-white px-4 py-2.5 rounded-lg font-medium transition-colors shadow-lg shadow-blue-900/20"
        >
          <Plus className="w-5 h-5" />
          Přidat zákazníka
        </button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4 bg-slate-900/50 p-4 rounded-xl border border-slate-800 backdrop-blur-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          <input 
            type="text" 
            placeholder="Hledat jméno, firmu, email..." 
            className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-[#5885fa]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
          {["ALL", "VIP", "BIG", "NEW", "POTENTIAL", "TEAM", "NEW_WEB"].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`
                px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors border
                ${statusFilter === status 
                  ? "bg-[#5885fa]/10 text-[#5885fa] border-[#5885fa]/30" 
                  : "bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700 hover:text-white"}
              `}
            >
              {status === "ALL" ? "Vše" : status}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden backdrop-blur-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-800/50 text-slate-400 text-sm uppercase tracking-wider border-b border-slate-700">
                <th className="p-4 font-medium">Jméno / Firma</th>
                <th className="p-4 font-medium">Kontakt</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Věrnost</th>
                <th className="p-4 font-medium text-right">Útrata</th>
                <th className="p-4 font-medium">Vlastník</th>
                <th className="p-4 font-medium text-right">Akce</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {loading ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-500">
                    Načítám data...
                  </td>
                </tr>
              ) : customers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-500">
                    Žádní zákazníci nenalezeni.
                  </td>
                </tr>
              ) : (
                customers.map((customer) => (
                  <tr 
                    key={customer.id} 
                    className="hover:bg-slate-800/30 transition-colors group cursor-pointer"
                    onClick={() => router.push(`/admin/customers/${customer.id}`)}
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 font-bold border border-slate-700">
                          {customer.company_name ? <Building2 className="w-5 h-5" /> : <User className="w-5 h-5" />}
                        </div>
                        <div>
                          <p className="font-medium text-white">{customer.contact_name}</p>
                          {customer.company_name && (
                            <p className="text-xs text-slate-400">{customer.company_name}</p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-slate-300">
                          <Mail className="w-3.5 h-3.5 text-slate-500" />
                          {customer.email}
                        </div>
                        {customer.phone && (
                          <div className="flex items-center gap-2 text-sm text-slate-300">
                            <Phone className="w-3.5 h-3.5 text-slate-500" />
                            {customer.phone}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${statusColors[customer.customer_status] || statusColors.STANDARD}`}>
                        {customer.customer_status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {customer.loyalty_status === "LIFETIME" && <CheckCircle className="w-4 h-4 text-purple-400" />}
                        {customer.loyalty_status === "3_YEARS" && <CheckCircle className="w-4 h-4 text-blue-400" />}
                        {customer.loyalty_status === "1_YEAR" && <CheckCircle className="w-4 h-4 text-green-400" />}
                        <span className="text-sm text-slate-300">
                          {customer.loyalty_status === "NONE" ? "-" : customer.loyalty_status.replace("_", " ")}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 text-right font-mono text-white">
                      {new Intl.NumberFormat('cs-CZ', { style: 'currency', currency: 'CZK' }).format(customer.total_spent)}
                    </td>
                    <td className="p-4 text-sm text-slate-400">
                      {customer.owner_name || "-"}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link 
                          href={`/admin/customers/${customer.id}`}
                          className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Eye className="w-5 h-5" />
                        </Link>
                        <button 
                          className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <MoreVertical className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Customer Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg p-6 shadow-2xl max-h-[90vh] overflow-y-auto custom-scroll">
            <h2 className="text-xl font-bold text-white mb-4">Přidat nového zákazníka</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-slate-400 mb-1">Jméno kontaktu *</label>
                  <input 
                    type="text" 
                    name="contact_name"
                    required
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#5885fa]"
                    value={formData.contact_name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-slate-400 mb-1">Název firmy</label>
                  <input 
                    type="text" 
                    name="company_name"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#5885fa]"
                    value={formData.company_name}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Email *</label>
                  <input 
                    type="email" 
                    name="email"
                    required
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#5885fa]"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Telefon</label>
                  <input 
                    type="tel" 
                    name="phone"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#5885fa]"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Status</label>
                  <select 
                    name="customer_status"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#5885fa]"
                    value={formData.customer_status}
                    onChange={handleInputChange}
                  >
                    <option value="NEW">Nový</option>
                    <option value="POTENTIAL">Potencionální</option>
                    <option value="VIP">VIP</option>
                    <option value="BIG">Velký</option>
                    <option value="TEAM">Tým</option>
                    <option value="NEW_WEB">Nový Web</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Vlastník</label>
                  <select 
                    name="owner_id"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#5885fa]"
                    value={formData.owner_id}
                    onChange={handleInputChange}
                  >
                    <option value="">-- Vybrat vlastníka --</option>
                    {users.map(user => (
                      <option key={user.id} value={user.id}>
                        {user.first_name} {user.last_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800 mt-6">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg text-slate-300 hover:bg-slate-800 transition-colors"
                >
                  Zrušit
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#5885fa] text-white hover:bg-[#406ee0] transition-colors"
                >
                  Uložit zákazníka
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
