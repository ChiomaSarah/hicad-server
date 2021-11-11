require("dotenv").config();
const jwt = require("jsonwebtoken");
const tokenSecret = process.env.TOKEN_SECRET;

function generateToken(user) {
  return jwt.sign({ data: user }, tokenSecret, { expiresIn: "30m" });
}

module.exports = generateToken;
