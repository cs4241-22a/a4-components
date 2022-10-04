const mongoose = require("mongoose");

const ScoreEntry = new mongoose.Schema({
  playerName: String,
  playerScore: { type: Number, min: 0 },
  winResult: Boolean,
});
const model = mongoose.model("ScoreEntry", ScoreEntry);

module.exports = model;
