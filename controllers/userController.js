const User = require("../models/User");

exports.getUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
