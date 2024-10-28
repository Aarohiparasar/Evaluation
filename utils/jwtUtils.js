const jwt = require("jsonwebtoken");
const { SECRETKEY } = process.env;

exports.generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, SECRETKEY, {
    expiresIn: "1h",
  });
};
