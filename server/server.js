if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const cors = require("cors");
const nbaRoutes = require("./routes/nbaRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

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

const mongoose = require("mongoose");
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("Connected to MongoDB and Mongoose.");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

app.use("/nba", nbaRoutes);
app.use("/users", userRoutes);
app.get("/", (req, res) => {
  res.send("API is running");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
