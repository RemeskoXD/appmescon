import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.mescon.cz';

  // Main pages
  const routes = [
    '',
    '/blog',
    '/partneri',
    '/subpages/akademie',
    '/subpages/akademie2',
    '/subpages/apply-partner',
    '/subpages/blog',
    '/subpages/crm',
    '/subpages/digitalni-audit',
    '/subpages/e-shop',
    '/subpages/email-hosting',
    '/subpages/eshop',
    '/subpages/gdpr',
    '/subpages/global',
    '/subpages/graficky-design',
    '/subpages/kariera',
    '/subpages/marketing-ai',
    '/subpages/marketing-funnel',
    '/subpages/o-nas',
    '/subpages/obchodni-podminky',
    '/subpages/podpora',
    '/subpages/portal-login',
    '/subpages/portfolio',
    '/subpages/ppc-reklamy',
    '/subpages/prezentacni-web',
    '/subpages/reference',
    '/subpages/security',
    '/subpages/ucetni',
    '/subpages/webhosting',
    '/subpages/webova-aplikace',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  return routes;
}
