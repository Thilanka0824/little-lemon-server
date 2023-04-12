const User = require("../model/User");
const {
  errorHandler,
  createUser,
  hashPassword,
  comparePassword,
} = require("./userHelper");

module.exports = {
  register: async (req, res) => {
    try {
      let foundUser = await User.findOne({ username: req.body.username });
      if (foundUser) {
        throw {
          status: 409,
          message: "USER ALREADY EXISTS",
        };
      }

      let newUser = await createUser(req.body);
      // console.log(newUser);
      //password hash
      let hashedPassword = await hashPassword(newUser.password);
      newUser.password = hashedPassword;

      //mongoose save
      let savedUser = await newUser.save();

      res.status(200).json({
        message: "User created successfully",
        userOBJ: savedUser,
      });
    } catch (error) {
      let errorMessage = await errorHandler(error);
      res.status(errorMessage.status).json({ message: errorMessage.message });
    }
  },

  login: async (req, res) => {
    try {
      let foundUser = await User.findOne({ username: req.body.username });
      // foundUser is the User object from the database
      if (!foundUser) {
        // if the user does not exist, throw an error
        throw {
          status: 404,
          message: "USER DOES NOT EXIST!",
        };
      }
      //throw an error if the password is incorrect
      let checkedPassword = await comparePassword(
        req.body.password,
        foundUser.password
      );
      if (!checkedPassword) {
        throw {
          status: 401,
          message: "INCORRECT PASSWORD!",
        };
      }

      console.log("foundUser", foundUser);

      res.status(200).json({
        message: "Post request from the Controller",
        userOBJ: foundUser,
      });
    } catch (error) {
      let errorMessage = await errorHandler(error);
      res.status(errorMessage.status).json({ message: errorMessage.message });
    }
  },

  deleteUser: async (req, res) => {
    try {
      res.status(200).json({
        message: "Delete request from the Controller",
      });
    } catch (error) {
      let errorMessage = await errorHandler(error);
      res.status(errorMessage.status).json({ message: errorMessage.message });
    }
  },
};
