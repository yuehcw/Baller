const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const transactionSchema = new mongoose.Schema(
  {
    price: {
      type: Number,
      required: true,
      set: (v) => parseFloat(v.toFixed(1)),
    },
    shares: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

const pointsSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
      set: (v) => parseFloat(v.toFixed(1)),
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false },
);

const UserSchema = new mongoose.Schema(
  {
    userId: {
      type: Number,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    emailAddress: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: null,
    },
    GC: {
      type: Number,
      set: (v) => parseFloat(v.toFixed(1)),
    },
    myTeam: [
      {
        player: {
          type: Number,
          ref: "NBAPlayer",
        },
        transactions: [transactionSchema],
        _id: false,
      },
    ],
    points: [pointsSchema],
  },
  { timestamps: true },
);

UserSchema.plugin(AutoIncrement, { inc_field: "userId", start_seq: 1 });

const User = mongoose.model("User", UserSchema);

module.exports = User;
