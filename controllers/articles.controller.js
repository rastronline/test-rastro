const passport = require('passport');
const mongoose = require('mongoose');
const Article = require('../models/article.model');
const User = require('../models/user.model');
const constants = require("../constants");


module.exports.list = (req, res, next) => {

  function getCategoriesArray(categories) {
    let categoriesArr = [];
    switch (categories) {
      case ("", "all"): {
        constants.CATEGORIES.forEach(cat => categoriesArr.push(cat.id));
        break;
      }
      case("preferences"): {
        req.user.hobbies.map(hobby => categoriesArr.push(hobby))
        break;
      }
      default: {
        categoriesArr.push(categories);
      }
    }
    return categoriesArr;
  }

  let fieldsForm;
  let categoriesArr = [];
  let keyword = "";

  if (constants.FIRST_SEARCH) {
    constants.FIRST_SEARCH = false;
    req.user.hobbies.map(hobby => categoriesArr.push(hobby))
  } else {
    fieldsForm = req.query;
    categoriesArr = getCategoriesArray(req.query.category);
    keyword = req.query.keyword;
  }

  Article.find({name: { $regex: `${keyword}`, $options: 'i' },
                //priceAppraiser: {$gte: Number.parseInt(req.body.minPrice), $lte: Number.parseInt(req.body.maxPrice)},
                category: {$in: categoriesArr},
                owner: {$ne: req.user.id },
                isSold: false,
                isActive: true,
                isAuction: false})
    .then((articles) => { 
      articles.map(article => { 
        article.name = `${article.name.substr(0, 25)} ...`
        article.description = `${article.description.substr(0, 100)} ...`;
        return article
      });
      res.render("articles/list", { articles, fieldsForm })})
    .catch(err => next(err))  
}

module.exports.get = (req, res, next) => {
  Article.findById(req.params.id)
    .then((article) => {
      User.findById(article.owner)
        .then(owner => {
          res.render('articles/details', { article, owner })
        })
      })
    .catch(err => next(err));
};

module.exports.listByUser = (req, res, next) => {
  
  Article.find({owner: req.params.userId})
    .populate('owner')

    .then(articles => {
      //res.send(articles);
      res.render('articles/articlesByUser', { articles })
    })
    .catch(err => next(err));
}   


const remove = (req, res, next) => {
  console.log("\ny aqui????\n");
  Article.findByIdAndDelete(req.params.id)
    .then(article => {
      console.log("articulo ELIMINADOOOOOO");
      res.redirect(req.params.path);
    })
    //res.redirect(`/users/${req.user.id}/articlesSelling`)})
    .catch(err => next(err));
};

module.exports.remove = remove;

module.exports.doDelete = (req, res, next) => {

  req.params.path = `/users/${req.user.id}/selling`;
  remove(req, res, next);
};

module.exports.create = (req, res, next) => {
  /* User.findById(req.params.id)
    .then(User => {
      res.render('articles/new', user);
    })
    .catch(err => next(err)); */
  res.render("articles/new");
  //res.send("HOLAAA")
};

module.exports.doCreate = (req, res, next) => {
  const article = new Article(req.body);
  console.log("dentroooooo", req.body);
  debugger;
  article.save().then(article => {
    if (req.files) {
      console.log("\n FOTOS", req.files);
      return (
        Article.findByIdAndUpdate(article.id, {
          $set: {location: {
            type: 'Point',
            coordinates: [req.body.longitude, req.body.latitude],
           photos: req.files.map(photo => photo.filename) }
        }})
          //req.files.map(f => f.path.replace('public', ''))
          .then(article => {
            console.log("\n\n HAY FOTOS DE FICHEROO y las GUARDOO\n\n");
            debugger;
            res.redirect(`/users/selling`);
          })
          .catch(err => next(err))
      );
    }
    //res.send("YEAAAAAAAAAHH")
    res.redirect(`/users/${article.owner}/selling`);
  });
};

module.exports.edit = (req, res, next) => {
  Article.findById(req.params.id).then(article => {
    res.render("articles/edit", { article });
  });
};

module.exports.doEdit = (req, res, next) => {
  Article.findByIdAndUpdate(req.params.id, { $set: req.body })
    .then(article => {
      if (req.files) {
        return Article.findByIdAndUpdate(article.id, {
          $set: { photos: req.files.map(photo => photo.filename) }
        }).then(article => {
          res.redirect(`/users/${article.owner}/selling`);
        });
      }
      res.redirect(`/users/${article.owner}/selling`);
    })
    .catch(err => next(err));
};

module.exports.buy = (req, res, next) => {
  Article.findByIdAndUpdate(req.params.articleId, {
    $set: {
      isSold: true,
      buyer: req.params.buyerId,
      dateOfPurchase: Date.now()
    }
  })
    .then(article => {
      res.redirect("/articles/search");
    })
    .catch(err => next(err));
};

module.exports.addToFav = (req, res, next) => {
  console.log("lo que VIENE EN EL PARAMS ES", req.params);

  User.findByIdAndUpdate(req.user.id, {
  //User.findByIdAndUpdate(req.params.userId, {
    $push: { favorites: req.params.articleId }
  })
    .then(user => {
      //res.send(user);

      console.log("\nmeto en favoritos!!\n")
      res.redirect(`/articles/${req.params.articleId}`);
    })
    .catch(err => next(err));

  /* User.findById(req.params.userId)
    .then(user => {
      console.log("LOS FAVORITOS ANTES DE INSERTAR SON...", user.favorites)
      if (!user.favorites.includes(req.params.articleId)) {
          user.favorites.push(req.params.articleId);
          console.log("LOS FAVORITOS DESPUESSSS DE INSERTAR SON...", user.favorites)
          return user.save()
            .then(user => {
              res.redirect('/articles/search');
            })
      } else {
        res.redirect('/articles/search');
      }
    })
    .catch(err => next(err)) */
};

module.exports.removeFromFav = (req, res, next) => {
  //console.log("lo que VIENE EN EL PARAMS ES", req.params)
  User.findByIdAndUpdate(req.user.id, {
  //User.findByIdAndUpdate(req.params.userId, {
    $pull: { favorites: req.params.articleId }
  })
    .then(user => {
      //res.send("yeahh");
      console.log("\nEXTRAIGO DE FAVORITOS\n")
      let favorites = user.favorites;
      res.redirect(`/users/favorites`);
    })
    .catch(err => next(err));
};
