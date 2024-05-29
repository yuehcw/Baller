const mongoose = require("mongoose");
const NBAPlayer = require("../models/NBAPlayer");

const mongoURI = "mongodb://localhost/Baller";

const addAvailableField = async () => {
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
    // create definition for player doesn't have available definition
    // const result = await NBAPlayer.updateMany(
    //   { available: { $exists: false } },
    //   { $set: { available: true } },
    // );

    const result = await NBAPlayer.updateMany(
      {},
      { $set: { available: true } },
    );
    console.log(`Updated ${result.nModified} documents`);
  } catch (error) {
    console.error("Error updating documents:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB.");
  }
};

addAvailableField();
