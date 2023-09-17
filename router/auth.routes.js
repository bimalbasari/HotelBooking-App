const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");
const uploadImages = require("../imageUpLoader");
const User = require("../models/user");
const router = express.Router();

router.post(
  "/register",
  uploadImages.single("picture"),
  async function (req, res) {
    try {
      const {
        userType,
        firstName,
        lastName,
        gender,
        phone,
        dob,
        email,
        city,
        country,
        password,
      } = req.body.data;
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        res.status(401).json({
          message: "User alrady exists",
        });
      } else {
        const curPath = __dirname;
        const imagePath = path.dirname(curPath);
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
          userType,
          firstName,
          lastName,
          gender,
          dob,
          phone,
          email,
          city,
          country,
          picture: "images/" + req.file?.filename,
          password: hashPassword,
        });

        const user = await newUser.save();

        if (!user) {
          res.status(401).json({
            message: "Could not register,Try again",
          });
        } else {
          res.status(201).json({
            message: "Registration  successful ",
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
);
// login

router.post("/login", async function (req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(400).json({ message: "User does not exists" });
    } else {
      const validPassword = await bcrypt.compare(password, user.password);

      if (validPassword) {
        const token = jwt.sign(
          { email: user.email, id: user._id },
          process.env.JWT_SECRET_KEY
        );

        res.cookie("Bearer", token);
        {
          // expires: new Date(Date.now() / 1000 + 3600),
          // httpOnly: true,
        }
        const { firstName, lastName, mobile, picture, gender, dob, userType } =
          user;
        res.status(201).json({
          user: {
            firstName,
            lastName,
            mobile,
            email,
            picture,
            gender,
            dob,
            userType,
          },
        });
      } else {
        res.status(401).json({ message: "Invalid crentials " });
      }
    }
  } catch (err) {
    res
      .status(500)
      .json({
        message:
          "An unexpected error occurred on the server. Please try again later.",
      });
  }
});

// logout
router.get("/logout", function (req, res) {
  res.clearCookie("jwt");
  res.redirect("/");
});

module.exports = router;
