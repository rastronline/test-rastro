const passport = require('passport');
const mongoose = require('mongoose');
const Article = require('../models/article.model');
const User = require('../models/user.model')

module.exports.list = (req, res, next) => {
  let query = "";
  if (req.params.id) { 
    console.log ('estoy en el if')
    query = `owner:${req.params.id}`
    Article.find({owner: req.params.id})
    .then((articles) =>
    User.findById(req.params.id)
    .then((user)=>
    res.render('articles/list', {articles, user}))
    )
  } else {
  
  Article.find()
  .then((articles) => res.render('articles/list', { articles }))
  .catch(err => next(err))
}
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