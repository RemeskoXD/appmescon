import './globals.css';
import '../css/partners-marquee.css';
import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import Header from '../components/Header';
import Footer from '../components/Footer';
import InitialLoader from '../components/InitialLoader';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const viewport: Viewport = {
  themeColor: '#020617',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://www.mescon.cz'),
  title: {
    default: 'MESCON - Digitální transformace a vývoj softwaru na míru',
    template: '%s | MESCON',
  },
  description: 'Jsme lídrem v oblasti digitální transformace. Vyvíjíme software na míru, webové aplikace, e-shopy a CRM systémy. Pomáháme firmám růst v digitálním světě.',
  keywords: ['vývoj softwaru', 'digitální transformace', 'webové aplikace', 'e-shop', 'CRM', 'ERP', 'AI', 'Mescon', 'IT služby', 'marketing'],
  authors: [{ name: 'Mescon Digital s.r.o.', url: 'https://www.mescon.cz' }],
  creator: 'Mescon Digital s.r.o.',
  publisher: 'Mescon Digital s.r.o.',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'MESCON - Digitální transformace a vývoj softwaru',
    description: 'Komplexní IT řešení pro vaše podnikání. Od webových stránek po robustní podnikové systémy.',
    url: 'https://www.mescon.cz',
    siteName: 'MESCON',
    images: [
      {
        url: 'https://web2.itnahodinu.cz/mescon/images/og-image.jpg', // Placeholder, should be replaced with real OG image if available
        width: 1200,
        height: 630,
        alt: 'MESCON Digital',
      },
    ],
    locale: 'cs_CZ',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MESCON - Digitální transformace',
    description: 'Komplexní IT řešení pro vaše podnikání.',
    images: ['https://web2.itnahodinu.cz/mescon/images/og-image.jpg'], // Placeholder
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: 'https://web2.itnahodinu.cz/mescon/images/favicon.svg',
    shortcut: 'https://web2.itnahodinu.cz/mescon/images/favicon.svg',
    apple: 'https://web2.itnahodinu.cz/mescon/images/favicon.svg', // Ideally should be PNG for Apple
  },
  manifest: '/manifest.json',
  alternates: {
    canonical: 'https://www.mescon.cz',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://www.mescon.cz/#organization',
        name: 'Mescon Digital s.r.o.',
        url: 'https://www.mescon.cz',
        logo: {
          '@type': 'ImageObject',
          url: 'https://web2.itnahodinu.cz/mescon/images/logo.svg',
          width: 180,
          height: 60,
        },
        sameAs: [
          'https://www.facebook.com/mescon.cz',
          'https://www.linkedin.com/company/mescon-digital',
          'https://www.instagram.com/mescon.cz',
        ],
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+420 123 456 789', // Placeholder
          contactType: 'customer service',
          areaServed: 'CZ',
          availableLanguage: 'Czech',
        },
      },
      {
        '@type': 'WebSite',
        '@id': 'https://www.mescon.cz/#website',
        url: 'https://www.mescon.cz',
        name: 'MESCON',
        publisher: {
          '@id': 'https://www.mescon.cz/#organization',
        },
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://www.mescon.cz/search?q={search_term_string}',
          'query-input': 'required name=search_term_string',
        },
      },
    ],
  };

  return (
    <html lang="cs" className="h-full">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.className} ${jetbrainsMono.variable} min-h-full text-slate-200 antialiased selection:bg-[#5885fa]/30`}>
        <Providers>
          <InitialLoader />
          <Header />
          <main className="pt-[58px] pb-20 lg:pb-0 min-h-screen">{children}</main>
          <Footer />
          <Analytics />
          <SpeedInsights />
        </Providers>
      </body>
    </html>
  );
}
