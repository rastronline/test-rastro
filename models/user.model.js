const constants = require("../constants");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: "Name is required"
    },
    social: {
      googleId: String,
      facebookId: String
    },
    email: {
      type: String,
      required: "Email is required",
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address"
      ],
      unique: true
    },
    role: {
      type: String,
      enum: [constants.ROLE_ADMIN, constants.ROLE_USER],
      default: constants.ROLES.ROLE_USER
    },
    location: {
      type: {
        type: String,
        default: "Point"
      },
      coordinates: [Number]
    },
    address: {
      type: String,
      default: "28001, Madrid"
    },
    profilePic: {
      type: String,
      default: "../images/profile-default.png"
    },
    favorites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Article"
      }
    ],
    hobbies: {
      type: [String],
      enum: constants.CATEGORIES.map(category => category.id)
    },
    penalties: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

userSchema.index({ location: "2dsphere" });

const User = mongoose.model("User", userSchema);

module.exports = User;
