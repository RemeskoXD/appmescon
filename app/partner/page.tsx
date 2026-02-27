"use client";

import { useState, useEffect } from "react";
import { 
  LayoutDashboard, 
  Users, 
  Wallet, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight,
  Clock,
  CheckCircle,
  AlertCircle,
  Megaphone
} from "lucide-react";

export default function PartnerDashboard() {
  const [statsData, setStatsData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/partner/dashboard");
        if (res.ok) {
          const data = await res.json();
          setStatsData(data);
        }
      } catch (error) {
        console.error("Failed to fetch partner stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  const stats = [
    {
      name: "Celkové provize",
      value: `${(statsData?.totalCommissions || 0).toLocaleString("cs-CZ")} Kč`,
      change: "+0%",
      trend: "neutral",
      icon: Wallet,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20"
    },
    {
      name: "Doporučení klienti",
      value: (statsData?.referredCustomers || 0).toString(),
      change: "+0",
      trend: "neutral",
      icon: Users,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      border: "border-blue-500/20"
    },
    {
      name: "Konverzní poměr",
      value: `${statsData?.conversionRate || 0}%`,
      change: "0%",
      trend: "neutral",
      icon: TrendingUp,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
      border: "border-purple-500/20"
    },
    {
      name: "Čekající výplata",
      value: `${(statsData?.pendingPayout || 0).toLocaleString("cs-CZ")} Kč`,
      change: "Ke schválení",
      trend: "neutral",
      icon: Clock,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
      border: "border-amber-500/20"
    }
  ];

  const recentActivity = statsData?.recentActivity?.map((a: any, i: number) => ({
    id: i,
    type: a.type,
    title: a.title,
    amount: `${a.amount > 0 ? '+' : ''}${a.amount.toLocaleString("cs-CZ")} Kč`,
    status: a.status,
    date: new Date(a.date).toLocaleDateString("cs-CZ")
  })) || [];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "COMPLETED":
      case "APPROVED":
        return <CheckCircle className="w-5 h-5 text-emerald-500" />;
      case "PENDING":
      case "IN_PROGRESS":
        return <Clock className="w-5 h-5 text-amber-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-slate-500" />;
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          <LayoutDashboard className="h-8 w-8 text-emerald-500" />
          Přehled partnera
        </h1>
        <p className="text-slate-400 mt-1">Vítejte zpět! Zde je přehled vašich výsledků.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 backdrop-blur-sm relative overflow-hidden group">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${stat.bg} ${stat.border} border`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div className={`flex items-center gap-1 text-sm font-medium ${
                stat.trend === 'up' ? 'text-emerald-400' : 
                stat.trend === 'down' ? 'text-rose-400' : 
                'text-slate-400'
              }`}>
                {stat.trend === 'up' && <ArrowUpRight className="w-4 h-4" />}
                {stat.trend === 'down' && <ArrowDownRight className="w-4 h-4" />}
                {stat.change}
              </div>
            </div>
            <h3 className="text-3xl font-bold text-white mb-1">{stat.value}</h3>
            <p className="text-sm text-slate-400">{stat.name}</p>
            
            {/* Decorative gradient */}
            <div className={`absolute -bottom-12 -right-12 w-32 h-32 rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity ${stat.bg}`} />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-slate-900/50 border border-slate-800 rounded-xl backdrop-blur-sm overflow-hidden">
          <div className="p-6 border-b border-slate-800 flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Nedávná aktivita</h2>
            <button className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors font-medium">
              Zobrazit vše
            </button>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              {recentActivity.map((activity: any) => (
                <div key={activity.id} className="flex items-start justify-between group">
                  <div className="flex items-start gap-4">
                    <div className={`p-2 rounded-lg bg-slate-800 border border-slate-700 mt-1`}>
                      {getStatusIcon(activity.status)}
                    </div>
                    <div>
                      <h4 className="text-white font-medium group-hover:text-emerald-400 transition-colors">
                        {activity.title}
                      </h4>
                      <p className="text-sm text-slate-400 mt-0.5">{activity.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`font-semibold ${
                      activity.type === 'payout' ? 'text-slate-300' : 
                      activity.type === 'referral' ? 'text-blue-400' : 
                      'text-emerald-400'
                    }`}>
                      {activity.amount}
                    </div>
                    <div className="text-xs text-slate-500 mt-1 uppercase tracking-wider font-medium">
                      {activity.status === 'PENDING' ? 'Čeká na schválení' :
                       activity.status === 'IN_PROGRESS' ? 'V řešení' :
                       activity.status === 'APPROVED' ? 'Schváleno' :
                       'Dokončeno'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions & Info */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-emerald-900/40 to-slate-900/50 border border-emerald-500/20 rounded-xl p-6 backdrop-blur-sm">
            <h3 className="text-lg font-bold text-white mb-2">Váš partnerský odkaz</h3>
            <p className="text-sm text-slate-300 mb-4">
              Sdílejte tento odkaz a získejte provizi z každého nového klienta.
            </p>
            <div className="flex gap-2">
              <input 
                type="text" 
                readOnly 
                value="https://mescon.cz/ref/partner123" 
                className="w-full bg-slate-950 border border-slate-800 text-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none"
              />
              <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap">
                Kopírovat
              </button>
            </div>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 backdrop-blur-sm">
            <h3 className="text-lg font-bold text-white mb-4">Rychlé akce</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-3 rounded-lg bg-slate-800/50 hover:bg-slate-800 border border-slate-700 transition-colors group">
                <div className="flex items-center gap-3 text-slate-300 group-hover:text-white">
                  <Users className="w-5 h-5 text-blue-400" />
                  <span>Přidat klienta manuálně</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-white" />
              </button>
              <button className="w-full flex items-center justify-between p-3 rounded-lg bg-slate-800/50 hover:bg-slate-800 border border-slate-700 transition-colors group">
                <div className="flex items-center gap-3 text-slate-300 group-hover:text-white">
                  <Wallet className="w-5 h-5 text-emerald-400" />
                  <span>Požádat o výplatu</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-white" />
              </button>
              <button className="w-full flex items-center justify-between p-3 rounded-lg bg-slate-800/50 hover:bg-slate-800 border border-slate-700 transition-colors group">
                <div className="flex items-center gap-3 text-slate-300 group-hover:text-white">
                  <Megaphone className="w-5 h-5 text-purple-400" />
                  <span>Stáhnout bannery</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
