"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import ApplyForm from "./ApplyForm";

export default function JobDetailsPage() {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs/${jobId}`)
      .then((res) => res.json())
      .then((data) => setJob(data.job));
  }, [jobId]);

  if (!job) {
    return (
      <main className="bg-[#faf9f7] px-6 py-24 text-neutral-600">
        Loading role details…
      </main>
    );
  }

  return (
    <main className="bg-[#faf9f7] text-neutral-900">
      {/* HERO + GRID */}
      <section className="relative overflow-hidden py-28">
        {/* subtle grid background */}
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.04)_1px,transparent_1px)] bg-[size:64px_64px]"
        />

        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-start gap-20 px-6 lg:grid-cols-2">
          {/* LEFT — JOB DETAILS */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-serif text-4xl leading-tight sm:text-5xl">
              {job.title}
            </h1>
            <p className="mt-4 text-sm text-neutral-600">
              {job.location} • {job.type}
            </p>

            <div className="mt-8 space-y-6 text-sm text-neutral-700">
              <div>
                <h3 className="mb-2 font-medium">Role Overview</h3>
                <p className="whitespace-pre-line">{job.description}</p>
              </div>
              <div>
                <h3 className="mb-2 font-medium">Requirements</h3>
                <p className="whitespace-pre-line">{job.requirements}</p>
              </div>
            </div>
          </motion.div>

          {/* RIGHT — APPLY FORM */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="w-full">
              <h3 className="mb-6 text-lg font-medium">Apply for this role</h3>
              <ApplyForm jobId={job._id} />
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
