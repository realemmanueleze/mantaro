const { StatusCodes } = require("http-status-codes");
const User = require("../models/user");
const CustomError = require("../errors");
const { createTokenUser, checkPermissions } = require("../utils");

const getAllUsers = async (req, res, next) => {
  const users = await User.find({}).select(["-password"]);
  res.send(users);
};

const getCurrentUser = async (req, res, next) => {
  res.status(StatusCodes.OK).json({ user: req.user });
};

const getSingleUser = async (req, res, next) => {
  const user = await User.findOne({ _id: req.params.id }).select(["-password"]);
  if (!user) {
    throw new CustomError.NotFoundError(
      `User with id: ${req.params.id} not found`
    );
  }
  checkPermissions(req.user, user._id);
  const tokenUser = createTokenUser(user);
  res.status(StatusCodes.OK).json({ user: tokenUser });
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
