const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const NBAPlayer = require("../models/nbaPlayer");
const register = async (req, res) => {
  const { fullName, emailAddress, password } = req.body;

  console.log("Received data:", { fullName, emailAddress, password });

  const fullNameValid = fullName.match(/^[a-zA-Z\s\-]{1,127}$/);
  const passwordValid = password.match(/^[a-zA-Z0-9_.-]{1,127}$/);
  const emailValid = emailAddress.match(
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  );

  if (!fullNameValid || !passwordValid || !emailValid) {
    return res.status(400).json({ message: "invalid_input" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      fullName,
      password: hashedPassword,
      emailAddress,
      GC: 20,
      myTeam: [],
    });
    res.status(201).json({ message: "Account created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(400).json({ message: "invalid_input" });
  }
};

const login = async (req, res) => {
  const { emailAddress, password } = req.body;

  try {
    const user = await User.findOne({ emailAddress });
    if (!user) {
      console.log("User not found");
      return res.status(400).json({ message: "invalid_input" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Invalid password");
      return res.status(400).json({ message: "invalid_password_input" });
    }

    const players = await NBAPlayer.find({ _id: { $in: user.myTeam } });
    const userData = {
      ...user._doc,
      myTeam: players,
    };

    const token = jwt.sign({ userId: user._id }, "your_jwt_secret", {
      expiresIn: "1h",
    });
    console.log("Login successful");
    res.status(200).json({
      message: "Login successful",
      token,
      user: userData,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const players = await NBAPlayer.find({ _id: { $in: user.myTeam } });
    const userData = {
      ...user._doc,
      myTeam: players,
    };
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const addToTeam = async (req, res) => {
  const { playerId, playerGC } = req.body;

  try {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.GC - playerGC < 0) {
      return res.status(400).json({ message: "Insufficient GC to add player" });
    }

    if (!user.myTeam.includes(playerId)) {
      user.myTeam.push(playerId);
      user.GC -= playerGC;
      await user.save();
      return res.status(200).json({ message: "Player added to team", user });
    } else {
      return res.status(400).json({ message: "Player already in team" });
    }
  } catch (error) {
    console.error("Error adding player to team:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  register,
  login,
  getUser,
  addToTeam,
};
