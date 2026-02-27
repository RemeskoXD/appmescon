import Link from 'next/link';

type Props = {
  href: string;
  cover?: string;
  title: string;
  excerpt: string;
  tags: string[];
  author: string;
  date: string;
  readingTime: string;
};

export default function BlogCard({ href, cover, title, excerpt, tags, author, date, readingTime }: Props) {
  return (
    <article className="product-card p-4 md:p-5 flex flex-col">
      {cover && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={cover} alt="cover" className="w-full h-48 object-cover rounded-lg border border-[#23283a]" loading="lazy" />
      )}
      <div className="mt-3 flex flex-wrap gap-2">
        {tags.slice(0, 4).map((t) => (
          <Link key={t} href={`/blog/tag/${t}` as any} className="text-[11px] px-2 py-1 rounded-full border border-[#2b3045] text-slate-300 hover:text-white hover:bg-white/5">
            #{t}
          </Link>
        ))}
      </div>
      <h3 className="text-lg font-semibold text-white mt-2 tracking-tight">
  <Link href={href as any} className="hover:underline underline-offset-4">{title}</Link>
      </h3>
      <p className="text-sm text-slate-300 mt-2 line-clamp-3">{excerpt}</p>
      <div className="mt-4 text-[12px] text-slate-400 flex items-center gap-2">
        <span>{author}</span>
        <span aria-hidden>•</span>
        <time dateTime={date}>{new Date(date).toLocaleDateString('cs-CZ')}</time>
        <span aria-hidden>•</span>
        <span>{readingTime}</span>
      </div>
    </article>
  );
}
