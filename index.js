const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const cors = require("cors");
const dotenv = require("dotenv");

const dbConnection = require("./models/connection");
const authRoutes = require("./router/auth.routes");
const userRoutes = require("./router/user.routes");
const hostRoutes = require("./router/host.routes");
const adminRoutes = require("./router/admin.routes");
const propertiesRoutes = require("./router/properties.routes");

const PORT = process.env.PORT || 5000;
const app = express();
dotenv.config();
dbConnection();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static("public"));
// app.use(express.static(__dirname + "/uploads"));
// app.use("images", express.static(__dirname + "/images"));
// app.use("images", express.static(__dirname + "/images"));

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

app.use("/auth/", authRoutes);
app.use("/user/", userRoutes);
app.use("/host/", hostRoutes);
app.use("/admin", adminRoutes);
app.use("/properties", propertiesRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
