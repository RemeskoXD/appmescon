"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { 
  LayoutDashboard, 
  Users, 
  UserPlus,
  Globe, 
  Shield, 
  Wallet, 
  MessageSquare, 
  FileText, 
  LogOut,
  Menu,
  X
} from "lucide-react";
import { useState } from "react";
import { signOut } from "next-auth/react";

const menuItems = [
  { name: "Přehled", href: "/admin", icon: LayoutDashboard, roles: ["ADMIN", "MODERATOR", "SUPPORT", "SALES_OP", "DEVELOPER_OP"] },
  { name: "Leady", href: "/admin/leads", icon: UserPlus, roles: ["ADMIN", "MODERATOR", "SALES_OP"] },
  { name: "Zákazníci", href: "/admin/customers", icon: Users, roles: ["ADMIN", "MODERATOR", "SUPPORT", "SALES_OP", "SALES_JUNIOR"] },
  { name: "Weby", href: "/admin/websites", icon: Globe, roles: ["ADMIN", "MODERATOR", "SUPPORT", "SALES_OP", "DEVELOPER_OP"] },
  { name: "Doporučení", href: "/admin/referrals", icon: UserPlus, roles: ["ADMIN", "MODERATOR", "SALES_OP"] },
  { name: "Tým", href: "/admin/team", icon: Shield, roles: ["ADMIN"] },
  { name: "Provize", href: "/admin/commissions", icon: Wallet, roles: ["ADMIN", "MODERATOR", "SALES_OP", "EXTERNAL"] },
  { name: "Tickety", href: "/admin/tickets", icon: MessageSquare, roles: ["ADMIN", "MODERATOR", "SUPPORT"] },
  { name: "Fakturace", href: "/admin/invoices", icon: FileText, roles: ["ADMIN", "SALES_OP"] },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  // Filter menu items based on user role
  // For now, show all if role is not defined or for testing
  const filteredMenu = menuItems; 

  return (
    <>
      {/* Mobile Menu Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 right-4 z-50 p-2 bg-slate-800 rounded-lg text-white"
      >
        {isOpen ? <X /> : <Menu />}
      </button>

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 z-40 h-screen w-64 bg-[#0b1120] border-r border-slate-800/50 transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="h-16 flex items-center px-6 border-b border-slate-800/50">
            <span className="text-xl font-bold text-white tracking-tight">
              MESCON <span className="text-[#5885fa]">ADMIN</span>
            </span>
          </div>

          {/* User Info */}
          <div className="p-4 border-b border-slate-800/50 bg-slate-900/30">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#5885fa]/20 flex items-center justify-center text-[#5885fa] font-bold">
                {session?.user?.name?.[0] || "U"}
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-medium text-white truncate">{session?.user?.name}</p>
                <p className="text-xs text-slate-400 truncate">{session?.user?.email}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 custom-scroll">
            {filteredMenu.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                    ${isActive 
                      ? "bg-[#5885fa]/10 text-[#5885fa]" 
                      : "text-slate-400 hover:text-white hover:bg-slate-800/50"}
                  `}
                >
                  <item.icon className="w-5 h-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Footer Actions */}
          <div className="p-4 border-t border-slate-800/50">
            <button 
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Odhlásit se
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
