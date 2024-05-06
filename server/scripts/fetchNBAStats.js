const mongoose = require("mongoose");
const { fetchNBAPLayerSTATSData } = require("../services/nbaService");

const mongoURI = "mongodb://localhost/Baller";

// Function to fetch data for all teams spaced over approximately 4 minutes
async function fetchAllTeamsData(year) {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB.");
  }

  try {
    const totalTeams = 31;
    const totalDuration = 240000; // 4 minutes in milliseconds
    const interval = totalDuration / totalTeams;

    for (let teamId = 1; teamId <= totalTeams; teamId++) {
      setTimeout(
        async () => {
          console.log(`Fetching data for team ${teamId} for season ${year}`);
          await fetchNBAPLayerSTATSData(teamId.toString(), year.toString());
          console.log(`Data fetched for team ${teamId}`);

          if (teamId === totalTeams) {
            console.log("All data fetched successfully.");
            await mongoose.disconnect();
            console.log("Disconnected from MongoDB.");
          }
        },
        interval * (teamId - 1),
      );
    }
  } catch (error) {
    console.error("An error occurred during data fetching:", error);
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB.");
  }
}

// Call the function with the current year
fetchAllTeamsData(new Date().getFullYear() - 1);
