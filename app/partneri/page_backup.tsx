"use client";

import { useState } from "react";
import RegisterPanel from "../../components/RegisterPanel";

// Použijeme konkrétní loga z "partner_badget" 10–15
const partners = [10, 11, 12, 13, 14, 15];

// Ceníky a builder jsou na službových podstránkách; tato stránka je informační vstup s CTA na registraci.

export default function PartneriPage() {
  const [openRegister, setOpenRegister] = useState(false);

  return (
    <main className="relative">
      {/* Hero sekce */}
      <section className="page-container py-10 md:py-16 grid gap-10 md:grid-cols-2 items-center">
        {/* Levý textový blok */}
        <div>
          <p className="text-[12px] tracking-wider text-accent-300 font-semibold uppercase mb-3">Partneři</p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-white">Staňte se partnerem Mescon</h1>
          <h2 className="mt-3 text-lg md:text-xl text-slate-200 font-medium">Společná transformace zákaznické zkušenosti</h2>
          <p className="mt-4 text-slate-300 leading-relaxed max-w-prose">
            Věříme v sílu spolupráce. Naše programy jsou navrženy tak, aby odemykaly nové růstové příležitosti.
            Rozšiřte své služby a zvyšte svou konkurenční výhodu. Prozkoumejte možnosti níže a najděte nejlepší řešení pro vaše podnikání.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => setOpenRegister(true)}
              className="group relative overflow-hidden focus-ring rounded-lg bg-accent-500 px-5 py-3 text-sm font-semibold text-white shadow-inner shadow-black/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span className="relative z-10">Chci se stát partnerem</span>
              <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-white/10 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
            </button>
          </div>
        </div>

        {/* Pravý obrazový blok – mapa/globus s „piny“ */}
        <div className="relative mx-auto flex items-center justify-center">
          <div className="relative">
            <img
              src="/images/globe.svg"
              alt="Síť partnerů po celém světě"
              className="w-[340px] h-auto md:w-[480px] drop-shadow-[0_40px_80px_rgba(0,0,0,.35)] opacity-95"
              width={480}
              height={480}
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
            {/* Simulované piny – dekorativní */}
            <span className="absolute left-[22%] top-[38%] h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_0_6px_rgba(16,185,129,.15)]" aria-hidden="true" />
            <span className="absolute left-[58%] top-[28%] h-2 w-2 rounded-full bg-[#8aaafc] shadow-[0_0_0_6px_rgba(217,70,239,.15)]" aria-hidden="true" />
            <span className="absolute left-[68%] top-[44%] h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_0_6px_rgba(34,211,238,.15)]" aria-hidden="true" />
            <span className="absolute left-[34%] top-[56%] h-2 w-2 rounded-full bg-[#799dfb] shadow-[0_0_0_6px_rgba(88,133,250,.15)]" aria-hidden="true" />
          </div>
          <span className="pointer-events-none absolute -inset-6 -z-10 rounded-[28px] bg-gradient-to-tr from-[#5885fa]/10 via-[#5885fa]/10 to-cyan-400/10 blur-2xl" aria-hidden="true" />
        </div>
      </section>

      {/* Metriky */}
      <section className="page-container px-6 md:px-10 pb-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {[
            { v: '5', l: 'let zkušeností' },
            { v: '160+', l: 'zákazníků' },
            { v: '15', l: 'zemí' },
            { v: '200', l: 'profesionálů' },
            { v: '30%', l: 'meziroční růst' },
          ].map((m) => (
            <div key={m.l} className="rounded-xl border border-[#23283a] bg-[#0f1422]/50 p-4 text-center">
              <div className="text-2xl md:text-3xl font-semibold text-white">{m.v}</div>
              <div className="text-[12px] uppercase tracking-wider text-slate-400">{m.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Marquee – loga partnerů (v kontejneru s gradientovým fade) */}
      <section className="relative py-8">
        <div className="page-container px-6 md:px-10">
          <div className="relative overflow-hidden rounded-xl border border-[#23283a] bg-[#10131d]/60 backdrop-blur-sm partner-rail">
            <span className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-24 bg-gradient-to-r from-[#0c0e16] via-[#0c0e16]/50 to-transparent" />
            <span className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-24 bg-gradient-to-l from-[#0c0e16] via-[#0c0e16]/50 to-transparent" />
            <div className="flex gap-10 animate-partner-marquee will-change-transform py-5 pl-6">
              {/* sekvence 1 */}
              {partners.map((n) => (
                <img key={`s1-${n}`} src={`/images/partner_badget/${n}.svg`} alt={`Logo partnera ${n}`} className="h-14 sm:h-16 md:h-20 w-auto opacity-95" />
              ))}
              {/* sekvence 2 */}
              {partners.map((n) => (
                <img key={`s2-${n}`} src={`/images/partner_badget/${n}.svg`} alt="" aria-hidden="true" className="h-14 sm:h-16 md:h-20 w-auto opacity-95" />
              ))}
              {/* sekvence 3 */}
              {partners.map((n) => (
                <img key={`s3-${n}`} src={`/images/partner_badget/${n}.svg`} alt="" aria-hidden="true" className="h-14 sm:h-16 md:h-20 w-auto opacity-95" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Programy partnerství */}
      <section className="page-container px-6 md:px-10 py-12">
        <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-white text-center mb-2">Vyberte si partnerský program, na míru</h3>
        <p className="text-center text-slate-300 max-w-3xl mx-auto">Objevte flexibilní programy. Vyberte si roli, která nejlépe odpovídá vašemu modelu – od doporučení až po plnou distribuci produktů.</p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {["Affiliate","Reseller","Distributor"].map((kind) => (
            <div key={kind} className="relative rounded-2xl border border-[#23283a] bg-gradient-to-br from-[#0f1422]/80 to-[#0b0f1a]/80 p-6">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-accent-500/15 border border-accent-500/30">
                  <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-accent-300">
                    <path d="M12 2a10 10 0 1 0 .001 20.001A10 10 0 0 0 12 2Zm1 14h-2v-4H7v-2h4V6h2v4h4v2h-4v4Z" />
                  </svg>
                </span>
                <h4 className="text-white text-xl font-semibold">{kind}</h4>
              </div>
              <div className="mt-4 grid gap-3 text-sm text-slate-300">
                <div>
                  <div className="text-slate-400 text-[12px] uppercase tracking-wider">Co děláte</div>
                  <p className="mt-1">{kind === 'Affiliate' ? 'Doporučujete naše produkty potenciálním zákazníkům.' : kind === 'Reseller' ? 'Aktivně prodáváte a podporujete řešení svým zákazníkům.' : 'Distribuujete řešení prostřednictvím sítě prodejců/kanálů.'}</p>
                </div>
                <div>
                  <div className="text-slate-400 text-[12px] uppercase tracking-wider">Vaše role</div>
                  <p className="mt-1">{kind === 'Affiliate' ? 'Bez povinností přímého prodeje či podpory.' : kind === 'Reseller' ? 'Správa licencí a podpora první linie.' : 'Zajištění pokrytí trhu, technická podpora a vztahy.'}</p>
                </div>
                <div>
                  <div className="text-slate-400 text-[12px] uppercase tracking-wider">Benefity</div>
                  <p className="mt-1">{kind === 'Affiliate' ? 'Provize z doporučených obchodů.' : kind === 'Reseller' ? 'Marže dle partnerské úrovně.' : 'Velkoobchodní ceny a rozšířená podpora.'}</p>
                </div>
              </div>
              <div className="mt-5">
                <button onClick={() => setOpenRegister(true)} className="rounded-lg bg-white text-navy-900 px-4 py-2 text-sm font-semibold hover:bg-slate-100">Staňte se {kind.toLowerCase()}</button>
              </div>
              <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-[#5885fa]/5 via-transparent to-[#5885fa]/5" />
            </div>
          ))}
        </div>
      </section>

      {/* Produkt – přehled schopností */}
      <section className="page-container px-6 md:px-10 pb-12">
        <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-white text-center">Náš produkt pomáhá utvářet zákaznickou zkušenost</h3>
        <p className="text-center text-slate-300 mt-2">All‑in‑one řešení pro veškerou komunikaci se zákazníky</p>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {[
            ['Cloudová telefonie','Pro hovory v kanceláři i na cestách'],
            ['Jakékoli zařízení','Web, mobilní i desktopová aplikace'],
            ['Snadná integrace','REST API a SDKs'],
            ['Omnichannel','Hovory, chat, SMS, sociální sítě'],
            ['Vlastní AI','Automatizace botů jako součást řešení'],
            ['Analytika','Přehledy, reporting a KPI'],
          ].map(([title,desc]) => (
            <div key={title} className="rounded-xl border border-[#23283a] bg-[#0f1422]/50 p-5">
              <div className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#5885fa]/15 border border-[#799dfb]/30">
                  <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-[#acc2fc]"><path d="M4 6h16v2H4V6Zm0 5h16v2H4v-2Zm0 5h16v2H4v-2Z"/></svg>
                </span>
                <div>
                  <h4 className="text-white font-semibold">{title}</h4>
                  <p className="mt-1 text-slate-300 text-sm">{desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Výhody být partnerem */}
      <section className="page-container px-6 md:px-10 pb-12">
        <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-white text-center">Jaké jsou výhody být naším partnerem?</h3>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
          {[
            'Rozšiřte své podnikání o nové zdroje příjmů',
            'Rozšiřte své portfolio a konkurenční výhodu',
            'Oslovte nové trhy a zákaznické segmenty',
            'Posilte vztahy se zákazníky',
            'Partnerství s plnou podporou a jistotou',
            'Získejte výhodu díky inteligentní automatizaci',
          ].map((t,i)=>(
            <div key={t} className="rounded-xl border border-[#23283a] bg-[#0f1422]/50 p-5">
              <div className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/15 border border-emerald-400/30">
                  <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4 fill-emerald-300"><path d="M16.7 5.3a1 1 0 0 1 0 1.4l-7 7a1 1 0 0 1-1.4 0l-3-3a1 1 0 1 1 1.4-1.4l2.3 2.29 6.3-6.29a1 1 0 0 1 1.4 0Z"/></svg>
                </span>
                <div>
                  <h4 className="text-white font-semibold">{t}</h4>
                  <p className="mt-1 text-slate-300 text-sm">{i===0?'Vytvořte si příjmové kanály dle zapojení – od doporučení po distribuci.': i===1?'Posilte nabídku pomocí výkonného CCaaS řešení.': i===2?'Pronikejte do nových odvětví s omnichannel nástroji a AI.': i===3?'Nabídněte moderní řešení pro větší spokojenost a loajalitu.': i===4?'Získáte partner manažera, školení, materiály i obchodní podporu.':'Zvyšte efektivitu a snižte náklady díky automatizaci a AI.'}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Kdo je koncový zákazník? */}
      <section className="page-container px-6 md:px-10 pb-12">
        <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-white text-center">Kdo je koncový zákazník?</h3>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            ['Má vlastní zákaznickou péči','Interní tým pro přímou komunikaci se zákazníky.'],
            ['Minimálně 3 agenti','Tým o alespoň třech operátorech.'],
            ['Jakékoli odvětví','Flexibilita a přizpůsobivost je klíčová.'],
          ].map(([title,desc]) => (
            <div key={title} className="rounded-xl border border-[#23283a] bg-[#0f1422]/50 p-5 text-center">
              <div className="mx-auto mb-2 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-accent-500/15 border border-accent-500/30">
                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-accent-300"><path d="M12 12a5 5 0 1 0-.001-10.001A5 5 0 0 0 12 12Zm-7 9a7 7 0 0 1 14 0v1H5v-1Z"/></svg>
              </div>
              <h4 className="text-white font-semibold">{title}</h4>
              <p className="mt-1 text-slate-300 text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Jak začít? */}
      <section className="page-container px-6 md:px-10 pb-12">
        <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-white text-center">Jak začít?</h3>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            ['1','Spojte se s námi a podepište partnerskou smlouvu'],
            ['2','Získejte školení a přístup k nástrojům'],
            ['3','Nabízejte řešení svým klientům a čerpejte odměny'],
          ].map(([n,txt]) => (
            <div key={n} className="rounded-xl border border-[#23283a] bg-[#0f1422]/50 p-5">
              <div className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white font-semibold">{n}</span>
                <p className="text-slate-300">{txt}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Podpora pro partnery */}
      <section className="page-container px-6 md:px-10 pb-16">
        <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-white text-center">Jak podporujeme naše partnery</h3>
        <p className="text-center text-slate-300 mt-2">Od prvního dne poskytujeme skutečnou podporu a zdroje.</p>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {[
            'Dedikovaný partner manažer',
            'Nástroje pro podporu prodeje',
            'Společný marketing',
            'Školení a certifikace',
            'Programová podpora (registrace obchodů)',
            'Harmonogram implementace',
          ].map((t) => (
            <div key={t} className="rounded-xl border border-[#23283a] bg-[#0f1422]/50 p-5">
              <div className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-500/15 border border-cyan-400/30">
                  <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-cyan-300"><path d="M12 2 2 7l10 5 10-5-10-5Zm0 7L2 4v13l10 5 10-5V4l-10 5Z"/></svg>
                </span>
                <div>
                  <h4 className="text-white font-semibold">{t}</h4>
                  <p className="mt-1 text-slate-300 text-sm">Podpora, enablement a materiály pro urychlení obchodu.</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <button onClick={() => setOpenRegister(true)} className="rounded-lg bg-accent-500 hover:bg-accent-500/90 px-6 py-3 text-sm font-semibold text-white shadow-inner shadow-black/40">Chci se stát partnerem</button>
        </div>
      </section>

  {/* Modal: registrace */}
  <RegisterPanel open={openRegister} onClose={() => setOpenRegister(false)} />
    </main>
  );
}
