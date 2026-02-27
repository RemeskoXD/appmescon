"use client";
import { useState } from 'react';
import { Rocket, Star, Trophy, Users, Briefcase, Handshake } from 'lucide-react';
import Button from '../../../components/ui/Button';
import RegisterPanel from '../../../components/RegisterPanel';

// Statická data pro reference na této podstránce
const referenceTestimonials = [
  {
    name: 'Tomáš Duraj',
    role: 'Majitel, GTAuta',
    website: 'https://www.gtauta.cz',
    photo: 'https://web2.itnahodinu.cz/mescon/images/fotky_recenzi/1.svg',
    text: 'Společnost, která webové stránky realizovala, si zaslouží pochvalu za profesionalitu, kreativní přístup a rychlost práce. Tým prokázal vysokou odbornost a schopnost naslouchat potřebám klienta. Proces vývoje byl transparentní a efektivní, což vedlo ke kvalitnímu výsledku splňujícímu moderní standardy. Výsledný web je přehledný, funkční a uživatelsky přívětivý. Spolupráci mohu jednoznačně doporučit jako spolehlivého partnera pro tvorbu webových stránek.',
  },
  {
    name: 'Vitaly Pron',
    role: 'Předseda správní rady, Future for Ukraine',
    website: 'https://www.futureforukraine.cz',
    photo: 'https://web2.itnahodinu.cz/mescon/images/fotky_recenzi/2.svg',
    text: 'Měl jsem tu čest spolupracovat s týmem, který vytvořil web futureforukraine. Od prvního kontaktu byla spolupráce profesionální a rychlá. Oceňuji jejich schopnost naslouchat našim potřebám a převést je do moderního designu. Web je uživatelsky přívětivý a plně responzivní. Tým nás průběžně informoval o postupu, takže jsme měli přehled o projektu. Mohu je jen doporučit každému, kdo hledá kvalitní webové řešení.',
  },
  {
    name: 'Světlana Kubelková',
    role: 'Head of office, Aegea Holdings',
    website: 'https://www.aegeaholdings.com',
    photo: 'https://web2.itnahodinu.cz/mescon/images/fotky_recenzi/3.svg',
    text: 'Se společností MESCON jsme byli maximálně spokojeni. Logo pro Aegea Holdings dokonale vystihuje naši vizi – moderní, elegantní a profesionální design. Webové stránky jsou přehledné, funkční a skvěle reprezentují naši značku. Skvělá spolupráce s týmem, který vždy rychle reagoval na naše potřeby. Určitě doporučujeme!',
  },
  {
    name: 'Tomáš Zvelebil',
    role: 'Jednatel společnosti, Subscribe s.r.o.',
    photo: 'https://web2.itnahodinu.cz/mescon/images/fotky_recenzi/4.svg',
    text: 'Spolupráce s Mescon Digital byla velmi profesionální. Realizovali pro nás webové stránky pro projekt Pokecccamp. Díky expresnímu dodání a funkčnímu řešení se podařilo plně obsadit všechny termíny kempu. Oceňuji hlavně rychlost, komunikaci a tah na výsledek. Velkým přínosem byla také schopnost rychle reagovat na změny a přizpůsobit řešení našim potřebám. Mescon mohu jednoznačně doporučit.',
  },
  {
    name: 'Antonín Kaška',
    role: 'Herec, Divadlo J.K.Tyla',
    photo: 'https://web2.itnahodinu.cz/mescon/images/fotky_recenzi/5.svg',
    text: 'Občas odpovím na email, který mi dorazí ohledně výroby webových stránek. Většinou je posílají mladí kluci, kteří na to ani nemají nebo firmy, které pak chtějí několikanásobně víc peněz, než slibovali. Tentokrát to bylo jiné. A výsledky také. To, co kluci udělali, chválili i profesionální grafici. Byl jsem maximálně spokojen.Děkuji, pánové, perfektní práce!',
  },
];

export default function ReferencePage() {
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
                Naše <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5885fa] to-[#eef3fe]">reference</span>
              </h1>
              <p className="text-lg sm:text-xl text-slate-300 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Úspěšné projekty, spokojení klienti a měřitelné výsledky. Podívejte se, jak pomáháme firmám 
                růst a dosahovat svých cílů v digitálním světě.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button variant="primary" size="lg" onClick={() => setShowRegister(true)}>Přidat se mezi klienty</Button>
                <Button variant="outline" size="lg" onClick={() => document.getElementById('testimonials')?.scrollIntoView({ behavior: 'smooth' })}>Zobrazit reference</Button>
              </div>
            </div>

            {/* Right - Visual */}
            <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
              <div className="relative rounded-xl bg-[#0f1420] border border-slate-800 shadow-2xl overflow-hidden p-8">
                 <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#1e2334] p-4 rounded-lg border border-slate-700 flex flex-col items-center justify-center aspect-square">
                       <div className="mb-2 text-[#acc2fc]"><Rocket className="w-7 h-7" /></div>
                       <div className="text-2xl font-bold text-white">+340%</div>
                       <div className="text-xs text-slate-400">Růst tržeb</div>
                    </div>
                    <div className="bg-[#1e2334] p-4 rounded-lg border border-slate-700 flex flex-col items-center justify-center aspect-square">
                       <div className="mb-2 text-[#acc2fc]"><Users className="w-7 h-7" /></div>
                       <div className="text-2xl font-bold text-white">150+</div>
                       <div className="text-xs text-slate-400">Klientů</div>
                    </div>
                    <div className="bg-[#1e2334] p-4 rounded-lg border border-slate-700 flex flex-col items-center justify-center aspect-square">
                       <div className="mb-2 text-[#acc2fc]"><Star className="w-7 h-7" /></div>
                       <div className="text-2xl font-bold text-white">5.0</div>
                       <div className="text-xs text-slate-400">Hodnocení</div>
                    </div>
                    <div className="bg-[#5885fa]/10 p-4 rounded-lg border border-[#5885fa]/20 flex flex-col items-center justify-center aspect-square">
                       <div className="mb-2 text-[#5885fa]"><Trophy className="w-7 h-7" /></div>
                       <div className="text-2xl font-bold text-[#5885fa]">TOP</div>
                       <div className="text-xs text-[#5885fa]/80">Agentura</div>
                    </div>
                 </div>
              </div>
              <div className="absolute -z-10 top-10 -right-10 w-40 h-40 bg-[#5885fa]/20 blur-3xl rounded-full" />
              <div className="absolute -z-10 -bottom-10 -left-10 w-40 h-40 bg-[#5885fa]/20 blur-3xl rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Reference klientů – statické bloky */}
      <section className="border-b border-slate-800/60 bg-[#030712]" id="testimonials">
        <div className="page-container py-20">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#5885fa] mb-3">Reference</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Zkušenosti klientů z dlouhodobé spolupráce</h2>
            <p className="text-slate-400">Vybrané příběhy firem, se kterými dlouhodobě stavíme funkční digitální ekosystémy.</p>
          </div>

          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {referenceTestimonials.map((item, index) => (
              <div
                key={index}
                className="relative bg-[#0f1420] rounded-2xl p-8 border border-slate-800 hover:border-[#5885fa]/40 transition-colors h-full flex flex-col"
              >
                <div className="absolute top-6 right-8 text-5xl text-[#5885fa]/10 font-serif">"</div>

                <div className="mb-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    {'photo' in item && item.photo ? (
                      <div className="w-12 h-12 rounded-full bg-[#0b1024] border border-[#5885fa]/25 overflow-hidden flex items-center justify-center">
                        <img src={item.photo} alt={item.name} className="h-full w-full object-cover" loading="lazy" />
                      </div>
                    ) : null}

                    <div>
                      <h3 className="text-lg font-semibold text-white">{item.name}</h3>
                      <p className="text-sm text-slate-400">{item.role}</p>
                      {'website' in item && item.website && (
                        <a
                          href={item.website}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-1 block text-sm text-slate-400 hover:text-slate-200 underline decoration-slate-600 underline-offset-4"
                        >
                          {item.website.replace(/^https?:\/\//, '')}
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="hidden sm:flex items-center gap-1 text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400" />
                    ))}
                  </div>
                </div>

                <p className="text-slate-200 leading-relaxed relative z-10 mt-2">
                  "{item.text}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statická sekce - Naše úspěchy */}
      <section className="border-b border-slate-800/60">
        <div className="page-container py-20">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Naše úspěchy</h2>
            <p className="text-slate-400">Měřitelné výsledky, které hovoří za nás.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            <div className="bg-[#0f1420] rounded-2xl p-6 border border-slate-800 text-center flex flex-col items-center hover:border-[#5885fa]/30 transition-colors group">
              <div className="mb-4 text-[#acc2fc] group-hover:scale-110 transition-transform duration-300"><Rocket className="w-8 h-8" /></div>
              <div className="text-3xl font-bold text-white mb-1">200+</div>
              <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-4">Dokončených projektů</div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#acc2fc] to-[#5885fa] rounded-full" style={{width: '80%'}}></div>
              </div>
            </div>

            <div className="bg-[#0f1420] rounded-2xl p-6 border border-slate-800 text-center flex flex-col items-center hover:border-[#5885fa]/30 transition-colors group">
              <div className="mb-4 text-[#acc2fc] group-hover:scale-110 transition-transform duration-300"><Star className="w-8 h-8" /></div>
              <div className="text-3xl font-bold text-white mb-1">100%</div>
              <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-4">Spokojenost klientů</div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full" style={{width: '100%'}}></div>
              </div>
            </div>

            <div className="bg-[#0f1420] rounded-2xl p-6 border border-slate-800 text-center flex flex-col items-center hover:border-[#5885fa]/30 transition-colors group">
              <div className="mb-4 text-[#acc2fc] group-hover:scale-110 transition-transform duration-300"><Briefcase className="w-8 h-8" /></div>
              <div className="text-3xl font-bold text-white mb-1">10+</div>
              <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-4">Let zkušeností</div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#799dfb] to-cyan-400 rounded-full" style={{width: '50%'}}></div>
              </div>
            </div>

            <div className="bg-[#0f1420] rounded-2xl p-6 border border-slate-800 text-center flex flex-col items-center hover:border-[#5885fa]/30 transition-colors group">
              <div className="mb-4 text-[#acc2fc] group-hover:scale-110 transition-transform duration-300"><Handshake className="w-8 h-8" /></div>
              <div className="text-3xl font-bold text-white mb-1">150+</div>
              <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-4">Aktivních klientů</div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-green-400 to-emerald-400 rounded-full" style={{width: '60%'}}></div>
              </div>
            </div>

            <div className="bg-[#0f1420] rounded-2xl p-6 border border-slate-800 text-center flex flex-col items-center hover:border-[#5885fa]/30 transition-colors group">
              <div className="mb-4 text-[#acc2fc] group-hover:scale-110 transition-transform duration-300"><Trophy className="w-8 h-8" /></div>
              <div className="text-3xl font-bold text-white mb-1">25+</div>
              <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-4">Získaných ocenění</div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-orange-400 to-amber-500 rounded-full" style={{width: '30%'}}></div>
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
