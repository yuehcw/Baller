if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const cron = require("node-cron");
const NodeCache = require("node-cache");
const { fetchNBANews } = require("./services/nbaService");
const nbaRoutes = require("./routes/nba/nbaRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

const newsCache = new NodeCache({ stdTTL: 3600, checkperiod: 120 }); // Cache TTL set to 1 hour

app.use(express.json());
// Make the cache available to the routes
app.use((req, res, next) => {
  req.newsCache = newsCache;
  next();
});

const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Mongoose"));

// Schedule the job to run every hour
cron.schedule("0 * * * *", async () => {
  await fetchNBANews(newsCache);
  console.log(`[${new Date().toISOString()}] NBA news data updated in cache.`);
});

// Fetch NBA news when the server starts
fetchNBANews(newsCache).then(() => {
  console.log(`[${new Date().toISOString()}] Initial NBA news data fetched.`);
});

app.use("/nba", nbaRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
