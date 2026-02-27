<template>
  <div class="relative min-h-screen bg-[#020617] text-slate-200">
    <div class="pointer-events-none absolute inset-0">
      <div class="absolute -top-40 right-0 h-72 w-72 rounded-full bg-accent-500/10 blur-[120px]" />
      <div class="absolute bottom-0 left-10 h-64 w-64 rounded-full bg-accent-500/10 blur-[120px]" />
    </div>

    <div class="relative z-10 mx-auto max-w-6xl px-6 py-16 lg:px-10 lg:py-20">
      <header class="mx-auto max-w-3xl text-center">
        <h1 class="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          {{ preamble.title }}
        </h1>
        <p v-if="preamble.subtitle" class="mt-4 text-base leading-relaxed text-slate-300 sm:text-lg">
          {{ preamble.subtitle }}
        </p>
        <div
          v-if="preamble.meta.length"
          class="mt-6 rounded-2xl border border-slate-800/70 bg-slate-900/40 p-5 text-sm leading-relaxed text-slate-300 [&_strong]:text-white [&_strong]:font-semibold"
        >
          <div v-for="(line, index) in preamble.meta" :key="index" v-html="formatInline(line)" />
        </div>
      </header>

      <div class="mt-16 grid gap-12 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-16">
        <aside class="hidden lg:block">
          <div class="sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto pr-3">
            <div class="mb-4 text-xs uppercase tracking-[0.25em] text-slate-500">Obsah</div>
            <nav class="space-y-2 border-l border-slate-800/60">
              <div v-for="section in tocSections" :key="section.id" class="space-y-1">
                <button
                  type="button"
                  class="-ml-[2px] flex w-full items-center justify-between gap-3 border-l-2 border-transparent px-4 py-2 text-left text-sm text-slate-300 transition-all duration-200 hover:border-slate-500 hover:text-white"
                  :class="{ 'border-accent-500 text-accent-400 bg-accent-500/10': section.id === activeSectionId }"
                  @click="scrollTo(section.id)"
                >
                  <span>{{ section.title }}</span>
                  <span class="text-xs transition-transform" :class="{ 'rotate-180': section.id === activeSectionId }">▾</span>
                </button>
                <ul
                  class="overflow-hidden pl-5 transition-all duration-300"
                  :class="section.id === activeSectionId ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'"
                >
                  <li v-for="item in section.items" :key="item.id" class="py-1">
                    <button
                      type="button"
                      class="text-xs text-slate-400 transition-colors hover:text-white"
                      @click="scrollTo(item.id)"
                    >
                      {{ item.label }}
                    </button>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </aside>

        <main class="space-y-16">
          <section
            v-for="section in sections"
            :key="section.id"
            :id="section.id"
            class="scroll-mt-24"
            :ref="(el) => setSectionRef(section.id, el)"
            :data-section="section.id"
          >
            <div class="mb-4 flex items-center gap-3">
              <span class="font-semibold text-accent-400/70">#</span>
              <h2 class="text-2xl font-semibold text-white lg:text-3xl">{{ section.title }}</h2>
            </div>

            <div
              v-if="section.contentHtml"
              class="max-w-3xl text-slate-300 leading-7 [&_p]:mt-3 [&_ul]:mt-3 [&_ol]:mt-3 [&_ul]:list-disc [&_ol]:list-decimal [&_ul]:pl-5 [&_ol]:pl-5 [&_li]:mt-1 [&_strong]:text-white [&_strong]:font-semibold [&_a]:text-accent-400 [&_a]:underline [&_a]:decoration-accent-400/40 [&_a:hover]:text-accent-300 [&_a:hover]:decoration-accent-400 [&_div[data-table]]:mt-4 [&_div[data-table]]:overflow-x-auto [&_div[data-table]]:rounded-xl [&_div[data-table]]:border [&_div[data-table]]:border-slate-800/70 [&_table]:w-full [&_thead]:bg-slate-900/60 [&_th]:px-3 [&_th]:py-2 [&_th]:text-left [&_th]:text-xs [&_th]:uppercase [&_th]:tracking-wide [&_th]:text-slate-300 [&_td]:border-t [&_td]:border-slate-800/70 [&_td]:px-3 [&_td]:py-2 [&_td]:text-sm [&_td]:text-slate-300"
              v-html="section.contentHtml"
            />

            <div class="max-w-3xl space-y-10">
              <template v-for="sub in section.subSections" :key="sub.id">
                <div
                  v-if="isArticle(sub.title)"
                  :id="getArticleId(section, sub)"
                  :class="getArticleClasses(section, sub)"
                >
                  <h3 class="flex flex-wrap items-baseline gap-3 text-base font-semibold text-slate-100">
                    <span class="text-accent-400">{{ getArticleNumber(sub.title) }}</span>
                    <span v-if="getArticleSuffix(sub.title)" class="font-medium text-slate-300">
                      {{ getArticleSuffix(sub.title) }}
                    </span>
                  </h3>
                  <div
                    class="text-slate-300 leading-7 [&_p]:mt-3 [&_ul]:mt-3 [&_ol]:mt-3 [&_ul]:list-disc [&_ol]:list-decimal [&_ul]:pl-5 [&_ol]:pl-5 [&_li]:mt-1 [&_strong]:text-white [&_strong]:font-semibold [&_a]:text-accent-400 [&_a]:underline [&_a]:decoration-accent-400/40 [&_a:hover]:text-accent-300 [&_a:hover]:decoration-accent-400 [&_div[data-table]]:mt-4 [&_div[data-table]]:overflow-x-auto [&_div[data-table]]:rounded-xl [&_div[data-table]]:border [&_div[data-table]]:border-slate-800/70 [&_table]:w-full [&_thead]:bg-slate-900/60 [&_th]:px-3 [&_th]:py-2 [&_th]:text-left [&_th]:text-xs [&_th]:uppercase [&_th]:tracking-wide [&_th]:text-slate-300 [&_td]:border-t [&_td]:border-slate-800/70 [&_td]:px-3 [&_td]:py-2 [&_td]:text-sm [&_td]:text-slate-300"
                    v-html="sub.contentHtml"
                  />
                </div>

                <div v-else class="mt-6 text-xs uppercase tracking-[0.2em] text-slate-500">
                  {{ sub.title }}
                </div>
              </template>
            </div>
          </section>
        </main>
      </div>
    </div>

    <button
      class="fixed bottom-6 right-6 z-30 inline-flex items-center gap-2 rounded-full bg-accent-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(0,0,0,0.4)] lg:hidden"
      @click="mobileOpen = true"
    >
      Obsah
    </button>

    <transition
      enter-active-class="transition-all duration-300"
      enter-from-class="opacity-0 translate-y-3"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-300"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-3"
    >
      <div v-if="mobileOpen" class="fixed inset-0 z-40">
        <div class="absolute inset-0 bg-[#020617]/80" @click="mobileOpen = false" />
        <div class="absolute bottom-0 left-0 right-0 max-h-[80vh] overflow-y-auto rounded-t-3xl border-t border-slate-800/60 bg-[#020617] p-6">
          <div class="mb-4 flex items-center justify-between text-sm font-semibold text-white">
            <div>Obsah</div>
            <button class="text-slate-400" @click="mobileOpen = false">Zavřít</button>
          </div>
          <nav class="space-y-6">
            <div v-for="section in tocSections" :key="section.id" class="space-y-2">
              <button class="text-left text-sm font-semibold text-slate-100" @click="scrollTo(section.id)">
                {{ section.title }}
              </button>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="item in section.items"
                  :key="item.id"
                  class="rounded-full bg-slate-800/60 px-3 py-1 text-xs text-slate-300"
                  @click="scrollTo(item.id)"
                >
                  {{ item.label }}
                </button>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue';
import termsRaw from '~/OBCHODNI_PODMINKY_ZAKLAD.txt?raw';

type SubSection = {
  id: string;
  title: string;
  contentHtml: string;
  rawContent: string;
};

type Section = {
  id: string;
  title: string;
  contentHtml: string;
  subSections: SubSection[];
};

type Preamble = {
  title: string;
  subtitle: string;
  meta: string[];
};

const EXPECTED_SECTIONS = [
  '1. ÚVODNÍ USTANOVENÍ',
  '2. DEFINICE POJMŮ',
  '3. SLUŽBY – OBECNÁ USTANOVENÍ',
  '4. UZAVŘENÍ SMLOUVY',
  '5. PLATEBNÍ PODMÍNKY',
  '6. SANKCE A SMLUVNÍ POKUTY',
  '7. SLA A TECHNICKÉ ZÁRUKY',
  '8. SPOLUPRÁCE',
  '9. LICENCE A AUTORSKÁ PRÁVA',
  '10. REKLAMACE A SERVIS',
  '11. UKONČENÍ SMLOUVY',
  '12. BEZPEČNOST DAT'
];

const stripMarkdownEmphasis = (text: string) => text.replace(/\*\*/g, '').replace(/\*/g, '').trim();

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const isLikelyTocLink = (line: string) => /^\[[^\]]+\]\(https?:\/\//.test(line.trim());

const normalizeLine = (line: string) => stripMarkdownEmphasis(line).replace(/^#+\s*/, '').trim();

const isSubSectionMarker = (line: string) => {
  const trimmed = line.trim();
  if (/^##+\s+/.test(trimmed)) return true;
  if (/^\d+\.\d+/.test(trimmed)) return true;
  return false;
};

const normalizeSubSectionTitle = (line: string) => {
  const trimmed = line.trim();
  if (trimmed.startsWith('##')) {
    return stripMarkdownEmphasis(trimmed.replace(/^##+\s+/, ''));
  }
  const dashMatch = trimmed.match(/^(\d+\.\d+)\s*[–-]\s*(.*)$/);
  if (dashMatch) {
    const num = dashMatch[1];
    const title = stripMarkdownEmphasis(dashMatch[2]);
    return title ? `${num} ${title}` : num;
  }
  const dotMatch = trimmed.match(/^(\d+\.)\s*(.*)$/);
  if (dotMatch) {
    const num = dotMatch[1];
    const title = stripMarkdownEmphasis(dotMatch[2]);
    return title ? `${num} ${title}` : num;
  }
  return stripMarkdownEmphasis(trimmed);
};

const shouldSkipLine = (line: string) => {
  const trimmed = line.trim();
  if (!trimmed) return false;
  if (trimmed === '---') return true;
  if (/^#(?!#)/.test(trimmed)) return true;
  return false;
};

const formatInline = (text: string) =>
  text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

const splitTableLine = (line: string) =>
  line
    .trim()
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split('|')
    .map((cell) => cell.trim());

const buildTableHtml = (headers: string[], rows: string[][]) => {
  const thead = headers.map((cell) => `<th>${formatInline(cell)}</th>`).join('');
  const tbody = rows
    .map((row) => `<tr>${row.map((cell) => `<td>${formatInline(cell)}</td>`).join('')}</tr>`)
    .join('');
  return `<div data-table><table>${`<thead><tr>${thead}</tr></thead>`}${`<tbody>${tbody}</tbody>`}</table></div>`;
};

const linesToHtml = (lines: string[]) => {
  const html: string[] = [];
  let listType: 'ul' | 'ol' | null = null;
  let listItems: string[] = [];

  const flushList = () => {
    if (!listType || listItems.length === 0) return;
    const tag = listType === 'ul' ? 'ul' : 'ol';
    html.push(`<${tag}>${listItems.map((item) => `<li>${formatInline(item)}</li>`).join('')}</${tag}>`);
    listType = null;
    listItems = [];
  };

  const isTableRow = (line: string) => line.trim().startsWith('|') && line.includes('|');

  for (let i = 0; i < lines.length; i += 1) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();

    if (shouldSkipLine(rawLine)) {
      flushList();
      continue;
    }

    if (!trimmed) {
      flushList();
      continue;
    }

    if (isTableRow(rawLine) && i + 1 < lines.length && lines[i + 1].includes('| ---')) {
      flushList();
      const headers = splitTableLine(rawLine);
      i += 2;
      const rows: string[][] = [];
      while (i < lines.length && isTableRow(lines[i])) {
        rows.push(splitTableLine(lines[i]));
        i += 1;
      }
      html.push(buildTableHtml(headers, rows));
      i -= 1;
      continue;
    }

    const isDashItem = /^-\s+/.test(trimmed);
    const isAlphaItem = /^[a-z]\)\s+/.test(trimmed);
    const isNumberItem = /^\d+\.\s+/.test(trimmed);

    if (isDashItem || isAlphaItem || isNumberItem) {
      const nextType = isDashItem || isAlphaItem ? 'ul' : 'ol';
      if (listType && listType !== nextType) {
        flushList();
      }
      listType = nextType;
      const content = trimmed.replace(/^(-\s+|[a-z]\)\s+|\d+\.\s+)/, '');
      listItems.push(content);
      continue;
    }

    flushList();
    html.push(`<p>${formatInline(trimmed)}</p>`);
  }

  flushList();
  return html.join('');
};

const parseSections = (raw: string) => {
  const lines = raw.split(/\r?\n/);
  const sections: Section[] = [];
  let currentSectionIndex = 0;
  let activeSectionTitle: string | null = null;
  let activeSectionBody: string[] = [];

  const preambleLines: string[] = [];
  let capturingPreamble = false;
  let parsingEnabled = !/https?:\/\/www\.notion\.so/.test(raw);
  let seenTocLinks = false;

  const flushSection = () => {
    if (!activeSectionTitle) return;
    const sectionId = slugify(activeSectionTitle);
    const introLines: string[] = [];
    const subSections: SubSection[] = [];
    const usedSubIds = new Map<string, number>();
    let activeSubTitle: string | null = null;
    let activeSubBody: string[] = [];

    const flushSub = () => {
      if (!activeSubTitle) return;
      const cleanTitle = normalizeSubSectionTitle(activeSubTitle);
      const numberMatch = cleanTitle.match(/^(\d+(?:\.\d+)*)/);
      const subIdKey = numberMatch ? numberMatch[1].replace(/\./g, '-') : slugify(cleanTitle) || 'sekce';
      const subIdBase = `sub-${sectionId}-${subIdKey}`;
      const seenSubCount = usedSubIds.get(subIdBase) ?? 0;
      usedSubIds.set(subIdBase, seenSubCount + 1);
      const id = seenSubCount === 0 ? subIdBase : `${subIdBase}-${seenSubCount + 1}`;
      subSections.push({
        id,
        title: cleanTitle || (numberMatch ? numberMatch[1] : 'Sekce'),
        contentHtml: linesToHtml(activeSubBody),
        rawContent: activeSubBody.join('\n')
      });
    };

    activeSectionBody.forEach((line) => {
      if (!activeSubTitle) {
        if (isSubSectionMarker(line)) {
          activeSubTitle = line;
          activeSubBody = [];
        } else if (!shouldSkipLine(line)) {
          introLines.push(line);
        }
      } else {
        if (isSubSectionMarker(line)) {
          flushSub();
          activeSubTitle = line;
          activeSubBody = [];
        } else if (!shouldSkipLine(line)) {
          activeSubBody.push(line);
        }
      }
    });

    flushSub();

    sections.push({
      id: sectionId,
      title: activeSectionTitle,
      contentHtml: linesToHtml(introLines),
      subSections
    });

    activeSectionTitle = null;
    activeSectionBody = [];
  };

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    if (isLikelyTocLink(line)) {
      seenTocLinks = true;
      continue;
    }

    if (
      !capturingPreamble &&
      preambleLines.length === 0 &&
      line.trim() === 'OBCHODNÍ PODMÍNKY' &&
      (seenTocLinks || parsingEnabled)
    ) {
      capturingPreamble = true;
      parsingEnabled = false;
      preambleLines.push(line);
      continue;
    }

    if (capturingPreamble) {
      const normalized = normalizeLine(line);
      if (normalized.toUpperCase().includes(EXPECTED_SECTIONS[0].toUpperCase())) {
        capturingPreamble = false;
        parsingEnabled = true;
      } else {
        if (!shouldSkipLine(line)) {
          preambleLines.push(line);
        }
        continue;
      }
    }

    if (!parsingEnabled) {
      continue;
    }

    const normalized = normalizeLine(line);

    if (currentSectionIndex < EXPECTED_SECTIONS.length) {
      const expectedTitle = EXPECTED_SECTIONS[currentSectionIndex];
      if (normalized.toUpperCase().includes(expectedTitle.toUpperCase())) {
        flushSection();
        activeSectionTitle = expectedTitle;
        currentSectionIndex += 1;
        continue;
      }
    }

    if (activeSectionTitle === '10. REKLAMACE A SERVIS' && currentSectionIndex === 10) {
      if (normalizeSubSectionTitle(line).includes('1. Úvodní ustanovení')) {
        flushSection();
        activeSectionTitle = EXPECTED_SECTIONS[10];
        activeSectionBody = [line];
        currentSectionIndex += 1;
        continue;
      }
    }

    if (activeSectionTitle === '12. BEZPEČNOST DAT') {
      if (normalizeSubSectionTitle(line).includes('1. Úvodní ustanovení')) break;
      if (normalized.includes('GDPR')) break;
    }

    if (activeSectionTitle) {
      activeSectionBody.push(line);
    }
  }

  flushSection();

  const cleanedPreamble = preambleLines.map((line) => line.trim()).filter(Boolean);
  const preambleTitle = cleanedPreamble[0] ? stripMarkdownEmphasis(cleanedPreamble[0]) : 'OBCHODNÍ PODMÍNKY';
  const preambleSubtitle = cleanedPreamble[1] ? stripMarkdownEmphasis(cleanedPreamble[1]) : '';
  const preambleMeta = cleanedPreamble.slice(2);

  return {
    sections,
    preamble: {
      title: preambleTitle,
      subtitle: preambleSubtitle,
      meta: preambleMeta
    } as Preamble
  };
};

const { sections, preamble } = parseSections(termsRaw);

const activeSectionId = ref(sections[0]?.id ?? '');
const mobileOpen = ref(false);
const sectionRefs = ref<Record<string, HTMLElement | null>>({});

const setSectionRef = (id: string, el: HTMLElement | null) => {
  if (el) sectionRefs.value[id] = el;
};

const isArticle = (title: string) => /^\d+\.\d+/.test(title);

const getArticleNumber = (title: string) => {
  const match = title.match(/^(\d+\.\d+)/);
  return match ? match[1] : title;
};

const getArticleSuffix = (title: string) => {
  const match = title.match(/^\d+\.\d+\s*(.*)$/);
  return match ? match[1].trim() : '';
};

const getArticleId = (section: Section, sub: SubSection) => {
  const match = sub.title.match(/^(\d+\.\d+)/);
  if (!match) return sub.id;
  return `${section.id}-${match[1].replace(/\./g, '-')}`;
};

const getHighlightType = (section: Section, sub: SubSection) => {
  const number = getArticleNumber(sub.title);
  if (section.title.startsWith('1.') && number === '4.5') return 'penalty';
  if (section.title.startsWith('6.') && number === '2.1') return 'penalty';
  if (section.title.startsWith('11.') && number === '11.2') return 'refund';
  if (section.title.startsWith('9.') && number === '4.4') return 'code';
  if (/0,1\s*%/.test(sub.rawContent)) return 'penalty';
  if (/200\.?\s?000/.test(sub.rawContent)) return 'code';
  if (section.title.startsWith('11.') && /nevratn/i.test(sub.rawContent)) return 'refund';
  return '';
};

const getArticleClasses = (section: Section, sub: SubSection) => {
  const highlight = getHighlightType(section, sub);
  if (!highlight) {
    return 'scroll-mt-24 border-l border-slate-800/60 pl-5';
  }
  return 'scroll-mt-24 rounded-xl border border-accent-500/40 bg-accent-500/10 px-5 py-4';
};

const tocSections = computed(() =>
  sections.map((section) => ({
    id: section.id,
    title: section.title,
    items: section.subSections
      .filter((sub) => isArticle(sub.title))
      .map((sub) => ({
        id: getArticleId(section, sub),
        label: sub.title
      }))
  }))
);

const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  mobileOpen.value = false;
  if (sections.some((section) => section.id === id)) {
    activeSectionId.value = id;
  }
};

let observer: IntersectionObserver | null = null;

onMounted(async () => {
  await nextTick();
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const sectionId = entry.target.getAttribute('data-section');
        if (sectionId) activeSectionId.value = sectionId;
      });
    },
    { rootMargin: '-25% 0px -55% 0px', threshold: 0 }
  );

  Object.values(sectionRefs.value).forEach((el) => {
    if (el) observer?.observe(el);
  });
});

onBeforeUnmount(() => {
  observer?.disconnect();
});
</script>
