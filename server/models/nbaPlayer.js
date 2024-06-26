const mongoose = require("mongoose");
const teamSchema = new mongoose.Schema(
  {
    teamId: Number,
    name: String,
    teamLogo: String,
  },
  { _id: false },
);

const gameSchema = new mongoose.Schema(
  {
    gameId: Number,
    gameDate: Date,
    points: Number,
    offReb: Number,
    defReb: Number,
    assists: Number,
    steals: Number,
    blocks: Number,
    turnovers: Number,
    plusMinus: String,
    fga: Number,
    fgp: String,
    index: {
      type: Number,
      set: (v) => parseFloat(v.toFixed(1)),
    },
  },
  { _id: false },
);

const seasonStatSchema = new mongoose.Schema(
  {
    season: Number,
    team: teamSchema,
    games: [gameSchema],
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
    number: String,
    position: String,
    height: String,
    weight: String,
    lastAttended: String,
    country: String,
    currentIndex: {
      type: Number,
      set: (v) => parseFloat(v.toFixed(1)),
    },

    currentTeam: teamSchema,
    seasons: [seasonStatSchema],
    headshotUrl: String,
    shares: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

const NBAPlayer = mongoose.model("NBAPlayer", playerSchema);

module.exports = NBAPlayer;
