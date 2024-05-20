const express = require("express");
const router = express.Router();
const NBAPlayer = require("../../models/nbaPlayer");

router.get("/nba-news", async (req, res) => {
  const cachedNews = req.newsCache.get("nbaNews");
  if (cachedNews) {
    res.json(cachedNews);
  } else {
    res.status(500).json({ error: "NBA news data not available" });
  }
});

router.get("/nba-Players", async (req, res) => {
  try {
    const players = await NBAPlayer.find().sort({
      "seasons.0.currentIndex": -1,
    });

    const filteredPlayers = players.filter((player) => {
      const hasCurrentIndex =
        player.seasons.length > 0 &&
        player.seasons[0].currentIndex !== undefined &&
        player.seasons[0].currentIndex !== null;
      const hasImage = player.headshotUrl && player.headshotUrl.trim() !== "";
      return hasCurrentIndex && hasImage;
    });

    const response = filteredPlayers.map((player) => ({
      id: player.playerId,
      image: player.headshotUrl,
      firstName: player.firstName,
      lastName: player.lastName,
      team: player.currentTeam.name,
      currentIndex:
        player.seasons.length > 0
          ? Number(player.seasons[0].currentIndex.toFixed(1))
          : null,
    }));

    res.json(response);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/nba-Players/:id", async (req, res) => {
  try {
    const player = await NBAPlayer.findOne({ playerId: req.params.id });

    if (!player) {
      return res.status(404).json({ message: "Player not found" });
    }
    const response = {
      id: player.playerId,
      image: player.headshotUrl,
      firstName: player.firstName,
      lastName: player.lastName,
      team: player.currentTeam.name,
      teamLogo: player.currentTeam.teamLogo,
      country: player.country,
      height: player.height,
      lastAttended: player.lastAttended,
      number: player.number,
      position: player.position,
      weight: player.weight,

      currentIndex:
        player.seasons.length > 0
          ? Number(player.seasons[0].currentIndex.toFixed(1))
          : null,
    };

    res.json(response);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
