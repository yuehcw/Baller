const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const NBAPlayer = require("../models/nbaPlayer");

const avatarNames = [
  "Midnight",
  "Ginger",
  "Baby",
  "Cuddles",
  "Annie",
  "Chloe",
  "Molly",
  "Rascal",
  "Pumpkin",
  "Snuggles",
  "Callie",
  "Lily",
  "Cleo",
  "Sugar",
  "Bella",
  "Casper",
  "Angel",
  "Fluffy",
  "Misty",
  "Coco",
];

const getRandomAvatarUrl = () => {
  const randomName =
    avatarNames[Math.floor(Math.random() * avatarNames.length)];
  return `https://api.dicebear.com/8.x/bottts/svg?seed=${randomName}&backgroundColor=c0aede`;
};

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
    const avatarUrl = getRandomAvatarUrl();
    const user = await User.create({
      fullName,
      password: hashedPassword,
      emailAddress,
      GC: 20,
      myTeam: [],
      points: [],
      avatar: avatarUrl,
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

    // Merge transactions from user's myTeam into the player objects
    const myTeam = players.map((player) => {
      const teamPlayer = user.myTeam.find(
        (tp) => tp.player === player.playerId,
      );
      return {
        ...player._doc,
        transactions: teamPlayer.transactions,
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

module.exports = { login };

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

    // Merge transactions from user's myTeam into the player objects
    const myTeam = players.map((player) => {
      const teamPlayer = user.myTeam.find(
        (tp) => tp.player === player.playerId,
      );
      return {
        ...player._doc,
        transactions: teamPlayer.transactions,
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

module.exports = { getUser };

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
    const parsedPlayerGC = parseFloat(playerGC);

    const existingPlayerIndex = user.myTeam.findIndex(
      (item) => item.player === parseInt(playerId, 10),
    );

    if (existingPlayerIndex >= 0) {
      // Player already exists, update shares and add transaction
      user.myTeam[existingPlayerIndex].shares += parsedPlayerShares;
      user.myTeam[existingPlayerIndex].price = parsedPlayerGC;
      user.myTeam[existingPlayerIndex].transactions.push({
        price: parsedPlayerGC,
        shares: parsedPlayerShares,
      });
    } else {
      // Player does not exist, add to team
      user.myTeam.push({
        player: parseInt(playerId, 10),
        shares: parsedPlayerShares,
        price: parsedPlayerGC,
        transactions: [{ price: parsedPlayerGC, shares: parsedPlayerShares }],
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

const sellFromTeam = async (req, res) => {
  const { playerId, playerPrice, playerShares, transactionId, cost } = req.body;

  try {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const parsedPlayerShares = parseInt(playerShares, 10);
    const parsedPlayerPrice = parseFloat(playerPrice);

    const existingPlayerIndex = user.myTeam.findIndex(
      (item) => item.player === parseInt(playerId, 10),
    );

    if (existingPlayerIndex < 0) {
      // Player does not exist in team
      return res.status(400).json({ message: "Player not found in team" });
    }

    const player = user.myTeam[existingPlayerIndex];
    const transactionIndex = player.transactions.findIndex(
      (transaction) => transaction._id.toString() === transactionId,
    );

    if (transactionIndex < 0) {
      return res.status(400).json({ message: "Transaction not found" });
    }

    const transaction = player.transactions[transactionIndex];

    // Check if the shares to be sold are greater than the available shares in the transaction
    if (transaction.shares < parsedPlayerShares) {
      return res.status(400).json({ message: "Insufficient shares to sell" });
    }

    // Decrease shares in the transaction
    transaction.shares -= parsedPlayerShares;

    // Adjust user's GC based on the sale
    user.GC += parsedPlayerPrice;

    // Calculate earnings from the sale
    const earnings = parsedPlayerPrice - cost;

    // Record the earnings in the points array
    user.points.push({
      amount: earnings,
      timestamp: new Date(),
    });

    // If shares in the transaction are zero or less, remove the transaction
    if (transaction.shares <= 0) {
      player.transactions.splice(transactionIndex, 1);
    }

    // If there are no transactions left for the player, remove the player from the team
    if (player.transactions.length === 0) {
      user.myTeam.splice(existingPlayerIndex, 1);
    }

    await user.save();
    return res.status(200).json({ message: "Player shares sold", user });
  } catch (error) {
    console.error("Error selling player shares:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getAllRankings = async (req, res) => {
  const { filter } = req.query;

  // Helper function to calculate the start date based on the filter type
  const getStartDate = (filter) => {
    const now = new Date();
    if (filter === "week") {
      const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
      startOfWeek.setHours(0, 0, 0, 0);
      return startOfWeek;
    } else if (filter === "month") {
      return new Date(now.getFullYear(), now.getMonth(), 1);
    } else if (filter === "year") {
      return new Date(now.getFullYear(), 0, 1);
    } else {
      return new Date(0); // Default to include all time if no filter is specified
    }
  };

  try {
    const users = await User.find({}, "fullName points avatar");
    const startDate = getStartDate(filter);

    const usersWithTotalPoints = users.map((user) => {
      const totalPoints = user.points.reduce((acc, point) => {
        // Filter points based on the start date
        if (new Date(point.timestamp) >= startDate) {
          return acc + point.amount;
        }
        return acc;
      }, 0);

      return {
        fullName: user.fullName,
        avatar: user.avatar,
        totalPoints: totalPoints,
      };
    });

    // Sort users by totalPoints in descending order and get the top 10
    const topUsers = usersWithTotalPoints
      .sort((a, b) => b.totalPoints - a.totalPoints)
      .slice(0, 10);

    res.status(200).json(topUsers);
  } catch (error) {
    console.error("Error fetching rankings:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  register,
  login,
  getUser,
  addToTeam,
  sellFromTeam,
  getAllRankings,
};
