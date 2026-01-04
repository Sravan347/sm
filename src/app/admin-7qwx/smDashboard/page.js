"use client";

import { useState } from "react";
import { Briefcase, Users, Phone } from "lucide-react";
import JobOpenings from "./sections/JobOpening";
import Applicants from "./sections/Applicants";
import ContactInfo from "./sections/ContactInfo";


export default function AdminDashboardPage() {
  const [activeSection, setActiveSection] = useState("jobs");

  return (
    <div className="flex min-h-screen bg-[#1D1D1F] text-[#F2F2F7]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#111113] border-r border-white/10 p-6">
        <h1 className="text-xl font-semibold mb-8">Admin Dashboard</h1>

        <nav className="space-y-2">
          <NavItem
            label="Job Openings"
            icon={Briefcase}
            active={activeSection === "jobs"}
            onClick={() => setActiveSection("jobs")}
          />
          <NavItem
            label="Applicant Management"
            icon={Users}
            active={activeSection === "applicants"}
            onClick={() => setActiveSection("applicants")}
          />
          <NavItem
            label="Contact Info"
            icon={Phone}
            active={activeSection === "contact"}
            onClick={() => setActiveSection("contact")}
          />
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 overflow-y-auto">
        {activeSection === "jobs" && <JobOpenings/>}
        {activeSection === "applicants" && <Applicants/>}
        {activeSection === "contact" && <ContactInfo/>}
      </main>
    </div>
  );
}

function NavItem({ label, icon: Icon, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition
        ${
          active
            ? "bg-[#5AC8FA]/20 text-[#5AC8FA]"
            : "text-gray-400 hover:bg-white/5 hover:text-white"
        }`}
    >
      <Icon size={18} />
      {label}
    </button>
  );
}
