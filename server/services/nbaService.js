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

const fetchGameDataWithRetry = async (season, retries = 3) => {
  try {
    const response = await axios.get(
      "https://api-nba-v1.p.rapidapi.com/games",
      {
        headers: {
          "X-RapidAPI-Key":
            "c609279aa4msh8fe9e6d486fa636p11b262jsn6b759e501420",
          "X-RapidAPI-Host": "api-nba-v1.p.rapidapi.com",
        },
        params: { season: season },
        timeout: 5000,
      },
    );
    return response.data.response;
  } catch (error) {
    if (retries > 0) {
      console.log(
        `Retrying fetch for season ${season}. Retries left: ${retries - 1}`,
      );
      return fetchGameDataWithRetry(season, retries - 1);
    } else {
      throw error;
    }
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
        params: { team, season },
        timeout: 5000,
      },
    );

    const gameStatsArray = response.data.response;

    const gameData = await fetchGameDataWithRetry(season);
    console.log(
      `Fetched game data for season ${season}, total games: ${gameData.length}`,
    );

    for (const gameStats of gameStatsArray) {
      let player = await NBAPlayer.findOne({ playerId: gameStats.player.id });

      if (!player) {
        console.log(`Creating new player with ID: ${gameStats.player.id}`);
        player = new NBAPlayer({
          playerId: gameStats.player.id,
          firstName: gameStats.player.firstname,
          lastName: gameStats.player.lastname,
          currentTeam: {
            teamId: team,
            name: gameStats.team.name,
            teamLogo: gameStats.team.logo,
          },
          seasons: [],
        });
      } else {
        player.currentTeam = {
          teamId: team,
          name: gameStats.team.name,
          teamLogo: gameStats.team.logo,
        };
      }

      let seasonData = player.seasons.find((s) => s.season === Number(season));
      if (!seasonData) {
        console.log(
          `Creating new season data for player ID: ${gameStats.player.id}, season: ${season}`,
        );
        seasonData = {
          season: season,
          team: {
            teamId: team,
            name: gameStats.team.name,
            teamLogo: gameStats.team.logo,
          },
          games: [],
        };
        player.seasons.push(seasonData);
      }

      if (!seasonData.games.some((game) => game.gameId === gameStats.game.id)) {
        const gameInfo = gameData.find((game) => game.id === gameStats.game.id);

        if (gameInfo) {
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

          console.log(
            `Adding game data for player ID: ${gameStats.player.id}, game ID: ${gameStats.game.id}`,
          );
          seasonData.games.push({
            gameId: gameStats.game.id,
            gameDate: new Date(gameInfo.date.start),
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
            index: index,
          });

          seasonData.games.sort((a, b) => a.gameId - b.gameId);

          const totalIndices = seasonData.games.reduce(
            (acc, game) => acc + game.index,
            0,
          );
          player.currentIndex = totalIndices / seasonData.games.length;

          await player.save();
          console.log(
            "Player season stats updated successfully for player ID:",
            gameStats.player.id,
          );
        }
      }
    }
  } catch (error) {
    console.error("Failed to fetch or update NBA Player Stats:", error);
  }
};

module.exports = {
  fetchNBANews,
  fetchNBAPLayerSTATSData,
};
