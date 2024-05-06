const express = require("express");
const { fetchNBANews, fetchNBAPlayers } = require("../../services/nbaService");

const router = express.Router();

router.get("/nba-news", async (req, res) => {
  const nbaNews = await fetchNBANews();
  res.json(nbaNews);
});

// router.get("/nba-players", async (req, res) => {
//   const { team, season } = req.query;
//   const nbaPlayers = await fetchNBAPlayers(team, season);
//   res.json(nbaPlayers.response);
// });

module.exports = router;
