const User = require("../model/User");
const {
  errorHandler,
  createUser,
  hashPassword,
  comparePassword,
  createJWTToken,
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
        userObj: savedUser,
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

      //throw an error if the password from the request body in the front-end does not match the password from the database
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

      //jwt
      let token = await createJWTToken(foundUser);

      console.log("foundUser", foundUser);

      res.status(200).json({
        message: "Post request from the Controller",
        userObj: foundUser,
        token: token,
      });
    } catch (error) {
      let errorMessage = await errorHandler(error);
      res.status(errorMessage.status).json({ message: errorMessage.message });
    }
  },

  deleteUser: async (req, res) => {
    try {
      // console.log(req.headers.authorization);
      console.log(req.token);
      let deletedUser = await User.deleteOne(req.body);
      console.log(deletedUser);

      if (deletedUser.deletedCount > 0) {
        res.status(200).json({
          message: "User deleted successfully",
        });
      } else {
        throw {
          status: 404,
          message: "USER DOES NOT EXIST!",
        };
      }
    } catch (error) {
      let errorMessage = await errorHandler(error);
      res.status(errorMessage.status).json({ message: errorMessage.message });
    }
  },
  authToken: async (req, res) => {
    try {
      let foundUser = await User.findById(req.decodedToken.id);
      console.log(foundUser);
      if (!foundUser) {
        throw {
          status: 404,
          message: "USER DOES NOT EXIST!",
        };
      }

      res.status(200).json(foundUser);
      
    } catch (error) {
      let errorMessage = await errorHandler(error);
      res.status(400).json({ message: errorMessage.message });
    }
  },
};
