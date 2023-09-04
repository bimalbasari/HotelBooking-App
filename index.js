const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");
const multer = require("multer");
const bcrypt = require("bcrypt");
const path = require("path");
const fs = require("fs");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const User = require("./models/register");
const Propertymodel = require("./models/properties");
const Booking = require("./models/booking");
const Help = require("./models/support");
const cookieParser = require("cookie-parser");
const auth = require("./auth");
const { nextTick } = require("process");
const dbConnection = require("./models/connection");
const PORT = process.env.PORT || 5000;
const app = express();
const userRouter = require("./router/user.routes");

app.set("view engine", "ejs");

// App use
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"));
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use("images", express.static(__dirname + "/images"));

// Global configuration access setup
dotenv.config();
dbConnection();
// mongoose.connect("mongodb://127.0.0.1:27017/airbnbClone", () => {
//     console.log("Successfully connected to database");
// })

// mongoose.connect('mongodb+srv://Bimal123:<password>@cluster0.ia2jgkh.mongodb.net/AirbnbClone', { useNewUrlParser: true });

app.get("/", async function (req, res) {
  try {
    const result = await Propertymodel.find({});
    res.render("list", { properties: result });
  } catch (err) {
    res.send(err);
  }
});



app.use("/", userRouter);
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
