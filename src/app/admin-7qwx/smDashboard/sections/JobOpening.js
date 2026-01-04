"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Plus,
  Edit2,
  Trash2,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Briefcase,
  MapPin,
  Clock,
  RefreshCw,
} from "lucide-react";

export default function JobOpenings() {
  const router = useRouter();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const [newJob, setNewJob] = useState({
    title: "",
    location: "Hyderabad",
    type: "Full-Time",
    description: "",
    requirements: "",
    status: true,
  });

  const [stats, setStats] = useState({
    totalJobs: 0,
    activeJobs: 0,
    fullTime: 0,
    partTime: 0,
    internships: 0,
  });

  // Fetch wrapper with credentials
  const fetchWithAuth = async (url, options = {}) => {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
      credentials: "include",
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    });
  };

  // Initial auth check + fetch jobs
  useEffect(() => {
    const init = async () => {
      try {
        const authRes = await fetchWithAuth("/api/auth/check-auth");
        const authData = await authRes.json();

        if (!authRes.ok || !authData.success) {
          router.replace("/admin-7qwx/login");
          return;
        }

        await fetchJobs();
      } catch {
        router.replace("/admin-7qwx/login");
      }
    };
    init();
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await fetchWithAuth("/api/jobs");
      const data = await res.json();
      setJobs(Array.isArray(data.jobs) ? data.jobs : []);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  // Calculate stats whenever jobs change
  useEffect(() => {
    const totalJobs = jobs.length;
    const activeJobs = jobs.filter((j) => j.status).length;
    const fullTime = jobs.filter((j) => j.type === "Full-Time").length;
    const partTime = jobs.filter((j) => j.type === "Part-Time").length;
    const internships = jobs.filter((j) => j.type === "Internship").length;

    setStats({ totalJobs, activeJobs, fullTime, partTime, internships });
  }, [jobs]);

  const handleLogout = async () => {
    try {
      const res = await fetchWithAuth("/api/auth/logout", { method: "POST" });
      if (res.ok) router.replace("/");
      else alert("Failed to logout");
    } catch (error) {
      console.error(error);
      alert("Error logging out");
    }
  };

  const handleCreateJob = async (e) => {
    e.preventDefault();
    try {
      const res = await fetchWithAuth("/api/admin/job", {
        method: "POST",
        body: JSON.stringify(newJob),
      });
      if (res.ok) {
        setShowCreateModal(false);
        setNewJob({
          title: "",
          location: "Hyderabad",
          type: "Full-Time",
          description: "",
          requirements: "",
          status: true,
        });
        fetchJobs();
      } else {
        const err = await res.json();
        alert(err.message || "Failed to create job");
      }
    } catch (err) {
      console.error(err);
      alert("Error creating job");
    }
  };

  const handleUpdateJob = async (e) => {
    e.preventDefault();
    try {
      const res = await fetchWithAuth(`/api/admin/job/${selectedJob._id}`, {
        method: "PUT",
        body: JSON.stringify(selectedJob),
      });
      if (res.ok) {
        setShowEditModal(false);
        fetchJobs();
      } else {
        const err = await res.json();
        alert(err.message || "Failed to update job");
      }
    } catch (err) {
      console.error(err);
      alert("Error updating job");
    }
  };

  const handleDeleteJob = async () => {
    try {
      const res = await fetchWithAuth(`/api/admin/job/${selectedJob._id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setShowDeleteModal(false);
        fetchJobs();
      } else {
        const err = await res.json();
        alert(err.message || "Failed to delete job");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting job");
    }
  };

  const toggleJobStatus = async (job) => {
    try {
      const res = await fetchWithAuth(`/api/admin/job/${job._id}`, {
        method: "PUT",
        body: JSON.stringify({ ...job, status: !job.status }),
      });
      if (res.ok) fetchJobs();
      else alert("Failed to toggle status");
    } catch (err) {
      console.error(err);
      alert("Error toggling status");
    }
  };

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.type.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        filterStatus === "all" ||
        (filterStatus === "active" && job.status) ||
        (filterStatus === "inactive" && !job.status);

      return matchesSearch && matchesStatus;
    });
  }, [jobs, searchTerm, filterStatus]);

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    if (isNaN(date)) return "";
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // --- Components for badges ---
  const JobTypeBadge = ({ type }) => {
    const colors = {
      "Full-Time": "bg-blue-500/20 text-blue-400 border-blue-500/30",
      "Part-Time": "bg-purple-500/20 text-purple-400 border-purple-500/30",
      Internship: "bg-green-500/20 text-green-400 border-green-500/30",
    };
    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium border ${
          colors[type] || "bg-gray-500/20 text-gray-400"
        }`}
      >
        {type}
      </span>
    );
  };

  const StatusBadge = ({ status }) => (
    <div className="flex items-center">
      <div
        className={`w-2 h-2 rounded-full mr-2 ${
          status ? "bg-[#32D74B]" : "bg-[#FF453A]"
        }`}
      ></div>
      <span
        className={`text-sm ${status ? "text-[#32D74B]" : "text-[#FF453A]"}`}
      >
        {status ? "Active" : "Inactive"}
      </span>
    </div>
  );

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen bg-[#1D1D1F] text-[#F2F2F7] p-4 md:p-6">
      {/* Header + Buttons */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold">Career Portal Admin</h1>
          <p className="text-gray-400 mt-1 text-sm">
            Manage job postings and applications
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 bg-[#5AC8FA] px-4 py-2 rounded-lg font-medium"
          >
            {" "}
            <Plus size={18} /> Post Job{" "}
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        {["totalJobs", "activeJobs", "fullTime", "partTime", "internships"].map(
          (key, i) => (
            <div
              key={i}
              className="bg-[#2C2C2E] rounded-xl p-4 border border-white/5"
            >
              <p className="text-gray-400 text-sm">
                {key.replace(/([A-Z])/g, " $1")}
              </p>
              <p className="text-2xl font-bold mt-1">{stats[key]}</p>
            </div>
          )
        )}
      </div>

      {/* Search + Filter */}
      <div className="bg-[#2C2C2E] rounded-xl p-4 border border-white/5 mb-6 flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search jobs..."
            className="w-full pl-10 py-2.5 rounded-lg bg-[#1D1D1F] border border-white/10 text-[#F2F2F7]"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="rounded-lg px-4 py-2 bg-[#1D1D1F] border border-white/10"
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        <button
          onClick={fetchJobs}
          className="px-4 py-2 bg-[#1D1D1F] border border-white/10"
        >
          {" "}
          <RefreshCw size={18} />{" "}
        </button>
      </div>

      {/* Jobs Table */}
      <div className="bg-[#2C2C2E] rounded-xl border border-white/5 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              {[
                "Title",
                "Location",
                "Type",
                "Status",
                "Created",
                "Actions",
              ].map((h) => (
                <th
                  key={h}
                  className="text-left py-4 px-6 text-sm text-gray-400"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredJobs.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-10 text-gray-400">
                  No jobs found
                </td>
              </tr>
            ) : (
              filteredJobs.map((job) => (
                <tr
                  key={job._id}
                  className="border-b border-white/5 hover:bg-white/5"
                >
                  <td className="py-4 px-6">{job.title}</td>
                  <td className="py-4 px-6 flex items-center gap-1">
                    <MapPin size={14} /> {job.location}
                  </td>
                  <td className="py-4 px-6">
                    <JobTypeBadge type={job.type} />
                  </td>
                  <td className="py-4 px-6">
                    <StatusBadge status={job.status} />
                  </td>
                  <td className="py-4 px-6 text-sm">
                    {formatDate(job.createdAt)}
                  </td>
                  <td className="py-4 px-6 flex gap-2">
                    <button
                      onClick={() => toggleJobStatus(job)}
                      className="p-2 rounded-lg"
                    >
                      {job.status ? "Deactivate" : "Activate"}
                    </button>
                    <button
                      onClick={() => {
                        setSelectedJob(job);
                        setShowEditModal(true);
                      }}
                      className="p-2 rounded-lg bg-blue-500/20 text-blue-400"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedJob(job);
                        setShowDeleteModal(true);
                      }}
                      className="p-2 rounded-lg bg-red-500/20 text-red-400"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Create/Edit/Delete modals */}
      {/* ... keep your modal forms as-is, just call handleCreateJob, handleUpdateJob, handleDeleteJob ... */}
      {/* Create Job Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#2C2C2E] rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-white/10">
            <div className="sticky top-0 bg-[#2C2C2E] border-b border-white/10 p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Create New Job</h2>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <XCircle size={20} />
                </button>
              </div>
            </div>

            <form onSubmit={handleCreateJob} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Job Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Job Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={newJob.title}
                    onChange={(e) =>
                      setNewJob({ ...newJob, title: e.target.value })
                    }
                    placeholder="e.g., Senior Software Engineer"
                    className="w-full px-4 py-3 bg-[#1D1D1F] rounded-lg border border-white/10 focus:border-[#5AC8FA]/50 focus:ring-1 focus:ring-[#5AC8FA]/30 outline-none text-[#F2F2F7] placeholder-gray-500"
                  />
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Location
                  </label>
                  <select
                    value={newJob.location}
                    onChange={(e) =>
                      setNewJob({ ...newJob, location: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-[#1D1D1F] rounded-lg border border-white/10 focus:border-[#5AC8FA]/50 focus:ring-1 focus:ring-[#5AC8FA]/30 outline-none text-[#F2F2F7]"
                  >
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Remote">Remote</option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Chennai">Chennai</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Job Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Job Type *
                  </label>
                  <select
                    required
                    value={newJob.type}
                    onChange={(e) =>
                      setNewJob({ ...newJob, type: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-[#1D1D1F] rounded-lg border border-white/10 focus:border-[#5AC8FA]/50 focus:ring-1 focus:ring-[#5AC8FA]/30 outline-none text-[#F2F2F7]"
                  >
                    <option value="Full-Time">Full-Time</option>
                    <option value="Part-Time">Part-Time</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Status
                  </label>
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        checked={newJob.status}
                        onChange={() => setNewJob({ ...newJob, status: true })}
                        className="mr-2"
                      />
                      <span className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-[#32D74B] mr-2"></div>
                        Active
                      </span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        checked={!newJob.status}
                        onChange={() => setNewJob({ ...newJob, status: false })}
                        className="mr-2"
                      />
                      <span className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-[#FF453A] mr-2"></div>
                        Inactive
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description *
                </label>
                <textarea
                  required
                  value={newJob.description}
                  onChange={(e) =>
                    setNewJob({ ...newJob, description: e.target.value })
                  }
                  placeholder="Describe the job responsibilities, team, and impact..."
                  rows={4}
                  className="w-full px-4 py-3 bg-[#1D1D1F] rounded-lg border border-white/10 focus:border-[#5AC8FA]/50 focus:ring-1 focus:ring-[#5AC8FA]/30 outline-none text-[#F2F2F7] placeholder-gray-500 resize-none"
                />
              </div>

              {/* Requirements */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Requirements *
                </label>
                <textarea
                  required
                  value={newJob.requirements}
                  onChange={(e) =>
                    setNewJob({ ...newJob, requirements: e.target.value })
                  }
                  placeholder="List the required skills, experience, and qualifications..."
                  rows={4}
                  className="w-full px-4 py-3 bg-[#1D1D1F] rounded-lg border border-white/10 focus:border-[#5AC8FA]/50 focus:ring-1 focus:ring-[#5AC8FA]/30 outline-none text-[#F2F2F7] placeholder-gray-500 resize-none"
                />
              </div>

              {/* Form Actions */}
              <div className="flex items-center justify-end space-x-3 pt-6 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-6 py-2.5 rounded-lg border border-white/20 hover:bg-white/10 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-gradient-to-r from-[#5AC8FA] to-[#5AC8FA]/90 hover:from-[#5AC8FA]/90 hover:to-[#5AC8FA] text-[#1D1D1F] font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Create Job
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Job Modal */}
      {showEditModal && selectedJob && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#2C2C2E] rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-white/10">
            <div className="sticky top-0 bg-[#2C2C2E] border-b border-white/10 p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Edit Job</h2>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <XCircle size={20} />
                </button>
              </div>
            </div>

            <form onSubmit={handleUpdateJob} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Job Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Job Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={selectedJob.title}
                    onChange={(e) =>
                      setSelectedJob({ ...selectedJob, title: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-[#1D1D1F] rounded-lg border border-white/10 focus:border-[#5AC8FA]/50 focus:ring-1 focus:ring-[#5AC8FA]/30 outline-none text-[#F2F2F7]"
                  />
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Location
                  </label>
                  <select
                    value={selectedJob.location}
                    onChange={(e) =>
                      setSelectedJob({
                        ...selectedJob,
                        location: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 bg-[#1D1D1F] rounded-lg border border-white/10 focus:border-[#5AC8FA]/50 focus:ring-1 focus:ring-[#5AC8FA]/30 outline-none text-[#F2F2F7]"
                  >
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Remote">Remote</option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Chennai">Chennai</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Job Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Job Type *
                  </label>
                  <select
                    required
                    value={selectedJob.type}
                    onChange={(e) =>
                      setSelectedJob({ ...selectedJob, type: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-[#1D1D1F] rounded-lg border border-white/10 focus:border-[#5AC8FA]/50 focus:ring-1 focus:ring-[#5AC8FA]/30 outline-none text-[#F2F2F7]"
                  >
                    <option value="Full-Time">Full-Time</option>
                    <option value="Part-Time">Part-Time</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Status
                  </label>
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        checked={selectedJob.status}
                        onChange={() =>
                          setSelectedJob({ ...selectedJob, status: true })
                        }
                        className="mr-2"
                      />
                      <span className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-[#32D74B] mr-2"></div>
                        Active
                      </span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        checked={!selectedJob.status}
                        onChange={() =>
                          setSelectedJob({ ...selectedJob, status: false })
                        }
                        className="mr-2"
                      />
                      <span className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-[#FF453A] mr-2"></div>
                        Inactive
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description *
                </label>
                <textarea
                  required
                  value={selectedJob.description}
                  onChange={(e) =>
                    setSelectedJob({
                      ...selectedJob,
                      description: e.target.value,
                    })
                  }
                  rows={4}
                  className="w-full px-4 py-3 bg-[#1D1D1F] rounded-lg border border-white/10 focus:border-[#5AC8FA]/50 focus:ring-1 focus:ring-[#5AC8FA]/30 outline-none text-[#F2F2F7] resize-none"
                />
              </div>

              {/* Requirements */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Requirements *
                </label>
                <textarea
                  required
                  value={selectedJob.requirements}
                  onChange={(e) =>
                    setSelectedJob({
                      ...selectedJob,
                      requirements: e.target.value,
                    })
                  }
                  rows={4}
                  className="w-full px-4 py-3 bg-[#1D1D1F] rounded-lg border border-white/10 focus:border-[#5AC8FA]/50 focus:ring-1 focus:ring-[#5AC8FA]/30 outline-none text-[#F2F2F7] resize-none"
                />
              </div>

              {/* Form Actions */}
              <div className="flex items-center justify-end space-x-3 pt-6 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-6 py-2.5 rounded-lg border border-white/20 hover:bg-white/10 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-gradient-to-r from-[#5AC8FA] to-[#5AC8FA]/90 hover:from-[#5AC8FA]/90 hover:to-[#5AC8FA] text-[#1D1D1F] font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Update Job
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedJob && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#2C2C2E] rounded-2xl w-full max-w-md border border-white/10">
            <div className="p-6">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-500/20 mx-auto mb-4">
                <Trash2 className="text-red-400" size={24} />
              </div>

              <h2 className="text-xl font-semibold text-center mb-2">
                Delete Job
              </h2>
              <p className="text-gray-400 text-center mb-6">
                Are you sure you want to delete{" "}
                <span className="font-semibold text-[#F2F2F7]">
                  {selectedJob.title}
                </span>
                ? This action cannot be undone.
              </p>

              <div className="flex items-center justify-center space-x-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-6 py-2.5 rounded-lg border border-white/20 hover:bg-white/10 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteJob}
                  className="px-6 py-2.5 bg-gradient-to-r from-[#FF453A] to-[#FF453A]/90 hover:from-[#FF453A]/90 hover:to-[#FF453A] text-white font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Delete Job
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
