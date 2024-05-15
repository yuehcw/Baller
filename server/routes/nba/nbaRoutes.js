const express = require("express");
const router = express.Router();
const NBAPlayer = require("../../models/nbaPlayer")

router.get("/nba-news", async (req, res) => {
  const cachedNews = req.newsCache.get("nbaNews");
  if (cachedNews) {
    res.json(cachedNews);
  } else {
    res.status(500).json({ error: "NBA news data not available" });
  }
});

router.get("/nba-players", async (req, res) => {
  try {

  }
})

router.get("/nba-")
