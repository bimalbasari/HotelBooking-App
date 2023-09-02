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

// Store hotel images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + "/public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

// store profile image
const storageProfile = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + "/public/images");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const uploadImages = multer({ storage: storageProfile });
app.get("/", async function (req, res) {
  try {
    const result = await Propertymodel.find({});
    res.render("list", { properties: result });
  } catch (err) {
    res.send(err);
  }
});

// register
app.get("/register", function (req, res) {
  res.render("register", {});
});

app.post(
  "/register",
  uploadImages.single("profile"),
  async function (req, res) {
    try {
      let email = req.body.email;
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        let errorMessage = "User alrady exists";
        let redirectLink = "login";
        let btnText = "Login";
        res.render("failure", {
          errorMessage: errorMessage,
          redirectLink: redirectLink,
          btnText: btnText,
        });
      } else {
        const hashPassword = await bcrypt.hash(req.body.password, 10);

        const newUser = new User({
          userType: req.body.userType,
          fName: req.body.firstName,
          lName: req.body.lastName,
          gender: req.body.gender,
          dob: req.body.dob,
          contactNumber: req.body.contactNumber,
          img: {
            data: fs.readFileSync(
              path.join(__dirname + "/public/images/" + req.file.filename)
            ),
            contentType: "image/png",
          },

          city: req.body.city,
          country: req.body.country,
          email: email,
          password: hashPassword,
        });
        const user = await newUser.save();

        if (!user) {
          let errorMessage = "Could not register";
          let redirectLink = "register";
          let btnText = "Try again";
          res.render("failure", {
            errorMessage: errorMessage,
            redirectLink: redirectLink,
            btnText: btnText,
          });
        } else {
          let redirectLink = "login";
          let btnText = "Login";
          res.render("success", {
            redirectLink: redirectLink,
            btnText: btnText,
          });
        }
      }
    } catch (err) {
      res.send(err);
    }
  }
);

// login
app.get("/login", function (req, res) {
  res.render("login");
});

app.post("/login", async function (req, res) {
  const userEmail = req.body.email;
  const userPassword = req.body.password;

  const user = await User.findOne({ email: userEmail });

  if (!user) {
    let errorMessage = "User does not exists";
    let redirectLink = "register";
    let btnText = "Sign up";
    res.render("failure", {
      errorMessage: errorMessage,
      redirectLink: redirectLink,
      btnText: btnText,
    });
  } else {
    const validPassword = await bcrypt.compare(userPassword, user?.password);

    if (validPassword) {
      const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET_KEY);

      res.cookie("jwt", token, {
        expires: new Date(Date.now() + 1800000),
        httpOnly: true,
      });

      res.redirect("/myairbnb");
    } else {
      let errorMessage = "Invalid crentials ";
      let redirectLink = "login";
      let btnText = "Try again";
      res.render("failure", {
        errorMessage: errorMessage,
        redirectLink: redirectLink,
        btnText: btnText,
      });
    }
  }
});

app.use("/", userRouter);
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
