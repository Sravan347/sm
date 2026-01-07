const Applicant = require("../models/Applicant");

exports.applyJob = async (req, res) => {
  try {
    const { name, email, phone, jobId } = req.body;

    const applicant = await Applicant.create({
      jobId,
      name,
      email,
      phone,
      resume: req.file?.path,     // Cloudinary file URL
    });

    res.json({ success: true, applicant });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllApplicants = async (req, res) => {
  try {
    const applicants = await Applicant.find()
      .populate("jobId", "title location type")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      applicants,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getApplicantsByJob = async (req, res) => {
  try {
    const applicants = await Applicant.find({
      jobId: req.params.jobId,
    })
      .populate("jobId", "title");

    res.json({ success: true, applicants });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteApplicant = async (req, res) => {
  try {
    await Applicant.findByIdAndDelete(req.params.id);
    res.json({
      success: true,
      message: "Applicant deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};