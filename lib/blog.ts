import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { remark } from 'remark';
import html from 'remark-html';

export type Author = {
  name: string;
  avatar?: string;
  bio?: string;
};

export type PostFrontmatter = {
  title: string;
  slug?: string;
  excerpt: string;
  coverImage?: string;
  tags?: string[];
  category?: string;
  author?: Author;
  publishedAt: string; // ISO
  featured?: boolean;
  seo?: {
    title?: string;
    description?: string;
    ogImage?: string;
  };
};

export type Post = {
  frontmatter: Required<PostFrontmatter> & { slug: string; tags: string[] };
  content: string; // raw markdown
  html: string; // rendered HTML
  readingTime: { text: string; minutes: number; time: number; words: number };
};

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize('NFD')
    // odstranění diakritiky
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function ensureDir(): void {
  if (!fs.existsSync(BLOG_DIR)) fs.mkdirSync(BLOG_DIR, { recursive: true });
}

export type PostMeta = Post['frontmatter'] & { readingTimeText: string };

export async function renderMarkdownToHtml(md: string): Promise<string> {
  const processed = await remark().use(html).process(md);
  return String(processed);
}

export async function getAllPosts(): Promise<Post[]> {
  ensureDir();
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.md'));
  const posts: Post[] = [];
  for (const file of files) {
    const fullPath = path.join(BLOG_DIR, file);
    const raw = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(raw);
    const fm = data as PostFrontmatter;
    const slug = fm.slug ?? slugify(path.basename(file, '.md'));
    const rt = readingTime(content);
    const htmlStr = await renderMarkdownToHtml(content);
    // doplň id na H2/H3 pro TOC
    const htmlWithIds = htmlStr.replace(/<(h[23])>([^<]+)<\/\1>/g, (_m, tag, text) => {
      const id = slugify(String(text));
      return `<${tag} id="${id}">${text}</${tag}>`;
    });
    const frontmatter = {
      title: fm.title,
      slug,
      excerpt: fm.excerpt,
      coverImage: fm.coverImage ?? '',
      tags: (fm.tags ?? []).map((t) => slugify(t)),
      category: fm.category ? slugify(fm.category) : '',
      author: fm.author ?? { name: 'Mescon' },
      publishedAt: fm.publishedAt,
      featured: Boolean(fm.featured),
      seo: fm.seo ?? {},
    } as Required<PostFrontmatter> & { slug: string; tags: string[] };
    posts.push({ frontmatter, content, html: htmlWithIds, readingTime: rt });
  }
  posts.sort((a, b) => (a.frontmatter.publishedAt < b.frontmatter.publishedAt ? 1 : -1));
  return posts;
}

export async function getAllMeta(): Promise<PostMeta[]> {
  const posts = await getAllPosts();
  return posts.map((p) => ({ ...p.frontmatter, readingTimeText: p.readingTime.text }));
}

export async function getBySlug(slug: string): Promise<Post | null> {
  const posts = await getAllPosts();
  return posts.find((p) => p.frontmatter.slug === slug) ?? null;
}

export async function getByTag(tag: string): Promise<PostMeta[]> {
  const t = slugify(tag);
  const meta = await getAllMeta();
  return meta.filter((m) => m.tags.includes(t));
}

export async function getByCategory(cat: string): Promise<PostMeta[]> {
  const c = slugify(cat);
  const meta = await getAllMeta();
  return meta.filter((m) => m.category === c);
}

export function paginate<T>(items: T[], page: number, perPage: number) {
  const total = items.length;
  const pages = Math.max(1, Math.ceil(total / perPage));
  const current = Math.min(Math.max(1, page), pages);
  const start = (current - 1) * perPage;
  const end = start + perPage;
  return { items: items.slice(start, end), total, pages, current, perPage };
}

export function extractToc(html: string) {
  const regex = /<h([23]) id=\"([^\"]+)\">([^<]+)<\/h[23]>/g;
  const out: { level: number; id: string; text: string }[] = [];
  let m: RegExpExecArray | null;
  while ((m = regex.exec(html))) {
    out.push({ level: Number(m[1]), id: m[2], text: m[3] });
  }
  return out;
}