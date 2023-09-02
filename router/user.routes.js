const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
require("dotenv").config()
const auth = require("../auth");
const Propertymodel = require("../models/properties");
const Booking = require("../models/booking");
const User = require("../models/register");
const router = express.Router();

// after login
router.get("/myairbnb", auth, async function (req, res) {
  try {
    let isGuest;

    const user = await User.findOne({ email: req.userEmail });

    if (user?.userType == "host") {
      isGuest = false;
    } else {
      isGuest = true;
    }
    const properties = await Propertymodel.find({});
    if (!properties) {
      res.render("my", {
        properties: properties,
        isGuest: isGuest,
        user: user,
      });
    } else {
      res.render("my", {
        properties: properties,
        isGuest: isGuest,
        user: user,
      });
    }
  } catch (error) {
    console.log(error);
  }
});

// handle particular property click
router.get("/property/:property_id", async function (req, res) {
  try {
    let user = {};
    let token = req.cookies.jwt;
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      user = await User.findOne({ email: decoded.email });
    }
    let requestedPropertyId = req.params.property_id;

    const result = await Propertymodel.findById({
      _id: mongoose.Types.ObjectId(requestedPropertyId),
    });
    const host = await User.findOne({ email: result.email });
    res.render("property", {
      property: result,
      hostProfile: host,
      user: user,
    });
  } catch (error) {
    res.send(error);
  }
});

router.post("/property/:property_id", auth, async function (req, res) {
  try {
    var property_booked = req.params.property_id;

    Propertymodel.findOne({ _id: property_booked }, function (err, result) {
      if (err) {
        let errorMessage = "There was an error";
        let redirectLink = "myairbnb";
        let btnText = "My Airbnb";
        res.render("failure", {
          errorMessage: errorMessage,
          redirectLink: redirectLink,
          btnText: btnText,
        });
      } else {
        let booking = new Booking({
          email: req.userEmail,
          bookedProperty: result.img[0],
          propertyName: result.propertyName,
          city: result.city,
          state: result.state,
          country: result.country,
          checkinDate: req.body.checkin,
          checkoutDate: req.body.checkout,
          nights: req.body.nights,
          guests: req.body.noOfGuests,
        });
        booking.save();
      }
    });
    let redirectLink = "mybookings";
    let btnText = "My bookings";
    res.render("success", { redirectLink: redirectLink, btnText: btnText });
  } catch (err) {
    res.send(err);
  }
});

// Show bookings
router.get("/mybookings", auth, async function (req, res) {
  try {
    let user = await User.findOne({ email: req.userEmail });
    Booking.find({ email: user.email }, function (err, result) {
      if (!err) {
        res.render("mybookings", { myBookings: result, user: user });
      }
    });
  } catch (error) {
    res.send(error);
  }
});

router.get("/cancelbooking", async function (req, res) {
  try {
    let propertyId = req.query.propertyId;

    const cancelBooking = await Booking.deleteOne({ _id: propertyId });
    if (cancelBooking) {
      res.render("success", {
        redirectLink: "mybookings",
        btnText: "My Bookings",
      });
    } else {
      res.render("failure", {
        errorMessage: "Error cancelling booking",
        redirectLink: "mybookings",
        btnText: "My bookings",
      });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
