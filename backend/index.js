require("dotenv").config();
const express = require("express");
const app = express();
const connectdb = require("./config/db");
const contactRoute = require("./routes/contactRoute");
const jobs = require("./routes/jobs");
const applyRoute = require("./routes/applicant");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// Routes
const authRoute = require("./routes/authRoute");
// ---------- MIDDLEWARES (TOP) ----------
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));

// Middlewares
app.use(cookieParser());
app.use(express.json());

// Default route


// API Routes
app.use("/api/auth", authRoute);
app.use("/api", contactRoute);
app.use("/api", jobs);
app.use("/api/", applyRoute);

// Database + Server Start
const PORT = process.env.PORT || 5000;

connectdb(process.env.MONGO_URL)
  .then(() => {
    console.log("Database connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("DB Connection Error:", err);
    process.exit(1); // stop server if DB fails
  });
