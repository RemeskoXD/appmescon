"use client";

import { useState, useEffect } from "react";
import { Users, Globe, Wallet, TrendingUp, Loader2 } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalCustomers: 0,
    activeWebsites: 0,
    monthlyRevenue: 0,
    openTickets: 0,
    newLeads: 0,
    recentActivity: [] as any[],
    revenueChartData: [] as any[]
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/dashboard");
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Přehled</h1>
        <p className="text-slate-400 mt-2">Vítejte v administraci MESCON.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {[
          { label: "Celkem zákazníků", value: stats.totalCustomers.toString(), change: "0%", icon: Users, color: "text-blue-500" },
          { label: "Aktivní weby", value: stats.activeWebsites.toString(), change: "0", icon: Globe, color: "text-green-500" },
          { label: "Měsíční obrat", value: `${stats.monthlyRevenue.toLocaleString("cs-CZ")} Kč`, change: "0%", icon: Wallet, color: "text-purple-500" },
          { label: "Otevřené tickety", value: stats.openTickets.toString(), change: "0", icon: TrendingUp, color: "text-orange-500" },
          { label: "Noví leadi", value: stats.newLeads.toString(), change: "NEW", icon: Users, color: "text-cyan-500" },
        ].map((stat, i) => (
          <div key={i} className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg bg-slate-800 ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <span className="text-sm font-medium text-slate-400 bg-slate-800 px-2 py-1 rounded-full">
                {stat.change}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
            <p className="text-sm text-slate-400">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Recent Activity & Alerts */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Chart Area */}
        <div className="lg:col-span-2 bg-slate-900/50 border border-slate-800 rounded-xl p-6 min-h-[400px]">
          <h3 className="text-lg font-semibold text-white mb-6">Vývoj obratu</h3>
          <div className="h-[300px] w-full">
            {stats.revenueChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={stats.revenueChartData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis 
                    dataKey="month" 
                    stroke="#64748b" 
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis 
                    stroke="#64748b" 
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value / 1000}k`}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#8b5cf6" 
                    fillOpacity={1} 
                    fill="url(#colorRevenue)" 
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-slate-500">
                Zatím nejsou k dispozici žádná data pro graf
              </div>
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Nedávná aktivita</h3>
          <div className="space-y-4">
            {stats.recentActivity.length > 0 ? (
              stats.recentActivity.map((activity, i) => (
                <div key={i} className="flex gap-4 p-3 rounded-lg bg-slate-800/50 border border-slate-700/50">
                  <div className={`w-2 h-full rounded-full ${
                    activity.type === 'CUSTOMER' ? 'bg-blue-500' : 
                    activity.type === 'WEBSITE' ? 'bg-green-500' : 
                    activity.type === 'LEAD' ? 'bg-cyan-500' : 'bg-orange-500'
                  }`} />
                  <div>
                    <h4 className="text-sm font-medium text-white">{activity.title}</h4>
                    <p className="text-xs text-slate-400">{activity.description}</p>
                    <p className="text-[10px] text-slate-500 mt-1">
                      {new Date(activity.date).toLocaleDateString("cs-CZ")}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-slate-500 text-sm">
                Žádná nedávná aktivita
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
