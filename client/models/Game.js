import mongoose from "mongoose";

const gameSchema = new mongoose.Schema(
  {
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
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Game = mongoose.models.Game || mongoose.model("Game", gameSchema);
export default Game;
