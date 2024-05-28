const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

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
    avatar: { type: String },
    GC: {
      type: Number,
    },
    myTeam: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "NBAPlayer",
      },
    ],
  },
  { timestamps: true },
);

UserSchema.plugin(AutoIncrement, { inc_field: "userId", start_seq: 1 });

const User = mongoose.model("User", UserSchema);

module.exports = User;
