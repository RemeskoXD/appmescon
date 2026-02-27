export type PartnerLogo = {
  src: string;
  alt: string;
};

// Loga jsou uložena v /public/images/partnes jako 8.svg–33.svg
export const partnerLogos = Array.from(
  { length: 26 },
  (_, i) => `https://web2.itnahodinu.cz/mescon/images/partnes/${i + 8}.svg`
);

const DEFAULT_ALT = "Partner logo";

export const partnerLogoItems: PartnerLogo[] = partnerLogos.map((src) => ({
  src,
  alt: DEFAULT_ALT
}));

const rotateArray = <T>(items: T[], offset: number): T[] => {
  if (!items.length) {
    return [];
  }
  const normalizedOffset = ((offset % items.length) + items.length) % items.length;
  if (!normalizedOffset) {
    return items;
  }
  return items.slice(normalizedOffset).concat(items.slice(0, normalizedOffset));
};

const createLogoItem = (src: string): HTMLDivElement => {
  const item = document.createElement("div");
  item.className = "partners-marquee__item";

  const img = document.createElement("img");
  img.className = "partners-marquee__logo";
  img.src = src;
  img.alt = DEFAULT_ALT;
  img.loading = "lazy";
  img.decoding = "async";
  img.draggable = false;

  item.appendChild(img);
  return item;
};

export const initPartnersMarquee = (root: HTMLElement | null): void => {
  if (!root || root.dataset.partnersMarqueeInit === "true") {
    return;
  }
  root.dataset.partnersMarqueeInit = "true";

  const rows = Array.from(
    root.querySelectorAll<HTMLElement>("[data-partners-marquee-row]")
  );
  if (!rows.length) {
    return;
  }

  const stride = Math.max(1, Math.floor(partnerLogos.length / rows.length));

  rows.forEach((row, rowIndex) => {
    const contentA = row.querySelector<HTMLElement>(
      '[data-partners-marquee-content="a"]'
    );
    const contentB = row.querySelector<HTMLElement>(
      '[data-partners-marquee-content="b"]'
    );

    if (!contentA || !contentB || contentA.dataset.partnersMarqueeFilled === "true") {
      return;
    }
    contentA.dataset.partnersMarqueeFilled = "true";

    const ordered = rotateArray(partnerLogos, rowIndex * stride);
    const items = ordered.map(createLogoItem);
    contentA.replaceChildren(...items);
    contentB.replaceChildren(
      ...items.map((item) => item.cloneNode(true) as HTMLElement)
    );
  });
};
