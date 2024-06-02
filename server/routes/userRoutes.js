const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getUser,
  addToTeam,
  sellFromTeam,
} = require("../controller/userController");
const authMiddleware = require("../middleWare/authMiddleware");

router.post("/register", register);
router.post("/login", login);
router.get("/profile", authMiddleware, getUser);
router.post("/addToMyTeam", authMiddleware, addToTeam);
router.put("/sellFromMyTeam", authMiddleware, sellFromTeam);

module.exports = router;
