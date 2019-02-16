const Article = require("../models/article.model");
const User = require("../models/user.model");
const articlesController = require("./articles.controller");
const constants = require("../constants");

//const ifFileExists = ({ file }, event) => file && (event.picture = file.secure_url)
//(ifFileExists(req, ))

module.exports.edit = (req, res, next) => {
  res.render("users/edit");
};


module.exports.doEdit = (req, res, next) => {
    //if there are no hobbies selected...
    if (!Object.prototype.hasOwnProperty.call(req.body, "hobbies")) {
      req.body.hobbies = [];
    }

    if (!req.body.name) {
      res.render("users/edit", {
        user: req.body,
        errors: {
           name: req.body.name ? undefined : "El nombre es un campo obligatorio"
        }
      })
    } else {
      User.findByIdAndUpdate(req.user.id, 
            { $set: req.body,
                    location: {
                      type: "Point",
                      coordinates: [req.body.longitude, req.body.latitude]}
            })
        .then(user => {
          res.redirect("/users/edit")})
        .catch(err => {
          if (error instanceof mongoose.Error.ValidationError) {
            res.render("articles/edit", { user: req.body, errors: error.errors });
          } else {
            next(error);
          }});
    }
};


module.exports.uploadPhotoProfile = (req, res, next) => {
  /* //ESTO ES CON MULTER
  User.findByIdAndUpdate(req.user.id, { $set: { profilePic: req.file.filename } })
    .then(user => res.redirect("/users/edit"))
    .catch(err => next(err)); */

    //ESTO ES CON PARSER CLOUDINARY
    console.log("\n\nQUE LLEVA EL REQQQQ => ", req.file)
    User.findByIdAndUpdate(req.user.id, { $set: { profilePic: req.file.secure_url } })
    .then(user => res.redirect("/users/edit"))
    .catch(err => next(err));
}


module.exports.listArticlesSelling = (req, res, next) => {
  Article.find({ owner: req.user.id,
                 isSold: false,
                 isActive: true,
                 isAuction: false})
    .then(articles => {
      articles = articlesController.formattedArticles(articles);
      let user = req.user;
      res.render("users/articlesSelling", { articles, user })})
    .catch(err => next(err));
};


module.exports.listArticlesOwned = (req, res, next) => {
 /*  Article.find({ buyer: req.params.id,
                 isSold: true })
    .then(articles => {
      User.findById(req.params.id).then(user => {
        res.render("users/articles-owned", { articles, user });
      });
    })
    .catch(err => next(err)); */

    Article.find({ buyer: req.params.id,
                   isSold: true })
      .populate("buyer")
        .then(articles => res.render("users/articles-owned", { articles }))
        .catch(err => next(err));
};


module.exports.listArticlesAuctioning = (req, res, next) => {
  Article.find({ owner: req.user.id, 
                 isSold: false, 
                 isAuction: true })
    .then(articles => res.render("users/articlesAuctioning", { articles }))
    .catch(err => next(err));
};


module.exports.listArticlesSold = (req, res, next) => {
  Article.find({ owner: req.user.id,
                 isSold: true })
    .populate("buyer")
    .then(articles => {
      articles = articlesController.formattedArticles(articles);
      res.render("users/articlesSold", { articles });
    })
    .catch(err => next(err));
};


module.exports.listArticlesPricing = (req, res, next) => {
  Article.find({ owner: req.user.id,
                 isActive: false })
    .then(articles => res.render("users/articlesPricing", { articles }))
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




