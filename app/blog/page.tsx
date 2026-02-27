import { Suspense } from 'react';
import BlogCard from '../../components/blog/BlogCard';
import BlogFilters from '../../components/blog/BlogFilters';
import BlogPagination from '../../components/blog/BlogPagination';
import { getAllMeta, paginate } from '../../lib/blog';

export const revalidate = 60;

export default async function BlogHome({ searchParams }: { searchParams: Promise<{ [k: string]: string | string[] | undefined }> }) {
  const sp = await searchParams;
  const all = await getAllMeta();
  const q = (sp.q as string) ?? '';
  const tag = (sp.tag as string) ?? '';
  const cat = (sp.cat as string) ?? '';
  const page = Number(sp.page ?? 1);
  const perPage = 6;

  const filtered = all.filter((p) => {
    const okQ = !q || p.title.toLowerCase().includes(q.toLowerCase()) || p.excerpt.toLowerCase().includes(q.toLowerCase());
    const okT = !tag || p.tags.includes(tag);
    const okC = !cat || p.category === cat;
    return okQ && okT && okC;
  });
  const { items, pages, current } = paginate(filtered, page, perPage);
  const tags = Array.from(new Set(all.flatMap((p) => p.tags))).sort();
  const cats = Array.from(new Set(all.map((p) => p.category).filter(Boolean))).sort();

  const featured = all.find((p) => p.featured) ?? null;

  return (
    <div className="page-container px-6 md:px-10 py-10 md:py-16">
      <header className="mb-8">
        <p className="text-[12px] tracking-wider text-accent-300 font-semibold uppercase mb-2">Zdroje</p>
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-white">Blog</h1>
        <p className="mt-3 text-slate-300 max-w-2xl">Články o produktech, AI, marketingu a růstu firem. Prakticky a s daty.</p>
      </header>

      <Suspense fallback={<div className="mb-6 text-slate-400">Načítám filtry…</div>}>
        <div className="mb-6">
          <BlogFilters allTags={tags} allCategories={cats} />
        </div>
      </Suspense>

      {featured && (
        <section className="mb-8">
          <div className="text-[12px] uppercase tracking-wider text-slate-400 mb-2">Doporučené</div>
          <BlogCard
            href={`/blog/${featured.slug}`}
            cover={featured.coverImage}
            title={featured.title}
            excerpt={featured.excerpt}
            tags={featured.tags}
            author={featured.author.name}
            date={featured.publishedAt}
            readingTime={featured.readingTimeText}
          />
        </section>
      )}

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
        {items.map((p) => (
          <BlogCard
            key={p.slug}
            href={`/blog/${p.slug}`}
            cover={p.coverImage}
            title={p.title}
            excerpt={p.excerpt}
            tags={p.tags}
            author={p.author.name}
            date={p.publishedAt}
            readingTime={p.readingTimeText}
          />
        ))}
      </section>

      <div className="mt-8">
        <BlogPagination current={current} pages={pages} />
      </div>
    </div>
  );
}
