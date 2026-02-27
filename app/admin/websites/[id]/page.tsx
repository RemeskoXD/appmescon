"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  Globe, 
  Server, 
  Shield, 
  Code, 
  DollarSign, 
  Calendar, 
  User, 
  ArrowLeft,
  Loader2,
  ExternalLink,
  Save,
  AlertTriangle,
  CheckCircle,
  Clock
} from "lucide-react";

interface WebsiteDetail {
  id: number;
  customer_id: number;
  name: string;
  url: string;
  status: string;
  tech_stack: string | null;
  price_sold: number;
  monthly_hosting_fee: number;
  monthly_maintenance_fee: number;
  domain_price: number;
  domain_expires_at: string | null;
  hosting_paid_until: string | null;
  maintenance_paid_until: string | null;
  developer_id: number | null;
  sales_id: number | null;
  company_name: string | null;
  contact_name: string;
  customer_email: string;
  dev_name: string | null;
  dev_surname: string | null;
  sales_name: string | null;
  sales_surname: string | null;
}

export default function WebsiteDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();
  const [website, setWebsite] = useState<WebsiteDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    const fetchWebsite = async () => {
      try {
        const res = await fetch(`/api/admin/websites/${id}`);
        if (res.ok) {
          const data = await res.json();
          setWebsite(data);
          setFormData(data);
        } else {
          router.push("/admin/websites");
        }
      } catch (error) {
        console.error("Failed to fetch website detail:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWebsite();
  }, [id, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Filter out joined fields before sending to API
      const { 
        company_name, contact_name, customer_email, 
        dev_name, dev_surname, sales_name, sales_surname,
        id: _, ...updateData 
      } = formData;

      const res = await fetch(`/api/admin/websites/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
      });

      if (res.ok) {
        setWebsite(formData);
        setEditMode(false);
      }
    } catch (error) {
      console.error("Failed to update website:", error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
      </div>
    );
  }

  if (!website) return null;

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Nenastaveno";
    return new Date(dateString).toLocaleDateString("cs-CZ");
  };

  const isExpiringSoon = (dateString: string | null) => {
    if (!dateString) return false;
    const date = new Date(dateString);
    const now = new Date();
    const diff = date.getTime() - now.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days <= 30 && days >= 0;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.back()}
            className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-3">
              {website.name}
              <a href={website.url} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-[#5885fa]">
                <ExternalLink className="w-4 h-4" />
              </a>
            </h1>
            <p className="text-sm text-slate-400">{website.url}</p>
          </div>
        </div>
        <div className="flex gap-3">
          {editMode ? (
            <>
              <button 
                onClick={() => { setEditMode(false); setFormData(website); }}
                className="px-4 py-2 rounded-lg text-slate-300 hover:bg-slate-800 transition-colors"
              >
                Zrušit
              </button>
              <button 
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                Uložit změny
              </button>
            </>
          ) : (
            <button 
              onClick={() => setEditMode(true)}
              className="px-4 py-2 rounded-lg bg-slate-800 text-white hover:bg-slate-700 transition-colors border border-slate-700"
            >
              Upravit web
            </button>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm">
            <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-2">
              <Globe className="w-4 h-4 text-blue-500" />
              Základní informace
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Status projektu</label>
                  {editMode ? (
                    <select 
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#5885fa]"
                    >
                      <option value="NEW">Nový</option>
                      <option value="IN_PROGRESS">Ve vývoji</option>
                      <option value="ACTIVE">Aktivní</option>
                      <option value="INACTIVE">Neaktivní</option>
                    </select>
                  ) : (
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold border ${
                      website.status === 'ACTIVE' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                    }`}>
                      {website.status}
                    </span>
                  )}
                </div>
                <div>
                  <label className="block text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Tech Stack</label>
                  {editMode ? (
                    <input 
                      type="text"
                      name="tech_stack"
                      value={formData.tech_stack || ""}
                      onChange={handleInputChange}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#5885fa]"
                    />
                  ) : (
                    <div className="flex items-center gap-2 text-white">
                      <Code className="w-4 h-4 text-slate-500" />
                      {website.tech_stack || "Nespecifikováno"}
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Zákazník</label>
                  <div className="text-white font-medium">{website.company_name || website.contact_name}</div>
                  <div className="text-xs text-slate-500">{website.customer_email}</div>
                </div>
                <div>
                  <label className="block text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Developer</label>
                  <div className="flex items-center gap-2 text-white">
                    <User className="w-4 h-4 text-slate-500" />
                    {website.dev_name ? `${website.dev_name} ${website.dev_surname}` : "Nepřiřazeno"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm">
            <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-2">
              <Server className="w-4 h-4 text-emerald-500" />
              Hosting a Expirace
            </h3>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { label: "Doména", date: website.domain_expires_at, field: "domain_expires_at" },
                { label: "Hosting", date: website.hosting_paid_until, field: "hosting_paid_until" },
                { label: "Správa", date: website.maintenance_paid_until, field: "maintenance_paid_until" },
              ].map((item) => (
                <div key={item.field} className="p-4 rounded-xl bg-slate-800/30 border border-slate-700/50">
                  <p className="text-xs text-slate-500 font-bold uppercase mb-2">{item.label}</p>
                  {editMode ? (
                    <input 
                      type="date"
                      name={item.field}
                      value={formData[item.field] ? formData[item.field].split('T')[0] : ""}
                      onChange={handleInputChange}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2 py-1 text-sm text-white focus:outline-none focus:border-[#5885fa]"
                    />
                  ) : (
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-bold text-white">{formatDate(item.date)}</span>
                      {isExpiringSoon(item.date) && (
                        <span className="flex items-center gap-1 text-[10px] text-amber-400 font-bold">
                          <AlertTriangle className="w-3 h-3" />
                          Blíží se expirace
                        </span>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm">
            <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-amber-500" />
              Finanční údaje
            </h3>
            
            <div className="space-y-4">
              <div>
                <p className="text-xs text-slate-500 mb-1">Cena za prodej</p>
                {editMode ? (
                  <input 
                    type="number"
                    name="price_sold"
                    value={formData.price_sold}
                    onChange={handleInputChange}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#5885fa]"
                  />
                ) : (
                  <p className="text-xl font-bold text-white">{Number(website.price_sold).toLocaleString("cs-CZ")} Kč</p>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-slate-500 mb-1">Měsíční hosting</p>
                  {editMode ? (
                    <input 
                      type="number"
                      name="monthly_hosting_fee"
                      value={formData.monthly_hosting_fee}
                      onChange={handleInputChange}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#5885fa]"
                    />
                  ) : (
                    <p className="text-sm font-bold text-white">{Number(website.monthly_hosting_fee).toLocaleString("cs-CZ")} Kč</p>
                  )}
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">Měsíční správa</p>
                  {editMode ? (
                    <input 
                      type="number"
                      name="monthly_maintenance_fee"
                      value={formData.monthly_maintenance_fee}
                      onChange={handleInputChange}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#5885fa]"
                    />
                  ) : (
                    <p className="text-sm font-bold text-white">{Number(website.monthly_maintenance_fee).toLocaleString("cs-CZ")} Kč</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm">
            <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-4">Rychlé akce</h3>
            <div className="space-y-2">
              <button className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-800 hover:bg-slate-700 transition-colors text-sm text-white group">
                Vystavit fakturu
                <DollarSign className="w-4 h-4 text-slate-500 group-hover:text-amber-500" />
              </button>
              <button className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-800 hover:bg-slate-700 transition-colors text-sm text-white group">
                Vytvořit ticket
                <Shield className="w-4 h-4 text-slate-500 group-hover:text-blue-500" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
