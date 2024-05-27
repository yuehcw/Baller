const express = require("express");
const router = express.Router();
const { register, login, getUser } = require("../controller/userController");
const authMiddleware = require("../middleWare/authMiddleware");

router.post("/register", register);
router.post("/login", login);
router.get("/profile", authMiddleware, getUser);

module.exports = router;
