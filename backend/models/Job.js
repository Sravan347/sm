const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  
  location: { type: String, default: "Hyderabad" },
  type: { type: String, enum: ["Full-Time", "Part-Time", "Internship"], default: "Full-Time" },
  description: { type: String, required: true },
  requirements: { type: String, required: true },
  status: { type: Boolean, default: true }, // true = active
}, { timestamps: true });

module.exports = mongoose.model("Job", jobSchema);
