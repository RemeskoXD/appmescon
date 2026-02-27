"use client";
import { useState, useEffect } from 'react';
import { ArrowRight, Atom, BarChart3, BookOpen, Bot, Briefcase, Check, Clock, GraduationCap, LineChart, Meh, Play, Rocket, Settings, ShoppingCart, Smile, Star, Target, Trophy } from 'lucide-react';
import RegisterPanel from '../../../components/RegisterPanel';

// Boxy s kurzy
function CourseGrid() {
  const courses = [
    {
      id: 1,
      title: "Google Ads Mastery",
      subtitle: "Kompletní průvodce PPC reklamou",
      description: "Naučte se vytvářet, optimalizovat a škálovat úspěšné Google Ads kampaně od základů po pokročilé techniky.",
      level: "Začátečník",
      duration: "8 týdnů",
      lessons: 24,
      students: 1247,
      rating: 4.9,
      price: "12 990 Kč",
      originalPrice: "18 990 Kč",
      icon: Target,
      color: "from-[#5885fa] to-[#8aaafc]",
      features: [
        "Praktické projekty",
        "1:1 mentoring",
        "Certifikát",
        "Životní přístup"
      ],
      skills: ["Google Ads", "PPC", "Analytics", "Optimalizace"]
    },
    {
      id: 2,
      title: "E-commerce Development",
      subtitle: "Moderní online obchody",
      description: "Vytvořte profesionální e-shop s Next.js, Stripe platbami a pokročilými funkcemi pro maximální konverze.",
      level: "Pokročilý",
      duration: "12 týdnů",
      lessons: 36,
      students: 892,
      rating: 4.8,
      price: "24 990 Kč", 
      originalPrice: "34 990 Kč",
      icon: ShoppingCart,
      color: "from-[#5885fa] to-[#5885fa]",
      features: [
        "Real-world projekty",
        "Code review",
        "Portfolio podpora",
        "Job assistance"
      ],
      skills: ["Next.js", "E-commerce", "Stripe", "SEO"]
    },
    {
      id: 3,
      title: "Digital Marketing Strategy",
      subtitle: "Holistický přístup k marketingu",
      description: "Komplexní kurz pokrývající SEO, content marketing, social media a marketing automation pro růst businessu.",
      level: "Střední",
      duration: "10 týdnů", 
      lessons: 30,
      students: 1534,
      rating: 4.9,
      price: "18 990 Kč",
      originalPrice: "26 990 Kč",
      icon: BarChart3,
      color: "from-[#5885fa] to-[#5885fa]",
      features: [
        "Case studies",
        "Marketing tools",
        "Strategy templates",
        "Community přístup"
      ],
      skills: ["SEO", "Content", "Social Media", "Analytics"]
    },
    {
      id: 4,
      title: "React & TypeScript Pro",
      subtitle: "Moderní frontend development",
      description: "Pokročilý kurz React s TypeScript, state managementem, testováním a best practices pro enterprise aplikace.",
      level: "Pokročilý",
      duration: "14 týdnů",
      lessons: 42,
      students: 724,
      rating: 4.7,
      price: "29 990 Kč",
      originalPrice: "39 990 Kč", 
      icon: Atom,
      color: "from-[#5885fa] to-cyan-500",
      features: [
        "Advanced patterns",
        "Testing workflow",
        "Performance tips",
        "Industry mentors"
      ],
      skills: ["React", "TypeScript", "Testing", "Performance"]
    },
    {
      id: 5,
      title: "AI Tools for Business",
      subtitle: "Automatizace s umělou inteligencí",
      description: "Objevte a implementujte AI nástroje pro automatizaci procesů, tvorbu obsahu a optimalizaci businessu.",
      level: "Začátečník",
      duration: "6 týdnů",
      lessons: 18,
      students: 956,
      rating: 4.8,
      price: "9 990 Kč",
      originalPrice: "15 990 Kč",
      icon: Bot,
      color: "from-[#5885fa] to-[#acc2fc]",
      features: [
        "Hands-on workshop",
        "AI tool library",
        "Automation templates",
        "Weekly Q&A"
      ],
      skills: ["ChatGPT", "Automation", "Productivity", "AI Strategy"]
    },
    {
      id: 6,
      title: "Data Analytics Bootcamp",
      subtitle: "Data-driven rozhodování",
      description: "Naučte se analyzovat data, vytvářet reporty a dashboardy pro lepší business rozhodnutí a ROI optimalizaci.",
      level: "Střední",
      duration: "8 týdnů",
      lessons: 28,
      students: 643,
      rating: 4.6,
      price: "16 990 Kč",
      originalPrice: "24 990 Kč",
      icon: LineChart,
      color: "from-[#5885fa] to-[#5885fa]",
      features: [
        "Real datasets",
        "Dashboard projects",
        "SQL training",
        "Visualization tools"
      ],
      skills: ["Analytics", "SQL", "Dashboards", "Data Viz"]
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {courses.map((course) => (
        <div key={course.id} className="group bg-slate-900/50 rounded-2xl p-6 border border-slate-800 hover:border-[#5885fa]/50 transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className={`text-4xl p-3 rounded-xl bg-gradient-to-r ${course.color} bg-opacity-20`}>
              <course.icon className="w-8 h-8 text-white" />
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 mb-1">
                <Star className="w-4 h-4 text-[#5885fa]" />
                <span className="text-sm font-semibold text-slate-100">{course.rating}</span>
              </div>
              <div className="text-xs text-slate-400">{course.students} studentů</div>
            </div>
          </div>

          {/* Content */}
          <h3 className="text-xl font-bold text-slate-100 mb-2">{course.title}</h3>
          <p className={`text-sm font-medium bg-gradient-to-r ${course.color} text-transparent bg-clip-text mb-3`}>
            {course.subtitle}
          </p>
          <p className="text-sm text-slate-400 mb-4 leading-relaxed">{course.description}</p>

          {/* Course details */}
          <div className="flex flex-wrap gap-3 mb-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-slate-800 text-slate-300 rounded-full text-xs border border-slate-700">
              <BookOpen className="w-4 h-4 text-[#5885fa]" />
              {course.level}
            </span>
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-slate-800 text-slate-300 rounded-full text-xs border border-slate-700">
              <Clock className="w-4 h-4 text-[#5885fa]" />
              {course.duration}
            </span>
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-slate-800 text-slate-300 rounded-full text-xs border border-slate-700">
              <Play className="w-4 h-4 text-[#5885fa]" />
              {course.lessons} lekcí
            </span>
          </div>

          {/* Features */}
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-slate-100 mb-2">Co získáte:</h4>
            <ul className="text-xs text-slate-400 space-y-1">
              {course.features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#5885fa]" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Skills */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-slate-100 mb-2">Naučíte se:</h4>
            <div className="flex flex-wrap gap-2">
              {course.skills.map((skill, idx) => (
                <span key={idx} className={`px-2 py-1 bg-gradient-to-r ${course.color} bg-opacity-20 text-xs rounded border border-opacity-30`} style={{borderColor: 'currentColor'}}>
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Price and CTA */}
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-slate-100">{course.price}</span>
                <span className="text-sm text-slate-500 line-through">{course.originalPrice}</span>
              </div>
              <div className="text-xs text-[#5885fa]">Ušetříte {parseInt(course.originalPrice.replace(/\D/g, '')) - parseInt(course.price.replace(/\D/g, ''))} Kč</div>
            </div>
            <button className={`px-4 py-2 bg-[#5885fa] text-white text-sm font-semibold rounded-lg hover:shadow-lg transition-all duration-200 transform hover:scale-105`}>
              Přihlásit se
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

// Grafy růstu znalostí
function KnowledgeGrowthCharts() {
  const [animatedValues, setAnimatedValues] = useState({
    before: { technical: 0, business: 0, practical: 0, career: 0 },
    after: { technical: 0, business: 0, practical: 0, career: 0 }
  });

  const targetValues = {
    before: { technical: 25, business: 30, practical: 20, career: 15 },
    after: { technical: 85, business: 80, practical: 90, career: 75 }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedValues(targetValues);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const skillAreas = [
    {
      name: "Technické dovednosti",
      key: "technical",
      color: "from-[#5885fa] to-[#8aaafc]",
      icon: Settings
    },
    {
      name: "Business znalosti", 
      key: "business",
      color: "from-[#5885fa] to-[#5885fa]",
      icon: Briefcase
    },
    {
      name: "Praktická aplikace",
      key: "practical", 
      color: "from-[#5885fa] to-[#5885fa]",
      icon: Target
    },
    {
      name: "Kariérní růst",
      key: "career",
      color: "from-[#5885fa] to-[#acc2fc]", 
      icon: Rocket
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center gap-8 bg-slate-900/50 rounded-2xl p-6 border border-slate-800">
          <div className="text-center">
            <div className="text-lg font-semibold text-slate-400 mb-2">Před kurzem</div>
            <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
              <Meh className="w-6 h-6 text-slate-400" />
            </div>
          </div>
          <ArrowRight className="w-8 h-8 text-slate-600" />
          <div className="text-center">
            <div className="text-lg font-semibold text-slate-300 mb-2">Po kurzu</div>
            <div className="w-16 h-16 rounded-full bg-[#5885fa]/20 flex items-center justify-center border border-[#5885fa]/30">
              <Smile className="w-6 h-6 text-[#5885fa]" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {skillAreas.map((area) => (
          <div key={area.key} className="bg-slate-900/50 rounded-2xl p-6 border border-slate-800">
            <div className="text-center mb-4">
              <area.icon className="w-8 h-8 text-[#5885fa] mb-2 mx-auto" />
              <h3 className="text-sm font-semibold text-slate-100 mb-4">{area.name}</h3>
            </div>

            <div className="space-y-4">
              {/* Před kurzem */}
              <div>
                <div className="flex justify-between text-xs text-slate-400 mb-1">
                  <span>Před</span>
                  <span>{animatedValues.before[area.key as keyof typeof animatedValues.before]}%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full bg-slate-600 transition-all duration-1000 ease-out"
                    style={{ width: `${animatedValues.before[area.key as keyof typeof animatedValues.before]}%` }}
                  />
                </div>
              </div>

              {/* Po kurzu */}
              <div>
                <div className="flex justify-between text-xs text-slate-100 mb-1">
                  <span>Po kurzu</span>
                  <span>{animatedValues.after[area.key as keyof typeof animatedValues.after]}%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full bg-gradient-to-r ${area.color} transition-all duration-1000 ease-out`}
                    style={{ width: `${animatedValues.after[area.key as keyof typeof animatedValues.after]}%` }}
                  />
                </div>
              </div>

              {/* Rozdíl */}
              <div className="text-center">
                <span className={`text-sm font-bold bg-gradient-to-r ${area.color} text-transparent bg-clip-text`}>
                  +{animatedValues.after[area.key as keyof typeof animatedValues.after] - animatedValues.before[area.key as keyof typeof animatedValues.before]}% růst
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AkademiePage() {
  const [showRegister, setShowRegister] = useState(false);

  const stats = [
    { icon: GraduationCap, value: "2,847", label: "Absolventů" },
    { icon: BookOpen, value: "24", label: "Aktivních kurzů" },
    { icon: Star, value: "4.8", label: "Průměrné hodnocení" },
    { icon: Trophy, value: "94%", label: "Úspěšnost dokončení" }
  ];

  return (
    <main className="relative min-h-screen bg-[#020617] overflow-hidden">
      {/* Hero sekce */}
      <section className="relative pt-32 pb-16 px-6 sm:px-12 lg:px-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_center,rgba(88,133,250,0.15),transparent_50%)]" />
        <div className="relative z-10 text-center">
          <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-slate-100 mb-6">
            Mescon <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5885fa] via-[#8aaafc] to-[#799dfb]">Akademie</span>
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-slate-400 max-w-4xl mx-auto leading-relaxed mb-8">
            Rozvíjejte své digitální dovednosti s našimi praktickými kurzy. Od začátečníků po pokročilé - 
            každý najde svou cestu k úspěchu v digitálním světě.
          </p>

          {/* Statistiky */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-4 rounded-xl bg-slate-900/30 border border-slate-800/50 backdrop-blur-sm">
                <stat.icon className="w-8 h-8 text-[#5885fa] mb-2 mx-auto" />
                <div className="text-2xl font-bold text-slate-100 mb-1">{stat.value}</div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
          
          <button
            onClick={() => setShowRegister(true)}
            className="bg-[#5885fa] hover:bg-[#5885fa]/90 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-all duration-200 shadow-xl hover:shadow-[#5885fa]/25 transform hover:-translate-y-1"
          >
            Přihlásit se do kurzu
          </button>
        </div>
      </section>

      {/* Dostupné kurzy */}
      <section className="relative py-20 px-6 sm:px-12 lg:px-20 border-t border-slate-800 bg-slate-900/20">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-100 mb-4">
            Naše <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5885fa] via-[#8aaafc] to-[#799dfb]">kurzy</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto">
            Praktické vzdělávání s reálnými projekty a mentorováním od expertů
          </p>
        </div>

        <CourseGrid />
      </section>

      {/* Grafy růstu znalostí */}
      <section className="relative py-20 px-6 sm:px-12 lg:px-20 border-t border-slate-800">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-100 mb-4">
            Váš <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5885fa] via-[#8aaafc] to-[#799dfb]">pokrok</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto">
            Průměrný růst dovedností našich studentů během kurzů
          </p>
        </div>

        <KnowledgeGrowthCharts />
      </section>

      {/* Závěrečná CTA sekce */}
      <section className="relative py-20 px-6 sm:px-12 lg:px-20 border-t border-slate-800 bg-slate-900/20">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-100 mb-4">
            Začněte svou <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5885fa] via-[#8aaafc] to-[#799dfb]">vzdělávací cestu</span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed mb-12">
            Přidejte se k tisícům úspěšných absolventů, kteří změnili svou kariéru díky našim kurzům. 
            Investice do vzdělání je nejlepší investice do budoucnosti.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setShowRegister(true)}
              className="bg-[#5885fa] hover:bg-[#5885fa]/90 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-all duration-200 shadow-xl hover:shadow-[#5885fa]/25 transform hover:-translate-y-1"
            >
              Přihlásit se do kurzu
            </button>
            <button className="border border-slate-700 hover:border-[#5885fa] text-slate-300 hover:text-white font-semibold px-8 py-4 rounded-xl text-lg transition-all duration-200 hover:bg-slate-800/50">
              Prohlédnout ukázky
            </button>
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
