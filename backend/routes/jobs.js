const router = require("express").Router();
const adminAuth = require("../middleware/middleware");
const {
  createJob,
  updateJob,
    deleteJob,
    getActiveJobs,
    getSingleJob,
} = require("../controllers/jobs");

// Jobs
router.post("/admin/job", adminAuth, createJob);
router.put("/admin/job/:id", adminAuth, updateJob);
router.delete("/admin/job/:id", adminAuth, deleteJob);

router.get("/jobs", getActiveJobs);
router.get("/jobs/:id", getSingleJob);



module.exports = router;
