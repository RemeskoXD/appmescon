import SectionContainer from '../ui/SectionContainer';
import Card from '../ui/Card';
import { Globe, Shield, Gauge, Headphones } from 'lucide-react';

export default function DigitalFoundationSection() {
  return (
    <SectionContainer className="py-16 lg:py-24 relative overflow-hidden">
      {/* Floating gradient orb */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-accent-500/10 to-accent-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s' }} />
      
      <div className="relative z-10 text-center mb-12 sm:mb-16">
        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
          Digitální zázemí, které drží váš provoz
        </h2>
        <p className="text-slate-300 max-w-2xl mx-auto">Weby a aplikace, bezpečnost, výkon i podpora – v jednom provozu.</p>
      </div>

      {/* 4 karty v mřížce */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        <Card hover glow className="p-6 text-center group relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-accent-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative z-10">
            <div className="mb-4 relative">
              <div className="absolute inset-0 bg-accent-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative w-12 h-12 mx-auto bg-gradient-to-br from-accent-500/20 to-accent-500/20 rounded-xl flex items-center justify-center border border-accent-500/30 group-hover:border-accent-500/50 group-hover:scale-110 transition-all duration-300">
                <Globe className="w-6 h-6 text-white" />
              </div>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Webové stránky</h3>
            <p className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">Firemní weby a portály s jasnou strukturou a stabilním provozem</p>
          </div>
        </Card>

        <Card hover glow className="p-6 text-center group relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-accent-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative z-10">
            <div className="mb-4 relative">
              <div className="absolute inset-0 bg-accent-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative w-12 h-12 mx-auto bg-gradient-to-br from-accent-500/20 to-accent-500/20 rounded-xl flex items-center justify-center border border-accent-500/30 group-hover:border-accent-500/50 group-hover:scale-110 transition-all duration-300">
                <Shield className="w-6 h-6 text-white" />
              </div>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Zabezpečení</h3>
            <p className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">Monitoring, zálohy a ochrana dat napříč službami</p>
          </div>
        </Card>

        <Card hover glow className="p-6 text-center group relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-accent-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative z-10">
            <div className="mb-4 relative">
              <div className="absolute inset-0 bg-accent-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative w-12 h-12 mx-auto bg-gradient-to-br from-accent-500/20 to-accent-500/20 rounded-xl flex items-center justify-center border border-accent-500/30 group-hover:border-accent-500/50 group-hover:scale-110 transition-all duration-300">
                <Gauge className="w-6 h-6 text-white" />
              </div>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Výkon</h3>
            <p className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">Optimalizace rychlosti a stabilní zvládání špiček</p>
          </div>
        </Card>

        <Card hover glow className="p-6 text-center group relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-accent-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative z-10">
            <div className="mb-4 relative">
              <div className="absolute inset-0 bg-accent-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative w-12 h-12 mx-auto bg-gradient-to-br from-accent-500/20 to-accent-500/20 rounded-xl flex items-center justify-center border border-accent-500/30 group-hover:border-accent-500/50 group-hover:scale-110 transition-all duration-300">
                <Headphones className="w-6 h-6 text-white" />
              </div>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Podpora</h3>
            <p className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">Dohled a reakční doby, které drží SLA</p>
          </div>
        </Card>
      </div>

      {/* Analytika – dashboard preview v rámci sekce */}
      <div className="mt-10 lg:mt-14">
        <Card hover glow className="p-0 overflow-hidden relative group">
          {/* Animated gradient border */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-accent-500 via-accent-500 to-accent-500 rounded-xl opacity-0 group-hover:opacity-75 blur transition-opacity duration-500 animate-gradient" />
          
          <div className="relative bg-slate-900 rounded-xl grid lg:grid-cols-2">
            <div className="p-8 lg:p-10">
              <div className="inline-flex items-center rounded-full bg-accent-500/10 px-3 py-1.5 text-xs font-medium text-accent-500 ring-1 ring-accent-500/20 mb-4">
                <span className="w-2 h-2 bg-accent-500 rounded-full mr-2 animate-pulse" />
                Provozní přehled
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">Provozní a obchodní přehled</h3>
              <p className="text-slate-300 mb-6 leading-relaxed">Přehled výkonnosti, dostupnosti a konverzí v jednom dashboardu. Data pro rozhodování i pravidelný reporting.</p>
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="product-bar animate-pulse" style={{ animationDelay: '0s', animationDuration: '2s' }} />
                <div className="product-bar animate-pulse" style={{ animationDelay: '0.2s', animationDuration: '2.2s' }} />
                <div className="product-bar animate-pulse" style={{ animationDelay: '0.4s', animationDuration: '2.4s' }} />
              </div>
              <div className="flex gap-4 text-sm">
                <div className="flex items-center gap-2 text-slate-400">
                  <div className="w-2 h-2 bg-accent-500 rounded-full" />
                  Dostupnost a výkon v reálném čase
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <div className="w-2 h-2 bg-accent-500 rounded-full" />
                  Konverze a obchodní metriky
                </div>
              </div>
            </div>
            <div className="p-6 bg-[radial-gradient(circle_at_30%_20%,rgba(88,133,250,0.15),transparent_60%)] relative overflow-hidden">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] opacity-30" />
              <img src="https://web2.itnahodinu.cz/mescon/images/dashboard.svg" alt="Analytics dashboard" className="relative w-full h-auto object-contain drop-shadow-2xl" loading="lazy" />
            </div>
          </div>
        </Card>
      </div>
    </SectionContainer>
  );
}
