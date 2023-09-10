const multer = require("multer");
const fs = require("fs");

// Store hotel images
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, __dirname + "/public/uploads");
//     },
//     filename: function (req, file, cb) {
//       cb(null, Date.now() + file.originalname);
//     },
//   });

//   const upload = multer({ storage: storage });

// store profile image
const storageProfile = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + "/public/images/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const uploadImages=multer({ storage: storageProfile })

module.exports =uploadImages ;
