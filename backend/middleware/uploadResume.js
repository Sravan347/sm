const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "career-resumes",
    resource_type: "raw", // important: allows PDF, DOC, DOCX
    allowed_formats: ["pdf", "doc", "docx"],
  },
});

const upload = multer({ storage });

module.exports = upload;
