const jwt = require("jsonwebtoken");
const User = require("./models/register");

const auth = async (req, res, next) => {
  // when we use middleware we need req, res and next
  try {
    const token = req.cookies.jwt;
    const verifyUser = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!verifyUser) {
      res.send(
        "<h1>Please login to continue</h1><br><a href='/login' target='blank'>Login</a>"
      );
    } else {
      req.userEmail = verifyUser.email;
      next();
    }
  } catch (error) {
    res.status(401).send(error);
  }
};

module.exports = auth;
