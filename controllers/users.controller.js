//const passport = require('passport');
//const mongoose = require('mongoose');
const Article = require("../models/article.model");
const User = require("../models/user.model");
const articlesController = require("./articles.controller");
const constants = require("../constants");

module.exports.edit = (req, res, next) => {
  //console.log("EL REQ.LOCALS ES", res.locals);
  console.log("los hobbies son ", res.locals.session.hobbies);
  res.render("users/edit");
};

module.exports.doEdit = (req, res, next) => {
  /* console.log("EL BODY ES ", req.body);
  User.findByIdAndUpdate(req.params.id, {$set:req.body})
    .then(user => {
      console.log(req.body);
      console.log("\n\nENCUENTRO EL USUARIOOOO\n\n, req.params.id");
      if (req.file) {
        console.log("encuentro cambio de fichero");
        return User.findByIdAndUpdate(user, {
          $set: { profilePic: req.file.filename }
        })
          .then(user => res.redirect(`/users/${req.user.id}/edit`))
          .catch(err => next(err));
      }
      res.redirect(`/users/${req.user.id}/edit`);
    })
    .catch(err => next(err)); */


    console.log("EL BODY ES ", req.body)


    //if there are no hobbies selected...
    if (!Object.prototype.hasOwnProperty.call(req.body, "hobbies")) {
      req.body.hobbies = [];
    }


  User.findByIdAndUpdate(req.user.id, {$set:req.body})
      .then(user => {
        console.log("\n\nENCUENTRO EL USUARIOOOO\n\n", req.body)
        if (req.file) {
          console.log("encuentro cambio de fichero")
          return User.findByIdAndUpdate(user, {$set:{profilePic: req.file.filename}})
            .then(user => res.redirect(`/users/edit`))
            .catch(err => next(err)); 
        }
        res.redirect(`/users/edit`)})
      .catch(err => next(err));
 



  /* User.findByIdAndUpdate(req.params.id, {
    $set: req.body,
    location: {
      type: "Point",
      coordinates: [req.body.longitude, req.body.latitude]
    }
  })
    .then(user => {
      console.log(req.body);
      console.log("\n\nENCUENTRO EL USUARIOOOO\n\n, req.params.id");
      if (req.file) {
        console.log("encuentro cambio de fichero");
        return User.findByIdAndUpdate(user, {
          $set: { profilePic: req.file.filename }
        })
          .then(user => res.redirect(`/users/${req.user.id}/edit`))
          .catch(err => next(err));
      }
      res.redirect(`/users/${req.user.id}/edit`);
    })
    .catch(err => next(err));
 */
  /*   let path = `${req.file.filename}`;
  User.findByIdAndUpdate(req.params.id, {$set:{profilePic: path}})
    .then(user => res.redirect('/articles'))
    .catch(err => next(err)); */
};

module.exports.uploadProfilePic = (req, res, next) => {
  let path = `/uploads/${req.file.filename}`;
  User.findByIdAndUpdate(req.params.id, { $set: { profilePic: path } })
    .then(user => res.redirect("/articles"))
    .catch(err => next(err));
};

module.exports.listArticlesSelling = (req, res, next) => {
  Article.find({
        owner: req.user.id,
        isSold: false,
        isActive: true,
        isAuction: false})
  .then(articles => {
    /* articles.map(article => { 
      article.name = `${article.name.substr(0, 25)} ...`
      article.description = `${article.description.substr(0, 100)} ...`;
      return article
    }); */
    articles = articlesController.formattedArticles(articles);
    let user = req.user;
    //User.findById(req.params.id).then(user => {
      res.render("users/articlesSelling", { articles, user });
    })
  //})
  .catch(err => next(err));
};


module.exports.listArticlesOwned = (req, res, next) => {
  Article.find({
    buyer: req.params.id,
    isSold: true
  })
    .then(articles => {
     // res.send(articles)
      User.findById(req.params.id).then(user => {
        res.render("users/articles-owned", { articles, user });
      });
    })
    .catch(err => next(err));
};



module.exports.listArticlesAuctioning = (req, res, next) => {
  Article.find({ owner: req.params.id, isSold: false, isAuction: true })
    .then(articles => {
      /* User.findById(req.params.id)
        .then(user => {
          res.render('users/myProducts', { articles, user })
        }) */
      res.render("users/........", { articles });
    })
    .catch(err => next(err));
};

module.exports.listArticlesSold = (req, res, next) => {
  console.log("\n\nDENTRO DE LOS VENDIDOS!!!\n");
  //res.send("holii")
  Article.find({ owner: req.user.id, isSold: true })
    .populate("buyer")
    .then(articles => {
      articles = articlesController.formattedArticles(articles);
      res.render("users/articlesSold", { articles });
      //res.send({articles})
      /* User.findById(req.params.id)
        .then(user => {
          res.render('users/articlesSold', { articles, user })
        }) */
    })
    .catch(err => next(err));
};

module.exports.listArticlesPricing = (req, res, next) => {
  console.log("\n\nDENTRO DE LOS PENDIENTES!!! \n");
  Article.find({ owner: req.user.id, isActive: false })
    .then(articles => {
      res.render("users/articlesPricing", { articles });
      /* User.findById(req.params.id)
        .then(user => {
          res.render('users/pending', { articles, user })
        }) */
    })
    .catch(err => next(err));
};

module.exports.listFavorites = (req, res, next) => {
  User.findById(req.user.id)
    .populate("favorites")
    .then(user => {
      //res.send(user.favorites)
      let favorites = user.favorites;
      favorites = articlesController.formattedArticles(favorites);
      res.render("users/listFavorites", { favorites });
    })
    .catch(err => next(err));
};

module.exports.doDelete = (req, res, next) => {
  User.findByIdAndDelete(req.params.id)
    .then(user => {
      res.redirect("/admins/listUsers");
    })
    .catch(err => next(err));
};

/* module.exports.doDeleteArticle = (req, res, next) => {
  console.log("\nENTRE????\n")
  req.params.path = `/users/${req.user.id}/selling`;
  articlesController.delete(req, res, next);
} */

module.exports.doHandleDecisionArticle = (req, res, next) => {
  
  const acceptAppraisal = (req, res, next) => {
    Article.findByIdAndUpdate(req.params.id, { $set: { isActive: true } })
      .then(article => {
        res.redirect(req.params.path);
      })
      .catch(err => next(err));
  };

  const putInAuction = (req, res, next) => {

    Article.findByIdAndUpdate(req.params.id, { $set: { isAuction: true, isActive: true, dateOfAuction: Date.now() } })
      .then(article => {        
        res.redirect(req.params.path);
      })
      .catch(err => next(err));
  };

  req.params.id = req.params.articleId;
  req.params.path = "/users/pricing";

  switch (req.body.decisionUser) {
    case "delete": {
      articlesController.remove(req, res, next);
      break;
    }
    case "accept": {
      acceptAppraisal(req, res, next);
      break;
    }
    case "auction": {
      putInAuction(req, res, next);
      break;
    }
  }
};
