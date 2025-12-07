const router = require("express").Router();
const uploadResume = require("../middleware/uploadResume");
const { applyJob } = require("../controllers/applicant");

router.post("/apply", uploadResume.single("resume"), applyJob);

module.exports = router;
