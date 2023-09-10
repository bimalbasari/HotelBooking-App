const jwt = require("jsonwebtoken");

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
      "<h1>Session Expeired </h1><br><a href='/login' target='blank'>Login</a>"
    );
  }
};

const adminAuth = async (req, res, next) => {
  const token = req.cookies.admin;
  if (token) {
    let isadmin = false;
    const admin = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (
      admin &&
      admin.user === process.env.ADMIN &&
      admin.password == process.env.ADMINPWD
    ) {
      next();
    } else {
      res.send(
        "<h1>Session Expeired </h1><br><a href='/admin' target='blank'>Login</a>"
      );
    }
  } else {
    res.send(
      "<h1>Access denied  </h1><br><a href='/admin' target='blank'>Login</a>"
    );
  }
};

module.exports = { auth:auth, adminAuth:adminAuth };
