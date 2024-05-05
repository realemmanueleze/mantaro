const User = require("../models/user");
const { StatusCodes } = require("http-status-codes");

const register = async (req, res, next) => {
  const { email, name, password } = req.body;
  // only support default user role : "user"
  const user = await User.create({ email, name, password });

  res.status(StatusCodes.CREATED).json({ data: user });
};
const login = async (req, res, next) => {
  res.send("Login");
};
const logout = async (req, res, next) => {
  res.send("Logout");
};

module.exports = {
  register,
  login,
  logout,
};
