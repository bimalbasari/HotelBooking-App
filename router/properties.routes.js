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

router.get("/", async function (req, res) {
  try {
    const result = await Propertymodel.find({});
    res.status(201).json({ result });
  } catch (err) {
    res.send(err);
  }
});

// handle particular property click
router.get("/:property_id", async function (req, res) {
  try {
    const reqId = req.params.property_id;
    const result = await Propertymodel.findById({
      _id: mongoose.Types.ObjectId(reqId),
    });
    // const owner = await User.findByIdd({_id:mongoose.Types.ObjectId(result.hostID)});
    res.status(201).json(result);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
