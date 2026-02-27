import BlogCard from '../../../../components/blog/BlogCard';
import { getByTag } from '../../../../lib/blog';

export const revalidate = 60;

export default async function TagList({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params;
  const list = await getByTag(tag);
  return (
    <div className="page-container px-6 md:px-10 py-10 md:py-16">
      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-white">Tag: {tag}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 mt-6">
        {list.map((p) => (
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
      </div>
    </div>
  );
}
