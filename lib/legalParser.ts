type HeadingInfo = {
  level: 2 | 3 | 4;
  text: string;
  isMain: boolean;
  origin: 'hash' | 'sub-number' | 'bold' | 'main-number';
};

export type LegalBlock =
  | { type: 'heading'; level: 2 | 3 | 4; text: string; html: string; id?: string }
  | { type: 'html'; html: string };

export type LegalSection = {
  id: string;
  title: string;
  blocks: LegalBlock[];
};

export type LegalDoc = {
  title: string;
  preamble: LegalBlock[];
  sections: LegalSection[];
  toc: { id: string; title: string }[];
};

export type ParseLegalOptions = {
  docId: number | string;
  allowedMainHeadings?: string[];
};

const HEADING_REGEX = /^(#{1,4})\s+(.*)$/;
const MAIN_HEADING_REGEX = /^\d+\.\s+\S+/;
const SUB_HEADING_REGEX = /^\d+\.\d+\s*[–-]\s+\S+/;
const BOLD_LINE_REGEX = /^\*\*(.+)\*\*$/;
const BOLD_NUMBERED_REGEX = /^\d+(?:\.\d+)?\s+\S+/;
const BOLD_LETTER_REGEX = /^[a-z]\)\s+\S+/i;

function stripMarkdownEmphasis(text: string) {
  return text.replace(/\*\*/g, '').replace(/\*/g, '').trim();
}

function stripMarkdownLinks(text: string) {
  return text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
}

function normalizeHeadingKey(text: string) {
  return stripMarkdownLinks(stripMarkdownEmphasis(text)).toLowerCase();
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function getHeadingInfo(line: string): HeadingInfo | null {
  const trimmed = line.trim();
  if (!trimmed) return null;

  const hashMatch = trimmed.match(HEADING_REGEX);
  if (hashMatch) {
    const rawText = hashMatch[2].trim();
    const cleanText = stripMarkdownEmphasis(rawText);
    const isMain = MAIN_HEADING_REGEX.test(cleanText);
    if (isMain) {
      return { level: 2, text: rawText, isMain: true, origin: 'hash' };
    }
    const mapped = Math.min(4, hashMatch[1].length + 1) as 2 | 3 | 4;
    const level = (mapped === 2 ? 3 : mapped) as 3 | 4;
    return { level, text: rawText, isMain: false, origin: 'hash' };
  }

  if (SUB_HEADING_REGEX.test(trimmed)) {
    return { level: 3, text: trimmed, isMain: false, origin: 'sub-number' };
  }

  const boldMatch = trimmed.match(BOLD_LINE_REGEX);
  if (boldMatch) {
    const rawText = boldMatch[1].trim();
    const cleanText = stripMarkdownEmphasis(rawText);
    if (BOLD_NUMBERED_REGEX.test(cleanText) || BOLD_LETTER_REGEX.test(cleanText)) {
      return { level: 3, text: trimmed, isMain: false, origin: 'bold' };
    }
  }

  if (MAIN_HEADING_REGEX.test(trimmed)) {
    return { level: 2, text: trimmed, isMain: true, origin: 'main-number' };
  }

  return null;
}

function escapeHtml(text: string) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\"/g, '&quot;');
}

function renderInlineMarkdown(text: string) {
  const escaped = escapeHtml(text);
  const withLinks = escaped.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2">$1</a>'
  );
  const withBold = withLinks.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  return withBold.replace(/(^|[^*])\*(?!\s)([^*]+?)\*(?!\*)/g, '$1<em>$2</em>');
}

function makeUniqueId(base: string, usedIds: Map<string, number>) {
  const current = usedIds.get(base) ?? 0;
  usedIds.set(base, current + 1);
  return current === 0 ? base : `${base}-${current + 1}`;
}

function isNotionTocLink(line: string) {
  return (
    /^\[[^\]]+\]\(https?:\/\/[^)]+\)$/.test(line.trim()) &&
    line.includes('notion.so')
  );
}

export function parseLegalText(text: string, options: ParseLegalOptions): LegalDoc {
  const lines = text.replace(/\r\n/g, '\n').split('\n');
  let title = '';
  let startIndex = 0;

  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim()) {
      title = lines[i].trim();
      startIndex = i + 1;
      break;
    }
  }

  const preamble: LegalBlock[] = [];
  const sections: LegalSection[] = [];
  const toc: { id: string; title: string }[] = [];
  const usedIds = new Map<string, number>();
  const allowedMainKeys = options.allowedMainHeadings
    ? new Set(options.allowedMainHeadings.map(normalizeHeadingKey))
    : null;
  const allowedMainOrder = options.allowedMainHeadings
    ? new Map(
        options.allowedMainHeadings.map((heading, index) => [
          normalizeHeadingKey(heading),
          index,
        ])
      )
    : null;
  const usedMainHeadings = new Set<string>();
  let lastAllowedIndex = -1;

  let currentSection: LegalSection | null = null;
  let paragraphLines: string[] = [];

  const pushBlock = (block: LegalBlock) => {
    if (currentSection) {
      currentSection.blocks.push(block);
    } else {
      preamble.push(block);
    }
  };

  const flushParagraph = () => {
    if (paragraphLines.length === 0) return;
    const raw = paragraphLines.join('\n');
    if (!raw.trim()) {
      paragraphLines = [];
      return;
    }
    const html = renderInlineMarkdown(raw);
    pushBlock({ type: 'html', html });
    paragraphLines = [];
  };

  const docKey = String(options.docId);

  for (let i = startIndex; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    if (!trimmed) {
      flushParagraph();
      continue;
    }

    if (!currentSection && isNotionTocLink(trimmed)) {
      flushParagraph();
      continue;
    }

    if (trimmed === '---') {
      flushParagraph();
      pushBlock({ type: 'html', html: '<hr />' });
      continue;
    }

    const rawHeading = getHeadingInfo(line);
    const isAllowedMain =
      !allowedMainKeys || (rawHeading && allowedMainKeys.has(normalizeHeadingKey(rawHeading.text)));
    let headingInfo: HeadingInfo | null =
      rawHeading && rawHeading.isMain && !isAllowedMain
        ? { ...rawHeading, isMain: false, level: 3 as 3 }
        : rawHeading;

    if (headingInfo && headingInfo.isMain && allowedMainOrder) {
      const headingKey = normalizeHeadingKey(headingInfo.text);
      const allowedIndex = allowedMainOrder.get(headingKey);
      const alreadyUsed = usedMainHeadings.has(headingKey);
      const outOfOrder =
        typeof allowedIndex === 'number' && lastAllowedIndex !== -1 && allowedIndex < lastAllowedIndex;

      if (!allowedMainKeys?.has(headingKey) || alreadyUsed || outOfOrder) {
        headingInfo = {
          ...headingInfo,
          isMain: false,
          level: Math.max(3, headingInfo.level) as 3 | 4,
        };
      }
    }

    const downgradedMain =
      rawHeading?.origin === 'main-number' &&
      headingInfo &&
      !headingInfo.isMain &&
      currentSection;
    if (downgradedMain) {
      headingInfo = null;
    }

    if (headingInfo) {
      flushParagraph();

      if (headingInfo.isMain) {
        const currentKey = currentSection ? normalizeHeadingKey(currentSection.title) : '';
        const nextKey = normalizeHeadingKey(headingInfo.text);

        if (!currentSection || currentKey !== nextKey) {
          const sectionId = `clanek-${docKey}-${sections.length + 1}`;
          currentSection = {
            id: sectionId,
            title: headingInfo.text,
            blocks: [],
          };
          sections.push(currentSection);
          toc.push({
            id: sectionId,
            title: stripMarkdownLinks(stripMarkdownEmphasis(headingInfo.text)),
          });
          usedMainHeadings.add(nextKey);
          const orderIndex = allowedMainOrder?.get(nextKey);
          if (typeof orderIndex === 'number') {
            lastAllowedIndex = orderIndex;
          }
          currentSection.blocks.push({
            type: 'heading',
            level: 2,
            text: headingInfo.text,
            html: renderInlineMarkdown(headingInfo.text),
          });
          continue;
        }
      }

      const baseSlug = slugify(stripMarkdownLinks(stripMarkdownEmphasis(headingInfo.text))) || 'sekce';
      const parentId = currentSection ? currentSection.id : `preamble-${docKey}`;
      const headingId = makeUniqueId(`${parentId}-${baseSlug}`, usedIds);
      const level: 2 | 3 | 4 = headingInfo.isMain ? (3 as 3) : headingInfo.level;
      pushBlock({
        type: 'heading',
        level,
        text: headingInfo.text,
        html: renderInlineMarkdown(headingInfo.text),
        id: headingId,
      });
      continue;
    }

    paragraphLines.push(line);
  }

  flushParagraph();

  return {
    title,
    preamble,
    sections,
    toc,
  };
}
