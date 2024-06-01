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

    // Extract player IDs from user's myTeam array
    const playerIds = user.myTeam.map((teamPlayer) => teamPlayer.player);

    // Fetch players based on playerId (number)
    const players = await NBAPlayer.find({ playerId: { $in: playerIds } });

    // Merge shares from user's myTeam into the player objects
    const myTeam = players.map((player) => {
      const teamPlayer = user.myTeam.find(
        (tp) => tp.player === player.playerId,
      );
      return {
        ...player._doc,
        shares: teamPlayer.shares,
        price: teamPlayer.price,
      };
    });

    const userData = {
      ...user._doc,
      myTeam,
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

    // Extract player IDs from user's myTeam array
    const playerIds = user.myTeam.map((teamPlayer) => teamPlayer.player);

    // Fetch players based on playerId (number)
    const players = await NBAPlayer.find({ playerId: { $in: playerIds } });

    // Merge shares from user's myTeam into the player objects
    const myTeam = players.map((player) => {
      const teamPlayer = user.myTeam.find(
        (tp) => tp.player === player.playerId,
      );
      return {
        ...player._doc,
        shares: teamPlayer.shares,
        price: teamPlayer.price,
      };
    });

    const userData = {
      ...user._doc,
      myTeam,
    };

    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const addToTeam = async (req, res) => {
  const { playerId, playerPrice, playerGC, playerShares } = req.body;

  try {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const MAX_TEAM_SIZE = 50; // Assuming MAX_TEAM_SIZE is defined somewhere

    if (user.myTeam.length >= MAX_TEAM_SIZE) {
      return res
        .status(400)
        .json({ message: `Team size cannot exceed ${MAX_TEAM_SIZE} players` });
    }

    if (user.GC < playerPrice) {
      return res.status(400).json({ message: "Insufficient GC to add player" });
    }

    const parsedPlayerShares = parseInt(playerShares, 10); // Convert to number
    const parsedPlayerPrice = parseFloat(playerPrice); // Convert to number
    const parsedPlayerGC = parseFloat(playerGC); // Convert to number

    const existingPlayerIndex = user.myTeam.findIndex(
      (item) => item.player === parseInt(playerId, 10),
    );

    if (existingPlayerIndex >= 0) {
      // Player already exists, update shares
      user.myTeam[existingPlayerIndex].shares += parsedPlayerShares;
      user.myTeam[existingPlayerIndex].price = parsedPlayerGC;
    } else {
      // Player does not exist, add to team
      user.myTeam.push({
        player: parseInt(playerId, 10),
        shares: parsedPlayerShares,
        price: parsedPlayerGC,
      });
    }

    user.GC -= parsedPlayerPrice;

    await user.save();
    return res
      .status(200)
      .json({ message: "Player added/updated in team", user });
  } catch (error) {
    console.error("Error adding/updating player in team:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  register,
  login,
  getUser,
  addToTeam,
};
