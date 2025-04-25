import mongoose from "mongoose";

const playerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  gameID: {
    type: String,
    required: true,
  },
  kakaoID: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
});

const Player = mongoose.models.Player || mongoose.model("Player", playerSchema);

export default Player;
