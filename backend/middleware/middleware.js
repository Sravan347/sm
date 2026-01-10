// const jwt = require("jsonwebtoken");

// module.exports = function adminAuth(req, res, next) {
//   const token = req.cookies?.admin_token; 

//   if (!token) {
//     return res.status(401).json({ message: "No token provided" });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.adminId = decoded.id;
//     next();
//   } catch (error) {
//     return res.status(401).json({ message: "Invalid token" });
//   }
// };
const jwt = require("jsonwebtoken");

module.exports = function adminAuth(req, res, next) {
  const token = req.cookies?.admin_token;

  if (!token) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET, {
      issuer: "startify-api",
      audience: "startify-admin",
    });

    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    req.adminId = decoded.id;
    req.admin = decoded;

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }

    return res.status(401).json({ message: "Invalid token" });
  }
};
