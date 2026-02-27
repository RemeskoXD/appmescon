"use client";

import { motion } from "framer-motion";
import { ArrowRight, Globe, Handshake, ShieldCheck, TrendingUp } from "lucide-react";

// Local animation variants (simple, reusable)
const fadeUp = {
	hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
	show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.25, 0.46, 0.24, 1] } }
};

const slideIn = {
	hidden: { opacity: 0, x: -24 },
	show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.24, 1] } }
};

const blurIn = {
	hidden: { opacity: 0, filter: "blur(12px)" },
	show: { opacity: 1, filter: "blur(0px)", transition: { duration: 0.7 } }
};

export default function PartnerstviPage() {
	return (
		<main className="min-h-screen bg-slate-900 text-gray-100">
			{/* Hero */}
			<motion.section
				initial="hidden"
				animate="show"
				variants={blurIn}
				className="relative min-h-[88vh] flex items-center justify-center overflow-hidden"
			>
				{/* Gradient background with subtle particles */}
				<div className="pointer-events-none absolute inset-0">
					<div className="absolute inset-0 bg-gradient-to-br from-[#5885fa]/25 to-[#5885fa]/10" />
					<div className="absolute -top-24 -left-24 size-[26rem] rounded-full bg-[#5885fa]/20 blur-3xl" />
					<div className="absolute -bottom-24 -right-16 size-[22rem] rounded-full bg-[#799dfb]/15 blur-3xl" />
					<div className="absolute inset-0 [mask-image:radial-gradient(circle_at_center,white,transparent_70%)] bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:28px_28px] opacity-20" />
				</div>

				<div className="relative z-10 w-full max-w-5xl px-6 text-center">
					<motion.h1
						variants={fadeUp}
						className="text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-[#799dfb] to-[#acc2fc] bg-clip-text text-transparent"
					>
						Partnerství
					</motion.h1>
					<motion.p variants={fadeUp} className="mt-5 max-w-2xl mx-auto text-slate-300">
						{/* zachování textu: žádný původní obsah k úpravě, ponechán stručný popis */}
					</motion.p>
					<motion.div variants={fadeUp} className="mt-8">
						<a
							href="#cta"
							className="inline-flex items-center gap-2 rounded-xl px-6 py-3 bg-white/5 backdrop-blur-md border border-white/10 hover:scale-105 transition-all duration-300 hover:shadow-[0_0_40px_rgba(88,133,250,0.35)]"
						>
							Začít spolupráci
							<ArrowRight className="w-4 h-4" />
						</a>
					</motion.div>
				</div>
			</motion.section>

			{/* Features */}
			<motion.section
				variants={fadeUp}
				initial="hidden"
				whileInView="show"
				viewport={{ once: true, amount: 0.2 }}
				className="py-20 border-t border-white/10"
			>
				<div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
					{[
						{ icon: Handshake, title: "Spolupráce" },
						{ icon: ShieldCheck, title: "Důvěra" },
						{ icon: TrendingUp, title: "Růst" },
						{ icon: Globe, title: "Dosah" }
					].map((f) => (
						<motion.div
							key={f.title}
							variants={fadeUp}
							className="group relative overflow-hidden rounded-2xl p-6 border border-white/10 bg-white/5 backdrop-blur-md transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#5885fa]/20"
						>
							<div className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-[#5885fa]/40 to-[#5885fa]/40" style={{ mixBlendMode: "overlay" }} />
							<div className="relative z-10">
								<div className="mb-3">
									<f.icon className="w-7 h-7 text-[#acc2fc]" />
								</div>
								<h3 className="text-lg font-semibold tracking-tight">{f.title}</h3>
								<p className="text-sm text-slate-300/80 mt-1">
									{/* zachování textu: žádný původní obsah k úpravě */}
								</p>
							</div>
						</motion.div>
					))}
				</div>
			</motion.section>

			{/* Info block */}
			<motion.section
				variants={fadeUp}
				initial="hidden"
				whileInView="show"
				viewport={{ once: true, amount: 0.2 }}
				className="py-20 border-t border-white/10"
			>
				<div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-10 items-center">
					<motion.div variants={slideIn} className="space-y-4">
						<span className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-slate-300">
							<span className="inline-block w-2 h-2 rounded-full bg-yellow-400" />
							Informace
						</span>
						<h3 className="text-3xl md:text-4xl font-bold tracking-tight">Silné partnerství</h3>
						<p className="text-slate-300">
							{/* zachování textu: žádný původní obsah k úpravě */}
						</p>
						<div className="pt-2">
							<a href="#cta" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#5885fa] to-[#5885fa] text-white font-medium hover:scale-105 transition-all duration-300">
								Více informací
								<ArrowRight className="w-4 h-4" />
							</a>
						</div>
					</motion.div>

					{/* Visual placeholder with gradient + glass */}
					<motion.div
						variants={fadeUp}
						className="relative h-72 sm:h-80 lg:h-[420px] rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md"
					>
						<div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_30%_30%,rgba(88,133,250,0.35),transparent_60%)]" />
						<div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:24px_24px] opacity-40" />
						<div className="absolute inset-0 flex items-center justify-center">
							<div className="w-40 h-40 sm:w-56 sm:h-56 rounded-full border border-[#799dfb]/40 bg-[#5885fa]/20 shadow-[0_0_60px_rgba(88,133,250,0.35)]" />
						</div>
					</motion.div>
				</div>
			</motion.section>

			{/* CTA */}
			<motion.section
				id="cta"
				variants={fadeUp}
				initial="hidden"
				whileInView="show"
				viewport={{ once: true, amount: 0.2 }}
				className="py-20 border-t border-white/10"
			>
				<div className="max-w-4xl mx-auto px-6 text-center">
					<motion.div
						variants={fadeUp}
						className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-[0_0_50px_rgba(88,133,250,0.25)]"
					>
						<span className="w-2 h-2 rounded-full bg-yellow-400" />
						<span className="text-slate-300">Připraveni na další krok?</span>
					</motion.div>
					<div className="mt-6">
						<a
							href="#"
							className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-[#5885fa] to-[#5885fa] text-white font-semibold hover:scale-105 transition-all duration-300 hover:shadow-[0_0_40px_rgba(88,133,250,0.35)]"
						>
							Kontaktovat tým
							<ArrowRight className="w-4 h-4" />
						</a>
					</div>
				</div>
			</motion.section>
		</main>
	);
}
