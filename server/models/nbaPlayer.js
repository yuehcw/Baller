const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema(
  {
    teamId: Number,
    name: String,
    teamLogo: String,
  },
  { _id: false },
);

const seasonStatSchema = new mongoose.Schema(
  {
    season: Number,
    team: teamSchema,
    gameIds: [Number],
    indices: [Number],
    currentIndex: Number,
  },
  { _id: false },
);

const playerSchema = new mongoose.Schema(
  {
    playerId: {
      type: Number,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    number: {
      type: String,
    },
    position: {
      type: String,
    },
    height: {
      type: String,
    },
    weight: {
      type: String,
    },
    lastAttended: {
      type: String,
    },
    country: {
      type: String,
    },
    currentTeam: teamSchema,
    seasons: [seasonStatSchema],
    headshotUrl: String,
  },
  { timestamps: true },
);

const NBAPlayer = mongoose.model("NBAPlayer", playerSchema);

module.exports = NBAPlayer;
