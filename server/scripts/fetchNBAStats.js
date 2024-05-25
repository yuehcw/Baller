const mongoose = require("mongoose");
const { fetchNBAPLayerSTATSData } = require("../services/nbaService");

const mongoURI = "mongodb://localhost/Baller";

// Function to fetch data for all teams spaced over approximately 4 minutes
async function fetchAllTeamsData(year) {
  if (mongoose.connection.readyState === 0) {
    await mongoose
      .connect(mongoURI)
      .then(() => {
        console.log("Connected to MongoDB.");
      })
      .catch((err) => {
        console.error("Error connecting to MongoDB:", err);
      });
  }

  try {
    const totalTeams = 1;
    const totalDuration = 360000; // 6 minutes in milliseconds
    const interval = totalDuration / totalTeams;
    let team;

    for (let teamId = 1; teamId <= totalTeams; teamId++) {
      setTimeout(
        async () => {
          console.log(`Fetching data for team ${teamId} for season ${year}`);

          for (let attempt = 1; attempt <= 3; attempt++) {
            try {
              await fetchNBAPLayerSTATSData(teamId.toString(), year.toString());
              console.log(
                `Data fetched for team ${teamId} on attempt ${attempt}`,
              );
              break; // 成功时跳出循环
            } catch (error) {
              console.error(
                `Attempt ${attempt} failed for team ${teamId}:`,
                error,
              );
              if (attempt === 3) {
                console.error(`All attempts failed for team ${teamId}`);
              } else {
                console.log(`Retrying for team ${teamId}...`);
              }
            }
          }

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
