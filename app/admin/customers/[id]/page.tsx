"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  Building2, 
  User, 
  Mail, 
  Phone, 
  Globe, 
  FileText, 
  MessageSquare, 
  ArrowLeft,
  Loader2,
  Calendar,
  ExternalLink
} from "lucide-react";
import Link from "next/link";

interface CustomerData {
  customer: {
    id: number;
    company_name: string | null;
    contact_name: string;
    email: string;
    phone: string | null;
    customer_status: string;
    loyalty_status: string;
    total_spent: number;
    owner_name: string | null;
    created_at: string;
  };
  websites: any[];
  invoices: any[];
  tickets: any[];
}

export default function CustomerDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();
  const [data, setData] = useState<CustomerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const res = await fetch(`/api/admin/customers/${id}`);
        if (res.ok) {
          const json = await res.json();
          setData(json);
        } else {
          router.push("/admin/customers");
        }
      } catch (error) {
        console.error("Failed to fetch customer detail:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerData();
  }, [id, router]);

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
      </div>
    );
  }

  if (!data) return null;

  const { customer, websites, invoices, tickets } = data;

  return (
    <div className="space-y-6">
      {/* Breadcrumbs & Back */}
      <div className="flex items-center gap-4">
        <button 
          onClick={() => router.back()}
          className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-white">
            {customer.company_name || customer.contact_name}
          </h1>
          <p className="text-sm text-slate-400">Detail zákazníka #{customer.id}</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column: Profile Card */}
        <div className="space-y-6">
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-[#5885fa]/10 flex items-center justify-center text-[#5885fa] font-bold text-2xl border border-[#5885fa]/20">
                {customer.company_name ? <Building2 className="w-8 h-8" /> : <User className="w-8 h-8" />}
              </div>
              <div>
                <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] font-bold uppercase tracking-wider">
                  {customer.customer_status}
                </span>
                <h2 className="text-xl font-bold text-white mt-1">{customer.contact_name}</h2>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-slate-300">
                <Mail className="w-4 h-4 text-slate-500" />
                <span className="text-sm">{customer.email}</span>
              </div>
              {customer.phone && (
                <div className="flex items-center gap-3 text-slate-300">
                  <Phone className="w-4 h-4 text-slate-500" />
                  <span className="text-sm">{customer.phone}</span>
                </div>
              )}
              <div className="flex items-center gap-3 text-slate-300">
                <Calendar className="w-4 h-4 text-slate-500" />
                <span className="text-sm">Zákazníkem od {new Date(customer.created_at).toLocaleDateString("cs-CZ")}</span>
              </div>
              <div className="pt-4 border-t border-slate-800">
                <p className="text-xs text-slate-500 uppercase font-bold tracking-widest mb-2">Vlastník účtu</p>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-[10px] text-slate-400">
                    {customer.owner_name?.[0] || "?"}
                  </div>
                  <span className="text-sm text-slate-300">{customer.owner_name || "Nepřiřazeno"}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm">
            <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-4">Finanční přehled</h3>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-slate-500 mb-1">Celková útrata</p>
                <p className="text-2xl font-bold text-white">
                  {new Intl.NumberFormat('cs-CZ', { style: 'currency', currency: 'CZK' }).format(customer.total_spent)}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">Věrnostní status</p>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-emerald-400">{customer.loyalty_status}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Tabs & Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tabs */}
          <div className="flex gap-1 p-1 bg-slate-900/50 border border-slate-800 rounded-xl w-fit">
            {[
              { id: "overview", label: "Přehled", icon: Globe },
              { id: "websites", label: `Weby (${websites.length})`, icon: Globe },
              { id: "invoices", label: `Faktury (${invoices.length})`, icon: FileText },
              { id: "tickets", label: `Tickety (${tickets.length})`, icon: MessageSquare },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all
                  ${activeTab === tab.id 
                    ? "bg-[#5885fa] text-white shadow-lg shadow-blue-900/20" 
                    : "text-slate-400 hover:text-white hover:bg-slate-800"}
                `}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="min-h-[400px]">
            {activeTab === "overview" && (
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-white">Aktivní projekty</h3>
                    <Globe className="w-5 h-5 text-blue-500" />
                  </div>
                  <div className="space-y-4">
                    {websites.slice(0, 3).map(w => (
                      <div key={w.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-800/50 border border-slate-700/50">
                        <div>
                          <p className="text-sm font-medium text-white">{w.name}</p>
                          <p className="text-xs text-slate-500">{w.url}</p>
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
                          {w.status}
                        </span>
                      </div>
                    ))}
                    {websites.length === 0 && <p className="text-sm text-slate-500 text-center py-4">Žádné weby</p>}
                    {websites.length > 3 && (
                      <button onClick={() => setActiveTab("websites")} className="w-full text-center text-xs text-[#5885fa] hover:underline">
                        Zobrazit všech {websites.length} webů
                      </button>
                    )}
                  </div>
                </div>

                <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-white">Poslední faktury</h3>
                    <FileText className="w-5 h-5 text-emerald-500" />
                  </div>
                  <div className="space-y-4">
                    {invoices.slice(0, 3).map(i => (
                      <div key={i.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-800/50 border border-slate-700/50">
                        <div>
                          <p className="text-sm font-medium text-white">{i.invoice_number}</p>
                          <p className="text-xs text-slate-500">{new Date(i.due_date).toLocaleDateString("cs-CZ")}</p>
                        </div>
                        <p className="text-sm font-bold text-white">{Number(i.amount).toLocaleString("cs-CZ")} Kč</p>
                      </div>
                    ))}
                    {invoices.length === 0 && <p className="text-sm text-slate-500 text-center py-4">Žádné faktury</p>}
                    {invoices.length > 3 && (
                      <button onClick={() => setActiveTab("invoices")} className="w-full text-center text-xs text-[#5885fa] hover:underline">
                        Zobrazit všech {invoices.length} faktur
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "websites" && (
              <div className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-slate-800/50 text-slate-400 text-xs uppercase tracking-wider">
                    <tr>
                      <th className="p-4 font-medium">Web</th>
                      <th className="p-4 font-medium">Status</th>
                      <th className="p-4 font-medium">Tech Stack</th>
                      <th className="p-4 font-medium text-right">Akce</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {websites.map((w) => (
                      <tr key={w.id} className="hover:bg-slate-800/30 transition-colors">
                        <td className="p-4">
                          <p className="font-medium text-white">{w.name}</p>
                          <p className="text-xs text-slate-500">{w.url}</p>
                        </td>
                        <td className="p-4">
                          <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] font-bold">
                            {w.status}
                          </span>
                        </td>
                        <td className="p-4 text-sm text-slate-400">{w.tech_stack || "-"}</td>
                        <td className="p-4 text-right">
                          <Link href={`/admin/websites/${w.id}`} className="text-slate-400 hover:text-white">
                            <ExternalLink className="w-4 h-4" />
                          </Link>
                        </td>
                      </tr>
                    ))}
                    {websites.length === 0 && (
                      <tr>
                        <td colSpan={4} className="p-8 text-center text-slate-500">Žádné weby nenalezeny.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === "invoices" && (
              <div className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-slate-800/50 text-slate-400 text-xs uppercase tracking-wider">
                    <tr>
                      <th className="p-4 font-medium">Číslo</th>
                      <th className="p-4 font-medium">Částka</th>
                      <th className="p-4 font-medium">Splatnost</th>
                      <th className="p-4 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {invoices.map((i) => (
                      <tr key={i.id} className="hover:bg-slate-800/30 transition-colors">
                        <td className="p-4 font-medium text-white">{i.invoice_number}</td>
                        <td className="p-4 text-sm text-white font-bold">{Number(i.amount).toLocaleString("cs-CZ")} Kč</td>
                        <td className="p-4 text-sm text-slate-400">{new Date(i.due_date).toLocaleDateString("cs-CZ")}</td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                            i.status === 'PAID' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                          }`}>
                            {i.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                    {invoices.length === 0 && (
                      <tr>
                        <td colSpan={4} className="p-8 text-center text-slate-500">Žádné faktury nenalezeny.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === "tickets" && (
              <div className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-slate-800/50 text-slate-400 text-xs uppercase tracking-wider">
                    <tr>
                      <th className="p-4 font-medium">Předmět</th>
                      <th className="p-4 font-medium">Priorita</th>
                      <th className="p-4 font-medium">Status</th>
                      <th className="p-4 font-medium text-right">Datum</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {tickets.map((t) => (
                      <tr key={t.id} className="hover:bg-slate-800/30 transition-colors">
                        <td className="p-4">
                          <p className="font-medium text-white">{t.title}</p>
                        </td>
                        <td className="p-4">
                          <span className={`text-[10px] font-bold ${
                            t.priority === 'URGENT' ? 'text-rose-400' : 'text-slate-400'
                          }`}>
                            {t.priority}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] font-bold">
                            {t.status}
                          </span>
                        </td>
                        <td className="p-4 text-right text-xs text-slate-500">
                          {new Date(t.created_at).toLocaleDateString("cs-CZ")}
                        </td>
                      </tr>
                    ))}
                    {tickets.length === 0 && (
                      <tr>
                        <td colSpan={4} className="p-8 text-center text-slate-500">Žádné tickety nenalezeny.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
