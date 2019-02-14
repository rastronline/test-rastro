const constants = require("../constants");
const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    description: {
      type: String
    },
    rate: {
      type: Number
    },
    article: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Article"
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
