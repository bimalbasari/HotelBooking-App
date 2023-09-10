const mongoose = require("mongoose");
const propertySchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  title: {
    type: String,
    require: true,
  },
  landmark: String,
  city: String,
  state: String,
  country: String,
  price: Number,
  area: Number,
  guest: Number,
  beds: Number,
  bathrooms: Number,
  amenties: {
    type: Boolean,
    default: false,
  },
  gardenview: {
    type: Boolean,
    default: false,
  },
  childPark: {
    type: Boolean,
    default: false,
  },
  park: {
    type: Boolean,
    default: false,
  },
  beachAccess: {
    type: Boolean,
    default: false,
  },
  wifi: {
    type: Boolean,
    default: false,
  },
  parking: {
    type: Boolean,
    default: false,
  },
  pool: {
    type: Boolean,
    default: false,
  },
  mountainview: {
    type: Boolean,
    default: false,
  },
  kitchen: {
    type: Boolean,
    default: false,
  },
  tv: {
    type: Boolean,
    default: false,
  },
  petsAllowed: {
    type: Boolean,
    default: false,
  },
  aircondition: {
    type: Boolean,
    default: false,
  },
  workspace: {
    type: Boolean,
    default: false,
  },
  alarm: {
    type: Boolean,
    default: false,
  },
  privateEntrance: {
    type: Boolean,
    default: false,
  },
  img: [
    String,
    // {
    //   link: String,
    // },
  ],
  description: String,
  exterinfo: String,
  rating: Number,
  review: [
    {
      reviewBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
      starRating: Number,
      reviewContet: String,
    },
  ],
});

// propertySchema.index({ "$**": "text" });

module.exports = new mongoose.model("Property", propertySchema);
