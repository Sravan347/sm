"use client";

import { useEffect, useState } from "react";

export default function Applicants() {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApplicants = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/applicants`
      );
      const data = await res.json();
      if (data.success) setApplicants(data.applicants);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplicants();
  }, []);

  const deleteApplicant = async (id) => {
    if (!confirm("Are you sure you want to delete this applicant?")) return;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/applicants/${id}`,
      { method: "DELETE" }
    );

    const data = await res.json();
    if (data.success) {
      setApplicants((prev) => prev.filter((a) => a._id !== id));
    }
  };

  if (loading) return <p className="p-6">Loading applicants...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">Applicant Management</h1>
      <p className="text-gray-400 mt-2">
        Applicants list, resume view, role applied.
      </p>

      {applicants.length === 0 ? (
        <p className="mt-6 text-gray-500">No applicants found.</p>
      ) : (
        <div className="mt-6 overflow-x-auto">
          <table className="w-full border border-gray-700 rounded-lg">
            <thead className="bg-gray-900 text-gray-300">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Phone</th>
                <th className="p-3 text-left">Role Applied</th>
                <th className="p-3 text-left">Resume</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {applicants.map((applicant) => (
                <tr
                  key={applicant._id}
                  className="border-t border-gray-700 hover:bg-gray-800"
                >
                  <td className="p-3">{applicant.name}</td>
                  <td className="p-3">{applicant.email}</td>
                  <td className="p-3">{applicant.phone}</td>
                  <td className="p-3">
                    {applicant.jobId?.title || "—"}
                  </td>
                  <td className="p-3">
                    <a
                      href={applicant.resume}
                      target="_blank"
                      className="text-blue-400 underline"
                    >
                      View
                    </a>
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => deleteApplicant(applicant._id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
