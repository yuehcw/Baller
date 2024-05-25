const express = require("express");
const router = express.Router();
const {
  getNBAPlayers,
  getNBAPlayerById,
  getNBANews,
} = require("../controller/nbaController");

router.get("/nba-news", getNBANews);
router.get("/nba-Players", getNBAPlayers);
router.get("/nba-Players/:id", getNBAPlayerById);

module.exports = router;
