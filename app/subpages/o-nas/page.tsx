"use client";
import { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import RegisterPanel from '../../../components/RegisterPanel';

// Týmový layout
function TeamLayout() {
  const teamMembers = [
    {
      name: "Václav Gabriel",
      position: "CEO",
      photo: "https://web2.itnahodinu.cz/mescon/images/2.jpg",
      bio: "Vede strategii a směřování Mesconu. Propojuje obchodní cíle s technologickou vizí.",
      skills: ["Leadership", "Strategy", "Enterprise Delivery"]
    },
    {
      name: "Ludvík Remešek", 
      position: "CIO",
      photo: "https://web2.itnahodinu.cz/mescon/images/3.jpg",
      bio: "Řídí informační systémy a bezpečnost, dohlíží na data governance a infrastrukturu.",
      skills: ["Security", "Data Governance", "Cloud Architecture"]
    },
    {
      name: "Václav Rajchart",
      position: "CSL",
      photo: "https://web2.itnahodinu.cz/mescon/images/4.jpg",
      bio: "Zodpovídá za obchodní rozvoj a partnerství. Přináší Mescon ke klíčovým klientům.",
      skills: ["Sales Leadership", "Partnerships", "Go-to-market"]
    },
    {
      name: "Marek Bednář",
      position: "Deputy Head",
      photo: "https://web2.itnahodinu.cz/mescon/images/5.jpg",
      bio: "Koordinuje delivery tým a hlídá kvalitu projektů, SLA a provozní stabilitu.",
      skills: ["Project Delivery", "Ops", "Quality"]
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {teamMembers.map((member, index) => (
        <div key={index} className="group bg-[#0f1420] rounded-2xl p-6 border border-slate-800 text-center hover:border-[#5885fa]/30 transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-center justify-center w-28 h-28 mx-auto mb-4 rounded-full overflow-hidden bg-[#1e2334] border-2 border-slate-700 group-hover:border-[#5885fa]/60 transition-all">
            <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
          </div>
          <h3 className="text-lg font-bold text-white mb-1">{member.name}</h3>
          <p className="text-[#5885fa] text-sm font-medium mb-3">{member.position}</p>
          <p className="text-sm text-slate-400 mb-4 leading-relaxed">{member.bio}</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {member.skills.map((skill, idx) => (
              <span key={idx} className="px-2 py-1 bg-[#1e2334] text-slate-300 rounded-md text-[10px] font-medium border border-slate-700">
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// Timeline historie
function CompanyTimeline() {
  const [animatedItems, setAnimatedItems] = useState<boolean[]>([]);

  const milestones = [
    {
      year: "2022",
      title: "Založení marketingové agentury Mescon",
      description: "Startujeme s jasným zaměřením na výkonnostní marketing a první klientské projekty.",
      icon: "01"
    },
    {
      year: "2023", 
      title: "První tým a 100+ projektů",
      description: "Budujeme jádro týmu a zpracováváme desítky zakázek napříč segmenty.",
      icon: "02"
    },
    {
      year: "2024",
      title: "500+ projektů a expanze služeb",
      description: "Přidáváme webové aplikace, e‑commerce a pokročilou analytiku, rozšiřujeme kapacity.",
      icon: "03"
    },
    {
      year: "2025",
      title: "Založení společnosti a business pivot", 
      description: "Formálně zakládáme společnost a zaměřujeme se na škálovatelné služby a provoz.",
      icon: "04"
    },
    {
      year: "2026",
      title: "Expanze a vývoj ekosystému",
      description: "Rozvíjíme partnerský ekosystém, propojování služeb a dlouhodobé provozní modely.",
      icon: "05"
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedItems(milestones.map(() => true));
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative pl-4 sm:pl-0">
      <div className="absolute inset-x-0 top-1/2 h-32 bg-gradient-to-r from-[#0f1420] via-[#0b1024] to-[#0f1420] opacity-50 blur-2xl pointer-events-none" />
      <div className="absolute left-8 sm:left-1/2 top-0 bottom-0 w-px bg-[#1e2334] -translate-x-1/2 hidden sm:block"></div>
      <div className="absolute left-0 top-0 bottom-0 w-px bg-[#1e2334] sm:hidden"></div>

      <div className="space-y-12">
        {milestones.map((milestone, index) => (
          <div 
            key={index} 
            className={`relative flex flex-col sm:flex-row items-center gap-8 transition-all duration-700 ${
              animatedItems[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: `${index * 150}ms` }}
          >
            <div className={`flex-1 w-full sm:w-auto ${index % 2 === 0 ? 'sm:text-right' : 'sm:order-3'}`}>
              <div className="bg-[#0f1420] rounded-xl p-6 border border-slate-800 hover:border-[#5885fa]/30 transition-colors">
                <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#5885fa] to-[#eef3fe] block mb-2">
                  {milestone.year}
                </span>
                <h3 className="text-lg font-bold text-white mb-2">{milestone.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{milestone.description}</p>
              </div>
            </div>
            
            <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#020617] border border-[#5885fa]/50 text-xs font-bold text-[#5885fa] shadow-[0_0_15px_rgba(88,133,250,0.2)] sm:order-2 -ml-[1.6rem] sm:ml-0">
              {milestone.icon}
            </div>

            <div className={`flex-1 hidden sm:block ${index % 2 === 0 ? 'sm:order-3' : ''}`} />
          </div>
        ))}
      </div>
    </div>
  );
}

// Hodnoty společnosti
function CompanyValues() {
  const values = [
    {
      title: "Zákaznický fokus",
      description: "Úspěch našich klientů je naším hlavním cílem. Každé rozhodnutí děláme s ohledem na hodnotu pro zákazníka."
    },
    {
      title: "Inovace",
      description: "Neustále hledáme nové technologie a přístupy, které nám pomohou dosahovat lepších výsledků."
    },
    {
      title: "Transparentnost",
      description: "Věříme v otevřenou komunikaci a pravidelné reportování všech aktivit a výsledků."
    },
    {
      title: "Rychlost",
      description: "V digitálním světě je rychlost klíčová. Dodáváme kvalitní řešení v co nejkratším čase."
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {values.map((value, index) => (
        <div key={index} className="bg-[#0f1420] rounded-2xl p-8 border border-slate-800 hover:border-[#5885fa]/30 transition-all duration-300">
          <div className="w-10 h-10 rounded-full bg-[#1e2334] border border-slate-700 flex items-center justify-center text-sm font-semibold text-white mb-4">
            0{index + 1}
          </div>
          <h3 className="text-lg font-bold text-white mb-3">{value.title}</h3>
          <p className="text-slate-400 leading-relaxed text-sm">{value.description}</p>
        </div>
      ))}
    </div>
  );
}

export default function AboutPage() {
  const [showRegister, setShowRegister] = useState(false);

  return (
    <main className="bg-[#020617] text-slate-100 overflow-hidden">
      {/* Hero Section */}
      <section className="relative border-b border-slate-800/60 pt-20 pb-24 lg:pt-32 lg:pb-40">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[500px] bg-[#5885fa]/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="page-container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left */}
            <div className="text-center lg:text-left">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#5885fa] to-[#eef3fe]">O nás</span>
                a naší vizi.
              </h1>
              <p className="text-lg sm:text-xl text-slate-300 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Jsme tým digitálních expertů s vášní pro inovace. Od roku 2019 pomáháme firmám růst v digitálním světě prostřednictvím špičkových technologií.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button variant="primary" size="lg" onClick={() => setShowRegister(true)} className="min-w-[160px]">Kontaktovat nás</Button>
              </div>
            </div>

            {/* Right - Visual */}
            <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
              <div className="relative rounded-xl bg-[#0f1420] border border-slate-800 shadow-2xl overflow-hidden p-8">
                <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-transparent to-[#0b1024] opacity-70" />
                <div className="relative grid grid-cols-5 items-end gap-3 h-52">
                  {[
                    { year: '2022', height: '30%' },
                    { year: '2023', height: '45%' },
                    { year: '2024', height: '65%' },
                    { year: '2025', height: '80%' },
                    { year: '2026', height: '100%' }
                  ].map((bar) => (
                    <div key={bar.year} className="flex flex-col items-center justify-end h-full">
                      <div className="w-full rounded-t-lg bg-gradient-to-t from-[#5885fa] to-[#8aaafc]" style={{ height: bar.height }} />
                      <span className="mt-2 text-xs text-slate-400">{bar.year}</span>
                    </div>
                  ))}
                </div>
                <div className="absolute inset-0 pointer-events-none border border-slate-800/60 rounded-xl" />
                <div className="absolute top-4 left-4 text-xs text-[#8aaafc] font-semibold tracking-wide">Růst od 2022</div>
              </div>
              <div className="absolute -z-10 top-10 -right-10 w-40 h-40 bg-[#5885fa]/20 blur-3xl rounded-full" />
              <div className="absolute -z-10 -bottom-10 -left-10 w-40 h-40 bg-[#5885fa]/20 blur-3xl rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Naše hodnoty */}
      <section className="border-b border-slate-800/60 bg-[#030712]">
        <div className="page-container py-20">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Naše hodnoty</h2>
            <p className="text-slate-400">Principy, které nás vedou ve všem, co děláme.</p>
          </div>
          <CompanyValues />
        </div>
      </section>

      {/* Náš tým */}
      <section className="border-b border-slate-800/60">
        <div className="page-container py-20">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Naše vedení</h2>
            <p className="text-slate-400">Poznejte experty, kteří stojí za úspěchem vašich projektů.</p>
          </div>
          <TeamLayout />
        </div>
      </section>

      {/* Historie firmy */}
      <section className="border-b border-slate-800/60 bg-[#02091b]">
        <div className="page-container py-20">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Naše cesta</h2>
            <p className="text-slate-400">Klíčové milníky v historii naší společnosti.</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <CompanyTimeline />
          </div>
        </div>
      </section>

      {/* Register Panel */}
      {showRegister && (
        <RegisterPanel
          open={showRegister}
          onClose={() => setShowRegister(false)}
        />
      )}
    </main>
  );
}
