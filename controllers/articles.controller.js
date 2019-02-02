const passport = require('passport');
const mongoose = require('mongoose');
const Article = require('../models/article.model');
const User = require('../models/user.model');

module.exports.list = (req, res, next) => {
  //console.log("req user is  "+ req.user)
  //res.send(req.session.user);
  Article.find()
    .then((articles) => res.render('articles/list', { articles }))
    .catch(err => next(err))
}

module.exports.get = (req, res, next) => {
  Article.findById(req.params.id)
    .then((article) => {
      User.findById(article.owner)
        .then(user => {
          res.render('articles/details', { article, user })
        })
      })
    .catch(err => next(err));
}

module.exports.listByUser = (req, res, next) => {
  Article.find({owner: req.params.id})
    .then(articles => {
      User.findById(req.params.id)
        .then(user => {
          res.render('articles/userListings', { articles, user })
        })
    })
    .catch(err => next(err))
}