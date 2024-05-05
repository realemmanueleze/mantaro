const User = require("../models/user");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors/index");

const register = async (req, res, next) => {
  const { email, name, password } = req.body;
  // prevent creation of duplicate email
  const emailAlreadyExist = await User.findOne({ email });
  if (emailAlreadyExist) {
    throw new CustomError.BadRequestError("User with email already exists");
  }

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
