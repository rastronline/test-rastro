const passport = require('passport');
const mongoose = require('mongoose');
const Article = require('../models/article.model');
const User = require('../models/user.model');

module.exports.edit = (req, res, next) => {
  //console.log("EL REQ.LOCAS ES", res.locals);
  console.log("los hobbies son ", res.locals.session.hobbies)
  res.render('users/edit');
}

module.exports.doEdit = (req, res, next) => {
  
  console.log("EL BODY ES "+ req.body.name)
  User.findByIdAndUpdate(req.params.id, {$set:req.body})
    .then(user => {
      console.log("encuentro el usuarioooo")
      if (req.file) {
        return User.findByIdAndUpdate(user, {$set:{profilePic: req.file.filename}})
          .then(user => res.redirect('/articles'))
          .catch(err => next(err)); 
      }})
      //res.redirect('/articles')})
    .catch(err => next(err));

    
/*   let path = `${req.file.filename}`;
  User.findByIdAndUpdate(req.params.id, {$set:{profilePic: path}})
    .then(user => res.redirect('/articles'))
    .catch(err => next(err)); */
}

module.exports.uploadProfilePic = (req, res, next) => {
  let path = `/uploads/${req.file.filename}`;
  User.findByIdAndUpdate(req.params.id, {$set:{profilePic: path}})
    .then(user => res.redirect('/articles'))
    .catch(err => next(err));
}

module.exports.listProducts = (req, res, next) => {
    Article.find({owner: req.params.id})
      .then(articles => {
        User.findById(req.params.id)
          .then(user => {
            res.render('users/myProducts', { articles, user })
          })
      })
      .catch(err => next(err))
}

module.exports.listProductsSold = (req, res, next) => {
  Article.find({owner: req.params.id, isSold: true})
    .then(articles => {
      User.findById(req.params.id)
        .then(user => {
          res.render('users/myProducts', { articles, user })
        })
    })
    .catch(err => next(err))
}

module.exports.listProductsPending = (req, res, next) => {
  Article.find({owner: req.params.id, isActive: false})
    .then(articles => {
      User.findById(req.params.id)
        .then(user => {
          res.render('users/myProducts', { articles, user })
        })
    })
    .catch(err => next(err))
}