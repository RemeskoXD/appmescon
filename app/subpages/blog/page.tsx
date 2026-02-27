"use client";
import { useState, useEffect } from 'react';
import { FileText, PenLine, Star } from 'lucide-react';
import Button from '../../../components/ui/Button';
import RegisterPanel from '../../../components/RegisterPanel';

// Mock data pro ukázku
const mockArticles = [
  {
    id: 1,
    title: "AI v praxi: Kontaktní centra, která baví zákazníky",
    excerpt: "Jak využít AI a automatizaci k rychlejší a kvalitnější zákaznické péči. Podrobný průvodce moderními technologiami.",
    coverImage: "https://web2.itnahodinu.cz/mescon/images/globe.svg",
    tags: ["AI", "Zákaznická péče", "Automatizace"],
    category: "Technologie",
    author: {
      name: "Produktový tým",
      avatar: "https://web2.itnahodinu.cz/mescon/images/logo.svg"
    },
    publishedAt: "2025-08-20",
    readingTime: "5 min čtení",
    featured: true
  },
  {
    id: 2,
    title: "Marketing trendy 2025",
    excerpt: "Objevte nejnovější trendy v digitálním marketingu, které budou formovat rok 2025. Od personalizace až po AI nástroje.",
    coverImage: "https://web2.itnahodinu.cz/mescon/images/Pozadí.svg",
    tags: ["Marketing", "Trendy", "Digital"],
    category: "Marketing",
    author: {
      name: "Marketing tým",
      avatar: "https://web2.itnahodinu.cz/mescon/images/logo.svg"
    },
    publishedAt: "2025-07-15",
    readingTime: "8 min čtení",
    featured: false
  },
  {
    id: 3,
    title: "Featured Mescon inovace",
    excerpt: "Představujeme nejnovější inovace a vylepšení našich služeb, které vám pomohou dosáhnout lepších výsledků.",
    coverImage: "https://web2.itnahodinu.cz/mescon/images/logo.svg",
    tags: ["Inovace", "Mescon", "Produkty"],
    category: "Novinky",
    author: {
      name: "Development tým",
      avatar: "https://web2.itnahodinu.cz/mescon/images/logo.svg"
    },
    publishedAt: "2025-06-10",
    readingTime: "6 min čtení",
    featured: true
  },
  {
    id: 4,
    title: "Optimalizace konverzí pro e-commerce",
    excerpt: "Praktické tipy a strategie pro zvýšení konverzního poměru vašeho e-commerce webu. Testované metody.",
    coverImage: "https://web2.itnahodinu.cz/mescon/images/globe.svg",
    tags: ["E-commerce", "Konverze", "Optimalizace"],
    category: "E-commerce",
    author: {
      name: "UX tým",
      avatar: "https://web2.itnahodinu.cz/mescon/images/logo.svg"
    },
    publishedAt: "2025-05-20",
    readingTime: "7 min čtení",
    featured: false
  },
  {
    id: 5,
    title: "SEO strategie pro 2025",
    excerpt: "Kompletní průvodce SEO strategiemi, které budou fungovat i v roce 2025. Od technického SEO po content marketing.",
    coverImage: "https://web2.itnahodinu.cz/mescon/images/Pozadí.svg",
    tags: ["SEO", "Strategie", "Content"],
    category: "Marketing",
    author: {
      name: "SEO experti",
      avatar: "https://web2.itnahodinu.cz/mescon/images/logo.svg"
    },
    publishedAt: "2025-04-05",
    readingTime: "12 min čtení",
    featured: false
  },
  {
    id: 6,
    title: "Automatizace obchodních procesů",
    excerpt: "Jak efektivně automatizovat vaše obchodní procesy a ušetřit čas i prostředky pomocí moderních nástrojů.",
    coverImage: "https://web2.itnahodinu.cz/mescon/images/logo.svg",
    tags: ["Automatizace", "Procesy", "Efektivita"],
    category: "Technologie",
    author: {
      name: "Business tým",
      avatar: "https://web2.itnahodinu.cz/mescon/images/logo.svg"
    },
    publishedAt: "2025-03-18",
    readingTime: "9 min čtení",
    featured: false
  }
];

const allCategories = ["Všechny", "Technologie", "Marketing", "E-commerce", "Novinky"];
const allTags = ["AI", "Marketing", "SEO", "E-commerce", "Automatizace", "Trendy", "Inovace", "Konverze"];

// Blog Card Component
function BlogCard({ article }: { article: typeof mockArticles[0] }) {
  return (
    <article className="group bg-slate-900/50 border border-slate-800 rounded-2xl p-6 hover:border-[#5885fa]/30 transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
      {/* Cover Image */}
      <div className="relative overflow-hidden rounded-xl mb-6 aspect-video bg-[#020617]">
        <img
          src={article.coverImage}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-100"
        />
        {article.featured && (
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center gap-1 bg-[#5885fa] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-lg">
              <Star className="w-3.5 h-3.5" />
              Featured
            </span>
          </div>
        )}
        <div className="absolute top-3 right-3">
          <span className="bg-[#020617]/80 backdrop-blur-sm text-slate-300 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full border border-slate-700">
            {article.category}
          </span>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {article.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full bg-slate-800/50 text-slate-400 border border-slate-700"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-slate-100 mb-3 line-clamp-2 group-hover:text-[#5885fa] transition-colors duration-300">
        {article.title}
      </h3>

      {/* Excerpt */}
      <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
        {article.excerpt}
      </p>

      {/* Meta Info */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-800 mt-auto">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-slate-800/50 border border-slate-700 flex items-center justify-center text-xs font-bold text-slate-300">
             {article.author.name.charAt(0)}
          </div>
          <div className="text-xs text-slate-400">
            <div className="font-bold text-slate-300">{article.author.name}</div>
            <div>{new Date(article.publishedAt).toLocaleDateString('cs-CZ')}</div>
          </div>
        </div>
        <span className="text-xs text-slate-500 font-medium">
          {article.readingTime}
        </span>
      </div>
    </article>
  );
}

// Search and Filter Component
function BlogFilters({ 
  searchQuery, 
  setSearchQuery, 
  selectedCategory, 
  setSelectedCategory, 
  selectedTag, 
  setSelectedTag 
}: {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedTag: string;
  setSelectedTag: (tag: string) => void;
}) {
  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
      <div className="grid md:grid-cols-3 gap-6">
        {/* Search */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Hledat články..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#5885fa] focus:ring-1 focus:ring-[#5885fa] transition-all duration-200"
          />
        </div>

        {/* Category Filter */}
        <div className="relative">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full py-3 px-4 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-[#5885fa] focus:ring-1 focus:ring-[#5885fa] transition-all duration-200 appearance-none cursor-pointer"
          >
            {allCategories.map((category) => (
              <option key={category} value={category} className="bg-slate-900 text-slate-100">
                {category}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 items-center">
          {allTags.slice(0, 6).map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(selectedTag === tag ? '' : tag)}
              className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full transition-all duration-200 border ${
                selectedTag === tag
                  ? 'bg-[#5885fa] text-white border-[#5885fa]'
                  : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-100'
              }`}
            >
              #{tag}
            </button>
          ))}
          {(searchQuery || selectedCategory !== 'Všechny' || selectedTag) && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('Všechny');
                setSelectedTag('');
              }}
              className="text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-all duration-200"
            >
              Reset
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function BlogPage() {
  const [showRegister, setShowRegister] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Všechny');
  const [selectedTag, setSelectedTag] = useState('');
  const [filteredArticles, setFilteredArticles] = useState(mockArticles);

  // Filter articles based on search and filters
  useEffect(() => {
    let filtered = mockArticles;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Category filter
    if (selectedCategory && selectedCategory !== 'Všechny') {
      filtered = filtered.filter(article => article.category === selectedCategory);
    }

    // Tag filter
    if (selectedTag) {
      filtered = filtered.filter(article => article.tags.includes(selectedTag));
    }

    setFilteredArticles(filtered);
  }, [searchQuery, selectedCategory, selectedTag]);

  const featuredArticles = filteredArticles.filter(article => article.featured);
  const regularArticles = filteredArticles.filter(article => !article.featured);

  return (
    <main className="bg-[#020617] text-slate-100 overflow-hidden">
      {/* Hero Section */}
      <section className="relative border-b border-slate-800 pt-20 pb-24 lg:pt-32 lg:pb-40">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[500px] bg-[#5885fa]/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="page-container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left */}
            <div className="text-center lg:text-left">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-100 mb-6 leading-[1.1]">
                Náš <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5885fa] to-[#eef3fe]">blog</span>
              </h1>
              <p className="text-lg sm:text-xl text-slate-400 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Objevte nejnovější trendy, tipy a poznatky ze světa digitálních technologií. 
                Praktické návody a odborné články od našich expertů.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button variant="primary" size="lg" onClick={() => document.getElementById('articles')?.scrollIntoView({ behavior: 'smooth' })}>Číst články</Button>
                <Button variant="outline" size="lg" onClick={() => setShowRegister(true)}>Odebírat newsletter</Button>
              </div>
            </div>

            {/* Right - Visual */}
            <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
              <div className="relative rounded-xl bg-slate-900/50 border border-slate-800 shadow-2xl overflow-hidden p-8 rotate-3 hover:rotate-0 transition-transform duration-500">
                 <div className="flex items-center gap-4 mb-6 border-b border-slate-800 pb-4">
                    <div className="w-12 h-12 rounded-full bg-[#5885fa]/20 flex items-center justify-center">
                      <PenLine className="w-6 h-6 text-[#5885fa]" />
                    </div>
                    <div>
                       <div className="text-slate-100 font-bold text-lg">Nový článek</div>
                       <div className="text-slate-400 text-sm">Právě publikováno</div>
                    </div>
                 </div>
                 <div className="space-y-4">
                    <div className="h-4 bg-slate-800 rounded w-3/4"></div>
                    <div className="h-4 bg-slate-800 rounded w-full"></div>
                    <div className="h-4 bg-slate-800 rounded w-5/6"></div>
                    <div className="h-32 bg-slate-800/50 rounded w-full mt-4 border border-slate-800 flex items-center justify-center text-slate-600">
                       Cover Image
                    </div>
                 </div>
              </div>
              <div className="absolute -z-10 top-10 -right-10 w-40 h-40 bg-[#5885fa]/20 blur-3xl rounded-full" />
              <div className="absolute -z-10 -bottom-10 -left-10 w-40 h-40 bg-[#5885fa]/20 blur-3xl rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="border-b border-slate-800 bg-[#020617]" id="articles">
        <div className="page-container py-12">
          <BlogFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedTag={selectedTag}
            setSelectedTag={setSelectedTag}
          />
        </div>
      </section>

      {/* Featured Articles */}
      {featuredArticles.length > 0 && (
        <section className="border-b border-slate-800">
          <div className="page-container py-20">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold text-slate-100 mb-4">Doporučené články</h2>
              <p className="text-slate-400">To nejlepší z naší tvorby, co by vám nemělo uniknout.</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredArticles.map((article) => (
                <BlogCard key={article.id} article={article} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Articles */}
      <section className="border-b border-slate-800 bg-[#020617]">
        <div className="page-container py-20">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-100 mb-4">
              {featuredArticles.length > 0 ? 'Všechny články' : 'Naše články'}
            </h2>
            <p className="text-slate-400">
              {filteredArticles.length === 0 
                ? 'Žádné články neodpovídají vašim filtrům.' 
                : `Zobrazeno ${filteredArticles.length} článků`
            }
            </p>
          </div>

          {filteredArticles.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(featuredArticles.length > 0 ? regularArticles : filteredArticles).map((article) => (
                <BlogCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-slate-900/50 rounded-2xl border border-slate-800">
              <FileText className="w-16 h-16 text-[#5885fa] mx-auto mb-6" />
              <h3 className="text-xl font-bold text-slate-100 mb-2">Žádné články nenalezeny</h3>
              <p className="text-slate-400 mb-8">Zkuste upravit vyhledávací kritéria nebo procházet všechny kategorie.</p>
              <Button
                variant="primary"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('Všechny');
                  setSelectedTag('');
                }}
              >
                Zobrazit všechny články
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-24">
        <div className="page-container text-center">
          <div className="bg-slate-900/50 rounded-3xl p-12 border border-slate-800 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#5885fa] via-[#5885fa] to-[#5885fa]" />
            
            <h2 className="text-3xl font-bold text-slate-100 mb-6">
              Nezmeškejte žádný článek
            </h2>
            <p className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              Přihlaste se k odběru našeho newsletteru a dostávejte nejnovější články, 
              tipy a novinky přímo do vaší e-mailové schránky.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Vaše e-mailová adresa..."
                className="flex-1 px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#5885fa] focus:ring-1 focus:ring-[#5885fa] transition-all duration-200"
              />
              <Button
                variant="primary"
                onClick={() => setShowRegister(true)}
              >
                Odebírat
              </Button>
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
