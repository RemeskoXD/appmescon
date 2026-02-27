"use client";
import { useEffect, useState } from 'react';

type Item = { level: number; id: string; text: string };
export default function BlogTOC({ items }: { items: Item[] }) {
  const [active, setActive] = useState<string | null>(items[0]?.id ?? null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '0px 0px -70% 0px', threshold: 0 }
    );
    items.forEach((i) => {
      const el = document.getElementById(i.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [items]);

  if (!items.length) return null;

  return (
    <nav aria-label="Obsah" className="sticky top-[84px] rounded-xl border border-[#23283a] bg-[#10131d]/70 p-4 text-sm">
      <div className="text-[12px] uppercase tracking-wide text-slate-400 mb-2">Obsah</div>
      <ul className="space-y-1">
        {items.map((i) => (
          <li key={i.id} className={i.level === 3 ? 'pl-3' : ''}>
            <a href={`#${i.id}`} className={`block rounded px-2 py-1 ${active===i.id? 'text-white bg-white/5' : 'text-slate-300 hover:text-white hover:bg-white/5'}`}>{i.text}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
