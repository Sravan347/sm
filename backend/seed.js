require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Admin = require("./models/Admin");

(async function seedAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("DB Connected");

    const existingAdmin = await Admin.findOne({ email: process.env.ADMIN_EMAIL });

    if (existingAdmin) {
      console.log("Admin already exists");
      process.exit(0);
    }

    const passwordHash = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

    await Admin.create({
      email: process.env.ADMIN_EMAIL,
      passwordHash,
    });

    console.log("Admin created successfully");
    process.exit(0);

  } catch (error) {
    console.error("Error seeding admin:", error);
    process.exit(1);
  }
})();
