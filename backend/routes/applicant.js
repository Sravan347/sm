const router = require("express").Router();
const uploadResume = require("../middleware/uploadResume");
const { applyJob, getAllApplicants, getApplicantsByJob, deleteApplicant } = require("../controllers/applicant");

router.post("/apply", uploadResume.single("resume"), applyJob);
//admin routes
router.get("/applicants", getAllApplicants);
router.get("/applicants/job/:jobId", getApplicantsByJob);
router.delete("/applicants/:id", deleteApplicant);

module.exports = router;
