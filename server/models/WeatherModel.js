const mongoose = require("mongoose");

const weatherSchema = new mongoose.Schema({
  city: {
    type: String,
    required: true,
  },
  temperature: {
    type: String,
    required: true,
  },
  weather_descriptions: {
    type: String,
    required: true,
  },
  wind_speed: {
    type: String,
    required: true,
  },
  wind_dir: {
    type: String,
    required: true,
  },
  wind_degree: {
    type: String,
    required: true,
  },
  pressure: {
    type: String,
    required: true,
  },
  precip: {
    type: String,
    required: true,
  },
  humidity: {
    type: String,
    required: true,
  },
  cloudcover: {
    type: String,
    required: true,
  },
  visibility: {
    type: String,
    required: true,
  }, 
  is_day: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Weather", weatherSchema);