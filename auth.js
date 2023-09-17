const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = async (req, res, next) => {
  // when we use middleware we need req, res and next
  try {
    const token = req.cookies.Bearer;
    if (token) {
      const verifyUser = jwt.verify(token, process.env.JWT_SECRET_KEY);
      if (!verifyUser) {
        res.status(401).json({ message: " Athecation faild Login in to continue" });
      } else {
        req.userEmail = verifyUser.email;
        req.userId=verifyUser.id
        next();
      }
    } else {
      res.status(401).json({ message: "Login in to continue" });
      
    }
  } catch (error) {
    console.log(error);
    res.status(501).json({ message: "internal Server eror" });
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

module.exports = { auth: auth, adminAuth: adminAuth };
