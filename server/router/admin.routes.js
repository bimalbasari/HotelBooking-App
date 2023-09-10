const express = require("express");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Propertymodel = require("../models/properties");
const Booking = require("../models/booking");
const Help = require("../models/support");
const { adminAuth } = require("../auth");
require("dotenv").config();
const router = express.Router();

// admin
router.get("/",async function (req, res) {
  res.status(200).render("admin");
});

router.post("/", async function (req, res) {
  try {
    const { admin, password } = req.body;
    if (admin === process.env.ADMIN && password == process.env.ADMINPWD) {
      const payload = {
        user: admin,
        password: password,
      };
      const expirationTime = Math.floor(Date.now() / 1000) + 1800;
      const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        expiresIn: expirationTime,
      });
      res.cookie("admin", token, { expires: 0 });
      res.redirect("/admin/dashboard");
    } else {
      res.render("failure", {
        errorMessage: "Unauthorized",
        redirectLink: "admin",
        btnText: "Try again",
      });
    }
  } catch (error) {
    console.log(error);
    let errorMessage = "Unexpected error occurred";
    let redirectLink = "admin";
    let btnText = "Try again";
    res.render("failure", {
      errorMessage: errorMessage,
      redirectLink: redirectLink,
      btnText: btnText,
    });
  }
});

router.get("/dashboard", adminAuth, async function (req, res) {
  res.render("admindashboard", {});
});

// manage users
router.get("/users", adminAuth, async function (req, res) {
  try {
    User.find({}, function (err, doc) {
      if (!err) {
        res.render("users", { users: doc });
      } else {
        res.send(err);
      }
    });
  } catch (error) {
    res.send(error);
  }
});

router.get("/users/delete/:userId", adminAuth, function (req, res) {
  req.params.userId;
  User.deleteOne({ _id: mongoose.Types.ObjectId( req.params.userId) })
    .then(function () {
      res.redirect("/admin/users");
    })
    .catch(function (error) {
      res.send(err);
    });
});

// menage Property
router.get("/properties", adminAuth, async function (req, res) {
  try {
    Propertymodel.find({}, function (err, doc) {
      if (!err) {
        res.render("properties", { properties: doc });
      } else {
        res.send(err);
      }
    });
  } catch (error) {
    res.send(error);
  }
});

router.get("/propertie/delete/:propertyId", adminAuth, function (req, res) {
  let delId = req.params.pid;
  Propertymodel.deleteOne({ _id: mongoose.Types.ObjectId(delId) })
    .then(function () {
      res.redirect("/admin/properties");
    })
    .catch(function (error) {
      res.send(error);
    });
});

router.get("/bookings", adminAuth, async function (req, res) {
  try {
    Booking.find({}, function (err, doc) {
      if (!err) {
        res.render("bookings", { bookings: doc });
      } else {
        res.send(err);
      }
    });
  } catch (error) {
    res.send(error);
  }
});

router.get("/bookings/remove/:propertyId", adminAuth, function (req, res) {
  let delId = req.params.bookedproperty;
  Booking.deleteOne({ _id: mongoose.Types.ObjectId(delId) })
    .then(function () {
      res.redirect("/admin/bookings");
    })
    .catch(function (error) {
      res.send(error);
    });
});

router.get("/support", adminAuth, async function (req, res) {
  try {
    Help.find({}, function (err, doc) {
      if (!err) {
        res.render("support", { queries: doc });
      } else {
        res.send(err);
      }
    });
  } catch (error) {
    res.send(error);
  }
});



router.get("/support/remove/:supportId", adminAuth, function (req, res) {
  let delId = req.params.qid;
  Help.deleteOne({ _id: mongoose.Types.ObjectId(delId) })
    .then(function () {
      res.redirect("/admin/support");
    })
    .catch(function (error) {
      res.send(error);
    });
});

module.exports = router;
