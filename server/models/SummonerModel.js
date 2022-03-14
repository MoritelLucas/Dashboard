const mongoose = require("mongoose");

const valueSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  rank: {
    type: String,
    required: true,
  },
  summonerLevel: {
    type: String,
    required: true,
  },
  wins :{
    type: String,
    required: true,
  },
  losses: {
    type: String,
    required: true,
  },
  leaguePoints: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Summoner", valueSchema);