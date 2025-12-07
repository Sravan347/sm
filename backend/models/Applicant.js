const mongoose = require("mongoose");

const applicantSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
  name: String,
  email: String,
  phone: String,
  resume: String, // path of uploaded file
}, { timestamps: true });

module.exports = mongoose.model("Applicant", applicantSchema);
