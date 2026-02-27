import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617] relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#0f172a] via-[#020617] to-[#020617]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#5885fa]/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="relative z-10 text-center px-4">
        <h1 className="text-[150px] md:text-[200px] font-bold text-transparent bg-clip-text bg-gradient-to-b from-slate-200 to-slate-800 leading-none select-none">
          404
        </h1>
        <div className="space-y-6 max-w-lg mx-auto -mt-4 md:-mt-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Stránka nenalezena
          </h2>
          <p className="text-slate-400 text-lg">
            Omlouváme se, ale stránka, kterou hledáte, pravděpodobně zmizela v digitálním prostoru nebo nikdy neexistovala.
          </p>
          <div className="pt-4">
            <Link 
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#5885fa] text-white font-semibold hover:bg-[#406ee0] transition-colors shadow-lg shadow-blue-900/20"
            >
              <ArrowLeft className="w-4 h-4" />
              Zpět na domovskou stránku
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
