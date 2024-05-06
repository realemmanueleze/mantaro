require("dotenv").config();
const jwt = require("jsonwebtoken");

const createToken = (payload) => {
  const token = jwt.create(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });

  return token;
};
