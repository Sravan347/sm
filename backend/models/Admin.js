// const mongoose = require("mongoose");

// const adminSchema = new mongoose.Schema({
//   email: { type: String, required: true },
//   passwordHash: { type: String, required: true }
// });

// module.exports = mongoose.model("Admin", adminSchema);

const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    passwordHash: {
      type: String,
      required: true,
      select: false, // never return by default
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Admin", adminSchema);
