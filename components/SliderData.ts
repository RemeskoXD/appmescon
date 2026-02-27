// Konfigurační data pro úvodní slider na homepage.
// Zde upravujte texty a cesty k obrázkům/pozadí (veřejné soubory v public/images).

export interface Slide {
  id: string;
  targetGroup: string;
  background: {
    type: 'image' | 'video' | 'gradient';
    source: string;
    overlay?: number;
  };
  content: {
    kicker: string;
    headline: string;
    subtext: string;
    cta: {
      primary: { text: string; href: string };
      secondary?: { text: string; href: string };
    };
  };
  foregroundImage?: string;
  footTitle: string;
  footSubtitle: string;
}

export const SLIDES: Slide[] = [
  {
    id: 'slide-web',
    targetGroup: 'B2B firmy',
    background: {
      type: 'image',
      source: 'https://web2.itnahodinu.cz/mescon/images/14.svg',
      overlay: 0.26
    },
    content: {
      kicker: 'MESCON DIGITAL',
      headline: 'Webové stránky, které prodávají',
      subtext: 'Navrhneme a postavíme web, který je rychlý, přehledný a připravený na poptávky. UX, obsah i technické SEO řešíme tak, aby to dávalo smysl v číslech.',
      cta: {
        primary: { text: 'Domluvit konzultaci', href: '/subpages/podpora' }
      }
    },
    footTitle: 'WEBOVÉ STRÁNKY',
    footSubtitle: 'Design + výkon'
  },
  {
    id: 'slide-hosting',
    targetGroup: 'B2B firmy',
    background: {
      type: 'image',
      source: 'https://web2.itnahodinu.cz/mescon/images/12.svg',
      overlay: 0.24
    },
    content: {
      kicker: 'MESCON DIGITAL',
      headline: 'Hosting a správa bez stresu',
      subtext: 'Zajistíme stabilní provoz, monitoring, zálohy a bezpečnost. Vy řešíte byznys, my hlídáme výkon a dostupnost vašeho webu i aplikací.',
      cta: {
        primary: { text: 'Domluvit konzultaci', href: '/subpages/podpora' }
      }
    },
    footTitle: 'HOSTING',
    footSubtitle: 'Stabilní provoz'
  },
  {
    id: 'slide-app-dev',
    targetGroup: 'B2B firmy',
    background: {
      type: 'image',
      source: 'https://web2.itnahodinu.cz/mescon/images/15.svg',
      overlay: 0.22
    },
    content: {
      kicker: 'MESCON DIGITAL',
      headline: 'Vývoj aplikací na míru',
      subtext: 'Vyvíjíme webové aplikace, portály i interní systémy. Dodáváme po krocích, transparentně a s důrazem na bezpečnost, výkon a snadnou správu.',
      cta: {
        primary: { text: 'Domluvit konzultaci', href: '/subpages/podpora' }
      }
    },
    footTitle: 'VÝVOJ APLIKACÍ',
    footSubtitle: 'Na míru byznysu'
  },
  {
    id: 'slide-marketing',
    targetGroup: 'B2B firmy',
    background: {
      type: 'image',
      source: 'https://web2.itnahodinu.cz/mescon/images/13.svg',
      overlay: 0.26
    },
    content: {
      kicker: 'MESCON DIGITAL',
      headline: 'Marketing, který je vidět v číslech',
      subtext: 'PPC, SEO, obsah i analytika. Nastavíme měření a optimalizujeme kampaně tak, aby rostly poptávky a klesaly náklady na akvizici.',
      cta: {
        primary: { text: 'Domluvit konzultaci', href: '/subpages/podpora' }
      }
    },
    footTitle: 'MARKETING',
    footSubtitle: 'Měřitelné výsledky'
  },
  {
    id: 'slide-partnerstvi',
    targetGroup: 'B2B firmy',
    background: {
      type: 'image',
      source: 'https://web2.itnahodinu.cz/mescon/images/16.svg',
      overlay: 0.24
    },
    content: {
      kicker: 'MESCON DIGITAL',
      headline: 'Partnerství místo jednorázovek',
      subtext: 'Dlouhodobě se staráme o rozvoj, prioritizaci a provoz. Jako externí tým, který zná váš kontext a doručuje stabilně každý měsíc.',
      cta: {
        primary: { text: 'Domluvit konzultaci', href: '/subpages/podpora' }
      }
    },
    footTitle: 'PARTNERSTVÍ',
    footSubtitle: 'Dlouhodobá spolupráce'
  },
  {
    id: 'slide-strategie',
    targetGroup: 'B2B firmy',
    background: {
      type: 'image',
      source: 'https://web2.itnahodinu.cz/mescon/images/17.svg',
      overlay: 0.22
    },
    content: {
      kicker: 'MESCON DIGITAL',
      headline: 'Digitální strategie, která dá směr',
      subtext: 'Zmapujeme cíle, data a konkurenci. Navrhneme roadmapu, priority a KPI, aby každý další krok v digitálu měl jasný důvod i návratnost.',
      cta: {
        primary: { text: 'Domluvit konzultaci', href: '/subpages/podpora' }
      }
    },
    footTitle: 'DIGITÁLNÍ STRATEGIE',
    footSubtitle: 'Roadmapa růstu'
  }
];
