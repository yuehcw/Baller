const NBAPlayer = require("../models/nbaPlayer");

const getNBAPlayers = async (req, res) => {
  try {
    const players = await NBAPlayer.find().sort({
      currentIndex: -1,
    });

    const filteredPlayers = players.filter((player) => {
      const hasCurrentIndex =
        player.currentIndex > 0 &&
        player.currentIndex !== undefined &&
        player.currentIndex !== null;
      const hasImage = player.headshotUrl && player.headshotUrl.trim() !== "";
      return hasCurrentIndex && hasImage;
    });

    const response = filteredPlayers.map((player) => ({
      id: player.playerId,
      image: player.headshotUrl,
      firstName: player.firstName,
      lastName: player.lastName,
      team: player.currentTeam.name,
      position: player.position,
      currentIndex:
        player.seasons.length > 0
          ? Number(player.currentIndex.toFixed(1))
          : null,
    }));

    res.json(response);
  } catch (err) {
    res.status(500).send(err);
  }
};

const getNBAPlayerById = async (req, res) => {
  try {
    const player = await NBAPlayer.findOne({ playerId: req.params.id });

    if (!player) {
      return res.status(404).json({ message: "Player not found" });
    }

    const latestSeason = player.seasons.length > 0 ? player.seasons[0] : null;
    const last10Games = latestSeason
      ? latestSeason.games.slice(-10).map((game) => ({
          ...game.toObject(),
          rebounds: game.offReb + game.defReb,
        }))
      : [];

    // Calculate monthly index
    const monthlyIndex = {};
    latestSeason.games.forEach((game) => {
      const month = new Date(game.gameDate).getMonth() + 1; // Get month
      if (!monthlyIndex[month]) {
        monthlyIndex[month] = { totalIndex: 0, count: 0 };
      }
      monthlyIndex[month].totalIndex += game.index;
      monthlyIndex[month].count += 1;
    });

    Object.keys(monthlyIndex).forEach((month) => {
      monthlyIndex[month] = (
        monthlyIndex[month].totalIndex / monthlyIndex[month].count
      ).toFixed(2);
    });

    const orderedMonthlyIndex = {};
    const months = [9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8];
    months.forEach((month) => {
      if (monthlyIndex[month]) {
        orderedMonthlyIndex[month] = monthlyIndex[month];
      }
    });

    // Calculate season averages
    const totalGames = latestSeason.games.length;
    const totalPoints = latestSeason.games.reduce(
      (sum, game) => sum + game.points,
      0,
    );
    const totalOffReb = latestSeason.games.reduce(
      (sum, game) => sum + game.offReb,
      0,
    );
    const totalDefReb = latestSeason.games.reduce(
      (sum, game) => sum + game.defReb,
      0,
    );
    const totalAssists = latestSeason.games.reduce(
      (sum, game) => sum + game.assists,
      0,
    );
    const totalSteals = latestSeason.games.reduce(
      (sum, game) => sum + game.steals,
      0,
    );
    const totalBlocks = latestSeason.games.reduce(
      (sum, game) => sum + game.blocks,
      0,
    );

    const seasonAverages = {
      points: (totalPoints / totalGames).toFixed(1),
      offReb: (totalOffReb / totalGames).toFixed(1),
      defReb: (totalDefReb / totalGames).toFixed(1),
      assists: (totalAssists / totalGames).toFixed(1),
      steals: (totalSteals / totalGames).toFixed(1),
      blocks: (totalBlocks / totalGames).toFixed(1),
    };

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
          ? Number(player.currentIndex.toFixed(1))
          : null,
      last10Games,
      monthlyIndex: orderedMonthlyIndex,
      seasonAverages,
    };

    res.json(response);
  } catch (err) {
    res.status(500).send(err);
  }
};

const getNBANews = (req, res) => {
  const cachedNews = req.newsCache.get("nbaNews");
  if (cachedNews) {
    res.json(cachedNews);
  } else {
    res.status(500).json({ error: "NBA news data not available" });
  }
};

module.exports = {
  getNBAPlayers,
  getNBAPlayerById,
  getNBANews,
};
