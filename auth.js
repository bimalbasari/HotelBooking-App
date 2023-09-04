const jwt = require("jsonwebtoken");
const User = require("./models/register");

const auth = async (req, res, next) => {
  // when we use middleware we need req, res and next
  try {
    const token = req.cookies.jwt;
    if (token) {
      const verifyUser = jwt.verify(token, process.env.JWT_SECRET_KEY);
      if (!verifyUser) {
        res.send(
          "<h1>Please login to continue</h1><br><a href='/login' target='blank'>Login</a>"
        );
      } else {
        req.userEmail = verifyUser.email;
        next();
      }
    } else {
      res.send(
        "<h1>Please login to continue</h1><br><a href='/login' target='blank'>Login</a>"
      );
    }
  } catch (error) {
    console.log(error);
    res.send(
      "<h1>Login  Expeired </h1><br><a href='/login' target='blank'>Login</a>"
    );
  }
};

module.exports = auth;
