// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");
// const Admin = require("../models/Admin");


// const login=async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const admin = await Admin.findOne({ email });
//     if (!admin) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     const isMatch = await bcrypt.compare(password, admin.passwordHash);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     const token = jwt.sign(
//       { id: admin._id, role: "admin" },
//       process.env.JWT_SECRET,
//       { expiresIn: "1d" }
//     );

//     res.cookie("admin_token", token, {
//       httpOnly: true,
//         secure: process.env.NODE_ENV === "production", // HTTPS only in prod
//   sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
//       maxAge: 24 * 60 * 60 * 1000,
//     });

//     // ✅ VERY IMPORTANT
//     return res.json({ message: "Login successful" });

//   } catch (error) {
//     return res.status(500).json({ message: "Server error" });
//   }
// }

// const logout =(req, res) => {
//   res.clearCookie("admin_token");
//   return res.json({ message: "Logged out" });
// }

// module.exports = { login, logout }; 



const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Admin = require("../models/Admin");

/**
 * ADMIN LOGIN
 */
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    // const admin = await Admin.findOne({ email });
    const admin = await Admin.findOne({ email }).select("+passwordHash");

    if (!admin) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, admin.passwordHash);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      {
        id: admin._id,
        role: "admin",
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
        issuer: "startify-api",
        audience: "startify-admin",
      }
    );

    res.cookie("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    return res.status(200).json({ message: "Login successful" });

  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * ADMIN LOGOUT
 */
const logout = (req, res) => {
  res.clearCookie("admin_token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  return res.status(200).json({ message: "Logged out successfully" });
};

module.exports = { login, logout };
