"use client";

import { useState, useEffect } from "react";
import { 
  Search, 
  Plus, 
  Globe, 
  MoreVertical, 
  AlertTriangle,
  Server,
  Code,
  Eye
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Website {
  id: number;
  name: string;
  url: string;
  status: "ACTIVE" | "INACTIVE" | "IN_PROGRESS" | "NEW" | "UNSPECIFIED";
  tech_stack: string;
  domain_expires_at: string;
  hosting_paid_until: string;
  maintenance_paid_until: string;
  company_name: string;
  contact_name: string;
  dev_name: string;
  dev_surname: string;
}

const statusColors = {
  ACTIVE: "bg-green-500/10 text-green-400 border-green-500/20",
  INACTIVE: "bg-red-500/10 text-red-400 border-red-500/20",
  IN_PROGRESS: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  NEW: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  UNSPECIFIED: "bg-slate-500/10 text-slate-400 border-slate-500/20",
};

export default function WebsitesPage() {
  const router = useRouter();
  const [websites, setWebsites] = useState<Website[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [showExpiring, setShowExpiring] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [customers, setCustomers] = useState<{id: number, company_name: string, contact_name: string}[]>([]);
  const [users, setUsers] = useState<{id: number, first_name: string, last_name: string}[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    url: "",
    customer_id: "",
    status: "NEW",
    tech_stack: "",
    price_sold: "",
    monthly_hosting_fee: "",
    monthly_maintenance_fee: "",
    domain_price: "",
    domain_expires_at: "",
    hosting_paid_until: "",
    maintenance_paid_until: "",
    developer_id: "",
    sales_id: ""
  });

  // Fetch websites, customers, and users
  useEffect(() => {
    const fetchWebsites = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (search) params.append("search", search);
        if (statusFilter !== "ALL") params.append("status", statusFilter);
        if (showExpiring) params.append("expiring", "true");

        const res = await fetch(`/api/websites?${params.toString()}`);
        if (res.ok) {
          const data = await res.json();
          setWebsites(data);
        }
      } catch (error) {
        console.error("Failed to fetch websites", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchCustomers = async () => {
      try {
        const res = await fetch("/api/customers");
        if (res.ok) {
          const data = await res.json();
          setCustomers(data);
        }
      } catch (error) {
        console.error("Failed to fetch customers", error);
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

    const debounce = setTimeout(fetchWebsites, 300);
    fetchCustomers();
    fetchUsers();
    return () => clearTimeout(debounce);
  }, [search, statusFilter, showExpiring]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/websites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setIsModalOpen(false);
        setFormData({
          name: "",
          url: "",
          customer_id: "",
          status: "NEW",
          tech_stack: "",
          price_sold: "",
          monthly_hosting_fee: "",
          monthly_maintenance_fee: "",
          domain_price: "",
          domain_expires_at: "",
          hosting_paid_until: "",
          maintenance_paid_until: "",
          developer_id: "",
          sales_id: ""
        });
        // Refresh list
        const params = new URLSearchParams();
        if (search) params.append("search", search);
        if (statusFilter !== "ALL") params.append("status", statusFilter);
        if (showExpiring) params.append("expiring", "true");
        const refreshRes = await fetch(`/api/websites?${params.toString()}`);
        if (refreshRes.ok) {
          const data = await refreshRes.json();
          setWebsites(data);
        }
      } else {
        alert("Chyba při ukládání webu");
      }
    } catch (error) {
      console.error("Error saving website", error);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString('cs-CZ');
  };

  const isExpiringSoon = (dateString: string | null) => {
    if (!dateString) return false;
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30 && diffDays >= 0;
  };

  const isExpired = (dateString: string | null) => {
    if (!dateString) return false;
    return new Date(dateString) < new Date();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Weby</h1>
          <p className="text-slate-400 mt-1">Správa webových projektů a hostingu</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-[#5885fa] hover:bg-[#406ee0] text-white px-4 py-2.5 rounded-lg font-medium transition-colors shadow-lg shadow-blue-900/20"
        >
          <Plus className="w-5 h-5" />
          Přidat web
        </button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4 bg-slate-900/50 p-4 rounded-xl border border-slate-800 backdrop-blur-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          <input 
            type="text" 
            placeholder="Hledat web, URL, firmu..." 
            className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-[#5885fa]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar items-center">
          <button
            onClick={() => setShowExpiring(!showExpiring)}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors border
              ${showExpiring 
                ? "bg-red-500/10 text-red-400 border-red-500/30" 
                : "bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700 hover:text-white"}
            `}
          >
            <AlertTriangle className="w-4 h-4" />
            Blíží se expirace
          </button>
          <div className="w-px h-6 bg-slate-700 mx-2 hidden md:block" />
          {["ALL", "ACTIVE", "IN_PROGRESS", "NEW", "INACTIVE"].map((status) => (
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
                <th className="p-4 font-medium">Web / URL</th>
                <th className="p-4 font-medium">Zákazník</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Tech Stack</th>
                <th className="p-4 font-medium">Expirace</th>
                <th className="p-4 font-medium">Developer</th>
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
              ) : websites.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-500">
                    Žádné weby nenalezeny.
                  </td>
                </tr>
              ) : (
                websites.map((website) => (
                  <tr 
                    key={website.id} 
                    className="hover:bg-slate-800/30 transition-colors group cursor-pointer"
                    onClick={() => router.push(`/admin/websites/${website.id}`)}
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 font-bold border border-slate-700">
                          <Globe className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-medium text-white">{website.name}</p>
                          <a href={website.url} target="_blank" rel="noopener noreferrer" className="text-xs text-[#5885fa] hover:underline">
                            {website.url}
                          </a>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm text-slate-300">
                        {website.company_name || website.contact_name}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${statusColors[website.status] || statusColors.UNSPECIFIED}`}>
                        {website.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2 text-sm text-slate-400">
                        <Code className="w-4 h-4" />
                        {website.tech_stack || "-"}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="space-y-1 text-xs">
                        <div className={`flex items-center gap-2 ${isExpiringSoon(website.domain_expires_at) ? "text-yellow-400" : isExpired(website.domain_expires_at) ? "text-red-400" : "text-slate-400"}`}>
                          <Globe className="w-3 h-3" />
                          Doména: {formatDate(website.domain_expires_at)}
                        </div>
                        <div className={`flex items-center gap-2 ${isExpiringSoon(website.hosting_paid_until) ? "text-yellow-400" : isExpired(website.hosting_paid_until) ? "text-red-400" : "text-slate-400"}`}>
                          <Server className="w-3 h-3" />
                          Hosting: {formatDate(website.hosting_paid_until)}
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-slate-400">
                      {website.dev_name ? `${website.dev_name} ${website.dev_surname}` : "-"}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link 
                          href={`/admin/websites/${website.id}`}
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

      {/* Add Website Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto custom-scroll">
            <h2 className="text-xl font-bold text-white mb-4">Přidat nový web</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-slate-400 mb-1">Název webu *</label>
                  <input 
                    type="text" 
                    name="name"
                    required
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#5885fa]"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-slate-400 mb-1">URL Adresa *</label>
                  <input 
                    type="url" 
                    name="url"
                    required
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#5885fa]"
                    value={formData.url}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Zákazník *</label>
                  <select 
                    name="customer_id"
                    required
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#5885fa]"
                    value={formData.customer_id}
                    onChange={handleInputChange}
                  >
                    <option value="">-- Vybrat zákazníka --</option>
                    {customers.map(customer => (
                      <option key={customer.id} value={customer.id}>
                        {customer.company_name || customer.contact_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Status</label>
                  <select 
                    name="status"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#5885fa]"
                    value={formData.status}
                    onChange={handleInputChange}
                  >
                    <option value="NEW">Nový</option>
                    <option value="IN_PROGRESS">Ve vývoji</option>
                    <option value="ACTIVE">Aktivní</option>
                    <option value="INACTIVE">Neaktivní</option>
                  </select>
                </div>
                
                <div className="col-span-2 border-t border-slate-800 pt-4 mt-2">
                  <h3 className="text-sm font-semibold text-white mb-3">Technické a finanční info</h3>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Tech Stack</label>
                  <input 
                    type="text" 
                    name="tech_stack"
                    placeholder="Next.js, WordPress..."
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#5885fa]"
                    value={formData.tech_stack}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Cena za prodej (Kč)</label>
                  <input 
                    type="number" 
                    name="price_sold"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#5885fa]"
                    value={formData.price_sold}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Měsíční hosting (Kč)</label>
                  <input 
                    type="number" 
                    name="monthly_hosting_fee"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#5885fa]"
                    value={formData.monthly_hosting_fee}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Měsíční správa (Kč)</label>
                  <input 
                    type="number" 
                    name="monthly_maintenance_fee"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#5885fa]"
                    value={formData.monthly_maintenance_fee}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="col-span-2 border-t border-slate-800 pt-4 mt-2">
                  <h3 className="text-sm font-semibold text-white mb-3">Expirace a přiřazení</h3>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Expirace domény</label>
                  <input 
                    type="date" 
                    name="domain_expires_at"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#5885fa]"
                    value={formData.domain_expires_at}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Hosting zaplacen do</label>
                  <input 
                    type="date" 
                    name="hosting_paid_until"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#5885fa]"
                    value={formData.hosting_paid_until}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Developer</label>
                  <select 
                    name="developer_id"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#5885fa]"
                    value={formData.developer_id}
                    onChange={handleInputChange}
                  >
                    <option value="">-- Vybrat developera --</option>
                    {users.map(user => (
                      <option key={user.id} value={user.id}>
                        {user.first_name} {user.last_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Sales</label>
                  <select 
                    name="sales_id"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#5885fa]"
                    value={formData.sales_id}
                    onChange={handleInputChange}
                  >
                    <option value="">-- Vybrat obchodníka --</option>
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
                  Uložit web
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
