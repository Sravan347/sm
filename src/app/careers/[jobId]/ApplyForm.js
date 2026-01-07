"use client";
import { useState } from "react";

export default function ApplyForm({ jobId }) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    resume: null,
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("jobId", jobId);
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("phone", form.phone);
    formData.append("resume", form.resume);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/apply`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    setLoading(false);

    if (data.success) {
      alert("Application submitted successfully!");
      setForm({ name: "", email: "", phone: "", resume: null });
    }
  };

  return (
    <form
      onSubmit={submitHandler}
      className="mt-10 p-6 max-w-lg bg-white rounded-xl shadow-lg space-y-4"
    >
      <h3 className="text-2xl font-semibold">Apply for this job</h3>

      <input
        type="text"
        placeholder="Full Name"
        required
        className="input"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        type="email"
        placeholder="Email Address"
        required
        className="input"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        type="tel"
        placeholder="Phone Number"
        required
        className="input"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
      />

      <input
        type="file"
        accept=".pdf,.doc,.docx"
        required
        onChange={(e) =>
          setForm({ ...form, resume: e.target.files[0] })
        }
      />

      <button
        disabled={loading}
        className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg"
      >
        {loading ? "Submitting..." : "Submit Application"}
      </button>
    </form>
  );
}
