const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Token", userSchema);