const mongoose = require("mongoose");

const valueSchema = new mongoose.Schema({
  value: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Value", valueSchema);