const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "Authentication failed" });
  }

  const token = req.headers.authorization.split(" ")[1];

  try {
    const decoded = jwt.verify(token, "your_jwt_secret");
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Authentication failed" });
  }
};
