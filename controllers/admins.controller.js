const passport = require('passport');
const mongoose = require('mongoose');
const Article = require('../models/article.model');
const User = require('../models/user.model');
const articlesController = require('./articles.controller');

module.exports.listArticlesPending = (req, res, next) => {
  
  Article.find({isPriced: false}).sort({createdAt: 1})
    .populate("owner")
      .then(articles => {
        articlesController.formattedArticles(articles);
        res.render('admins/articlesPending', { articles });
      })
      .catch(err => next(err));
}

module.exports.listUsers = (req, res, next) => {
  
  User.find()
    .then(users => {
      res.render('admins/listUsers', { users });
    })
    .catch(err => next(err));
}

module.exports.detailArticle = (req, res, next) => {

  console.log("EL PARAMETRO ESS", req.params.articleId)
  Article.findById(req.params.articleId)
    .populate("owner")
      .then(article => {
        //console.log("\nDENTROOO DEL DETALLE PARA TASAR!!\n\n\n")
        //res.send(article.name)
        res.render("admins/detailsForPricing", { article });
      })
      .catch(err => next(err));
}

module.exports.doHandlePricing = (req, res, next) => {

  console.log("\nDENTROOO MANEJADOR DECISION")

  //let priceAuction = Math.round(req.body.priceAppraiser *);
  const sendPricing = (req, res, next) => {
    Article.findByIdAndUpdate(req.params.articleId, {$set: {priceAppraiser: req.body.priceAppraiser, infoAppraiser: req.body.infoAppraiser, isPriced: true, priceAuction: req.body.priceAppraiser }})
      .then(article => {
        res.redirect("/admins/articles/pendings");
      })
      .catch(err => next(err));
    }

  req.params.id = req.params.articleId;
  req.params.path = "/admins/articles/pendings";
  
  switch (req.body.resultAppraisal) {
    case "send":{
      console.log("enviar tasación....")
      sendPricing(req, res, next);
      break;
    }  
    case "refuse":{
      console.log("rechazar tasación....")
      articlesController.remove(req, res, next);
      break;
    }
  }
}