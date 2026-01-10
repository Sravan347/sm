"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending…");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("Message sent successfully ✓");
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        setStatus("Failed to send message");
      }
    } catch {
      setStatus("Something went wrong");
    }
  };

  return (
    <main className="bg-[#faf9f7] text-neutral-900 isolate">
      <section className="relative isolate overflow-hidden py-28">
        <div className="relative mx-auto max-w-7xl px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* LEFT */}
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-serif text-[2.5rem] leading-tight tracking-tight sm:text-[3rem] md:text-[3.75rem]"
            >
              Let’s Design Something
              <span className="block text-neutral-500">Meaningful.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="mt-8 max-w-xl text-neutral-600 leading-relaxed sm:text-lg"
            >
              Share your vision with us. We collaborate closely to create spaces
              that feel timeless, functional, and deeply human.
            </motion.p>
          </div>

          {/* RIGHT */}
          <motion.form
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            onSubmit={handleSubmit}
            className="w-full"
          >
            <div className="grid gap-8 sm:grid-cols-2">
              {[
                { label: "Name", name: "name", required: true },
                { label: "Email", name: "email", required: true },
              ].map((field) => (
                <div key={field.name}>
                  <label className="mb-3 block text-xs uppercase tracking-wide text-neutral-600">
                    {field.label}
                  </label>
                  <input
                    name={field.name}
                    required={field.required}
                    value={formData[field.name]}
                    onChange={handleChange}
                    className="w-full border-b border-neutral-300 bg-transparent px-1 py-3 text-sm outline-none transition focus:border-neutral-900"
                  />
                </div>
              ))}

              <div className="sm:col-span-2">
                <label className="mb-3 block text-xs uppercase tracking-wide text-neutral-600">
                  Phone
                </label>
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border-b border-neutral-300 bg-transparent px-1 py-3 text-sm outline-none transition focus:border-neutral-900"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="mb-3 block text-xs uppercase tracking-wide text-neutral-600">
                  Message
                </label>
                <textarea
                  name="message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full resize-none border-b border-neutral-300 bg-transparent px-1 py-3 text-sm outline-none transition focus:border-neutral-900"
                />
              </div>
            </div>

            <div className="mt-12">
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-xl bg-neutral-900 px-8 py-3 text-sm font-medium text-white transition hover:bg-neutral-800 focus-visible:ring-2 focus-visible:ring-neutral-900"
              >
                Send Message
              </button>

              {status && (
                <p className="mt-6 text-sm text-neutral-600">{status}</p>
              )}
            </div>
          </motion.form>
        </div>
      </section>
    </main>
  );
}
