if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

const nbaRoutes = require("./routes/nba/nbaRoutes");

app.use(express.json());
app.use("/nba", nbaRoutes);

const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Mongoose"));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
