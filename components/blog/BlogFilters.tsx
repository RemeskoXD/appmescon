"use client";
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

type Props = { allTags: string[]; allCategories: string[] };

export default function BlogFilters({ allTags, allCategories }: Props) {
  const p = useSearchParams();
  const router = useRouter();
  const [q, setQ] = useState(p?.get('q') ?? '');
  const [tag, setTag] = useState(p?.get('tag') ?? '');
  const [cat, setCat] = useState(p?.get('cat') ?? '');

  useEffect(() => {
    const t = setTimeout(() => {
      const params = new URLSearchParams();
      if (q) params.set('q', q);
      if (tag) params.set('tag', tag);
      if (cat) params.set('cat', cat);
  router.replace(`/blog?${params.toString()}` as any);
    }, 300);
    return () => clearTimeout(t);
  }, [q, tag, cat, router]);

  return (
    <div className="rounded-xl border border-[#23283a] bg-[#10131d]/70 backdrop-blur-sm p-4 md:p-5">
      <div className="grid md:grid-cols-3 gap-3">
        <div>
          <label htmlFor="search" className="sr-only">Vyhledat</label>
          <input id="search" value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Hledat články…" className="w-full rounded-lg bg-[#0f1420] border border-[#2a2f44] px-3 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-accent-500/60" />
        </div>
        <div>
          <select value={cat} onChange={(e)=>setCat(e.target.value)} className="w-full rounded-lg bg-[#0f1420] border border-[#2a2f44] px-3 py-2.5 text-sm text-slate-200">
            <option value="">Všechny kategorie</option>
            {allCategories.map(c => (<option key={c} value={c}>{c}</option>))}
          </select>
        </div>
        <div className="flex flex-wrap gap-2">
          {allTags.slice(0, 10).map(t => (
            <button key={t} onClick={()=> setTag(tag===t?'':t)} className={`text-[11px] px-2 py-1 rounded-full border ${tag===t? 'border-accent-500 text-white bg-accent-500/15' : 'border-[#2b3045] text-slate-300 hover:text-white hover:bg-white/5'}`}>#{t}</button>
          ))}
          {(q || tag || cat) && (
            <button onClick={()=>{setQ('');setTag('');setCat('');}} className="ml-auto text-[12px] text-slate-300 hover:text-white">Reset</button>
          )}
        </div>
      </div>
    </div>
  );
}
