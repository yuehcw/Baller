const express = require("express");
const router = express.Router();
const {
  getNBAPlayers,
  getNBAPlayerById,
  getNBANews,
  updatePlayerShares,
} = require("../controller/nbaController");
const authMiddleware = require("../middleWare/authMiddleware");

router.get("/nba-news", getNBANews);
router.get("/nba-Players", getNBAPlayers);
router.get("/nba-Players/:id", getNBAPlayerById);
router.put("/nba-players/updateShares", authMiddleware, updatePlayerShares);

module.exports = router;
