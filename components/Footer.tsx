"use client";

import { useState } from "react";
import Link from "next/link";
import RegisterPanel from "./RegisterPanel";

// Firemní údaje
const COMPANY = {
	name: "MESCON DIGITAL s.r.o.",
	ico: "23580763",
	dic: "CZ23580763",
	seat: "Fibichova 1141/2, 779 00 Olomouc 9",
	registry: "",
	email: "info@mescon.cz",
	phone: "+420 722 171 131",
	address: "Fibichova 1141/2, 779 00 Olomouc 9",
};

export default function Footer() {
	const [openRegister, setOpenRegister] = useState(false);

	return (
		<footer className="relative mt-24 border-t border-slate-800/70 bg-[#020617]">
			{/* CTA nad footrem */}
			<section className="relative -mt-16 mb-10">
				<div className="page-container">
					<div className="relative overflow-hidden rounded-2xl border border-slate-800/70 bg-gradient-to-br from-[#0a0f1f] to-[#070c1a] p-6 md:p-10 shadow-2xl">
						<div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[#5885fa]/10 blur-3xl" />
						<div className="grid md:grid-cols-2 gap-6 md:gap-10 items-center relative z-10">
							<div>
								<p className="text-[12px] tracking-wider text-[#5885fa] font-semibold uppercase mb-2">Partnerství</p>
								<h3 className="text-2xl md:text-3xl font-bold tracking-tight leading-tight text-white">Spolupráce pro firmy, které chtějí růst</h3>
								<p className="mt-3 text-sm text-slate-300 leading-relaxed max-w-prose">
									Hledáme partnery s technickým zázemím a vizí. Společně můžeme dosáhnout více.
								</p>
							</div>
							<div className="flex md:justify-end">
								<button
									onClick={() => setOpenRegister(true)}
									className="group relative overflow-hidden focus-ring rounded-lg bg-[#5885fa] px-8 py-4 text-sm font-bold text-white shadow-lg shadow-blue-900/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5885fa] transition-all duration-200 hover:bg-[#406ee0] hover:scale-[1.02] active:scale-[0.98]"
								>
									<span className="relative z-10">Začít spolupráci</span>
									{/* Glow overlay */}
									<span aria-hidden className="pointer-events-none absolute inset-0 bg-white/10 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
								</button>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Hlavní patička */}
			<div className="relative py-12 md:py-16">
				<div className="page-container">
					<div className="grid gap-10 md:gap-12 lg:grid-cols-4">
						{/* Informace o společnosti */}
						<div className="space-y-6">
							<div className="flex flex-col items-start gap-4">
								<img src="https://web2.itnahodinu.cz/mescon/images/logo.svg" alt="MESCON Logo" className="h-9 w-auto" />
								<p className="text-sm text-slate-400 leading-relaxed">
									Lídr v oblasti digitální transformace a vývoje softwaru na míru. Pomáháme firmám inovovat a růst.
								</p>
							</div>
							<ul className="text-sm text-slate-300 space-y-2">
								<li className="flex gap-2"><span className="text-slate-500 w-10">IČO:</span> {COMPANY.ico}</li>
								<li className="flex gap-2"><span className="text-slate-500 w-10">DIČ:</span> {COMPANY.dic}</li>
								<li className="flex gap-2"><span className="text-slate-500 w-10">Sídlo:</span> {COMPANY.seat}</li>
							</ul>
						</div>

						{/* Služby (pro Sitelinks) */}
						<div>
							<h4 className="text-white font-bold tracking-tight mb-4">Služby</h4>
							<ul className="text-sm text-slate-400 space-y-2">
								<li><Link href="/subpages/webova-aplikace" className="hover:text-[#5885fa] transition-colors">Vývoj webových aplikací</Link></li>
								<li><Link href="/subpages/e-shop" className="hover:text-[#5885fa] transition-colors">E-shopová řešení</Link></li>
								<li><Link href="/subpages/crm" className="hover:text-[#5885fa] transition-colors">CRM systémy</Link></li>
								<li><Link href="/subpages/marketing-ai" className="hover:text-[#5885fa] transition-colors">AI Marketing</Link></li>
								<li><Link href="/subpages/prezentacni-web" className="hover:text-[#5885fa] transition-colors">Prezentační weby</Link></li>
								<li><Link href="/subpages/graficky-design" className="hover:text-[#5885fa] transition-colors">Grafický design</Link></li>
							</ul>
						</div>

						{/* Společnost */}
						<div>
							<h4 className="text-white font-bold tracking-tight mb-4">Společnost</h4>
							<ul className="text-sm text-slate-400 space-y-2">
								<li><Link href="/subpages/o-nas" className="hover:text-[#5885fa] transition-colors">O nás</Link></li>
								<li><Link href="/subpages/kariera" className="hover:text-[#5885fa] transition-colors">Kariéra</Link></li>
								<li><Link href="/blog" className="hover:text-[#5885fa] transition-colors">Blog</Link></li>
								<li><Link href="/subpages/reference" className="hover:text-[#5885fa] transition-colors">Reference</Link></li>
								<li><Link href="/subpages/partneri" className="hover:text-[#5885fa] transition-colors">Partneři</Link></li>
								<li><Link href="/subpages/podpora" className="hover:text-[#5885fa] transition-colors">Podpora</Link></li>
							</ul>
						</div>

						{/* Kontakt */}
						<div>
							<h4 className="text-white font-bold tracking-tight mb-4">Kontakt</h4>
							<ul className="text-sm text-slate-400 space-y-3">
								<li>
									<a href={`mailto:${COMPANY.email}`} className="block hover:text-white transition-colors text-slate-300 font-medium">{COMPANY.email}</a>
									<span className="text-xs text-slate-500">Napište nám kdykoliv</span>
								</li>
								<li>
									<a href={`tel:${COMPANY.phone.replace(/\s/g, '')}`} className="block hover:text-white transition-colors text-slate-300 font-medium">{COMPANY.phone}</a>
									<span className="text-xs text-slate-500">Po-Pá 8:00 - 17:00</span>
								</li>
								<li className="pt-2">
									<a
										href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(COMPANY.seat)}`}
										target="_blank"
										rel="noopener noreferrer"
										className="inline-flex items-center gap-2 text-xs font-semibold text-[#5885fa] hover:text-[#799dfb] transition-colors uppercase tracking-wide"
									>
										Zobrazit na mapě <span aria-hidden>→</span>
									</a>
								</li>
							</ul>
						</div>
					</div>

					{/* Spodní lišta */}
					<div className="mt-16 pt-8 border-t border-slate-800/60 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
						<div>© {new Date().getFullYear()} {COMPANY.name} Všechna práva vyhrazena.</div>
						<div className="flex flex-wrap justify-center gap-6">
							<Link href="/subpages/obchodni-podminky" className="hover:text-slate-300 transition-colors">Obchodní podmínky</Link>
							<Link href="/subpages/gdpr" className="hover:text-slate-300 transition-colors">Ochrana osobních údajů (GDPR)</Link>
							<Link href="/subpages/security" className="hover:text-slate-300 transition-colors">Security</Link>
						</div>
					</div>
				</div>
			</div>

			{/* Registrace/poptávka napojená na CTA */}
			<RegisterPanel open={openRegister} onClose={() => setOpenRegister(false)} />
		</footer>
	);
}
