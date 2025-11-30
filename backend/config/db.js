const mongoose = require("mongoose");
const connectdb = async (url) => {
  try {
    await mongoose.connect(url);
  
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectdb;
