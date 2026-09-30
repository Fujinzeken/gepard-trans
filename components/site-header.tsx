import Image from "next/image";
import Link from "next/link";

/* Temporary stand-in logo — replace with the client's real SVG mark.
   "GEPARD TRANS" wordmark with the signal-amber dot. */

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-graphite-900/10 bg-graphite-950 px-6 md:px-16 lg:px-24">
      <Link href="/" className="flex items-baseline gap-2">
        <Image src="/logo.svg" alt="Gepard Trans Logistics" width={32} height={32} className="h-8 w-8" />
        <span className="font-display text-xl font-bold uppercase tracking-wide text-fog-50">
          Gepard
        </span>
        <span className="font-display text-xl font-medium uppercase tracking-wide text-fog-400">
          Trans
        </span>
        <span className="ml-1 h-2 w-2 rounded-full bg-signal-500" aria-hidden />
      </Link>
      <nav className="hidden items-center gap-8 text-sm text-fog-300 md:flex">
        {[
          ["Services", "/services"],
          ["Fleet", "/fleet"],
          ["Drivers", "/drivers"],
          ["Contact", "/#contact"],
        ].map(([label, href]) => (
          <Link key={label} href={href} className="transition-colors duration-150 hover:text-fog-50">
            {label}
          </Link>
        ))}
      </nav>
      <div className="flex items-center gap-4">
        <a
          href="tel:+12622563782"
          className="hidden text-sm text-fog-400 transition-colors duration-150 hover:text-fog-50 lg:block"
        >
          +1 (262) 256-3782
        </a>
        <Link
          href="/#contact"
          className="rounded-full bg-signal-500 px-4 py-2 text-xs font-bold uppercase tracking-wider text-graphite-950 transition-colors duration-150 hover:bg-signal-600"
        >
          Get a quote
        </Link>
      </div>
    </header>
  );
}
