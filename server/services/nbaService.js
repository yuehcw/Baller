const axios = require("axios");
const NBAPlayer = require("../models/nbaPlayer");
const { calculatePlayerIndex } = require("../utils/calculateIndex");

const fetchNBANews = async (cache) => {
  try {
    const response = await axios.get(
      "https://nba-latest-news.p.rapidapi.com/articles",
      {
        headers: {
          "X-RapidAPI-Key":
            "c609279aa4msh8fe9e6d486fa636p11b262jsn6b759e501420",
          "X-RapidAPI-Host": "nba-latest-news.p.rapidapi.com",
        },
      },
    );
    const responseData = response.data.slice(0, 5);
    cache.set("nbaNews", responseData);
    console.log(
      `[${new Date().toISOString()}] NBA news data updated in cache.`,
    );
  } catch (error) {
    console.error("Error fetching NBA news:", error);
    throw error;
  }
};

const fetchNBAPLayerSTATSData = async (team, season) => {
  try {
    const response = await axios.get(
      "https://api-nba-v1.p.rapidapi.com/players/statistics",
      {
        headers: {
          "X-RapidAPI-Key":
            "c609279aa4msh8fe9e6d486fa636p11b262jsn6b759e501420",
          "X-RapidAPI-Host": "api-nba-v1.p.rapidapi.com",
        },
        params: {
          team: team,
          season: season,
        },
        timeout: 5000,
      },
    );

    for (const gameStats of response.data.response) {
      let player = await NBAPlayer.findOne({
        playerId: gameStats.player.id,
      });

      if (!player) {
        console.log("can't find player data");
        // If the player does not exist, create a new one
        player = new NBAPlayer({
          playerId: gameStats.player.id,
          firstName: gameStats.player.firstname, // Assuming these fields exist in the response
          lastName: gameStats.player.lastname,
          currentTeam: {
            teamId: team,
            name: gameStats.team.name, // Assuming team name is available in the gameStats
            teamLogo: gameStats.team.logo,
          },
          seasons: [],
        });
      } else {
        // Update player's current team information
        player.currentTeam = {
          teamId: team,
          name: gameStats.team.name, // Assuming team name is available in the gameStats
          teamLogo: gameStats.team.logo,
        };
      }

      // Find the specific season data or create if not exists
      let seasonData = player.seasons.find((s) => s.season === Number(season));
      if (!seasonData) {
        console.log("can't find season data");
        seasonData = {
          season: season,
          gameIds: [],
          indices: [],
          currentIndex: 0,
        };
        player.seasons.push(seasonData);
      }

      if (!seasonData.gameIds.includes(gameStats.game.id)) {
        const index = calculatePlayerIndex({
          points: gameStats.points,
          offReb: gameStats.offReb,
          defReb: gameStats.defReb,
          assists: gameStats.assists,
          steals: gameStats.steals,
          blocks: gameStats.blocks,
          turnovers: gameStats.turnovers,
          plusMinus: gameStats.plusMinus,
          fga: gameStats.fga,
          fgp: gameStats.fgp,
        });

        // Compute the new average
        if (seasonData.indices.length === 0) {
          seasonData.indices.push(index); // First index, just add it
        } else {
          // Compute the new average index
          const totalIndices = seasonData.indices.length;
          const lastAverage = seasonData.indices[totalIndices - 1]; // Get the last stored average
          const newAverage =
            (lastAverage * totalIndices + index) / (totalIndices + 1);
          seasonData.indices.push(newAverage);
        }

        // Update currentIndex to the latest average index
        seasonData.currentIndex =
          seasonData.indices[seasonData.indices.length - 1];

        // Add the game ID to track which games have been processed
        seasonData.gameIds.push(gameStats.game.id);
      }

      await player.save();
      console.log(
        "Player season stats updated successfully for player ID:",
        gameStats.player.id,
      );
    }
  } catch (error) {
    console.error("Failed to fetch or update NBA Player Stats:", error);
  }
};

module.exports = {
  fetchNBANews,
  fetchNBAPLayerSTATSData,
};
