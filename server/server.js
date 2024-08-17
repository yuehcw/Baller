const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

if (process.env.NODE_ENV !== "production") {
  console.log("Running in development mode");
}

const express = require("express");
const cors = require("cors");
const nbaRoutes = require("./routes/nbaRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://baller-client-84ccc08d508f.herokuapp.com",
    ],
    credentials: true,
  }),
);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "../client/build")));

// MongoDB connection
const mongoose = require("mongoose");
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("Connected to MongoDB and Mongoose.");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// API routes
app.use("/nba", nbaRoutes);
app.use("/users", userRoutes);

// Catch-all route to serve the React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
