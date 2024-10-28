const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { SECRETKEY } = process.env;

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    const decoded = jwt.verify(token, SECRETKEY);
    req.user = await User.findById(decoded.id);
    if (!req.user) return res.status(401).json({ error: "User not found" });

    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};
