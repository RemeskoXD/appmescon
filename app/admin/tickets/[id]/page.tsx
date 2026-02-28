"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  CheckCircle, 
  ArrowLeft,
  Loader2,
  Building2,
  Send
} from "lucide-react";

interface TicketDetail {
  id: number;
  title: string;
  description: string;
  status: "OPEN" | "IN_PROGRESS" | "CLOSED";
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
  customer_id: number | null;
  assigned_to: number | null;
  created_by: number;
  created_at: string;
  company_name: string | null;
  contact_name: string | null;
  assigned_name: string | null;
  assigned_surname: string | null;
  creator_name: string;
  creator_surname: string;
}

export default function TicketDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();
  const [ticket, setTicket] = useState<TicketDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ticketRes, usersRes] = await Promise.all([
          fetch(`/api/admin/tickets/${id}`),
          fetch("/api/users")
        ]);

        if (ticketRes.ok) {
          setTicket(await ticketRes.json());
        } else {
          router.push("/admin/tickets");
        }

        if (usersRes.ok) {
          setUsers(await usersRes.json());
        }
      } catch (error) {
        console.error("Failed to fetch ticket data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, router]);

  const handleUpdate = async (field: string, value: any) => {
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/tickets/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [field]: value }),
      });

      if (res.ok) {
        setTicket((prev: any) => ({ ...prev, [field]: value }));
      }
    } catch (error) {
      console.error("Failed to update ticket:", error);
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

  if (!ticket) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button 
          onClick={() => router.back()}
          className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            {ticket.title}
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
              ticket.status === 'OPEN' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
              ticket.status === 'IN_PROGRESS' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
              'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
            }`}>
              {ticket.status}
            </span>
          </h1>
          <p className="text-sm text-slate-400">Ticket #{ticket.id} • Vytvořeno {new Date(ticket.created_at).toLocaleString("cs-CZ")}</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm">
            <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-4">Popis požadavku</h3>
            <div className="prose prose-invert max-w-none">
              <p className="text-slate-300 whitespace-pre-wrap">{ticket.description}</p>
            </div>
          </div>

          {/* Activity / Comments Placeholder */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm">
            <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6">Aktivita a komentáře</h3>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-xs text-slate-400">
                  {ticket.creator_name[0]}
                </div>
                <div className="flex-1">
                  <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4">
                    <p className="text-sm text-white font-medium mb-1">{ticket.creator_name} {ticket.creator_surname}</p>
                    <p className="text-sm text-slate-400">Vytvořil tento ticket.</p>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-2">{new Date(ticket.created_at).toLocaleString("cs-CZ")}</p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-[#5885fa]/20 flex items-center justify-center text-[#5885fa] text-xs font-bold">
                  A
                </div>
                <div className="flex-1 relative">
                  <textarea 
                    placeholder="Napište komentář..."
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#5885fa] resize-none"
                    rows={3}
                  />
                  <button className="absolute bottom-3 right-3 p-2 bg-[#5885fa] hover:bg-[#406ee0] text-white rounded-lg transition-colors">
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Controls */}
        <div className="space-y-6">
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm">
            <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6">Správa ticketu</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-xs text-slate-500 uppercase font-bold tracking-wider mb-2">Status</label>
                <div className="grid grid-cols-1 gap-2">
                  {['OPEN', 'IN_PROGRESS', 'CLOSED'].map((s) => (
                    <button
                      key={s}
                      onClick={() => handleUpdate('status', s)}
                      disabled={saving}
                      className={`
                        flex items-center justify-between px-4 py-2 rounded-xl text-sm font-medium border transition-all
                        ${ticket.status === s 
                          ? 'bg-[#5885fa]/10 text-[#5885fa] border-[#5885fa]/30' 
                          : 'bg-slate-800/50 text-slate-400 border-slate-700 hover:bg-slate-800'}
                      `}
                    >
                      {s}
                      {ticket.status === s && <CheckCircle className="w-4 h-4" />}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-500 uppercase font-bold tracking-wider mb-2">Přiřazeno</label>
                <select 
                  value={ticket.assigned_to || ""}
                  onChange={(e) => handleUpdate('assigned_to', e.target.value || null)}
                  disabled={saving}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#5885fa]"
                >
                  <option value="">Nepřiřazeno</option>
                  {users.map(u => (
                    <option key={u.id} value={u.id}>{u.first_name} {u.last_name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs text-slate-500 uppercase font-bold tracking-wider mb-2">Priorita</label>
                <select 
                  value={ticket.priority}
                  onChange={(e) => handleUpdate('priority', e.target.value)}
                  disabled={saving}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#5885fa]"
                >
                  <option value="LOW">Nízká</option>
                  <option value="MEDIUM">Střední</option>
                  <option value="HIGH">Vysoká</option>
                  <option value="URGENT">Kritická</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm">
            <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-4">Informace o zákazníkovi</h3>
            {ticket.customer_id ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 border border-slate-700">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{ticket.company_name || ticket.contact_name}</p>
                    <p className="text-xs text-slate-500">{ticket.contact_name}</p>
                  </div>
                </div>
                <button 
                  onClick={() => router.push(`/admin/customers/${ticket.customer_id}`)}
                  className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-white transition-colors"
                >
                  Zobrazit profil zákazníka
                </button>
              </div>
            ) : (
              <p className="text-sm text-slate-500 italic">Interní požadavek</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
