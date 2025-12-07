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
router.post("/admin/job", adminAuth, createJob);//api working
router.put("/admin/job/:id", adminAuth, updateJob);
router.delete("/admin/job/:id", adminAuth, deleteJob);


//public routes
router.get("/jobs", getActiveJobs);//api working
router.get("/jobs/:id", getSingleJob);



module.exports = router;
