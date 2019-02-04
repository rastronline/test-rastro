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

module.exports.delete = (req, res, next) => {
  Article.findByIdAndDelete(req.params.id)
    .then(article => {
      console.log("articulo ELIMINADOOOOOO");
      res.redirect(`/users/${req.user.id}/myProducts`)})
    .catch(err => next(err));
}

module.exports.create = (req, res, next) => {
  /* User.findById(req.params.id)
    .then(User => {
      res.render('articles/new', user);
    })
    .catch(err => next(err)); */
    res.render('articles/new');
    //res.send("HOLAAA")
}

module.exports.doCreate = (req, res, next) => {
  const article = new Article(req.body);
  console.log("dentroooooo");
  article.save()
    .then((article) => { 
      res.redirect('/users/{{ session.id }}/myProducts')
    });
}