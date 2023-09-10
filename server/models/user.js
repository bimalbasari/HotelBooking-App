const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userType: String,
    firstName: String,
    lastName: String,
    gender: String,
    dob: Date,
    phone: { type: Number, unique: true },
    picture: String,
    city: String,
    country: String,
    email: { type: String, unique: true },
    password: String,
  },
  { timestamps: true }
);


const User = new mongoose.model("user", userSchema);
module.exports = User;
