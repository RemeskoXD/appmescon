"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { BadgeCheck, Car, CreditCard, Film, Layout, Megaphone, Package, Palette, PenTool, Pencil, Printer, Rocket, Search } from 'lucide-react';
import RegisterPanel from '../../../components/RegisterPanel';
import Button from '../../../components/ui/Button';

// Animační varianty
const fadeUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const blurIn = {
  initial: { opacity: 0, filter: 'blur(10px)' },
  animate: { opacity: 1, filter: 'blur(0px)' },
  transition: { duration: 0.8 }
};

const designTools = [
  {
    name: 'Figma',
    src: 'https://web2.itnahodinu.cz/mescon/images/grafika_ikony_programu/1.svg'
  },
  {
    name: 'ChatGPT',
    src: 'https://web2.itnahodinu.cz/mescon/images/grafika_ikony_programu/2.svg'
  },
  {
    name: 'Canva',
    src: 'https://web2.itnahodinu.cz/mescon/images/grafika_ikony_programu/3.svg'
  },
  {
    name: 'Illustrator',
    src: 'https://web2.itnahodinu.cz/mescon/images/grafika_ikony_programu/4.svg'
  },
  {
    name: 'Photoshop',
    src: 'https://web2.itnahodinu.cz/mescon/images/grafika_ikony_programu/5.svg'
  },
  {
    name: 'After Effects',
    src: 'https://web2.itnahodinu.cz/mescon/images/grafika_ikony_programu/6.svg'
  },
  {
    name: 'InDesign',
    src: 'https://web2.itnahodinu.cz/mescon/images/grafika_ikony_programu/7.svg'
  },
  {
    name: 'Blender',
    src: 'https://web2.itnahodinu.cz/mescon/images/grafika_ikony_programu/8.svg'
  }
];

export default function GrafickyDesignPage() {
  const [showRegister, setShowRegister] = useState(false);

  return (
    <main className="bg-[#020617] text-slate-100 overflow-hidden">
      {/* Hero */}
      <section className="relative border-b border-slate-800/60 pt-20 pb-24 lg:pt-32 lg:pb-40">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[500px] bg-[#5885fa]/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="page-container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div {...blurIn} className="text-center lg:text-left">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#5885fa] to-[#eef3fe]">
                  Kreativní grafický
                </span>
                design
              </h1>
              <p className="text-lg sm:text-xl text-slate-300 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Vytváříme vizuální identitu, která zaujme a prodává.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button variant="primary" size="lg" onClick={() => setShowRegister(true)} className="min-w-[160px]">
                  Nechat si navrhnout logo
                </Button>
                <Button variant="outline" size="lg" href="/subpages/portfolio" className="min-w-[160px]">
                  Portfolio
                </Button>
              </div>
            </motion.div>

            <motion.div {...blurIn} transition={{ delay: 0.1, duration: 0.8 }} className="relative mx-auto w-full max-w-lg lg:max-w-none">
              <div className="relative w-full bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl p-8 shadow-[0_20px_60px_rgba(0,0,0,0.35)] overflow-hidden">
                <div className="absolute -left-10 -top-10 w-40 h-40 rounded-full bg-gradient-to-br from-[#5885fa]/40 to-transparent blur-3xl" />
                <div className="absolute -right-12 bottom-0 w-48 h-48 rounded-full bg-gradient-to-br from-[#8aaafc]/30 to-transparent blur-3xl" />
                <div className="grid grid-cols-3 gap-4 relative">
                  <div className="col-span-2 h-36 rounded-xl bg-gradient-to-br from-[#0f172a] via-[#0b1024] to-[#0b132a] border border-slate-800 flex items-center justify-center">
                    <Layout className="w-10 h-10 text-[#8aaafc]" />
                  </div>
                  <div className="space-y-4">
                    <div className="h-16 rounded-lg border border-slate-800 bg-[#0b1024] flex items-center justify-center">
                      <Palette className="w-6 h-6 text-[#5885fa]" />
                    </div>
                    <div className="h-16 rounded-lg border border-slate-800 bg-[#0b1024] flex items-center justify-center">
                      <BadgeCheck className="w-6 h-6 text-[#8aaafc]" />
                    </div>
                  </div>
                  <div className="col-span-3 grid grid-cols-4 gap-3">
                    {['#0b1024', '#5885fa', '#8aaafc', '#f97316'].map((color) => (
                      <div key={color} className="h-10 rounded-lg border border-slate-700" style={{ backgroundColor: color }} />
                    ))}
                    {['#22c55e', '#eab308', '#6366f1', '#1e293b'].map((color) => (
                      <div key={color} className="h-10 rounded-lg border border-slate-700" style={{ backgroundColor: color }} />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sekce 1 – Co navrhujeme + navazující obsah */}
      <section className="border-b border-slate-800/60 bg-[#030712] py-20 lg:py-24">
        <div className="page-container">
          <div className="space-y-16">
            <div>
              <motion.div {...fadeUp} viewport={{ once: true }} className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-slate-100 mb-4">
                  Co navrhujeme
                </h2>
                <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                  Komplexní grafické služby od loga po vizuální identitu
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  {
                    icon: PenTool,
                    title: "Loga",
                    desc: "Originální značky s jasnou typografií, symbolikou a použitelným manuálem."
                  },
                  {
                    icon: CreditCard,
                    title: "Vizitky",
                    desc: "Elegantní vizitky s jasnou hierarchií informací a tiskovou připraveností."
                  },
                  {
                    icon: Printer,
                    title: "Tiskoviny",
                    desc: "Letáky, katalogy i brožury s přesnými ořezy, spady a CMYK profilem."
                  },
                  {
                    icon: Package,
                    title: "Obaly",
                    desc: "Návrhy etiket a krabic, které jsou čitelné na regálu a výrobně proveditelné."
                  },
                  {
                    icon: Car,
                    title: "Polepy",
                    desc: "Polepy vozidel, výloh i interiérů v souladu s identitou značky."
                  },
                  {
                    icon: Layout,
                    title: "Webový design",
                    desc: "UI/UX pro weby a landing pages s důrazem na konverze a responzivitu."
                  },
                  {
                    icon: Megaphone,
                    title: "Bannery",
                    desc: "Online bannery a performance kreativy v potřebných formátech bez ztráty kvality."
                  },
                  {
                    icon: Film,
                    title: "3D & Motion grafika",
                    desc: "Animace produktů, intro sekvence a motion grafika pro prezentace i kampaně."
                  }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.15, duration: 0.6 }}
                    viewport={{ once: true }}
                    className="relative group h-full"
                  >
                    <div className="relative bg-slate-900/50 backdrop-blur-md rounded-2xl p-8 border border-slate-800 hover:border-[#5885fa]/50 transition-all duration-300 hover:translate-y-[-5px] h-full flex flex-col">
                      {/* Glowing effect on hover */}
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#5885fa] via-[#5885fa] to-[#5885fa] rounded-2xl opacity-0 group-hover:opacity-20 blur transition duration-300"></div>

                      <div className="relative flex flex-col h-full">
                        <feature.icon className="w-10 h-10 text-[#5885fa] mb-4" />
                        <h3 className="text-2xl font-bold text-slate-100 mb-3">{feature.title}</h3>
                        <p className="text-slate-400 leading-relaxed mt-auto">{feature.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="pt-16 border-t border-slate-800/60 space-y-10">
              <motion.div {...fadeUp} viewport={{ once: true }} className="text-center max-w-4xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold text-slate-100 mb-4">
                  Technologie, které ovládáme
                </h2>
                <p className="text-lg text-slate-300 leading-relaxed">
                  Profesionální nástroje pro návrhy, animace i spolupráci.
                </p>
              </motion.div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {designTools.map((tool) => (
                  <div
                    key={tool.name}
                    className="flex flex-col items-center justify-center p-4 rounded-xl bg-[#0f1420] border border-slate-800 hover:border-[#5885fa]/30 hover:bg-[#161b2c] transition-all group"
                  >
                    <div className="mb-3 p-2 rounded-lg bg-[#1e2334]/50 group-hover:bg-[#5885fa]/10 transition-colors">
                      <img
                        src={tool.src}
                        alt={tool.name}
                        className="w-10 h-10 object-contain"
                        loading="lazy"
                      />
                    </div>
                    <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
                      {tool.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-16 border-t border-slate-800/60 space-y-12">
              <motion.div {...fadeUp} viewport={{ once: true }} className="text-center">
                <h3 className="text-3xl md:text-4xl font-bold text-slate-100 mb-4">
                  Náš proces
                </h3>
                <p className="text-lg text-slate-400 max-w-3xl mx-auto">
                  Od analýzy po realizaci – transparentní a efektivní workflow
                </p>
              </motion.div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {[
                  {
                    step: "1",
                    title: "Analýza značky",
                    desc: "Pochopíme vaši vizi, cílovou skupinu a konkurenci. Definujeme směr.",
                    icon: Search
                  },
                  {
                    step: "2",
                    title: "Návrh",
                    desc: "Vytvoříme koncepty a prezentujeme možnosti. Společně vybíráme nejlepší řešení.",
                    icon: Pencil
                  },
                  {
                    step: "3",
                    title: "Realizace",
                    desc: "Finalizujeme design a dodáváme všechny potřebné formáty pro různé platformy.",
                    icon: Rocket
                  }
                ].map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2, duration: 0.6 }}
                    viewport={{ once: true }}
                    className="relative text-center"
                  >
                    <div className="relative bg-slate-900/50 backdrop-blur-md rounded-2xl p-8 border border-slate-800 hover:border-[#5885fa]/50 transition-all duration-300">
                      <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-gradient-to-r from-[#5885fa] to-[#4f78e1] flex items-center justify-center text-white text-2xl font-bold shadow-[0_0_25px_rgba(88,133,250,0.4)]">
                        {step.step}
                      </div>
                      <step.icon className="w-10 h-10 text-[#5885fa] mb-4 mx-auto" />
                      <h3 className="text-2xl font-bold text-slate-100 mb-3">{step.title}</h3>
                      <p className="text-slate-400 leading-relaxed">{step.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {showRegister && <RegisterPanel onClose={() => setShowRegister(false)} />}
    </main>
  );
}
