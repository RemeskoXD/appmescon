"use client";
import { useState, useEffect } from 'react';
import { BookOpen, Briefcase, Clock, Crown, Home, MapPin, Rocket, Sprout, Target, Wallet, Send } from 'lucide-react';
import Button from '../../../components/ui/Button';
import RegisterPanel from '../../../components/RegisterPanel';

type Job = {
  id: string;
  department: string;
  title: string;
  location: string;
  type: string;
  level: string;
  summary: string;
  requirements: string[];
  benefits: string[];
  salary: string;
};

const JOBS: Job[] = [
  {
    id: "senior-react-next",
    department: "Technologie",
    title: "Senior React/Next.js Developer",
    location: "Praha",
    type: "Plný úvazek",
    level: "Senior",
    summary: "Převezmete klíčové části frontendu v Next.js, povedete code reviews a pomůžete nastavovat technické standardy.",
    requirements: ["5+ let zkušeností s React", "Expert v Next.js", "TypeScript", "Leadership skills"],
    benefits: ["Remote/hybrid práce", "Moderní technologie", "Mentoring juniorů", "Technické rozhodování"],
    salary: "80 000 - 120 000 Kč"
  },
  {
    id: "react-next-developer",
    department: "Technologie", 
    title: "React/Next.js Developer",
    location: "Praha",
    type: "Plný úvazek",
    level: "Medior",
    summary: "Vývoj uživatelských rozhraní v Next.js, spolupráce s designem a BE na rychlé dodávce produktů.",
    requirements: ["3+ let zkušeností s React", "Znalost Next.js", "JavaScript/TypeScript", "Týmová spolupráce"],
    benefits: ["Moderní stack", "Flexibilní pracovní doba", "Vzdělávání", "Zajímavé projekty"],
    salary: "60 000 - 80 000 Kč"
  },
  {
    id: "frontend-junior",
    department: "Technologie",
    title: "Junior Frontend Developer",
    location: "Praha",
    type: "Plný úvazek", 
    level: "Junior",
    summary: "Získáte zkušenosti s moderními frontend technologiemi pod vedením zkušených developerů.",
    requirements: ["Základy React", "HTML/CSS/JavaScript", "Chuť se učit", "Git"],
    benefits: ["Mentoring", "Školení", "Kariérní růst", "Friendly tým"],
    salary: "35 000 - 50 000 Kč"
  },
  {
    id: "hr-recruiter",
    department: "HR",
    title: "HR Recruiter",
    location: "Praha",
    type: "Částečný úvazek",
    level: "Medior",
    summary: "Pomozte nám budovat silný tým – budete vyhledávat talenty, vést pohovory a posouvat kandidáty hiring procesem.",
    requirements: ["Zkušenosti s recruitmentem", "Komunikační dovednosti", "LinkedIn recruiting", "ATS systémy"],
    benefits: ["Flexibilní úvazek", "Home office", "Bonusy za úspěšný nábor", "Růst v HR"],
    salary: "25 000 - 35 000 Kč"
  },
  {
    id: "l2-support-manager", 
    department: "Operace",
    title: "L2 Support Manager",
    location: "Praha",
    type: "Plný úvazek",
    level: "Senior",
    summary: "Zodpovědnost za L2 tým, eskalace, incident management a zlepšování procesů podpory.",
    requirements: ["Management zkušenosti", "Technické znalosti", "ITIL/ITSM", "Analytické myšlení"],
    benefits: ["Vedení týmu", "Strategické rozhodování", "Procesní optimalizace", "Kariérní růst"],
    salary: "70 000 - 90 000 Kč"
  },
  {
    id: "support-engineer",
    department: "Operace", 
    title: "Support Engineer",
    location: "Praha",
    type: "Plný úvazek",
    level: "Medior",
    summary: "Technická podpora zákazníků, řešení incidentů a koordinace s vývojovým týmem.",
    requirements: ["Technické znalosti", "Zákaznická orientace", "Troubleshooting", "Komunikační dovednosti"],
    benefits: ["Technický růst", "Práce se zákazníky", "Různorodé úkoly", "Školení"],
    salary: "45 000 - 65 000 Kč"
  },
  {
    id: "marketing-specialist",
    department: "Marketing",
    title: "Digital Marketing Specialist", 
    location: "Praha",
    type: "Plný úvazek",
    level: "Medior",
    summary: "Správa digitálních kampaní, content marketing a analýza výkonnosti marketingových aktivit.",
    requirements: ["Digital marketing zkušenosti", "Google Ads/Facebook Ads", "Analytics", "Content creation"],
    benefits: ["Kreativní práce", "Data-driven approach", "Moderní nástroje", "Vzdělávání"],
    salary: "50 000 - 70 000 Kč"
  },
  {
    id: "ux-designer",
    department: "Design",
    title: "UX/UI Designer",
    location: "Praha", 
    type: "Plný úvazek",
    level: "Medior",
    summary: "Návrh uživatelských rozhraní, wireframing, prototypování a user research pro naše produkty.",
    requirements: ["UX/UI zkušenosti", "Figma/Sketch", "User research", "Design thinking"],
    benefits: ["Kreativní svoboda", "User-centered design", "Moderní nástroje", "Design systém"],
    salary: "55 000 - 75 000 Kč"
  }
];

const DEPARTMENTS = ["Všechny", "Technologie", "HR", "Operace", "Marketing", "Design"];

// Career Growth Timeline
const CAREER_TIMELINE = [
  {
    level: "Junior",
    duration: "6 měsíců",
    title: "Adaptace",
    description: "První projekty v tandemu s mentorem, zvykání na procesy, code review a stack.",
    benefits: ["Mentoring program", "Školení a certifikace", "Code reviews", "Pár programming"],
    icon: Sprout
  },
  {
    level: "Medior",
    duration: "12 měsíců",
    title: "Samostatná práce", 
    description: "Samostatně řešíte středně velké úkoly, navrhujete řešení a zapojujete se do návrhů architektury.",
    benefits: ["Technické vedení projektů", "Účast na architektuře", "Mentoring juniorů", "Specializace"],
    icon: Rocket
  },
  {
    level: "Senior",
    duration: "24 měsíců",
    title: "Technické vedení",
    description: "Vedete klíčové části dodávky, rozhodujete o technickém směru a pomáháte s růstem týmu.",
    benefits: ["Technické rozhodování", "Vedení týmu", "Architektura systémů", "Strategické plánování"],
    icon: Crown
  },
  {
    level: "Lead/Manager",
    duration: "36 měsíců", 
    title: "Řízení a strategie",
    description: "Zodpovídáte za výsledky týmu, rozvoj lidí i strategii produktů a služeb.",
    benefits: ["Vedení týmů", "Strategické rozhodování", "Rozpočet a plánování", "Business impact"],
    icon: Target
  }
];

// Job Card Component
function JobCard({ job, onOpenCv }: { job: Job; onOpenCv: (role: string) => void }) {
  const [showDetails, setShowDetails] = useState(false);

  const getDepartmentColor = (department: string) => {
    // Using new design system colors
    const colors = {
      'Technologie': 'border-[#5885fa]/30 hover:border-[#5885fa]/60',
      'HR': 'border-[#acc2fc]/30 hover:border-[#acc2fc]/60', 
      'Operace': 'border-emerald-500/30 hover:border-emerald-500/60',
      'Marketing': 'border-[#5885fa]/30 hover:border-[#5885fa]/60',
      'Design': 'border-orange-500/30 hover:border-orange-500/60'
    };
    return colors[department as keyof typeof colors] || 'border-slate-700 hover:border-slate-500';
  };

  const getLevelColor = (level: string) => {
    const colors = {
      'Junior': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      'Medior': 'bg-[#5885fa]/10 text-[#799dfb] border-[#5885fa]/20',
      'Senior': 'bg-[#5885fa]/10 text-[#5885fa] border-[#5885fa]/20'
    };
    return colors[level as keyof typeof colors] || 'bg-slate-800 text-slate-400 border-slate-700';
  };

  return (
    <div className={`group bg-[#0f1420] rounded-2xl p-6 border transition-all duration-300 hover:-translate-y-1 ${getDepartmentColor(job.department)}`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded bg-[#1e2334] text-slate-400 border border-slate-700">
              {job.department}
            </span>
            <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded border ${getLevelColor(job.level)}`}>
              {job.level}
            </span>
          </div>
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#5885fa] transition-colors">
            {job.title}
          </h3>
          <div className="flex items-center gap-4 text-sm text-slate-400">
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4 text-slate-500" /> {job.location}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-slate-500" /> {job.type}
            </span>
          </div>
        </div>
        <div className="text-right hidden sm:block">
          <div className="text-sm font-bold text-emerald-400">{job.salary}</div>
          <div className="text-xs text-slate-500">měsíčně</div>
        </div>
      </div>

      {/* Summary */}
      <p className="text-slate-400 text-sm leading-relaxed mb-6">
        {job.summary}
      </p>

      {/* Requirements Preview */}
      <div className="flex flex-wrap gap-2 mb-6">
        {job.requirements.slice(0, 3).map((req, index) => (
          <span
            key={index}
            className="text-xs px-2 py-1 rounded bg-[#1e2334] border border-slate-700 text-slate-300"
          >
            {req}
          </span>
        ))}
        {job.requirements.length > 3 && (
          <span className="text-xs px-2 py-1 rounded bg-[#1e2334] border border-slate-700 text-slate-400">
            +{job.requirements.length - 3} více
          </span>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowDetails(!showDetails)}
          className="flex-1"
        >
          {showDetails ? 'Skrýt detaily' : 'Zobrazit detaily'}
        </Button>
        <Button variant="primary" size="sm" className="flex-1" onClick={() => onOpenCv(job.title)}>
          Odeslat životopis
        </Button>
      </div>

      {/* Details */}
      {showDetails && (
        <div className="mt-6 pt-6 border-t border-slate-800">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold text-white mb-3 text-sm uppercase tracking-wider">Požadavky</h4>
              <ul className="space-y-2">
                {job.requirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-slate-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5885fa] mt-2 flex-shrink-0"></span>
                    {req}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-3 text-sm uppercase tracking-wider">Benefity</h4>
              <ul className="space-y-2">
                {job.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-slate-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0"></span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function CvModal({ open, onClose, role }: { open: boolean; onClose: () => void; role: string }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [cvFile, setCvFile] = useState<File | null>(null);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
      <div className="bg-[#0f1420] border border-slate-800 rounded-2xl shadow-2xl w-full max-w-xl p-6 relative">
        <button
          aria-label="Zavřít"
          className="absolute top-3 right-3 text-slate-400 hover:text-white"
          onClick={onClose}
        >
          ×
        </button>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-[#5885fa]/15 border border-[#5885fa]/30 flex items-center justify-center text-[#5885fa]">
            <Send className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Odeslat životopis</h3>
            <p className="text-slate-400 text-sm">Pozice: {role || 'Vyberte pozici'}</p>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-white font-semibold mb-1">Jméno a příjmení</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-[#1e2334] border border-slate-700 text-white focus:border-[#5885fa] focus:ring-2 focus:ring-[#5885fa]/20"
              placeholder="Vaše jméno"
            />
          </div>
          <div>
            <label className="block text-sm text-white font-semibold mb-1">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-[#1e2334] border border-slate-700 text-white focus:border-[#5885fa] focus:ring-2 focus:ring-[#5885fa]/20"
              placeholder="email@domena.cz"
            />
          </div>
          <div>
            <label className="block text-sm text-white font-semibold mb-1">Zpráva kandidáta</label>
            <textarea
              rows={4}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-[#1e2334] border border-slate-700 text-white focus:border-[#5885fa] focus:ring-2 focus:ring-[#5885fa]/20 resize-none"
              placeholder="Přidejte krátké shrnutí zkušeností a motivace"
            />
          </div>
          <div>
            <label className="block text-sm text-white font-semibold mb-1">Životopis (soubor)</label>
            <input
              type="file"
              accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              onChange={(e) => setCvFile(e.target.files?.[0] ?? null)}
              className="w-full px-4 py-3 rounded-lg bg-[#1e2334] border border-slate-700 text-white focus:border-[#5885fa] focus:ring-2 focus:ring-[#5885fa]/20 file:mr-4 file:rounded-md file:border-0 file:bg-[#0f1420] file:px-3 file:py-2 file:text-sm file:font-semibold file:text-slate-200 hover:file:bg-[#151b2b]"
            />
            {cvFile && (
              <div className="mt-2 text-xs text-slate-400">
                Vybraný soubor: <span className="text-slate-200">{cvFile.name}</span>
              </div>
            )}
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" onClick={onClose}>Zavřít</Button>
            <Button variant="primary" onClick={onClose}>Odeslat</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Career Timeline Component
function CareerTimeline() {
  return (
    <div className="relative pl-4 sm:pl-0">
      {/* Timeline line */}
      <div className="absolute left-8 sm:left-1/2 top-0 bottom-0 w-px bg-[#1e2334] -translate-x-1/2 hidden sm:block"></div>
      <div className="absolute left-0 top-0 bottom-0 w-px bg-[#1e2334] sm:hidden"></div>
      
      <div className="space-y-12">
        {CAREER_TIMELINE.map((stage, index) => (
          <div key={stage.level} className={`relative flex flex-col sm:flex-row items-center gap-8`}>
            
            <div className={`flex-1 w-full sm:w-auto ${index % 2 === 0 ? 'sm:text-right' : 'sm:order-3'}`}>
               <div className="bg-[#0f1420] rounded-xl p-6 border border-slate-800 hover:border-[#5885fa]/30 transition-colors group">
                  <div className="flex items-center gap-3 mb-2 sm:justify-end sm:flex-row-reverse">
                    <h3 className="text-lg font-bold text-white group-hover:text-[#5885fa] transition-colors">{stage.title}</h3>
                    <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded bg-[#1e2334] text-[#5885fa] border border-slate-700">
                      {stage.level}
                    </span>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">
                    {stage.description}
                  </p>
                  <div className="text-xs font-mono text-slate-500">
                    Délka praxe: <span className="text-slate-300">{stage.duration}</span>
                  </div>
               </div>
            </div>

            {/* Timeline dot */}
            <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#020617] border border-[#5885fa]/50 text-lg sm:order-2 -ml-[1.6rem] sm:ml-0 shadow-[0_0_15px_rgba(88,133,250,0.2)]">
              <stage.icon className="w-5 h-5 text-[#acc2fc]" />
            </div>
            
            <div className={`flex-1 hidden sm:block ${index % 2 === 0 ? 'sm:order-3' : ''}`} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function KarieraPage() {
  const [showRegister, setShowRegister] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState("Všechny");
  const [filteredJobs, setFilteredJobs] = useState(JOBS);
  const [showCvModal, setShowCvModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");

  // Filter jobs based on department
  useEffect(() => {
    if (selectedDepartment === "Všechny") {
      setFilteredJobs(JOBS);
    } else {
      setFilteredJobs(JOBS.filter(job => job.department === selectedDepartment));
    }
  }, [selectedDepartment]);

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
                Vaše <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5885fa] to-[#eef3fe]">kariéra</span>
                <br />v Mesconu.
              </h1>
              <p className="text-lg sm:text-xl text-slate-300 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Připojte se k našemu týmu profesionálů a rozvíjejte svou kariéru v dynamickém prostředí plném výzev a příležitostí k růstu.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button variant="primary" size="lg" onClick={() => setShowRegister(true)} className="min-w-[160px]">Připojit se k nám</Button>
              </div>
            </div>

            {/* Right - Visual */}
            <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
              <div className="relative rounded-xl bg-[#0f1420] border border-slate-800 shadow-2xl overflow-hidden p-8">
                <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-transparent to-[#0b1024] opacity-70" />
                <div className="relative space-y-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-[#5885fa]/20 border border-[#5885fa]/40 flex items-center justify-center text-[#5885fa] font-bold">
                        CV
                      </div>
                      <div>
                        <div className="text-sm text-slate-200 font-semibold">Senior React/Next.js Developer</div>
                        <div className="text-xs text-slate-500">Praha · Plný úvazek · Senior</div>
                      </div>
                    </div>
                    <span className="text-[10px] px-2 py-1 rounded bg-[#0b1024] border border-slate-700 text-slate-400">Profil</span>
                  </div>

                  <div className="space-y-3">
                    <label className="block text-xs text-slate-400">Praxe</label>
                    <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                      <div className="h-full w-[70%] bg-gradient-to-r from-[#5885fa] to-[#8aaafc]" />
                    </div>
                    <div className="text-xs text-slate-300">6 let</div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs text-slate-400">Tech stack</label>
                    <div className="flex flex-wrap gap-2">
                      {["React", "Next.js", "TypeScript"].map((item) => (
                        <span key={item} className="px-3 py-1 rounded-md bg-[#0b1024] border border-slate-700 text-slate-200 text-xs">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-xs text-slate-400">Očekávání</label>
                      <div className="px-3 py-3 rounded-lg bg-[#0b1024] border border-slate-800 text-slate-200 text-sm">
                        80–120k Kč
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="block text-xs text-slate-400">Lokalita</label>
                      <div className="px-3 py-3 rounded-lg bg-[#0b1024] border border-slate-800 text-slate-200 text-sm">
                        Remote / Hybrid
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    {["Technické vedení", "Code reviews", "Domluva pohovoru"].map((item) => (
                      <div key={item} className="h-16 rounded-lg border border-slate-800 bg-[#0b1024] flex items-center justify-center text-[11px] text-slate-300 text-center px-2">
                        {item}
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button className="h-12 rounded-lg border border-slate-800 bg-[#5885fa]/15 text-[#eef3fe] text-xs font-semibold flex items-center justify-center">
                      Odeslat CV
                    </button>
                    <button className="h-12 rounded-lg border border-slate-800 bg-[#0b1024] text-slate-300 text-xs font-semibold flex items-center justify-center">
                      Domluvit pohovor
                    </button>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f1420] via-transparent to-transparent" />
              </div>
              <div className="absolute -z-10 top-10 -right-10 w-40 h-40 bg-[#5885fa]/20 blur-3xl rounded-full" />
              <div className="absolute -z-10 -bottom-10 -left-10 w-40 h-40 bg-[#5885fa]/20 blur-3xl rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Career Timeline */}
      <section className="border-b border-slate-800/60 bg-[#030712]">
        <div className="page-container py-20">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Kariérní růst</h2>
            <p className="text-slate-400">Sledujte svou cestu od juniora až po technického leadera.</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <CareerTimeline />
          </div>
        </div>
      </section>

      {/* Job Filters & Grid */}
      <section className="border-b border-slate-800/60">
        <div className="page-container py-20">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Otevřené pozice</h2>
            <p className="text-slate-400">Najděte svou příští profesní výzvu.</p>
          </div>

          {/* Department Filter */}
          <div className="flex justify-center mb-12">
            <div className="bg-[#0f1420] border border-slate-800 rounded-full p-1.5 inline-flex flex-wrap justify-center gap-1">
              {DEPARTMENTS.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setSelectedDepartment(dept)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedDepartment === dept
                      ? 'bg-[#5885fa] text-white shadow-lg shadow-[#5885fa]/25'
                      : 'text-slate-400 hover:text-white hover:bg-[#1e2334]'
                  }`}
                >
                  {dept}
                  <span className={`ml-2 text-xs ${selectedDepartment === dept ? 'opacity-70' : 'opacity-50'}`}>
                    ({dept === "Všechny" ? JOBS.length : JOBS.filter(job => job.department === dept).length})
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Jobs Grid */}
          {filteredJobs.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              {filteredJobs.map((job) => (
                <JobCard key={job.id} job={job} onOpenCv={(role) => { setSelectedRole(role); setShowCvModal(true); }} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-[#0f1420] rounded-2xl border border-slate-800 border-dashed">
              <div className="mb-4 flex justify-center text-slate-500">
                <Briefcase className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Žádné pozice nenalezeny</h3>
              <p className="text-slate-400 mb-6">V tomto oddělení momentálně nemáme otevřené pozice.</p>
              <Button
                variant="outline"
                onClick={() => setSelectedDepartment("Všechny")}
              >
                Zobrazit všechny pozice
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Benefits */}
      <section className="border-b border-slate-800/60 bg-[#02091b]">
        <div className="page-container py-20">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Proč s námi</h2>
            <p className="text-slate-400">Benefity, které vám zpříjemní práci i život.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Rocket,
                title: "Moderní technologie",
                description: "Pracujte s nejnovějšími technologiemi a nástroji",
                color: "border-[#5885fa]/30 hover:border-[#5885fa]/60"
              },
              {
                icon: Home,
                title: "Flexibilní práce",
                description: "Remote/hybrid práce podle vašich potřeb",
                color: "border-emerald-500/30 hover:border-emerald-500/60"
              },
              {
                icon: BookOpen,
                title: "Vzdělávání",
                description: "Kontinuální learning a profesní rozvoj",
                color: "border-[#5885fa]/30 hover:border-[#5885fa]/60"
              },
              {
                icon: Wallet,
                title: "Skvělé benefity",
                description: "Konkurenceschopné mzdy a bonusy",
                color: "border-orange-500/30 hover:border-orange-500/60"
              }
            ].map((benefit, index) => (
              <div
                key={index}
                className={`bg-[#0f1420] rounded-2xl p-8 text-center border transition-all duration-300 hover:-translate-y-1 ${benefit.color}`}
              >
                <div className="mb-6 flex justify-center text-[#acc2fc]">
                  <benefit.icon className="w-9 h-9" />
                </div>
                <h3 className="text-lg font-bold text-white mb-3">{benefit.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{benefit.description}</p>
              </div>
            ))}
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
      <CvModal open={showCvModal} onClose={() => setShowCvModal(false)} role={selectedRole} />
    </main>
  );
}
