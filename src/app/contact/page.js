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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const res = await fetch("http://localhost:5000/api/contact", {
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
    } catch (error) {
      setStatus("Something went wrong");
    }
  };

  return (
    <main className="bg-[#faf9f7] text-neutral-900">
      {/* HERO + FORM SPLIT */}
      <section className="relative overflow-hidden py-28">
        {/* subtle grid */}
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.04)_1px,transparent_1px)] bg-[size:64px_64px]"
        />

        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-20 px-6 lg:grid-cols-2">
          {/* LEFT — HERO CONTENT */}
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-serif text-4xl leading-tight sm:text-5xl md:text-6xl"
            >
              Let’s Design Something
              <span className="block text-neutral-500">Meaningful.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="mt-6 max-w-xl text-base text-neutral-600 sm:text-lg"
            >
              Share your vision with us. We collaborate closely to create spaces
              that feel timeless, functional, and deeply human.
            </motion.p>
          </div>

          {/* RIGHT — FORM (NO OUTER CARD) */}
          <motion.form
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="w-full"
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border-b border-neutral-400 bg-transparent px-1 py-3 text-sm outline-none transition focus:border-neutral-900"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border-b border-neutral-400 bg-transparent px-1 py-3 text-sm outline-none transition focus:border-neutral-900"
                  placeholder="your@email.com"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-medium">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border-b border-neutral-400 bg-transparent px-1 py-3 text-sm outline-none transition focus:border-neutral-900"
                  placeholder="Phone number (optional)"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-medium">Message</label>
                <textarea
                  name="message"
                  required
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full resize-none border-b border-neutral-400 bg-transparent px-1 py-3 text-sm outline-none transition focus:border-neutral-900"
                  placeholder="Tell us about your project..."
                />
              </div>
            </div>

            <div className="mt-10">
              <button
                type="submit"
                className="inline-flex items-center rounded-full bg-neutral-900 px-8 py-3 text-sm font-medium text-white transition hover:bg-neutral-800"
              >
                Send Message
              </button>
              {status && (
                <p className="mt-4 text-sm text-neutral-600">{status}</p>
              )}
            </div>
          </motion.form>
        </div>
      </section>
    </main>
  );
}
