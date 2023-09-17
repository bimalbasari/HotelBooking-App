const express = require("express");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const uuid = require("uuid");
const path = require("path");
require("dotenv").config();
const { auth } = require("../auth");
const Propertymodel = require("../models/properties");
const User = require("../models/user");
const uploadImages = require("../imageUpLoader");
const router = express.Router();

// http://localhost:5000/uploads/D:/WeB/airBnB/HotelBooking-App/server/public/images/01d317965e72bb5aa449e35a332b527f.webp.webp
// uploadImages.array("pictures"),

router.post("/property", uploadImages.array("pictures", 6), async function (req, res) {
    try {
      const {
        ac,
        aircondition,
        alarm,
        amenties,
        area,
        bathrooms,
        beachaccess,
        beds,
        childPark,
        city,
        country,
        description,
        exterinfo,
        gardenview,
        guest,
        kitchen,
        landmark,
        mountainview,
        park,
        parking,
        pets,
        pool,
        price,
        privateEntrance,
        state,
        title,
        tv,
        wifi,
        workspace,
      } = req.body;

      const isProperty = await Propertymodel.findOne({
        $and: [{ title: title }, { city: city }],
      });
      if (!isProperty) {
        const uploadedfiles = Array();
        for (let i = 0; i < req.files.length; i++) {
          const { originalname } = req.files[i];
          uploadedfiles.push(`images/${originalname}`);
        }

        const property = new Propertymodel({
          ac,
          aircondition,
          alarm,
          amenties,
          area,
          bathrooms,
          beachaccess,
          beds,
          childPark,
          city,
          country,
          description,
          exterinfo,
          gardenview,
          guest,
          kitchen,
          landmark,
          mountainview,
          park,
          parking,
          pets,
          pool,
          price,
          privateEntrance,
          state,
          title,
          tv,
          wifi,
          workspace,
          img: [...uploadedfiles],
        });
        console.log(property);
        const register = await property.save();
        if (register) {
          res.status(201).json({ message: "property Register sucessful" });
        } else {
          res.status(401).json({ message: "Something else Try Again" });
        }
      } else {
        res.status(301).json({ message: "This property alrady registerid" });
      }
    } catch (error) {
      console.log(error);
      res.status(501).json({ message: "Server Down try after Some time" });
    }
  }
);
module.exports = router;
