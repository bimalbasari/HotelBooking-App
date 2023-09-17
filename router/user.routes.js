const express = require("express");
const BookingModel = require("../models/booking");
const { auth } = require("../auth");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post("/booking/:property_id", auth, async (req, res) => {
  try {
    const reqId = req.params.property_id;
    const user = req.userId;
    console.log(user);

    const { checkIn, checkOut, guests, name, phone, price } = req.body;

    const booking = await BookingModel.create({
      place: reqId,
      checkIn,
      checkOut,
      guests,
      name,
      phone,
      price,
      user,
    });
    if (booking) {
      // const token = jwt.sign(
      //   { id:booking._id },
      //   process.env.JWT_SECRET_KEY
      // );
      res.status(201).json(booking._id);
    } else {
      res.status(402).json({ message: "Booking faild try again" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/booking/:id", auth, async (req, res) => {
  try {
    const booking = await BookingModel.findOne({ _id: req.params.id }).populate(
      "place"
    );

    res.status(201).json(booking);
  } catch (err) {
    console.log(err);
  }
});

router.get("/bookings", auth, async (req, res) => {
  try {
    const userId = req.userId;
    const booking = await BookingModel.find({ user: userId }).populate("place");
    if (booking) {
      res.status(201).json(booking);
    } else {
      res
        .status(401)
        .json({ message: "Error find booking details try after some time" });
    }
  } catch (err) {
    res.status(501).json({ message: "Internal server eror" });
    console.log(err);
  }
});

router.delete("/booking/cancel/:booking_id", auth, async (req, res) => {
  try {
    let Id = req.query.booking_id;

    const cancelBooking = await BookingModel.deleteOne({ _id: Id });
    if (cancelBooking) {
      res.status(201).json({ message: " Booking  Cancel sucessfull" });
    } else {
      res.status(401).json({ message: "Error when cancel booking" });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
