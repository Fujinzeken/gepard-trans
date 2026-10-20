"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

/** Short branded splash on first visit per session. Skipped for reduced motion. */
export default function PageLoader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("gepard-loaded") === "1";
      sessionStorage.setItem("gepard-loaded", "1");
    } catch {}
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = setTimeout(() => setShow(false), seen || reduced ? 0 : 900);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="loader"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45 }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-graphite-950"
        >
          <Image src="/logo_gepard_white.png" alt="Gepard Trans Logistics" width={344} height={96} priority className="h-14 w-auto" />
          <div className="mt-8 h-[3px] w-48 overflow-hidden bg-graphite-700">
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="h-full bg-signal-500"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
