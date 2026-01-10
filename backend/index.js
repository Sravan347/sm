// require("dotenv").config();
// const express = require("express");
// const app = express();
// const connectdb = require("./config/db");
// const contactRoute = require("./routes/contactRoute");
// const jobs = require("./routes/jobs");
// const applyRoute = require("./routes/applicant");
// const cors = require("cors");
// const cookieParser = require("cookie-parser");

// // Routes
// const authRoute = require("./routes/authRoute");
// // ---------- MIDDLEWARES (TOP) ----------
// // app.use(cors({
// //   origin: "http://localhost:3000",
// //   credentials: true,
// // }));
// app.use(
//   cors({
//     origin: function (origin, callback) {
//       // Allow direct calls (no origin) like curl/postman
//       if (!origin) return callback(null, true);

//       // FRONTEND_URL may be a comma-separated list, or '*' to allow all
//       const cfg = process.env.FRONTEND_URL || "";
//       const allowedFromEnv = cfg
//         .split(",")
//         .map((s) => s.trim())
//         .filter(Boolean);

//       const defaultAllowed = [
//         "http://localhost:3000",
//         "http://10.186.148.99:3000",
//       ];

//       const allowedOrigins = allowedFromEnv.length
//         ? allowedFromEnv
//         : defaultAllowed;

//       if (allowedOrigins.includes("*") || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     credentials: true,
//   })
// );

// // Middlewares
// app.use(cookieParser());
// app.use(express.json());

// // Default route

// // API Routes
// app.use("/api/auth", authRoute);
// app.use("/api", contactRoute);
// app.use("/api", jobs);
// app.use("/api/", applyRoute);

// // Database + Server Start
// const PORT = process.env.PORT || 5000;

// const startServer = () => {
//   app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
//   });
// };

// connectdb(process.env.MONGO_URL)
//   .then(() => {
//     console.log("Database connected");
//     startServer();
//   })
//   .catch((err) => {
//     console.error("DB Connection Error:", err);
//     console.warn(
//       "Starting server in degraded mode (DB not connected). Some endpoints may not work."
//     );
//     startServer();
//   });
require("dotenv").config();
const express = require("express");
const app = express();
const connectdb = require("./config/db");
const contactRoute = require("./routes/contactRoute");
const jobs = require("./routes/jobs");
const applyRoute = require("./routes/applicant");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// Trust proxy (important for HTTPS + cookies behind Nginx)
app.set("trust proxy", 1);

// Routes
const authRoute = require("./routes/authRoute");

// ---------- MIDDLEWARES ----------
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow non-browser tools
      if (!origin) return callback(null, true);

      const cfg = process.env.FRONTEND_URL || "";
      const allowedFromEnv = cfg
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      const defaultAllowed = [
        "http://localhost:3000",
        "http://10.186.148.99:3000",
      ];

      const allowedOrigins = allowedFromEnv.length
        ? allowedFromEnv
        : defaultAllowed;

      if (allowedOrigins.includes("*") || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

// ---------- ROUTES ----------
app.use("/api/auth", authRoute);
app.use("/api", contactRoute);
app.use("/api", jobs);
app.use("/api", applyRoute);

// ---------- CORS ERROR HANDLER ----------
app.use((err, req, res, next) => {
  if (err.message === "Not allowed by CORS") {
    return res.status(403).json({ message: "CORS blocked" });
  }
  next(err);
});

// ---------- SERVER ----------
const PORT = process.env.PORT || 5000;

const startServer = () => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

connectdb(process.env.MONGO_URL)
  .then(() => {
    console.log("Database connected");
    startServer();
  })
  .catch((err) => {
    console.error("DB Connection Error:", err);
    console.warn("Starting server in degraded mode");
    startServer();
  });
