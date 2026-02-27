import SectionContainer from '../ui/SectionContainer';

export default function BlogPage() {
  return (
    <main className="bg-[#020617] text-slate-100 min-h-screen">
      <SectionContainer>
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <h1 className="text-3xl font-bold text-white">Blog</h1>
          <p className="text-slate-300">Obsah blogu připravujeme.</p>
        </div>
      </SectionContainer>
    </main>
  );
}
