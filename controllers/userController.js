const { StatusCodes } = require("http-status-codes");
const User = require("../models/user");
const CustomError = require("../errors");
const {
  createTokenUser,
  checkPermissions,
  attachCookiesToResponse,
} = require("../utils");

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
  const { email, name } = req.body;

  if (!email || !name) {
    throw new CustomError.BadRequestError("Provide all fields");
  }

  const user = await User.findOne({ _id: req.user.userId }).select([
    "-password",
  ]);

  user.email = email;
  user.name = name;
  await user.save();

  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, user: tokenUser });

  res.status(StatusCodes.OK).json({ user: tokenUser });
};

const updatePassword = async (req, res, next) => {
  const { newPassword, oldPassword } = req.body;

  if (!newPassword || !oldPassword) {
    throw new CustomError.BadRequestError("Please include both values");
  }

  const user = await User.findOne({ _id: req.user.userId });

  const isPasswordCorrect = await user.comparePassword(oldPassword);
  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError("Invalid credentials");
  }

  user.password = newPassword.toString();
  await user.save();

  res.status(StatusCodes.OK).json({ msg: "Password successfully updated" });
};

module.exports = {
  getAllUsers,
  getCurrentUser,
  getSingleUser,
  updateUser,
  updatePassword,
};
