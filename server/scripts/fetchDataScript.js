const readline = require("readline");
const mongoose = require("mongoose");
const { fetchNBAPlayersBIOData } = require("../services/nbaService");

const mongoURI = "mongodb://localhost/Baller";

// Establish MongoDB connection
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected successfully.");

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question("Enter the team ID: ", (team) => {
      rl.question("Enter the season (e.g., 2021): ", async (season) => {
        try {
          await fetchNBAPlayersBIOData(team, season);
          console.log("Data fetching and storage complete.");
        } catch (error) {
          console.error("Error fetching NBA Players Data:", error);
        } finally {
          rl.close();
          mongoose.disconnect(); // Ensure mongoose disconnects after operation is complete
        }
      });
    });
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
  });
