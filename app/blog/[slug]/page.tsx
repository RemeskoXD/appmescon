import Link from 'next/link';
import BlogTOC from '../../../components/blog/BlogTOC';
import { extractToc, getAllMeta, getBySlug } from '../../../lib/blog';

export const revalidate = 60;

export async function generateStaticParams() {
  const meta = await getAllMeta();
  return meta.map((m) => ({ slug: m.slug }));
}

export default async function BlogDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBySlug(slug);
  if (!post) return <div className="page-container px-6 md:px-10 py-10">Článek nebyl nalezen.</div>;
  const toc = extractToc(post.html);
  const relatedMeta = (await getAllMeta()).filter((m) => m.slug !== post.frontmatter.slug).slice(0, 3);

  return (
    <div className="page-container px-6 md:px-10 py-10 md:py-16 grid lg:grid-cols-[1fr_280px] gap-10">
      <article>
        <header className="mb-6">
          <div className="text-[12px] uppercase tracking-wider text-slate-400">{post.frontmatter.category}</div>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-white">{post.frontmatter.title}</h1>
          <p className="mt-2 text-slate-300 max-w-2xl">{post.frontmatter.excerpt}</p>
          <div className="mt-3 text-[12px] text-slate-400 flex items-center gap-2">
            <span>{post.frontmatter.author.name}</span>
            <span aria-hidden>•</span>
            <time dateTime={post.frontmatter.publishedAt}>{new Date(post.frontmatter.publishedAt).toLocaleDateString('cs-CZ')}</time>
            <span aria-hidden>•</span>
            <span>{post.readingTime.text}</span>
          </div>
          {post.frontmatter.coverImage && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={post.frontmatter.coverImage} alt="cover" className="mt-5 w-full h-72 object-cover rounded-xl border border-[#23283a]" />
          )}
        </header>
        <div className="prose prose-invert max-w-none prose-headings:scroll-mt-28">
          {/* eslint-disable-next-line react/no-danger */}
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </div>
        <footer className="mt-8">
          <div className="flex flex-wrap gap-2">
            {post.frontmatter.tags.map((t) => (
              <Link key={t} href={`/blog/tag/${t}` as any} className="text-[11px] px-2 py-1 rounded-full border border-[#2b3045] text-slate-300 hover:text-white hover:bg-white/5">#{t}</Link>
            ))}
          </div>
        </footer>
      </article>

      <aside className="space-y-6">
        <BlogTOC items={toc} />
        <div className="rounded-xl border border-[#23283a] bg-[#10131d]/70 p-4">
          <div className="text-[12px] uppercase tracking-wider text-slate-400 mb-2">Související</div>
          <ul className="space-y-2 text-sm">
            {relatedMeta.map((m) => (
              <li key={m.slug}>
                <Link href={`/blog/${m.slug}` as any} className="text-slate-300 hover:text-white">{m.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
}
