"use client";
import { useState, useEffect } from 'react';
import { BookOpen, Bug, Check, CheckCircle, Clock, CreditCard, FileText, GraduationCap, HelpCircle, Laptop, Lightbulb, Mail, MessageSquare, Phone, Search, Sparkles, Ticket, Users, Wrench, Zap, Smile } from 'lucide-react';
import Button from '../../../components/ui/Button';
import RegisterPanel from '../../../components/RegisterPanel';

// Kontaktní formulář s validací
function SupportForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    priority: 'medium',
    category: 'general'
  });
  
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const categories = [
    { value: 'general', label: 'Obecný dotaz', icon: HelpCircle },
    { value: 'technical', label: 'Technická podpora', icon: Wrench },
    { value: 'billing', label: 'Fakturace', icon: CreditCard },
    { value: 'feature', label: 'Nová funkcionalita', icon: Sparkles },
    { value: 'bug', label: 'Nahlášení chyby', icon: Bug },
    { value: 'consultation', label: 'Konzultace', icon: Lightbulb }
  ];

  const priorities = [
    { value: 'low', label: 'Nízká', color: 'emerald', description: 'Odpovíme do 48h' },
    { value: 'medium', label: 'Střední', color: 'blue', description: 'Odpovíme do 24h' },
    { value: 'high', label: 'Vysoká', color: 'orange', description: 'Odpovíme do 8h' },
    { value: 'urgent', label: 'Urgentní', color: 'red', description: 'Odpovíme do 2h' }
  ];

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    // Validace jména
    if (!formData.name.trim()) {
      newErrors.name = 'Jméno je povinné';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Jméno musí mít alespoň 2 znaky';
    }

    // Validace emailu
    if (!formData.email.trim()) {
      newErrors.email = 'Email je povinný';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email není ve správném formátu';
    }

    // Validace telefonu (volitelné, ale pokud je vyplněné, musí být správné)
    if (formData.phone.trim() && !/^(\+420)?[1-9][0-9]{8}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Telefon není ve správném formátu (+420xxxxxxxxx)';
    }

    // Validace předmětu
    if (!formData.subject.trim()) {
      newErrors.subject = 'Předmět je povinný';
    } else if (formData.subject.trim().length < 5) {
      newErrors.subject = 'Předmět musí mít alespoň 5 znaků';
    }

    // Validace zprávy
    if (!formData.message.trim()) {
      newErrors.message = 'Zpráva je povinná';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Zpráva musí mít alespoň 10 znaků';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Simulace odeslání
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setShowSuccess(true);
      
      // Reset formuláře
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        priority: 'medium',
        category: 'general'
      });
      
      // Skrytí success zprávy po 5 sekundách
      setTimeout(() => setShowSuccess(false), 5000);
      
    } catch (error) {
      console.error('Chyba při odesílání:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Vymazání chyby při změně
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const selectedCategory = categories.find(cat => cat.value === formData.category);
  const selectedPriority = priorities.find(pri => pri.value === formData.priority);

  return (
      <div className="bg-[#0f1420] rounded-2xl p-8 border border-slate-800">
      <div className="flex items-center space-x-3 mb-8">
        <div className="text-[#acc2fc]">
          <FileText className="w-7 h-7" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-white">Kontaktní formulář</h3>
          <p className="text-slate-400">Popište váš dotaz a my se vám ozveme</p>
        </div>
      </div>

      {showSuccess && (
        <div className="bg-emerald-900/20 border border-emerald-500/30 rounded-lg p-4 mb-6 animate-pulse">
          <div className="flex items-center space-x-3">
            <div className="text-emerald-400">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div>
              <div className="text-emerald-400 font-semibold">Dotaz byl úspěšně odeslán!</div>
              <div className="text-emerald-300 text-sm">Odpovíme vám co nejdříve podle zvolené priority.</div>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Kategorie a priorita */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-white mb-3 uppercase tracking-wider">Kategorie dotazu</label>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((category) => (
                <button
                  key={category.value}
                  type="button"
                  onClick={() => handleChange('category', category.value)}
                  className={`p-3 rounded-lg border transition-all duration-200 text-left ${
                    formData.category === category.value
                      ? 'border-[#5885fa] bg-[#5885fa]/10 text-[#5885fa]'
                      : 'border-slate-700 bg-[#1e2334] text-slate-400 hover:border-slate-500 hover:text-white'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <category.icon className="w-4 h-4" />
                    <span className="text-xs font-bold">{category.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-white mb-3 uppercase tracking-wider">Priorita</label>
            <div className="space-y-2">
              {priorities.map((priority) => (
                <button
                  key={priority.value}
                  type="button"
                  onClick={() => handleChange('priority', priority.value)}
                  className={`w-full p-3 rounded-lg border transition-all duration-200 text-left ${
                    formData.priority === priority.value
                      ? `border-${priority.color}-500 bg-${priority.color}-500/10 text-${priority.color}-400`
                      : 'border-slate-700 bg-[#1e2334] text-slate-400 hover:border-slate-500 hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm">{priority.label}</span>
                    <span className="text-xs text-slate-500">{priority.description}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Osobní údaje */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-white mb-2">
              Jméno a příjmení <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className={`w-full px-4 py-3 bg-[#1e2334] border rounded-lg text-white placeholder-slate-500 transition-all duration-200 ${
                errors.name 
                  ? 'border-red-500 focus:border-red-400 focus:ring-2 focus:ring-red-400/20'
                  : 'border-slate-700 focus:border-[#5885fa] focus:ring-2 focus:ring-[#5885fa]/20'
              }`}
              placeholder="Jan Novák"
            />
            {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-bold text-white mb-2">
              Email <span className="text-red-400">*</span>
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className={`w-full px-4 py-3 bg-[#1e2334] border rounded-lg text-white placeholder-slate-500 transition-all duration-200 ${
                errors.email
                  ? 'border-red-500 focus:border-red-400 focus:ring-2 focus:ring-red-400/20'
                  : 'border-slate-700 focus:border-[#5885fa] focus:ring-2 focus:ring-[#5885fa]/20'
              }`}
              placeholder="jan@example.com"
            />
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-white mb-2">
              Telefon <span className="text-slate-500 font-normal">(volitelné)</span>
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className={`w-full px-4 py-3 bg-[#1e2334] border rounded-lg text-white placeholder-slate-500 transition-all duration-200 ${
                errors.phone
                  ? 'border-red-500 focus:border-red-400 focus:ring-2 focus:ring-red-400/20'
                  : 'border-slate-700 focus:border-[#5885fa] focus:ring-2 focus:ring-[#5885fa]/20'
              }`}
              placeholder="+420 123 456 789"
            />
            {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
          </div>

          <div>
            <label className="block text-sm font-bold text-white mb-2">
              Předmět <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={formData.subject}
              onChange={(e) => handleChange('subject', e.target.value)}
              className={`w-full px-4 py-3 bg-[#1e2334] border rounded-lg text-white placeholder-slate-500 transition-all duration-200 ${
                errors.subject
                  ? 'border-red-500 focus:border-red-400 focus:ring-2 focus:ring-red-400/20'
                  : 'border-slate-700 focus:border-[#5885fa] focus:ring-2 focus:ring-[#5885fa]/20'
              }`}
              placeholder="Stručně popište váš dotaz"
            />
            {errors.subject && <p className="text-red-400 text-sm mt-1">{errors.subject}</p>}
          </div>
        </div>

        {/* Zpráva */}
        <div>
          <label className="block text-sm font-bold text-white mb-2">
            Zpráva <span className="text-red-400">*</span>
          </label>
          <textarea
            value={formData.message}
            onChange={(e) => handleChange('message', e.target.value)}
            rows={6}
            className={`w-full px-4 py-3 bg-[#1e2334] border rounded-lg text-white placeholder-slate-500 transition-all duration-200 resize-none ${
              errors.message
                ? 'border-red-500 focus:border-red-400 focus:ring-2 focus:ring-red-400/20'
                : 'border-slate-700 focus:border-[#5885fa] focus:ring-2 focus:ring-[#5885fa]/20'
            }`}
            placeholder="Detailně popište váš dotaz, problém nebo požadavek..."
          />
          {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message}</p>}
          <div className="text-right text-xs text-slate-500 mt-1">
            {formData.message.length}/1000 znaků
          </div>
        </div>

        {/* Shrnutí */}
        <div className="bg-[#1e2334] rounded-lg p-4 border border-slate-700">
          <h4 className="text-white font-bold mb-3 text-sm uppercase tracking-wider">Shrnutí dotazu</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <span className="text-slate-400">Kategorie:</span>
              <span className="text-white flex items-center space-x-1 font-medium">
                {selectedCategory?.icon ? <selectedCategory.icon className="w-4 h-4 text-slate-300" /> : null}
                <span>{selectedCategory?.label}</span>
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-slate-400">Priorita:</span>
              <span className={`text-${selectedPriority?.color}-400 font-bold uppercase text-xs`}>
                {selectedPriority?.label}
              </span>
            </div>
          </div>
        </div>

        {/* Odeslání */}
        <div className="flex flex-col sm:flex-row gap-4 justify-end pt-4">
          <Button
            variant="outline"
            onClick={() => setFormData({
              name: '',
              email: '',
              phone: '',
              subject: '',
              message: '',
              priority: 'medium',
              category: 'general'
            })}
            disabled={isSubmitting}
          >
            Vymazat formulář
          </Button>
          
          <Button
            variant="primary"
            type="submit"
            disabled={isSubmitting}
            className="min-w-[160px]"
          >
            {isSubmitting ? (
              <span className="flex items-center space-x-2">
                <svg className="animate-spin w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>Odesílám...</span>
              </span>
            ) : (
              'Odeslat dotaz'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

// Rychlé odkazy
function QuickActions() {
  const quickLinks = [
    {
      icon: HelpCircle,
      title: 'FAQ',
      description: 'Odpovědi na nejčastější dotazy',
      action: 'Procházet FAQ',
      color: 'blue',
      stats: '50+ odpovědí',
      href: '#faq'
    },
    {
      icon: Mail,
      title: 'Email podpora',
      description: 'Napište nám na podporu',
      action: 'podpora@mescon.cz',
      color: 'emerald',
      stats: 'Odpovíme do 24h',
      href: 'mailto:podpora@mescon.cz'
    },
    {
      icon: Phone,
      title: 'Telefonní podpora',
      description: 'Zavolejte nám přímo',
      action: '+420 123 456 789',
      color: 'orange',
      stats: 'Po-Pá 8:00-17:00',
      href: 'tel:+420123456789'
    },
    {
      icon: MessageSquare,
      title: 'Live Chat',
      description: 'Rychlá pomoc online',
      action: 'Spustit chat',
      color: 'blue',
      stats: 'Online teď',
      href: '#chat',
      comingSoon: true
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {quickLinks.map((link, index) => (
        <div key={index} className="bg-[#0f1420] rounded-2xl p-6 border border-slate-800 hover:border-[#5885fa]/30 transition-all duration-300 hover:-translate-y-1 relative group">
          {link.comingSoon && (
            <div className="absolute -top-2 -right-2 bg-gradient-to-r from-[#4f78e1] to-[#8aaafc] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full">
              Připravujeme
            </div>
          )}
          
          <div className="mb-4 text-[#acc2fc] group-hover:scale-110 transition-transform duration-300">
            <link.icon className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#5885fa] transition-colors">{link.title}</h3>
          <p className="text-slate-400 text-sm mb-6">{link.description}</p>
          
          <div className={`text-center p-3 bg-[#1e2334] border border-slate-700 rounded-lg mb-4`}>
            <div className={`text-white font-bold text-sm`}>{link.action}</div>
            <div className={`text-slate-500 text-xs mt-1`}>{link.stats}</div>
          </div>

          <a
            href={link.href}
            className={`block w-full py-2 rounded-lg text-center text-sm font-bold transition-all duration-200 ${
              link.comingSoon
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                : `bg-[#5885fa]/10 text-[#5885fa] hover:bg-[#5885fa] hover:text-white`
            }`}
            onClick={link.comingSoon ? (e) => e.preventDefault() : undefined}
          >
            {link.comingSoon ? 'Brzy k dispozici' : 'Kontaktovat'}
          </a>
        </div>
      ))}
    </div>
  );
}

// Statistiky podpory
function SupportStats() {
  const [stats, setStats] = useState({
    tickets: 0,
    responseTime: 0,
    satisfaction: 0,
    resolved: 0
  });

  const finalStats = {
    tickets: 2847,
    responseTime: 2.5,
    satisfaction: 98,
    resolved: 94
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setStats(finalStats);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-[#0f1420] rounded-2xl p-6 border border-slate-800 text-center hover:border-[#5885fa]/30 transition-colors">
        <div className="mb-4 text-[#acc2fc]"><Ticket className="w-7 h-7" /></div>
        <div className="text-3xl font-bold text-white mb-1">{stats.tickets}</div>
        <div className="text-sm text-slate-400 font-medium">Vyřešených dotazů</div>
        <div className="text-xs text-[#5885fa] mt-2 font-bold uppercase tracking-wider">Tento rok</div>
      </div>

      <div className="bg-[#0f1420] rounded-2xl p-6 border border-slate-800 text-center hover:border-[#5885fa]/30 transition-colors">
        <div className="mb-4 text-[#acc2fc]"><Clock className="w-7 h-7" /></div>
        <div className="text-3xl font-bold text-white mb-1">{stats.responseTime}h</div>
        <div className="text-sm text-slate-400 font-medium">Průměrná doba odezvy</div>
        <div className="text-xs text-emerald-400 mt-2 font-bold uppercase tracking-wider">Rychlé odpovědi</div>
      </div>

      <div className="bg-[#0f1420] rounded-2xl p-6 border border-slate-800 text-center hover:border-[#5885fa]/30 transition-colors">
        <div className="mb-4 text-[#acc2fc]"><Smile className="w-7 h-7" /></div>
        <div className="text-3xl font-bold text-white mb-1">{stats.satisfaction}%</div>
        <div className="text-sm text-slate-400 font-medium">Spokojenost klientů</div>
        <div className="text-xs text-[#8aaafc] mt-2 font-bold uppercase tracking-wider">Vysoká spokojenost</div>
      </div>

      <div className="bg-[#0f1420] rounded-2xl p-6 border border-slate-800 text-center hover:border-[#5885fa]/30 transition-colors">
        <div className="mb-4 text-[#acc2fc]"><CheckCircle className="w-7 h-7" /></div>
        <div className="text-3xl font-bold text-white mb-1">{stats.resolved}%</div>
        <div className="text-sm text-slate-400 font-medium">Úspěšnost řešení</div>
        <div className="text-xs text-orange-400 mt-2 font-bold uppercase tracking-wider">Řešení na první kontakt</div>
      </div>
    </div>
  );
}

// FAQ sekce připravená pro rozšíření
function FAQPreview() {
  const topQuestions = [
    {
      question: "Jak rychle dostanu odpověď na můj dotaz?",
      answer: "Odpověď závisí na zvolené prioritě. Urgentní dotazy řešíme do 2 hodin, běžné dotazy do 24 hodin.",
      category: "general"
    },
    {
      question: "Jaké informace potřebujete k vyřešení technického problému?",
      answer: "Popište problém detailně, přiložte screenshoty a uveďte, kdy se problém objevil. Čím více informací, tým rychlejší řešení.",
      category: "technical"
    },
    {
      question: "Můžete pomoci i mimo pracovní dobu?",
      answer: "Urgentní technické problémy řešíme 24/7. Ostatní dotazy zpracováváme v pracovní době Po-Pá 8:00-17:00.",
      category: "general"
    }
  ];

  return (
    <div className="bg-[#0f1420] rounded-2xl p-8 border border-slate-800">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-xl font-bold text-white mb-2">Nejčastější dotazy</h3>
          <p className="text-slate-400 text-sm">Rychlé odpovědi na časté otázky</p>
        </div>
        <div className="bg-[#1e2334] border border-slate-700 rounded-lg px-3 py-1 hidden sm:block">
          <span className="text-slate-300 text-xs font-bold uppercase tracking-wider">Připravujeme kompletní FAQ</span>
        </div>
      </div>

      <div className="space-y-4">
        {topQuestions.map((faq, index) => (
            <div key={index} className="border border-slate-800 bg-[#020617] rounded-lg p-5 hover:border-[#5885fa]/30 transition-colors group">
            <div className="flex items-start space-x-4">
              <div className="text-[#5885fa] mt-1">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h4 className="text-white font-bold mb-2 group-hover:text-[#5885fa] transition-colors">{faq.question}</h4>
                <p className="text-slate-400 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Button variant="primary">
          Zobrazit všechny FAQ
        </Button>
      </div>
    </div>
  );
}

export default function SupportPage() {
  const [showRegister, setShowRegister] = useState(false);

  const supportFeatures = [
    {
      title: "Rychlá odezva",
      description: "Garantovaná doba odezvy podle priority dotazu",
      icon: Zap
    },
    {
      title: "Kvalifikovaný tým",
      description: "Specialisté na všechny naše služby a technologie",
      icon: Users
    },
    {
      title: "24/7 monitoring",
      description: "Sledujeme kritické systémy nepřetržitě",
      icon: Search
    },
    {
      title: "Vzdálená pomoc",
      description: "Můžeme se připojit a problém vyřešit na dálku",
      icon: Laptop
    },
    {
      title: "Dokumentace",
      description: "Podrobné návody a best practices",
      icon: BookOpen
    },
    {
      title: "Školení týmu",
      description: "Naučíme váš tým efektivně používat naše řešení",
      icon: GraduationCap
    }
  ];

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
                Technická <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5885fa] to-[#eef3fe]">podpora</span>
                <br />24/7.
              </h1>
              <p className="text-lg sm:text-xl text-slate-300 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Jsme tu pro vás. Rychlá a kvalifikovaná pomoc s vašimi dotazy, technickými problémy nebo novými požadavky.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button variant="primary" size="lg" onClick={() => document.getElementById('support-form')?.scrollIntoView({ behavior: 'smooth' })} className="min-w-[160px]">Odeslat dotaz</Button>
                <Button variant="outline" size="lg" href="tel:+420123456789">Zavolat nám</Button>
              </div>
            </div>

            {/* Right - Visual */}
            <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
              <div className="relative rounded-xl bg-[#0f1420] border border-slate-800 shadow-2xl overflow-hidden p-8">
                 <div className="space-y-4">
                       <div className="flex items-center gap-4 mb-6 border-b border-slate-800 pb-4">
                       <div className="h-10 w-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                         <Check className="w-5 h-5" />
                       </div>
                       <div className="space-y-1">
                          <div className="text-white font-bold">Ticket #2847 vyřešen</div>
                          <div className="text-xs text-slate-500">Před 5 minutami</div>
                       </div>
                    </div>
                    
                    <div className="space-y-3">
                       <div className="bg-[#1e2334] p-3 rounded-lg rounded-tl-none text-sm text-slate-300">
                          Dobrý den, potřeboval bych pomoci s nastavením DNS záznamů...
                       </div>
                       <div className="bg-[#5885fa]/10 p-3 rounded-lg rounded-tr-none text-sm text-[#5885fa] ml-auto max-w-[80%]">
                          Dobrý den, rád vám s tím pomohu. Podívejme se na to společně.
                       </div>
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

      {/* Statistiky */}
      <section className="border-b border-slate-800/60 bg-[#030712]">
        <div className="page-container py-20">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Naše čísla</h2>
            <p className="text-slate-400">Statistiky, které dokazují kvalitu naší podpory.</p>
          </div>
          <SupportStats />
        </div>
      </section>

      {/* Rychlé akce */}
      <section className="border-b border-slate-800/60">
        <div className="page-container py-20">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Rychlý kontakt</h2>
            <p className="text-slate-400">Vyberte si způsob kontaktu, který vám nejvíce vyhovuje.</p>
          </div>
          <QuickActions />
        </div>
      </section>

      {/* Kontaktní formulář */}
      <section className="border-b border-slate-800/60 bg-[#02091b]" id="support-form">
        <div className="page-container py-20">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Detailní dotaz</h2>
            <p className="text-slate-400">Popište váš problém nebo požadavek a my vám rychle odpovíme.</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <SupportForm />
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="border-b border-slate-800/60">
        <div className="page-container py-20">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Časté dotazy</h2>
            <p className="text-slate-400">Možná najdete odpověď na váš dotaz už teď.</p>
          </div>
          <div className="max-w-3xl mx-auto">
            <FAQPreview />
          </div>
        </div>
      </section>

      {/* Funkce podpory */}
      <section className="border-b border-slate-800/60 bg-[#030712]">
        <div className="page-container py-20">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Naše služby</h2>
            <p className="text-slate-400">Kompletní podpora pro všechny naše služby a produkty.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {supportFeatures.map((feature, index) => (
              <div key={index} className="bg-[#0f1420] rounded-2xl p-8 border border-slate-800 hover:border-[#5885fa]/30 transition-all duration-300 text-center group hover:-translate-y-1">
                <div className="mb-6 text-[#acc2fc] group-hover:scale-110 transition-transform duration-200">
                  <feature.icon className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-white mb-3 group-hover:text-[#5885fa] transition-colors">{feature.title}</h4>
                <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Chatbot preview */}
          <div className="bg-[#0f1420] rounded-2xl p-8 lg:p-12 border border-slate-800 relative overflow-hidden">
            <div className="absolute top-6 right-6 bg-gradient-to-r from-[#4f78e1] to-[#8aaafc] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
              Připravujeme
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold text-white mb-6">
                  AI Chatbot podpora
                </h3>
                <p className="text-slate-300 mb-8 leading-relaxed">
                  Brzy spustíme inteligentního chatbota, který vám bude schopen odpovědět na základní dotazy okamžitě, 24 hodin denně. Využíváme nejmodernější AI modely pro přesné a kontextové odpovědi.
                </p>
                  <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                      <Check className="w-4 h-4" />
                    </div>
                    <span className="text-slate-300 font-medium">Okamžité odpovědi na základní dotazy</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-[#5885fa]/10 flex items-center justify-center text-[#799dfb]">
                      <Check className="w-4 h-4" />
                    </div>
                    <span className="text-slate-300 font-medium">Přesměrování na správného specialistu</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-[#5885fa]/10 flex items-center justify-center text-[#8aaafc]">
                      <Check className="w-4 h-4" />
                    </div>
                    <span className="text-slate-300 font-medium">Inteligentní analýza problémů</span>
                  </div>
                </div>
              </div>
              
              {/* Chatbot mockup */}
              <div className="bg-[#020617] rounded-xl p-6 border border-slate-800 shadow-2xl">
                <div className="bg-[#1e2334] rounded-lg p-4 border border-slate-700 mb-4">
                  <div className="flex items-center space-x-3 mb-4 border-b border-slate-600 pb-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-[#5885fa] to-[#4f78e1] rounded-full flex items-center justify-center text-white text-xs font-bold">
                      AI
                    </div>
                    <div>
                      <div className="text-white font-bold text-sm">Mescon Assistant</div>
                      <div className="text-emerald-400 text-xs font-bold uppercase tracking-wider">● Online</div>
                    </div>
                  </div>
                  
                  <div className="space-y-3 text-xs">
                    <div className="bg-[#5885fa]/10 text-[#5885fa] p-3 rounded-lg rounded-tl-none border border-[#5885fa]/20">
                      Dobrý den, jak vám mohu pomoci?
                    </div>
                    <div className="bg-slate-700/50 text-slate-300 p-3 rounded-lg rounded-tr-none ml-8 border border-slate-600">
                      Mám problém s emailem...
                    </div>
                    <div className="bg-[#5885fa]/10 text-[#5885fa] p-3 rounded-lg rounded-tl-none border border-[#5885fa]/20">
                      Rozumím. Můžete mi popsat konkrétní problém? Mezitím vás propojuji s expertem na email hosting.
                    </div>
                    <div className="flex gap-1 mt-2">
                       <div className="w-2 h-2 bg-slate-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                       <div className="w-2 h-2 bg-slate-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                       <div className="w-2 h-2 bg-slate-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
