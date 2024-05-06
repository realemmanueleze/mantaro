const User = require("../models/user");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors/index");
const { createTokenUser, attachCookiesToResponse } = require("../utils");

const register = async (req, res, next) => {
  const { email, name, password } = req.body;

  // prevent creation of duplicate email
  const emailAlreadyExist = await User.findOne({ email });
  if (emailAlreadyExist) {
    throw new CustomError.BadRequestError("User with email already exists");
  }

  // only support default user role : "user"
  const user = await User.create({ email, name, password });

  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, user: tokenUser });
  res.status(StatusCodes.CREATED).json({ user: tokenUser });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  // validate request values
  if ((!email, !password)) {
    throw new CustomError.BadRequestError("Invalid Credentials");
  }

  //check if user exists
  const user = await User.findOne({ email });
  if (!user) {
    throw new CustomError.BadRequestError("Invalid Credentials");
  }

  //check if password is correct
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError(
      "email or Password is incorrect "
    );
  }

  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, user: tokenUser });

  res.status(StatusCodes.OK).json({ user: tokenUser });
};

const logout = async (req, res, next) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });

  res.status(StatusCodes.OK).send("User successfully logged out");
};

module.exports = {
  register,
  login,
  logout,
};
