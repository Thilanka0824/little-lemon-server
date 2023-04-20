const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  try {
    // - 1. Get the token from the request header
    let bearerToken = req.headers.authorization;
    console.log(bearerToken);
    if (bearerToken) {
      // this line will remove the "Bearer" word from the token
      // split will split the string into an array and access the second element of the array
      const token = bearerToken.split(" ")[1];

      // - 2. Verify the token
      let decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

      // - 3. Check if the token has expired

      // this is the time the token was created compared to the current time in seconds
      //if expired time is less than current time, then the token has expired
      if (decodedToken.exp < Date.now() / 1000) {
        throw {
          status: 403,
          message: "Token has expired",
        };
      }
      //   console.log("decodedToken", decodedToken);
      req.decodedToken = decodedToken;
      next();
    } else {
      throw {
        status: 403,
        message: "Forbidden",
      };
    }
  } catch (error) {
    res.status(403).json("Forbidden");
  }
};

module.exports = {
  verifyToken,
};
