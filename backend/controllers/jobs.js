const Job = require("../models/Job");

exports.createJob = async (req, res) => {
  try {
    const job = await Job.create(req.body);

    res.json({ success: true, job });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


exports.updateJob = async (req, res) => {
  try {
   const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });


    res.json({ success: true, job });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


exports.deleteJob = async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Job deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


exports.getActiveJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 }); // no status filter
    res.json({ success: true, jobs });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};



exports.getSingleJob = async (req, res) => {
  const job = await Job.findById(req.params.id);
  res.json({ success: true, job });
};
