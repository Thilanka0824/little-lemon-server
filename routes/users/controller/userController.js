const User = require("../model/User");
const {errorHandler} = require("./userHelper")

module.exports = {
  login: async (req, res) => {
    try {
      let newUser = await new User({
        username: req.body.username,
        password: req.body.password,
      });
      console.log(newUser);

      let savedUser = await newUser.save();

      res.status(200).json({
        message: "POST REQUEST FROM THE CONTROLLER",
        user: savedUser,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message || "An error occurred during login",
      });
    }
  },
  register: async (req,res) => {
    try {
      let foundUser = await User.findOne({username: req.body.username})
      if (foundUser) {
        throw {
          status: 409,
          message: "User Already Exists"
        }
      } 
      let newUser = await new User({
        username: req.body.username,
        password: req.body.password,
      });
      console.log(newUser);

      let savedUser = await newUser.save();

      res.status(200).json({
        message: "POST REQUEST FROM THE CONTROLLER",
        user: savedUser,
      });
    } catch (error) {
      let errorMessage = await errorHandler(error)
      res.status(errorMessage.status).json({
        message: errorMessage.message
      });
    }
  }
};
