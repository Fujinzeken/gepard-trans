import { readFileSync } from "node:fs";
import path from "node:path";

import SiteFooter from "./site-footer";
import SiteHeader from "./site-header";

/* Renders the plain-text legal documents in /content/legal. Blocks are
   separated by blank lines:
     - a single short line with no closing punctuation  -> heading
     - any other single line                            -> paragraph
     - several consecutive lines                        -> list
   Edit the .txt files to change the copy; no markup needed. */

const TOP_LEVEL = new Set([
  "Introduction",
  "Interpretation and Definitions",
  "Collecting and Using Your Personal Data",
  "Tracking Technologies and Cookies",
  "Use of Your Personal Data",
  "Retention of Your Personal Data",
  "Transfer of Your Personal Data",
  "Delete Your Personal Data",
  "Disclosure of Your Personal Data",
  "Security of Your Personal Data",
  "Detailed Information on the Processing of Your Personal Data",
  "Children’s Privacy",
  "Links to Other Websites",
  "Changes to this Privacy Policy",
  "Contact Us",
]);

type Block =
  | { kind: "h2" | "h3" | "p"; text: string }
  | { kind: "ul"; items: string[] };

function parse(file: string): Block[] {
  const raw = readFileSync(path.join(process.cwd(), "content", "legal", file), "utf8");
  return raw
    .replace(/\r/g, "")
    .split(/\n{2,}/)
    .map((b) => b.split("\n").map((l) => l.trim()).filter(Boolean))
    .filter((lines) => lines.length)
    .map((lines): Block => {
      if (lines.length > 1) return { kind: "ul", items: lines };
      const t = lines[0];
      const isHeading = t.length <= 70 && !/[.:]$/.test(t) && !t.includes(": ") && /^[A-Z0-9]/.test(t);
      if (!isHeading) return { kind: "p", text: t };
      return { kind: TOP_LEVEL.has(t) || /^\d+\./.test(t) ? "h2" : "h3", text: t };
    });
}

const LINKABLE = /(https?:\/\/[^\s)]+|[\w.+-]+@[\w-]+\.[\w.]+)/g;

function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split(LINKABLE).map((part, i) => {
        if (i % 2 === 0) return part;
        const href = part.includes("@") ? `mailto:${part}` : part;
        return (
          <a key={i} href={href} className="break-words text-signal-600 underline underline-offset-2 hover:text-signal-500">
            {part}
          </a>
        );
      })}
    </>
  );
}

export default function LegalPage({ title, file }: { title: string; file: string }) {
  const blocks = parse(file);
  return (
    <>
      <SiteHeader />
      <main className="flex flex-1 flex-col">
        <section className="bg-graphite-950 px-6 pb-16 pt-20 text-center md:px-16 md:pb-20 md:pt-28">
          <h1 className="font-display text-4xl font-bold uppercase tracking-tight text-fog-50 md:text-6xl">{title}</h1>
          <p className="mt-4 text-xs font-bold uppercase tracking-[0.3em] text-signal-300">Gepard Trans Logistics INC</p>
        </section>

        <article className="mx-auto w-full max-w-3xl px-6 py-16 md:py-24">
          {blocks.map((b, i) => {
            if (b.kind === "h2")
              return (
                <h2 key={i} className="mt-14 border-l-4 border-signal-500 pl-4 font-display text-2xl font-bold uppercase tracking-tight text-graphite-950 first:mt-0 md:text-3xl">
                  {b.text}
                </h2>
              );
            if (b.kind === "h3")
              return (
                <h3 key={i} className="mt-8 font-display text-lg font-bold uppercase tracking-tight text-graphite-900">
                  {b.text}
                </h3>
              );
            if (b.kind === "ul")
              return (
                <ul key={i} className="mt-4 list-disc space-y-2 pl-6 text-base leading-relaxed text-graphite-600 marker:text-signal-500">
                  {b.items.map((it, j) => (
                    <li key={j}><Rich text={it} /></li>
                  ))}
                </ul>
              );
            return (
              <p key={i} className="mt-4 text-base leading-relaxed text-graphite-600">
                <Rich text={b.text} />
              </p>
            );
          })}
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
