'use client';

import { useState } from 'react';
import SectionContainer from '../../../components/ui/SectionContainer';
import RegisterPanel from '../../../components/RegisterPanel';

interface FormData {
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  website: string;
  partnershipReason: string;
  companySize: string;
  industry: string;
  message: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function ApplyPartnerPage() {
  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    website: '',
    partnershipReason: '',
    companySize: '',
    industry: '',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Název firmy je povinný';
    }

    if (!formData.contactPerson.trim()) {
      newErrors.contactPerson = 'Kontaktní osoba je povinná';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email je povinný';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Neplatný formát emailu';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Telefon je povinný';
    }

    if (!formData.partnershipReason) {
      newErrors.partnershipReason = 'Důvod partnerství je povinný';
    }

    if (!formData.companySize) {
      newErrors.companySize = 'Velikost firmy je povinná';
    }

    if (!formData.industry) {
      newErrors.industry = 'Odvětví je povinné';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulace odeslání
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
        setFormData({
          companyName: '',
          contactPerson: '',
          email: '',
          phone: '',
          website: '',
          partnershipReason: '',
          companySize: '',
          industry: '',
          message: ''
        });
      }, 3000);
    }, 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const benefits = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'Rychlý růst',
      description: 'Využijte naší expertízy a infrastruktury pro rychlé rozšíření vašeho podnikání.'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
        </svg>
      ),
      title: 'Výhodné podmínky',
      description: 'Získejte přístup k exkluzivním cenám, slevám a speciálním nabídkám pro partnery.'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: 'Odborná podpora',
      description: 'Komplexní technická podpora, školení a mentoring od našich specialistů.'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: 'Marketingová podpora',
      description: 'Společné marketingové kampaně, co-branding příležitosti a podporu při akcích.'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
        </svg>
      ),
      title: 'Globální dosah',
      description: 'Přístup k mezinárodní síti partnerů a možnost expanze na zahraniční trhy.'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      title: 'Vzdělávání',
      description: 'Pravidelná školení, certifikace a přístup k nejnovějším technologiím a trendům.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#020617]">
      {/* Header Section */}
      <SectionContainer className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#5885fa]/10 border border-[#5885fa]/20 mb-8">
            <svg className="w-4 h-4 text-[#5885fa]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="text-sm font-medium text-[#5885fa]">Partnerský program</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white via-[#5885fa] to-[#dee7fe] bg-clip-text text-transparent mb-6">
            Žádost o partnerství
          </h1>
          
          <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Připojte se k naší globální síti partnerů a společně budujme budoucnost digitálních řešení. 
            Získejte přístup k exkluzivním příležitostem a podporě.
          </p>
        </div>
      </SectionContainer>

      {/* Benefits Section */}
      <SectionContainer className="py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-4">
              Výhody partnerství s Mescon
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Objevte, jak vám může partnerství s námi přinést nové příležitosti a urychlit váš růst
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="group relative p-8 rounded-2xl bg-slate-900/50 backdrop-blur-sm border border-slate-800 hover:border-[#5885fa]/50 transition-all duration-300 hover:shadow-2xl hover:shadow-[#5885fa]/10"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#5885fa] text-white mb-6 group-hover:scale-110 transition-transform duration-300">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-slate-100 mb-4">
                    {benefit.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionContainer>

      {/* Form Section */}
      <SectionContainer className="py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-4">
              Vyplňte žádost o partnerství
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Poskytněte nám základní informace o vaší společnosti a důvodech spolupráce
            </p>
          </div>

          <div className="relative p-8 md:p-12 rounded-3xl bg-slate-900/50 backdrop-blur-sm border border-slate-800">
            {showSuccess && (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-900/90 backdrop-blur-sm rounded-3xl z-10">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500 text-white mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Žádost odeslána!</h3>
                  <p className="text-slate-300">Brzy se vám ozveme s dalšími informacemi.</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Company Information */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-slate-100 mb-4 pb-2 border-b border-slate-800">
                  Informace o společnosti
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="companyName" className="block text-sm font-medium text-slate-300 mb-2">
                      Název firmy *
                    </label>
                    <input
                      type="text"
                      id="companyName"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg bg-slate-900/50 border ${
                        errors.companyName ? 'border-red-500' : 'border-slate-700'
                      } text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#5885fa] focus:border-transparent transition-all duration-200`}
                      placeholder="Zadejte název vaší firmy"
                    />
                    {errors.companyName && (
                      <p className="text-red-400 text-sm mt-1">{errors.companyName}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="website" className="block text-sm font-medium text-slate-300 mb-2">
                      Webové stránky
                    </label>
                    <input
                      type="url"
                      id="website"
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg bg-slate-900/50 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#5885fa] focus:border-transparent transition-all duration-200"
                      placeholder="https://www.example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="companySize" className="block text-sm font-medium text-slate-300 mb-2">
                      Velikost firmy *
                    </label>
                    <select
                      id="companySize"
                      name="companySize"
                      value={formData.companySize}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg bg-slate-900/50 border ${
                        errors.companySize ? 'border-red-500' : 'border-slate-700'
                      } text-white focus:outline-none focus:ring-2 focus:ring-[#5885fa] focus:border-transparent transition-all duration-200`}
                    >
                      <option value="">Vyberte velikost firmy</option>
                      <option value="1-10">1-10 zaměstnanců</option>
                      <option value="11-50">11-50 zaměstnanců</option>
                      <option value="51-200">51-200 zaměstnanců</option>
                      <option value="201-500">201-500 zaměstnanců</option>
                      <option value="500+">500+ zaměstnanců</option>
                    </select>
                    {errors.companySize && (
                      <p className="text-red-400 text-sm mt-1">{errors.companySize}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="industry" className="block text-sm font-medium text-slate-300 mb-2">
                      Odvětví *
                    </label>
                    <select
                      id="industry"
                      name="industry"
                      value={formData.industry}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg bg-slate-900/50 border ${
                        errors.industry ? 'border-red-500' : 'border-slate-700'
                      } text-white focus:outline-none focus:ring-2 focus:ring-[#5885fa] focus:border-transparent transition-all duration-200`}
                    >
                      <option value="">Vyberte odvětví</option>
                      <option value="technology">IT & Technologie</option>
                      <option value="finance">Finance & Banking</option>
                      <option value="healthcare">Zdravotnictví</option>
                      <option value="manufacturing">Výroba</option>
                      <option value="retail">Maloobchod</option>
                      <option value="education">Vzdělávání</option>
                      <option value="consulting">Poradenství</option>
                      <option value="other">Jiné</option>
                    </select>
                    {errors.industry && (
                      <p className="text-red-400 text-sm mt-1">{errors.industry}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-slate-100 mb-4 pb-2 border-b border-slate-800">
                  Kontaktní údaje
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="contactPerson" className="block text-sm font-medium text-slate-300 mb-2">
                      Kontaktní osoba *
                    </label>
                    <input
                      type="text"
                      id="contactPerson"
                      name="contactPerson"
                      value={formData.contactPerson}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg bg-slate-900/50 border ${
                        errors.contactPerson ? 'border-red-500' : 'border-slate-700'
                      } text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#5885fa] focus:border-transparent transition-all duration-200`}
                      placeholder="Jméno a příjmení"
                    />
                    {errors.contactPerson && (
                      <p className="text-red-400 text-sm mt-1">{errors.contactPerson}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg bg-slate-900/50 border ${
                        errors.email ? 'border-red-500' : 'border-slate-700'
                      } text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#5885fa] focus:border-transparent transition-all duration-200`}
                      placeholder="email@example.com"
                    />
                    {errors.email && (
                      <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-slate-300 mb-2">
                      Telefon *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg bg-slate-900/50 border ${
                        errors.phone ? 'border-red-500' : 'border-slate-700'
                      } text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#5885fa] focus:border-transparent transition-all duration-200`}
                      placeholder="+420 123 456 789"
                    />
                    {errors.phone && (
                      <p className="text-red-400 text-sm mt-1">{errors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="partnershipReason" className="block text-sm font-medium text-slate-300 mb-2">
                      Důvod partnerství *
                    </label>
                    <select
                      id="partnershipReason"
                      name="partnershipReason"
                      value={formData.partnershipReason}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg bg-slate-900/50 border ${
                        errors.partnershipReason ? 'border-red-500' : 'border-slate-700'
                      } text-white focus:outline-none focus:ring-2 focus:ring-[#5885fa] focus:border-transparent transition-all duration-200`}
                    >
                      <option value="">Vyberte důvod spolupráce</option>
                      <option value="reseller">Chci být prodejcem</option>
                      <option value="technology">Technologické partnerství</option>
                      <option value="integration">Integrace služeb</option>
                      <option value="referral">Doporučující program</option>
                      <option value="strategic">Strategické partnerství</option>
                      <option value="other">Jiný důvod</option>
                    </select>
                    {errors.partnershipReason && (
                      <p className="text-red-400 text-sm mt-1">{errors.partnershipReason}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-slate-100 mb-4 pb-2 border-b border-slate-800">
                  Dodatečné informace
                </h3>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
                    Zpráva
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg bg-slate-900/50 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#5885fa] focus:border-transparent transition-all duration-200 resize-none"
                    placeholder="Popište své očekávání od partnerství, vaše dosavadní zkušenosti nebo jakékoliv další informace, které považujete za relevantní..."
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex flex-col sm:flex-row gap-4 pt-8">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 relative inline-flex items-center justify-center px-8 py-4 rounded-xl text-lg font-semibold text-white bg-[#5885fa] hover:bg-[#5885fa]/90 focus:outline-none focus:ring-2 focus:ring-[#5885fa] focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-[#5885fa]/25"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Odesílám žádost...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      Odeslat žádost
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </SectionContainer>

      {/* Additional CTA Section */}
      <SectionContainer className="py-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="p-8 md:p-12 rounded-3xl bg-slate-900/50 border border-slate-800 backdrop-blur-sm">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-100 mb-4">
              Máte otázky ohledně partnerství?
            </h2>
            <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto">
              Náš tým partnerských specialistů je zde, aby vám pomohl najít ideální formu spolupráce
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:partnerships@mescon.cz"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg text-white bg-[#5885fa] hover:bg-[#5885fa]/90 transition-colors duration-200"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                partnerships@mescon.cz
              </a>
            </div>
          </div>
        </div>
      </SectionContainer>

      <RegisterPanel open={showRegister} onClose={() => setShowRegister(false)} />
    </div>
  );
}
