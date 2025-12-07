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
