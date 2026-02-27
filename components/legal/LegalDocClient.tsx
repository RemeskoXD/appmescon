"use client";

import { useEffect, useMemo, useState } from 'react';
import { cn } from '@/lib/utils';
import type { LegalDoc, LegalSection, LegalBlock } from '@/lib/legalParser';
import styles from './LegalDoc.module.css';

type LegalDocClientProps = {
  doc: LegalDoc;
};

type SubHeading = {
  id: string;
  html: string;
  level: 3 | 4;
};

type SectionMeta = {
  id: string;
  title: string;
  titleHtml: string;
  subHeadings: SubHeading[];
};

function getSectionMeta(section: LegalSection): SectionMeta {
  const mainHeading = section.blocks.find(
    (block) => block.type === 'heading' && block.level === 2
  );
  const subHeadings: SubHeading[] = [];

  section.blocks.forEach((block) => {
    if (block.type !== 'heading' || !block.id) return;
    if (block.level === 2) return;
    subHeadings.push({
      id: block.id,
      html: block.html,
      level: block.level,
    });
  });

  return {
    id: section.id,
    title: section.title,
    titleHtml: mainHeading && mainHeading.type === 'heading' ? mainHeading.html : section.title,
    subHeadings,
  };
}

function renderBlock(block: LegalBlock, sectionId?: string, index?: number) {
  if (block.type === 'heading') {
    const Tag = block.level === 2 ? 'h2' : block.level === 3 ? 'h3' : 'h4';
    const headingId = block.level === 2 && sectionId ? undefined : block.id;

    return (
      <Tag
        key={`${block.type}-${block.level}-${headingId ?? index}`}
        id={headingId}
        className={styles[`h${block.level}`]}
        dangerouslySetInnerHTML={{ __html: block.html }}
      />
    );
  }

  return (
    <div
      key={`${block.type}-${index}`}
      className={styles.textBlock}
      dangerouslySetInnerHTML={{ __html: block.html }}
    />
  );
}

function renderSectionBlocks(section: LegalSection) {
  return section.blocks.map((block, index) => renderBlock(block, section.id, index));
}

export default function LegalDocClient({ doc }: LegalDocClientProps) {
  const sectionsMeta = useMemo(
    () => doc.sections.map((section) => getSectionMeta(section)),
    [doc.sections]
  );

  const [activeSectionId, setActiveSectionId] = useState(
    sectionsMeta[0]?.id ?? ''
  );
  const [activeSubId, setActiveSubId] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const activeSection =
    sectionsMeta.find((section) => section.id === activeSectionId) ??
    sectionsMeta[0];

  useEffect(() => {
    if (!sectionsMeta.length) return;

    const sectionIds = sectionsMeta.map((section) => section.id);
    const subIds = sectionsMeta.flatMap((section) =>
      section.subHeadings.map((sub) => sub.id)
    );
    const subIdSet = new Set(subIds);
    const sectionIdSet = new Set(sectionIds);
    const subToSection = new Map<string, string>();

    sectionsMeta.forEach((section) => {
      section.subHeadings.forEach((sub) => {
        subToSection.set(sub.id, section.id);
      });
    });

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (!visible.length) return;

        visible.sort(
          (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
        );
        const id = visible[0].target.id;

        if (subIdSet.has(id)) {
          setActiveSubId((prev) => (prev === id ? prev : id));
          const parentId = subToSection.get(id);
          if (parentId) {
            setActiveSectionId((prev) => (prev === parentId ? prev : parentId));
          }
          return;
        }

        if (sectionIdSet.has(id)) {
          setActiveSectionId((prev) => (prev === id ? prev : id));
          setActiveSubId('');
        }
      },
      {
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0,
      }
    );

    [...sectionIds, ...subIds].forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sectionsMeta]);

  const scrollToId = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleTocClick = (id: string) => {
    setActiveSectionId(id);
    setActiveSubId('');
    setDrawerOpen(true);
    scrollToId(id);
  };

  const handleSubClick = (id: string) => {
    scrollToId(id);
    if (window.matchMedia('(max-width: 900px)').matches) {
      setDrawerOpen(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.document}>
        <a id="top" className={styles.anchorTop} aria-hidden="true" />
        <header className={styles.header}>
          <h1 className={styles.h1}>{doc.title}</h1>
        </header>

        <nav className={styles.toc} aria-label="Obsah">
          <h2 className={styles.tocTitle}>Obsah</h2>
          <ol className={styles.tocList}>
            {doc.toc.map((item) => (
              <li key={item.id} className={styles.tocItem}>
                <a
                  href={`#${item.id}`}
                  onClick={(event) => {
                    event.preventDefault();
                    handleTocClick(item.id);
                  }}
                  className={cn(
                    styles.tocLink,
                    activeSectionId === item.id && styles.tocLinkActive
                  )}
                  aria-current={activeSectionId === item.id ? 'true' : undefined}
                >
                  {item.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className={styles.layout}>
          <aside
            className={cn(
              styles.sidebar,
              drawerOpen && styles.sidebarOpen
            )}
            aria-label="Navigace sekce"
          >
            <div className={styles.sidebarHeader}>
              <span
                className={styles.sidebarTitle}
                dangerouslySetInnerHTML={{
                  __html: activeSection?.titleHtml ?? '',
                }}
              />
              <button
                type="button"
                className={styles.sidebarClose}
                onClick={() => setDrawerOpen(false)}
              >
                Zavřít
              </button>
            </div>
            {activeSection?.subHeadings.length ? (
              <div className={styles.sidebarList}>
                {activeSection.subHeadings.map((sub) => (
                  <button
                    key={sub.id}
                    type="button"
                    onClick={() => handleSubClick(sub.id)}
                    className={cn(
                      styles.sidebarItem,
                      sub.level === 4 && styles.sidebarItemIndented,
                      activeSubId === sub.id && styles.sidebarItemActive
                    )}
                    aria-current={activeSubId === sub.id ? 'true' : undefined}
                  >
                    <span dangerouslySetInnerHTML={{ __html: sub.html }} />
                  </button>
                ))}
              </div>
            ) : null}
          </aside>

          <div
            className={cn(
              styles.drawerOverlay,
              drawerOpen && styles.drawerOverlayVisible
            )}
            onClick={() => setDrawerOpen(false)}
          />

          <main className={styles.content}>
            {doc.preamble.length > 0 && (
              <section className={styles.section}>
                <article className={styles.article}>
                  {doc.preamble.map((block, index) =>
                    renderBlock(block, undefined, index)
                  )}
                </article>
              </section>
            )}
            {doc.sections.map((section) => (
              <section key={section.id} id={section.id} className={styles.section}>
                <article className={styles.article}>
                  {renderSectionBlocks(section)}
                </article>
                <a href="#top" className={styles.backToTop}>
                  Zpět nahoru
                </a>
              </section>
            ))}
          </main>
        </div>
      </div>
    </div>
  );
}
