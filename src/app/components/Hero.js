"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section
      className="relative isolate overflow-hidden w-full bg-[#faf9f7]"
      aria-label="Architectural studio hero section"
    >
      <div className="relative mx-auto max-w-7xl px-6 pt-32 pb-28 lg:pt-44 lg:pb-36 text-center lg:text-left">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-4xl font-serif text-[3rem] leading-[1.05] tracking-tight text-neutral-900 sm:text-[3.75rem] md:text-[4.25rem] lg:text-[5rem]"
        >
          Thoughtfully
          <span className="block text-neutral-500">Designed.</span>
          Beautifully
          <span className="block">Built.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="mt-8 max-w-xl text-base leading-relaxed text-neutral-600 sm:text-lg"
        >
          Clean geometry, sustainable thinking, and spaces that feel effortless
          — architecture that lasts beyond trends.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6 }}
          className="mt-12 flex flex-wrap justify-center lg:justify-start items-center gap-4"
        >
          <Link
            href="/projects"
            className="inline-flex items-center justify-center rounded-xl bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-neutral-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900"
          >
            View Projects
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-xl border border-neutral-300 bg-white px-6 py-3 text-sm font-medium text-neutral-900 transition hover:bg-neutral-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900"
          >
            Contact Studio
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
