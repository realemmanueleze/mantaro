const { StatusCodes } = require("http-status-codes");
const User = require("../models/user");
const CustomError = require("../errors");

const getAllUsers = async (req, res, next) => {
  const users = await User.find({}).select(["-password"]);
  res.send(users);
};

const getCurrentUser = async (req, res, next) => {
  res.status(StatusCodes.OK).json({ user: req.user });
};
const getSingleUser = async (req, res, next) => {
  res.send("Single user");
};
const updateUser = async (req, res, next) => {
  res.send("Updated User");
};
const updatePassword = async (req, res, next) => {
  res.send("Password updated");
};

module.exports = {
  getAllUsers,
  getCurrentUser,
  getSingleUser,
  updateUser,
  updatePassword,
};
