const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
require("dotenv").config();
const { auth } = require("../auth");
const Propertymodel = require("../models/properties");
const Booking = require("../models/booking");
const User = require("../models/user");
const uploadImages = require("../imageUpLoader");
const Help = require("../models/support");
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
      res.render("home", {
        properties: properties,
        isGuest: isGuest,
        user: user,
      });
    } else {
      res.render("home", {
        properties: properties,
        isGuest: isGuest,
        user: user,
      });
    }
  } catch (error) {
    console.log(error);
  }
});

// Delete property
router.get("/delete/:property_id", auth, async function (req, res) {
  try {
    const user = await User.findOne({ email: req.userEmail });
    if (user && user?.userType === "host") {
      const propertyId = req.params.property_id;
      const isDelete = await Propertymodel.deleteOne({
        $and: [{ _id: propertyId }, { owner: user._id }],
      });

      if (isDelete) {
        let redirectLink = "myairbnb/hostedproperties";
        let btnText = "My properties";
        res.render("success", { redirectLink: redirectLink, btnText: btnText });
      } else {
        let errorMessage = "Error deleting property";
        let redirectLink = "myairbnb/hostedproperties";
        let btnText = "My properties";
        res.render("failure", {
          errorMessage: errorMessage,
          redirectLink: redirectLink,
          btnText: btnText,
        });
      }
    } else {
      res.render("failure", {
        errorMessage: "You don't have acces to deleting property",
        redirectLink: "myairbnd",
        btnText: "Home",
      });
    }
  } catch (error) {
    console.log(error);
  }
});

// my hosted properties
router.get("/myairbnb/hostedproperties", auth, async function (req, res) {
  try {
    const userDb = await User.findOne({ email: req.userEmail });

    if (userDb.userType == "host") {
      Propertymodel.find({ owner: userDb._id }, function (err, result) {
        if (result.length) {
          res
            .status(200)
            .render("host", { user: userDb, hostProperties: result });
        } else {
          res.render("failure", {
            errorMessage: "No properties to show",
            redirectLink: "registerproperty",
            btnText: "Host a property",
          });
        }
      });
    } else {
      res.render("failure", {
        errorMessage: "You are not a host",
        redirectLink: "myarbnd",
        btnText: "Home",
      });
    }
  } catch (err) {
    res.send("Error fetching hosted properties ");
  }
});

// Register property
router.get("/registerproperty", async function (req, res) {
  try {
    // let isGuest = true;
    // const user = await User.findOne({ email: req.userEmail });
    // if (user.userType == "host") {
    //   isGuest = false;
      res.render("registerproperty", { user:"", isGuest:"" });
    // } else {
    //   res.render("failure", {
    //     errorMessage: "You are a guest, cannot host property",
    //     redirectLink: `login`,
    //     btnText: "Host Login",
    //   });
    // }
  } catch (error) {
    res.send(error);
  }
});

router.post(
  "/registerproperty/:userId",
  uploadImages.array("images"),
  async function (req, res) {
    try {
      const propertyName = req.body.propertyName;
      const owner = req.params.userId;
      const city = req.body.city;

      const isProperty = await Propertymodel.findOne({
        $and: [
          { propertyName: propertyName },
          { owner: owner },
          { city: city },
        ],
      });
      if (!isProperty) {
        let curPath = __dirname;
        let imagePath = path.dirname(curPath);
        let property = new Propertymodel({
          propertyId: req.body.propertyId,
          propertyName: propertyName,
          owner: owner,
          description: req.body.description,
          city: city,
          state: req.body.state,
          country: req.body.country,
          pricing: req.body.price,
          sPricing: req.body.price,
          area: req.body.area,
          rating: req.body.rating,
          guests: req.body.guests,
          sGuest: req.body.guests,
          bedrooms: req.body.bedrooms,
          beds: req.body.beds,
          bathrooms: req.body.bathrooms,
          gardenview: req.body.gardenview,
          beachAccess: req.body.beachaccess,
          wifi: req.body.wifi,
          parking: req.body.parking,
          pool: req.body.pool,
          mountainview: req.body.mountainview,
          kitchen: req.body.kitchen,
          tv: req.body.tv,
          petsAllowed: req.body.pets,
          airconditioning: req.body.ac,
          workspace: req.body.workspace,
          alarm: req.body.alarm,
          img: [
            {
              data: fs.readFileSync(
                path.join(imagePath + "/public/images/" + req.files[0].filename)
              ),
              contentType: "image/png",
            },
            {
              data: fs.readFileSync(
                path.join(imagePath + "/public/images/" + req.files[1].filename)
              ),
              contentType: "image/png",
            },
            {
              data: fs.readFileSync(
                path.join(imagePath + "/public/images/" + req.files[2].filename)
              ),
              contentType: "image/png",
            },
            {
              data: fs.readFileSync(
                path.join(imagePath + "/public/images/" + req.files[3].filename)
              ),
              contentType: "image/png",
            },
          ],
          email: req.body.email,
        });

        const register = await property.save();
        if (register) {
          res.render("success", {
            redirectLink: "registerproperty",
            btnText: "Add other property",
          });
        } else {
          res.render("failure", {
            errorMessage: "Error registering property",
            redirectLink: "registerproperty",
            btnText: "Try again",
          });
        }
      } else {
        res.render("failure", {
          errorMessage: "This Property alrady registerd",
          redirectLink: "registerproperty",
          btnText: "Add other property",
        });
      }
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
);

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

// handle reviews
router.get("/review/:propertyId", async function (req, res) {
  try {
    res.render("review", { propertyId: req.params.propertyId });
  } catch (error) {
    res.send("Error");
  }
});

router.post("/review/:propertyId", auth, async function (req, res) {
  try {
    let propertyId = req.params.propertyId;
    let userEmail = req.userEmail;
    let rating = req.body.starRating;
    let review = req.body.review;
    const user = await User.findOne({ email: userEmail });
    let reviewObj = {
      reviewBy: user._id,
      starRating: rating,
      reviewContet: review,
    };

    Propertymodel.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(propertyId) },
      { $push: { review: reviewObj } },
      function (err, success) {
        if (err) {
          res.render("failure", {
            errorMessage: "Error submitting review",
            redirectLink: `review/${propertyId}`,
            btnText: "Try again",
          });
        } else {
          res.render("success", {
            redirectLink: `property/${propertyId}`,
            btnText: "See review",
          });
        }
      }
    );
  } catch (error) {
    res.send("Error submitting review");
  }
});

// search when user is logged in
router.get("/myairbnb/search", async function (req, res) {
  try {
    let searchString = req.query.query;
    let isGuest;
    let token = req.cookies.jwt;
    let user = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userNamedb = await User.findOne({ email: user.email });
    let userType = userNamedb.userType;
    if (userType == "host") {
      isGuest = false;
    } else {
      isGuest = true;
    }
    Propertymodel.find({ $text: { $search: searchString } }).exec(function (
      err,
      result
    ) {
      if (err) {
        let errorMessage = "Error fetching properties";
        let redirectLink = "myairbnb";
        let btnText = "My Airbnb";
        res.render("failure", {
          errorMessage: errorMessage,
          redirectLink: redirectLink,
          btnText: btnText,
        });
      } else {
        res.render("home", {
          properties: result,
          isGuest: isGuest,
          user: userNamedb,
        });
      }
    });
  } catch (error) {
    res.send(error);
  }
});

// search on homepage when user is not logged in
router.get("/search", async function (req, res) {
  try {
    let searchString = req.query.query;
    Propertymodel.find({ $text: { $search: searchString } }).exec(function (
      err,
      result
    ) {
      if (!err) {
        res.render("list", { properties: result });
      }
    });
  } catch (error) {
    res.send("Error");
  }
});

// help
router.get("/help", function (req, res) {
  res.render("help", {});
});

router.post("/help", function (req, res) {
  try {
    let supportQuery = new Help({
      name: req.body.name,
      email: req.body.email,
      contact: req.body.contact,
      help: req.body.comment,
    });
    supportQuery.save();
    let redirectLink = "help";
    let btnText = "Go to help";
    res.render("success", { redirectLink: redirectLink, btnText: btnText });
  } catch (error) {
    let errorMessage = "There was an error";
    let redirectLink = "/help";
    let btnText = "Try again";
    res.render("failure", {
      errorMessage: errorMessage,
      redirectLink: redirectLink,
      btnText: btnText,
    });
  }
});

module.exports = router;
