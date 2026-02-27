"use client";

import { useEffect, useRef } from "react";
import { initPartnersMarquee } from "../../js/partners-marquee";

export default function PartnersMarqueeBackground() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    initPartnersMarquee(rootRef.current);
  }, []);

  return (
    <div ref={rootRef} className="partners-marquee-bg" aria-hidden="true">
      <div className="partners-marquee">
        <div
          className="partners-marquee__row partners-marquee__row--1 partners-marquee__row--reverse"
          data-partners-marquee-row
        >
          <div className="partners-marquee__track">
            <div className="partners-marquee__row-content" data-partners-marquee-content="a" />
            <div
              className="partners-marquee__row-content"
              data-partners-marquee-content="b"
              aria-hidden="true"
            />
          </div>
        </div>

        <div className="partners-marquee__row partners-marquee__row--2" data-partners-marquee-row>
          <div className="partners-marquee__track">
            <div className="partners-marquee__row-content" data-partners-marquee-content="a" />
            <div
              className="partners-marquee__row-content"
              data-partners-marquee-content="b"
              aria-hidden="true"
            />
          </div>
        </div>

        <div
          className="partners-marquee__row partners-marquee__row--3 partners-marquee__row--reverse"
          data-partners-marquee-row
        >
          <div className="partners-marquee__track">
            <div className="partners-marquee__row-content" data-partners-marquee-content="a" />
            <div
              className="partners-marquee__row-content"
              data-partners-marquee-content="b"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
      <div className="partners-marquee__overlay" />
    </div>
  );
}
