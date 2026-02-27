import fs from 'fs';

const parsed = JSON.parse(fs.readFileSync('tmp_sections.json', 'utf8'));

const sectionOne = {
  id: '1-uvodni-ustanoveni',
  title: '1. ÚVODNÍ USTANOVENÍ',
  contentHtml: '',
  subSections: [
    {
      id: 'sub-1-uvodni-ustanoveni-1-1',
      title: '1.1',
      contentHtml: '<p>Tyto obchodní podmínky (dále jen “<strong>Obchodní podmínky</strong>”) upravují v souladu s § 1751 odst. 1 zákona č. 89/2012 Sb., občanský zákoník (dále jen “<strong>občanský zákoník</strong>”), vzájemná práva a povinnosti mezi Poskytovatelem a jeho klienty (dále jen “<strong>Klient</strong>”) při poskytování služeb Poskytovatele, zejména v oblasti tvorby webových stránek, e-shopů, webových aplikací, marketingových funnelů, správy PPC kampaní a grafického designu.</p>'
    },
    {
      id: 'sub-1-uvodni-ustanoveni-1-2',
      title: '1.2',
      contentHtml: '<p>Obchodní podmínky tvoří nedílnou součást smlouvy uzavírané mezi Poskytovatelem a Klientem, a to bez ohledu na to, zda jde o smlouvu uzavřenou v listinné podobě, elektronicky (e-mailem, přes webový formulář) nebo jiným prokazatelným způsobem (dále jen “<strong>Smlouva</strong>”).</p>'
    },
    {
      id: 'sub-1-uvodni-ustanoveni-1-3',
      title: '1.3',
      contentHtml: '<p>Odchylná ujednání ve Smlouvě mají přednost před zněním těchto Obchodních podmínek. Ujednání v individuální cenové nabídce nebo projektové specifikaci mají přednost před obecnými ustanoveními těchto Obchodních podmínek, není-li výslovně ujednáno jinak.</p>'
    },
    {
      id: 'sub-1-uvodni-ustanoveni-1-4',
      title: '1.4',
      contentHtml: '<p>Znění Obchodních podmínek může Poskytovatel jednostranně měnit. Pro již uzavřené Smlouvy je vždy rozhodné znění účinné ke dni uzavření dané Smlouvy, ledaže se smluvní strany výslovně dohodnou na použití novější verze.</p>'
    },
    {
      id: 'sub-1-uvodni-ustanoveni-1-5',
      title: '1.5',
      contentHtml: '<p>Klientem se rozumí jak fyzická, tak právnická osoba, a to bez ohledu na to, zda vystupuje v postavení podnikatele (B2B), či nepodnikatele (spotřebitele). Je-li Klient spotřebitelem, použijí se vedle těchto Obchodních podmínek rovněž kogentní ustanovení právních předpisů na ochranu spotřebitele.</p>'
    }
  ]
};

const paymentInsert = {
  id: 'sub-5-platebni-podminky-4-5',
  title: '4.5 Prodlení s platbou a smluvní pokuta za pozdní úhradu',
  contentHtml: '<ol>\n<li>V případě prodlení Klienta s úhradou jakékoli částky je Poskytovatel oprávněn:\n<ul>\n<li>pozastavit veškeré práce a poskytování služeb do okamžiku úhrady,</li>\n<li>jednostranně prodloužit veškeré sjednané termíny dodání o dobu prodlení Klienta,</li>\n<li>požadovat smluvní pokutu ve výši <strong>0,1 % z dlužné částky za každý i započatý den prodlení</strong>, minimálně však <strong>[např. 500 Kč]</strong>.</li>\n</ul>\n</li>\n<li>Uplatnění smluvní pokuty nemá vliv na právo Poskytovatele na náhradu škody v plné výši.</li>\n</ol>'
};

const sections = [sectionOne, ...parsed];
const paymentSection = sections.find((section) => section.title.startsWith('5. PLATEBNÍ PODMÍNKY'));
if (paymentSection) {
  paymentSection.subSections.unshift(paymentInsert);
}

const sectionsJson = JSON.stringify(sections, null, 2);

const vueFile = `<template>
  <div class="terms-page">
    <div class="terms-bg" aria-hidden="true">
      <div class="terms-bg__glow terms-bg__glow--top" />
      <div class="terms-bg__glow terms-bg__glow--mid" />
      <div class="terms-bg__glow terms-bg__glow--bottom" />
      <div class="terms-bg__grid" />
    </div>

    <div class="terms-container">
      <header class="terms-hero">
        <div class="terms-hero__badge">Obchodní podmínky</div>
        <h1 class="terms-hero__title">Právní rámec spolupráce s MESCON DIGITAL</h1>
        <p class="terms-hero__subtitle">
          Tyto obchodní podmínky upravují vztahy mezi společností <strong>MESCON DIGITAL s.r.o.</strong> a jejími klienty
          při poskytování digitálních služeb, vývoje a designu.
        </p>

        <div class="terms-hero__meta">
          <div class="terms-card">
            <div class="terms-card__label">Poskytovatel</div>
            <div class="terms-card__title">MESCON DIGITAL s.r.o.</div>
            <div class="terms-card__text">Příčná 1892/4, 110 00 Praha – Nové Město</div>
            <div class="terms-card__text">IČO: 23580763</div>
            <div class="terms-card__text">OR: Městský soud v Praze, oddíl C, vložka [doplní se]</div>
          </div>
          <div class="terms-card">
            <div class="terms-card__label">Kontakty &amp; verze</div>
            <div class="terms-card__text">E-mail: info@mescon.cz</div>
            <div class="terms-card__text">Telefon: +420 722 171 131</div>
            <div class="terms-card__text">Platnost: 1. 1. 2025</div>
            <div class="terms-card__text">Verze: 1.0</div>
          </div>
        </div>
      </header>

      <div class="terms-layout">
        <aside class="terms-sidebar">
          <div class="terms-sidebar__inner">
            <div class="terms-sidebar__title">Obsah</div>
            <nav class="terms-sidebar__nav">
              <div v-for="section in tocSections" :key="section.id" class="terms-sidebar__group">
                <button
                  type="button"
                  class="terms-sidebar__link"
                  :class="{ 'terms-sidebar__link--active': section.id === activeSectionId }"
                  @click="scrollTo(section.id)"
                >
                  <span>{{ section.title }}</span>
                  <span class="terms-sidebar__chevron" :class="{ 'terms-sidebar__chevron--open': section.id === activeSectionId }">▾</span>
                </button>
                <ul
                  class="terms-sidebar__sublist"
                  :class="section.id === activeSectionId ? 'terms-sidebar__sublist--open' : 'terms-sidebar__sublist--closed'"
                >
                  <li v-for="item in section.items" :key="item.id" class="terms-sidebar__subitem">
                    <button type="button" class="terms-sidebar__sublink" @click="scrollTo(item.id)">
                      {{ item.label }}
                    </button>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </aside>

        <main class="terms-content">
          <section
            v-for="section in sections"
            :key="section.id"
            :id="section.id"
            class="terms-section"
            :ref="(el) => setSectionRef(section.id, el)"
            :data-section="section.id"
          >
            <div class="terms-section__heading">
              <span class="terms-section__marker">#</span>
              <h2 class="terms-section__title">{{ section.title }}</h2>
            </div>

            <div v-if="section.contentHtml" class="terms-body" v-html="section.contentHtml" />

            <div class="terms-articles">
              <template v-for="sub in section.subSections" :key="sub.id">
                <div v-if="isArticle(sub.title)" :id="getArticleId(section, sub)" class="terms-article">
                  <h3 class="terms-article__title">
                    <span class="terms-article__number">{{ getArticleNumber(sub.title) }}</span>
                    <span v-if="getArticleSuffix(sub.title)" class="terms-article__suffix">{{ getArticleSuffix(sub.title) }}</span>
                  </h3>
                  <div class="terms-body" v-html="sub.contentHtml" />

                  <div v-if="getCallout(section.title, sub.title)" class="terms-callout">
                    <div class="terms-callout__dot" />
                    <div class="terms-callout__content" v-html="getCallout(section.title, sub.title)" />
                  </div>
                </div>

                <div v-else class="terms-subheading">
                  {{ sub.title }}
                </div>
              </template>
            </div>
          </section>
        </main>
      </div>
    </div>

    <button class="terms-mobile-toggle" @click="mobileOpen = true">Obsah</button>

    <transition name="terms-fade">
      <div v-if="mobileOpen" class="terms-mobile">
        <div class="terms-mobile__backdrop" @click="mobileOpen = false" />
        <div class="terms-mobile__panel">
          <div class="terms-mobile__header">
            <div>Obsah</div>
            <button class="terms-mobile__close" @click="mobileOpen = false">Zavřít</button>
          </div>
          <nav class="terms-mobile__nav">
            <div v-for="section in tocSections" :key="section.id" class="terms-mobile__group">
              <button class="terms-mobile__section" @click="scrollTo(section.id)">{{ section.title }}</button>
              <div class="terms-mobile__items">
                <button
                  v-for="item in section.items"
                  :key="item.id"
                  class="terms-mobile__item"
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

type SubSection = {
  id: string;
  title: string;
  contentHtml: string;
};

type Section = {
  id: string;
  title: string;
  contentHtml: string;
  subSections: SubSection[];
};

const rawSections: Section[] = ${sectionsJson};

const sections = rawSections;
const activeSectionId = ref(sections[0]?.id ?? '');
const mobileOpen = ref(false);
const sectionRefs = ref<Record<string, HTMLElement | null>>({});

const setSectionRef = (id: string, el: HTMLElement | null) => {
  if (el) {
    sectionRefs.value[id] = el;
  }
};

const isArticle = (title: string) => /^\d+\.\d+/.test(title);

const getArticleNumber = (title: string) => {
  const match = title.match(/^(\d+\.\d+)/);
  return match ? match[1] : title;
};

const getArticleSuffix = (title: string) => {
  const match = title.match(/^\d+\.\d+\s+(.*)$/);
  return match ? match[1] : '';
};

const getArticleId = (section: Section, sub: SubSection) => {
  const match = sub.title.match(/^(\d+\.\d+)/);
  if (!match) return sub.id;
  return 'cl-' + section.id + '-' + match[1].replace(/\./g, '-');
};

const tocSections = computed(() =>
  sections.map((section) => ({
    id: section.id,
    title: section.title,
    items: section.subSections
      .filter((sub) => isArticle(sub.title))
      .map((sub) => ({
        id: getArticleId(section, sub),
        label: sub.title,
      })),
  }))
);

const calloutMap: Record<string, string> = {
  '5. PLATEBNÍ PODMÍNKY|4.5': '<strong>Smluvní pokuta:</strong> 0,1 % z dlužné částky za každý i započatý den prodlení.',
  '6. SANKCE A SMLUVNÍ POKUTY|3.1': '<strong>Stojné:</strong> 1 000 Kč za každý i započatý týden prodlení Klienta s poskytnutím součinnosti.',
  '9. LICENCE A AUTORSKÁ PRÁVA|4.4': '<strong>Smluvní pokuta:</strong> až 200 000 Kč za neoprávněný zásah do zdrojového kódu.',
  '11. UKONČENÍ SMLOUVY|11.2': '<strong>Nevratnost plateb:</strong> veškeré uhrazené částky se Klientovi nevrací.'
};

const getCallout = (sectionTitle: string, subTitle: string) => {
  const match = subTitle.match(/^(\d+\.\d+)/);
  if (!match) return '';
  return calloutMap[sectionTitle + '|' + match[1]] || '';
};

const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  mobileOpen.value = false;
};

let observer: IntersectionObserver | null = null;

onMounted(async () => {
  await nextTick();
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute('data-section');
          if (sectionId) {
            activeSectionId.value = sectionId;
          }
        }
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

<style scoped>
:global(html) {
  scroll-behavior: smooth;
}

.terms-page {
  position: relative;
  min-height: 100vh;
  background: #020420;
  color: #e2e8f0;
  font-family: "Sora", "Space Grotesk", "IBM Plex Sans", sans-serif;
  overflow: hidden;
}

.terms-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}

.terms-bg__glow {
  position: absolute;
  border-radius: 999px;
  filter: blur(120px);
  opacity: 0.45;
}

.terms-bg__glow--top {
  top: -180px;
  right: -120px;
  width: 520px;
  height: 520px;
  background: rgba(0, 220, 130, 0.25);
}

.terms-bg__glow--mid {
  top: 20%;
  left: 12%;
  width: 420px;
  height: 420px;
  background: rgba(0, 220, 130, 0.16);
}

.terms-bg__glow--bottom {
  bottom: -200px;
  left: 35%;
  width: 520px;
  height: 520px;
  background: rgba(20, 140, 255, 0.2);
}

.terms-bg__grid {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(rgba(0, 220, 130, 0.15) 1px, transparent 0);
  background-size: 36px 36px;
  opacity: 0.18;
}

.terms-container {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 64px 24px 96px;
}

.terms-hero {
  max-width: 760px;
  margin: 0 auto 72px;
  text-align: center;
}

.terms-hero__badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 6px 14px;
  border-radius: 999px;
  border: 1px solid rgba(0, 220, 130, 0.4);
  color: #00dc82;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  margin-bottom: 18px;
  background: rgba(0, 220, 130, 0.08);
}

.terms-hero__title {
  font-size: clamp(2.4rem, 4vw, 3.4rem);
  line-height: 1.1;
  color: #f8fafc;
  margin-bottom: 20px;
  font-weight: 600;
}

.terms-hero__subtitle {
  font-size: 1.05rem;
  line-height: 1.8;
  color: #b7c1d6;
}

.terms-hero__meta {
  margin-top: 32px;
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
}

.terms-card {
  padding: 16px 18px;
  border-radius: 16px;
  border: 1px solid rgba(148, 163, 184, 0.2);
  background: rgba(6, 9, 32, 0.7);
  text-align: left;
}

.terms-card__label {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: #00dc82;
  margin-bottom: 6px;
}

.terms-card__title {
  font-weight: 600;
  color: #f8fafc;
  margin-bottom: 4px;
}

.terms-card__text {
  font-size: 0.9rem;
  color: #b7c1d6;
  line-height: 1.6;
}

.terms-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 48px;
}

.terms-sidebar {
  display: none;
}

.terms-sidebar__inner {
  position: sticky;
  top: 96px;
  padding-right: 12px;
  max-height: calc(100vh - 120px);
  overflow-y: auto;
}

.terms-sidebar__title {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: #94a3b8;
  margin-bottom: 18px;
}

.terms-sidebar__nav {
  border-left: 1px solid rgba(148, 163, 184, 0.2);
}

.terms-sidebar__group {
  margin-bottom: 8px;
}

.terms-sidebar__link {
  width: 100%;
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 8px 16px;
  border-left: 2px solid transparent;
  background: transparent;
  color: #cbd5f5;
  font-size: 0.9rem;
  transition: all 0.25s ease;
}

.terms-sidebar__link--active {
  border-left-color: #00dc82;
  color: #00dc82;
  background: rgba(0, 220, 130, 0.08);
}

.terms-sidebar__chevron {
  transition: transform 0.25s ease;
  color: inherit;
}

.terms-sidebar__chevron--open {
  transform: rotate(180deg);
}

.terms-sidebar__sublist {
  overflow: hidden;
  transition: all 0.3s ease;
  padding-left: 18px;
}

.terms-sidebar__sublist--closed {
  max-height: 0;
  opacity: 0;
  pointer-events: none;
}

.terms-sidebar__sublist--open {
  max-height: 2000px;
  opacity: 1;
  pointer-events: auto;
}

.terms-sidebar__subitem {
  margin: 6px 0;
}

.terms-sidebar__sublink {
  background: transparent;
  color: #94a3b8;
  font-size: 0.82rem;
  transition: color 0.2s ease;
}

.terms-sidebar__sublink:hover {
  color: #e2e8f0;
}

.terms-content {
  display: flex;
  flex-direction: column;
  gap: 72px;
}

.terms-section {
  scroll-margin-top: 120px;
}

.terms-section__heading {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}

.terms-section__marker {
  color: rgba(0, 220, 130, 0.6);
  font-weight: 600;
}

.terms-section__title {
  font-size: clamp(1.6rem, 2.6vw, 2.2rem);
  color: #f8fafc;
  font-weight: 600;
}

.terms-articles {
  display: flex;
  flex-direction: column;
  gap: 28px;
  max-width: 48rem;
}

.terms-article {
  padding-left: 20px;
  border-left: 1px solid rgba(148, 163, 184, 0.2);
  scroll-margin-top: 120px;
}

.terms-article__title {
  font-size: 1.05rem;
  color: #e2e8f0;
  font-weight: 600;
  display: flex;
  gap: 10px;
  align-items: baseline;
  margin-bottom: 8px;
}

.terms-article__number {
  color: #00dc82;
}

.terms-article__suffix {
  color: #cbd5f5;
  font-weight: 500;
}

.terms-subheading {
  font-size: 0.95rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #94a3b8;
  margin-top: 18px;
}

.terms-body p {
  color: #cbd5f5;
  line-height: 1.8;
  margin-top: 12px;
}

.terms-body ul,
.terms-body ol {
  margin-top: 12px;
  padding-left: 20px;
  color: #cbd5f5;
  line-height: 1.8;
}

.terms-body ul {
  list-style: disc;
}

.terms-body ol {
  list-style: decimal;
}

.terms-body strong {
  color: #f8fafc;
  font-weight: 600;
}

.terms-callout {
  margin-top: 16px;
  padding: 16px 18px;
  border-radius: 14px;
  border: 1px solid rgba(0, 220, 130, 0.4);
  background: rgba(0, 220, 130, 0.08);
  display: flex;
  gap: 12px;
  align-items: flex-start;
  color: #e2e8f0;
  font-size: 0.95rem;
}

.terms-callout__dot {
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: #00dc82;
  margin-top: 6px;
  flex-shrink: 0;
}

.terms-callout__content strong {
  color: #f8fafc;
}

.terms-mobile-toggle {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 30;
  background: #00dc82;
  color: #02130a;
  border-radius: 999px;
  padding: 12px 18px;
  font-weight: 600;
  border: none;
  box-shadow: 0 12px 24px rgba(0, 220, 130, 0.25);
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.terms-mobile {
  position: fixed;
  inset: 0;
  z-index: 40;
}

.terms-mobile__backdrop {
  position: absolute;
  inset: 0;
  background: rgba(2, 4, 32, 0.7);
}

.terms-mobile__panel {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  max-height: 80vh;
  background: #050628;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  padding: 24px;
  overflow-y: auto;
}

.terms-mobile__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  color: #f8fafc;
  margin-bottom: 16px;
}

.terms-mobile__close {
  background: transparent;
  border: none;
  color: #94a3b8;
}

.terms-mobile__group {
  margin-bottom: 18px;
}

.terms-mobile__section {
  font-weight: 600;
  color: #e2e8f0;
  margin-bottom: 8px;
  background: transparent;
  border: none;
  text-align: left;
}

.terms-mobile__items {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.terms-mobile__item {
  font-size: 0.85rem;
  background: rgba(148, 163, 184, 0.12);
  border: none;
  color: #cbd5f5;
  padding: 6px 10px;
  border-radius: 999px;
}

.terms-fade-enter-active,
.terms-fade-leave-active {
  transition: all 0.3s ease;
}

.terms-fade-enter-from,
.terms-fade-leave-to {
  opacity: 0;
}

@media (min-width: 1024px) {
  .terms-layout {
    grid-template-columns: 280px minmax(0, 1fr);
    gap: 64px;
  }

  .terms-sidebar {
    display: block;
  }

  .terms-mobile-toggle {
    display: none;
  }
}
</style>
`;

fs.writeFileSync('pages/obchodni-podminky.vue', vueFile);
