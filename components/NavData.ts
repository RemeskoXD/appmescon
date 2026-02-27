import {
  FileSearch,
  Users,
  BarChart3,
  Cloud,
  MessagesSquare,
  ShieldCheck,
  BookOpen,
  Globe,
  MousePointer,
  Cpu,
  Rocket,
  Megaphone,
  Pencil,
  Briefcase,
  Star,
} from 'lucide-react';

/* Typy */
export type MegaItem = {
  id: string;
  title: string;
  desc: string;
  // Použijeme širší typ kvůli forwardRef komponentám z ikon
  icon: React.ElementType;
  href?: string;
  locked?: boolean;
};

export type MegaSection = {
  id: string;
  heading: string;
  items: MegaItem[];
};

export type MenuDefinition = {
  key: string;
  label: string;
  sections: MegaSection[];
};

export type Language = {
  code: string;
  name: string;
  flag: string;
};

/* Data jazyků */
export const languages: Language[] = [
  { code: 'en', name: 'English', flag: 'EN' },
  { code: 'cs', name: 'Čeština', flag: 'CS' },
  { code: 'sk', name: 'Slovenština', flag: 'SK' },
  { code: 'es', name: 'Español', flag: 'ES' },
  { code: 'de', name: 'Deutsch', flag: 'DE' },
];

/* Helper pro položky */
const makeItem = (
  id: string,
  title: string,
  desc: string,
  icon: MegaItem['icon'],
  href?: string,
  locked: boolean = false
): MegaItem => ({ id, title, desc, icon, href, locked });

/* Definice menu */
export const menuDefinitions: MenuDefinition[] = [
  {
    key: 'products',
    label: 'Platforma',
    sections: [
      {
        id: 'infrastructure',
        heading: 'Infrastruktura',
        items: [
          makeItem('webhosting', 'Webhosting', 'Provoz webů a aplikací se SLA 99,9 %.', Cloud, '/subpages/webhosting', true),
          makeItem('email-hosting', 'Email hosting', 'Bezpečná mailová infrastruktura a archivace.', MessagesSquare, '/subpages/email-hosting', true),
          makeItem('security', 'Security', 'Monitoring, ochrana a incident response.', ShieldCheck, '/subpages/security', true),
        ],
      },
      {
        id: 'software',
        heading: 'Firemní systémy',
        items: [
          makeItem('digitalni-audit', 'Digitální audit', 'Audit výkonu, rizik a příležitostí.', FileSearch, '/subpages/digitalni-audit', true),
          makeItem('crm', 'CRM systém', 'Přehled vztahů, obchodu a komunikace.', Users, '/subpages/crm', true),
          makeItem('ucetni', 'Účetní systém', 'Automatizace fakturace a účetních toků.', BarChart3, '/subpages/ucetni', true),
        ],
      },
      {
        id: 'ecosystem',
        heading: 'Ekosystém',
        items: [
          makeItem('akademie', 'Akademie', 'Vzdělávání pro týmy a partnery.', BookOpen, 'https://www.mesconacademy.cz/'),
          makeItem('global', 'Globální síť', 'Multi-regionální infrastruktura pro provoz.', Globe, '/subpages/global', true),
          makeItem('marketing-ai', 'Marketing AI', 'Automatizace kampaní a reporting.', MousePointer, '/subpages/marketing-ai', true),
        ],
      },
    ],
  },
  {
    key: 'services',
    label: 'Služby',
    sections: [
      {
        id: 'web',
        heading: 'Web a e-commerce',
        items: [
            makeItem('prezentacni-web', 'Prezentační web', 'Firemní prezentace pro důvěru a poptávku.', Cpu, '/subpages/prezentacni-web'),
            makeItem('eshop', 'E-shop', 'E-commerce napojená na procesy a provoz.', Rocket, '/subpages/e-shop'),
            makeItem('webova-aplikace', 'Webová aplikace', 'Zakázkové aplikace pro interní procesy.', Pencil, '/subpages/webova-aplikace'),
        ],
      },
      {
        id: 'marketing',
        heading: 'Marketing a růst',
        items: [
          makeItem('marketing-funnel', 'Marketing funnel', 'Návrh a řízení akvizičních cest.', Megaphone, '/subpages/marketing-funnel'),
          makeItem('ppc-reklamy', 'PPC reklamy', 'Správa rozpočtů s důrazem na marži.', BarChart3, '/subpages/ppc-reklamy'),
          makeItem('graficky-design', 'Grafický design', 'Vizuální systém pro konzistentní značku.', Star, '/subpages/graficky-design'),
        ],
      },
    ],
  },
  {
    key: 'resources',
    label: 'Společnost',
    sections: [
      {
        id: 'spolecnost',
        heading: 'O firmě',
        items: [
          makeItem('reference', 'Reference', 'Ukázky řešení a výsledků.', Briefcase, '/subpages/reference'),
          makeItem('o-nas', 'O nás', 'Kdo jsme a jak pracujeme.', Users, '/subpages/o-nas'),
        ],
      },
      {
        id: 'obsah',
        heading: 'Aktuality',
        items: [
          makeItem('blog', 'Blog', 'Odborné články a aktuality.', BookOpen, '/blog'),
          makeItem('kariera', 'Kariéra', 'Role pro zkušené profesionály.', Rocket, '/subpages/kariera'),
        ],
      },
    ],
  },
  {
    key: 'partners',
    label: 'Partnerství',
    sections: [
      {
        id: 'become-partner',
        heading: 'Program partnerství',
        items: [
          makeItem('apply-partner', 'Probrat partnerství', 'Ověření fitu a nastavení spolupráce.', Briefcase, '/subpages/apply-partner'),
        ],
      },
      {
        id: 'partner-portal',
        heading: 'Partner portál',
        items: [
          makeItem('portal-login', 'Přihlášení do portálu', 'Přístup pro partnery a správu projektů.', ShieldCheck, '/subpages/portal-login', true),
        ],
      },
    ],
  },
];
