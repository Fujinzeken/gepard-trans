"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import SiteMenu from "./site-menu";

/* Navbar. On `overlay` pages (home) it floats transparent over the hero with
   the white logo, then turns into a blurred white bar once the page scrolls.
   Elsewhere it is always the solid bar. */

export default function SiteHeader({ overlay = false }: { overlay?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const clear = overlay && !scrolled;
  const ink = clear ? "text-white" : "text-graphite-950";

  return (
    <>
      <header
        className={`${overlay ? "fixed inset-x-0" : "sticky"} top-0 z-40 flex h-16 items-center justify-between gap-4 border-b px-4 transition-[background-color,box-shadow,border-color] duration-300 md:h-[4.25rem] md:px-10 lg:px-16 ${
          clear
            ? "border-transparent bg-transparent"
            : "border-graphite-900/10 bg-white/85 shadow-[0_8px_24px_-12px_rgba(10,12,15,0.25)] backdrop-blur-xl"
        }`}
      >
        <Link
          href="/"
          className="flex shrink-0 items-center transition-opacity duration-150 hover:opacity-90"
        >
          <Image
            src={clear ? "/logo_gepard_white.png" : "/logo_gepard.webp"}
            alt="Gepard Trans Logistics"
            width={344}
            height={96}
            loading="eager"
            className="h-9 w-auto md:h-10"
          />
        </Link>

        <div className="flex min-w-0 flex-1 items-center justify-end gap-2 sm:gap-3 md:gap-4">
          <nav
            className="hidden items-center gap-2 md:flex lg:gap-3"
            aria-label="Quick actions"
          >
            <Link
              href="/drive-for-us"
              className={
                clear
                  ? "btn-outline-light !border-white !text-white hover:!bg-white hover:!text-signal-600"
                  : "btn-outline-light"
              }
            >
              Drive for us
            </Link>
            <Link href="/#contact" className="btn-primary">
              Get a quote
            </Link>
          </nav>

          <a
            href="tel:+12622563782"
            className={`hidden items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] ${clear ? "text-white" : "text-graphite-700"} transition-colors duration-150 hover:text-signal-500 sm:inline-flex`}
          >
            <PhoneIcon />
            <span className="hidden lg:inline">Call</span>
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-expanded={menuOpen}
            aria-controls="site-menu"
            className={`inline-flex items-center gap-2.5 px-1 py-2 text-xs font-bold uppercase tracking-[0.2em] ${ink} transition-colors duration-150 hover:text-signal-500`}
          >
            <span className="flex w-5 flex-col gap-[5px]" aria-hidden>
              <span className="h-[1.5px] w-full bg-current" />
              <span className="h-[1.5px] w-full bg-current" />
              <span className="h-[1.5px] w-3/4 bg-current" />
            </span>
            Menu
          </button>
        </div>
      </header>

      <div id="site-menu">
        <SiteMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      </div>
    </>
  );
}

function PhoneIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
