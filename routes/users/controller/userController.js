module.exports = {
  login: async (req, res) => {
    try {
      let username = req.body.username;
      let password = req.body.password;

      if (username === "Thilanka") {
        throw new Error("This user already exists");
      }
      if (password === "" || password === undefined) {
        throw new Error("password can not be blank");
      }

      res.status(200).json({
        message: "POST REQUEST FROM THE CONTROLLER",
        userObj: req.body,
      });

    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message || "An error occurred during login",
      });
    }
  },
};
