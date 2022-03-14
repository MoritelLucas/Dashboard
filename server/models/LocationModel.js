const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  lat: {
    type: String,
    required: true,
  },
  lon: {
    type: String,
    required: true,
  },
  timezone_id: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Location", locationSchema);