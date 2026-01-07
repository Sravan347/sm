"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function AboutClient() {
  return (
    <main className="bg-[#faf9f7] text-neutral-900">
      {/* subtle grid background */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.035)_1px,transparent_1px)] bg-[size:64px_64px]"
      />

      {/* HERO */}
      <section className="relative mx-auto max-w-7xl px-6 pt-28 pb-24 lg:pt-36">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-4xl font-serif text-[2.5rem] leading-[1.1] tracking-tight sm:text-[3rem] md:text-[3.75rem]"
        >
          Designing spaces
          <span className="block text-neutral-500">with purpose,</span>
          clarity, and care.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="mt-8 max-w-2xl text-base leading-relaxed text-neutral-600 sm:text-lg"
        >
          Spacemotivate is an interior design and space planning studio focused on
          creating thoughtful environments that balance aesthetics,
          functionality, and long-term value.
        </motion.p>
      </section>

      {/* WHO WE ARE */}
      <section className="relative mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="font-serif text-2xl tracking-tight sm:text-3xl">
              Who We Are
            </h2>
            <p className="mt-6 text-neutral-600 leading-relaxed">
              We are a creative interior design studio specializing in
              residential, commercial, and office spaces. Our work is driven by
              a belief that great design is calm, intentional, and functional.
            </p>
            <p className="mt-4 text-neutral-600 leading-relaxed">
              Every project begins with listening — understanding how people
              live and work — so we can design spaces that feel natural,
              efficient, and timeless.
            </p>
          </div>

          <div className="h-72 rounded-2xl bg-neutral-200 flex items-center justify-center text-neutral-500">
            Studio / Project Visual
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="relative bg-white py-20">
        <div className="mx-auto max-w-7xl px-6 grid gap-10 md:grid-cols-2">
          <div className="rounded-2xl border border-neutral-200 p-8">
            <h3 className="font-serif text-xl tracking-tight">
              Our Mission
            </h3>
            <p className="mt-4 text-neutral-600 leading-relaxed">
              To design interiors that are refined, practical, and deeply
              aligned with each client’s lifestyle and goals.
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-200 p-8">
            <h3 className="font-serif text-xl tracking-tight">
              Our Vision
            </h3>
            <p className="mt-4 text-neutral-600 leading-relaxed">
              To build a design studio recognized for thoughtful planning,
              timeless aesthetics, and seamless project execution.
            </p>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="relative bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-center font-serif text-2xl tracking-tight sm:text-3xl">
            Why Spacemotivate
          </h2>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "Client-first design approach",
              "Minimal, functional aesthetics",
              "Clear and transparent communication",
              "Strong attention to detail",
              "On-time and reliable delivery",
              "End-to-end project responsibility",
            ].map((point) => (
              <div
                key={point}
                className="rounded-2xl border border-neutral-200 p-6 text-sm text-neutral-700"
              >
                {point}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative mx-auto max-w-7xl px-6 py-28 text-center">
        <h2 className="font-serif text-2xl tracking-tight sm:text-3xl">
          Let’s design your space
        </h2>
        <p className="mt-6 max-w-xl mx-auto text-neutral-600">
          If you’re planning a new project or renovation, we’d love to hear
          about it.
        </p>

        <div className="mt-10">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-xl bg-neutral-900 px-8 py-3 text-sm font-medium text-white transition hover:bg-neutral-800 focus-visible:ring-2 focus-visible:ring-neutral-900"
          >
            Contact Studio
          </Link>
        </div>
      </section>
    </main>
  );
}
