const bcrypt = require("bcrypt");
const User = require("../model/User");
const jwt = require("jsonwebtoken");

const saltRounds = 10;

// create a new user
const createUser = async (user) => {
  let newUser = await new User({
    username: user.username,
    password: user.password,
  });
  return newUser;
};

// hash the password
const hashPassword = async (password) => {
  let genSalt = await bcrypt.genSalt(saltRounds);
  let hashedPassword = await bcrypt.hash(password, genSalt);
  return hashedPassword;
};

// compare the password
const comparePassword = async (plaintextPassword, dbPassword) => {
  let checkedPassword = await bcrypt.compare(plaintextPassword, dbPassword);
  return checkedPassword;
};

// error handler
const errorHandler = async (error) => {
  return {
    status: error.status,
    message: error.message,
  };
};

// - 1. Create a JWT token
createJWTToken = async (foundUser) => {
  // - 2. Create a payload object
  let payload = {
    id: foundUser._id,
    username: foundUser.username,
  };
  // - 3. Sign the token
  let token = await jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: 5 * 60, // 5 minutes
  });

  return token;
};

module.exports = {
  createUser,
  hashPassword,
  comparePassword,
  createJWTToken,
  errorHandler,
};
