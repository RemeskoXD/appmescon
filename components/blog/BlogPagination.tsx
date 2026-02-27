import Link from 'next/link';

type Props = { current: number; pages: number };

export default function BlogPagination({ current, pages }: Props) {
  if (pages <= 1) return null;
  const nums = Array.from({ length: pages }, (_, i) => i + 1);
  return (
    <nav aria-label="Stránkování" className="flex items-center justify-center gap-2">
      {nums.map((n) => (
        <Link key={n} href={`/blog?page=${n}` as any} className={`px-3 py-1.5 rounded-md border ${n===current? 'border-accent-500 text-white bg-accent-500/15' : 'border-[#2b3045] text-slate-300 hover:text-white hover:bg-white/5'}`}>
          {n}
        </Link>
      ))}
    </nav>
  );
}
