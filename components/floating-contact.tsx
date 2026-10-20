"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

/* Floating contact dock. WhatsApp reuses the dispatch phone number; add a
   Telegram handle URL below to show the Telegram button. */
const PHONE_E164 = "12622563782";
const TELEGRAM_URL = ""; // e.g. "https://t.me/your_handle"

const ACTIONS = [
  { label: "Call dispatch", href: `tel:+${PHONE_E164}`, bg: "bg-signal-500", icon: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" },
  { label: "Chat on WhatsApp", href: `https://wa.me/${PHONE_E164}`, bg: "bg-[#1a9a50]", icon: "M21 11.5a8.5 8.5 0 0 1-12.6 7.4L3 20.5l1.7-5.2A8.5 8.5 0 1 1 21 11.5z" },
  ...(TELEGRAM_URL
    ? [{ label: "Message on Telegram", href: TELEGRAM_URL, bg: "bg-[#1c7bb5]", icon: "M22 3 2 11l6 2.5L10 21l3.5-4.5L18 20 22 3z" }]
    : []),
];

export default function FloatingContact() {
  const [open, setOpen] = useState(false);
  return (
    <div className="fixed bottom-5 right-4 z-50 flex flex-col items-end gap-3 md:bottom-6 md:right-6">
      <AnimatePresence>
        {open &&
          ACTIONS.map((a, i) => (
            <motion.a
              key={a.label}
              href={a.href}
              target={a.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              aria-label={a.label}
              initial={{ opacity: 0, y: 12, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1, transition: { delay: i * 0.05 } }}
              exit={{ opacity: 0, y: 8, scale: 0.9 }}
              className={`flex h-12 items-center gap-2 rounded-full ${a.bg} pl-4 pr-5 text-xs font-bold uppercase tracking-wider text-white shadow-lg`}
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d={a.icon} />
              </svg>
              {a.label}
            </motion.a>
          ))}
      </AnimatePresence>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "Close contact options" : "Open contact options"}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-signal-500 text-white shadow-[0_10px_30px_-8px_rgba(227,28,35,0.7)] transition-transform duration-200 hover:scale-105"
      >
        {!open && <span className="absolute inset-0 animate-ping rounded-full bg-signal-500/40 motion-reduce:hidden" aria-hidden />}
        <svg viewBox="0 0 24 24" className="relative h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden>
          {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M21 11.5a8.5 8.5 0 0 1-12.6 7.4L3 20.5l1.7-5.2A8.5 8.5 0 1 1 21 11.5z" />}
        </svg>
      </button>
    </div>
  );
}
