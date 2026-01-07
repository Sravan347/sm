"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function CareersPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs`)
      .then((res) => res.json())
      .then((data) => {
        setJobs(data.jobs || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <main className="bg-[#faf9f7] text-neutral-900">
      {/* HERO */}
      <section className="relative overflow-hidden py-24">
        {/* subtle grid background */}
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.04)_1px,transparent_1px)] bg-[size:64px_64px]"
        />

        <div className="relative mx-auto max-w-4xl px-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-serif text-4xl leading-tight sm:text-5xl"
          >
            Build Your Future
            <span className="block text-neutral-500">With Us.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mt-6 max-w-xl text-base text-neutral-600 sm:text-lg"
          >
            We’re always looking for thoughtful, curious people who care about
            craft, collaboration, and meaningful work.
          </motion.p>
        </div>
      </section>

      {/* JOB LIST */}
      <section className="mx-auto max-w-4xl px-6 pb-28">
        {loading && (
          <p className="text-sm text-neutral-500">Loading open positions…</p>
        )}

        {!loading && jobs.length === 0 && (
          <p className="text-sm text-neutral-500">
            No open positions at the moment.
          </p>
        )}

        <div className="mt-12 space-y-10">
          {jobs.map((job, index) => (
            <motion.div
              key={job._id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              className="border-b border-neutral-300 pb-8"
            >
              <h2 className="text-xl font-medium">{job.title}</h2>

              <p className="mt-2 text-sm text-neutral-600">
                {job.location} • {job.type}
              </p>

              <Link href={`/careers/${job._id}`}>
                <button className="mt-6 inline-flex items-center rounded-full border border-neutral-900 px-6 py-2 text-sm font-medium transition hover:bg-neutral-900 hover:text-white">
                  View Role
                </button>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
