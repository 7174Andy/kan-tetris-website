import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  order: {
    type: Number,
    required: true,
  },
  ranking: {
    type: [
      {
        playerID: {
          type: String,
          required: true,
        },
        ranking: {
          type: Number,
          required: true,
        },
      },
    ],
  },
});

const Game = mongoose.models.Game || mongoose.model("Game", gameSchema);
export default Game;
