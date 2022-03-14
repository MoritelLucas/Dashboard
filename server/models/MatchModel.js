const mongoose = require("mongoose");

const valueSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  gameMode: {
    type: String,
    required: true,
  },
  championName: {
    type: String,
    required: true,
  },
  kills: {
    type: String,
    required: true,
  },
  deaths: {
    type: String,
    required: true,
  },
  assists: {
    type: String,
    required: true,
  },
  champLevel: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  win: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Match", valueSchema);