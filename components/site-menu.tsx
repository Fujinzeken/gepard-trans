"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useId, useRef } from "react";

type SiteMenuProps = {
  open: boolean;
  onClose: () => void;
};

const LINKS = [
  { label: "Home", href: "/" },
  { label: "Why Gepard", href: "/#why" },
  { label: "Coverage", href: "/#coverage" },
  { label: "Fleet", href: "/#fleet" },
  { label: "Drive for us", href: "/drive-for-us" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/#contact" },
];

const FEATURED = [
  {
    title: "Ship with us",
    blurb: "Dry van and reefer — quote in minutes.",
    href: "/#contact",
    cta: "Get a quote",
  },
  {
    title: "Drive with us",
    blurb: "Modern equipment, real home time, dispatch that answers.",
    href: "/drive-for-us",
    cta: "Apply now",
  },
];

export default function SiteMenu({ open, onClose }: SiteMenuProps) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    },
    [onClose],
  );

  useEffect(() => {
    if (!open) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onKeyDown]);

  if (!open) return null;

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className="fixed inset-0 z-50 flex"
    >
      <button
        type="button"
        className="absolute inset-0 bg-graphite-950/40"
        aria-label="Close menu"
        onClick={onClose}
      />

      <aside
        className="menu-rail-enter relative z-10 flex w-[min(11rem,28vw)] flex-col justify-between bg-signal-600 px-5 py-8 text-fog-50 md:w-44 md:px-6 md:py-10"
        aria-hidden
      >
        <Image
          src="/logo_gepard_white.png"
          alt=""
          width={344}
          height={96}
          className="h-8 w-auto opacity-90 md:h-10"
        />
        <p className="font-display text-2xl font-bold uppercase italic leading-none tracking-tight md:text-3xl">
          Menu
        </p>
        <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-fog-200/80">
          Gepard Trans
        </p>
      </aside>

      <div className="menu-panel-enter relative z-10 flex min-h-0 flex-1 flex-col overflow-y-auto bg-fog-50 px-6 py-8 md:px-12 md:py-10 lg:px-16">
        <div className="flex items-start justify-between gap-4">
          <h2
            id={titleId}
            className="font-display text-3xl font-bold uppercase italic tracking-tight text-graphite-950 md:text-4xl"
          >
            Navigate
          </h2>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="group flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-graphite-600 transition-colors duration-150 hover:text-signal-500"
          >
            <span
              className="relative block h-4 w-4 before:absolute before:inset-x-0 before:top-1/2 before:h-[1.5px] before:origin-center before:-translate-y-1/2 before:rotate-45 before:bg-current before:content-[''] after:absolute after:inset-x-0 after:top-1/2 after:h-[1.5px] after:origin-center after:-translate-y-1/2 after:-rotate-45 after:bg-current after:content-['']"
              aria-hidden
            />
            Close
          </button>
        </div>

        <div className="mt-10 grid flex-1 gap-12 lg:grid-cols-[1fr_minmax(16rem,22rem)] lg:gap-16">
          <nav aria-label="Primary">
            <ul className="space-y-1 border-t border-graphite-900/10">
              {LINKS.map((item, i) => (
                <li key={item.label} className="border-b border-graphite-900/10">
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="group flex items-baseline justify-between gap-4 py-4 transition-colors duration-150"
                  >
                    <span className="font-display text-2xl font-bold uppercase italic tracking-tight text-graphite-950 transition-colors group-hover:text-signal-500 md:text-4xl">
                      {item.label}
                    </span>
                    <span
                      className="font-display text-sm font-bold text-signal-500/40 transition-colors group-hover:text-signal-500"
                      aria-hidden
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col gap-4">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-signal-600">
              Start here
            </p>
            {FEATURED.map((card) => (
              <Link
                key={card.title}
                href={card.href}
                onClick={onClose}
                className="group relative border border-graphite-900/10 bg-white p-6 transition-colors duration-200 hover:border-signal-500/50"
              >
                <span
                  className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-signal-500 transition-transform duration-300 group-hover:scale-x-100"
                  aria-hidden
                />
                <p className="font-display text-xl font-bold uppercase italic tracking-tight text-graphite-950">
                  {card.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-graphite-600">
                  {card.blurb}
                </p>
                <span className="mt-4 inline-block text-xs font-bold uppercase tracking-wider text-signal-500 transition-colors group-hover:text-signal-600">
                  {card.cta} →
                </span>
              </Link>
            ))}

            <a
              href="tel:+12622563782"
              className="mt-2 border border-signal-500/30 bg-signal-500/5 px-5 py-4 text-sm font-semibold text-signal-600 transition-colors hover:bg-signal-500 hover:text-white"
            >
              Call +1 (262) 256-3782
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
