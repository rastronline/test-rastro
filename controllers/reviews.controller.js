const passport = require("passport");
const mongoose = require("mongoose");
const User = require("../models/user.model");
const Review = require("../models/reviews.model")
const Article = require("../models/article.model");
const constants = require("../constants");

module.exports.addReview = (req, res, next) => {
  Article.findById(req.params.id)
  .then(article => {
  res.render("users//reviews");
});
};