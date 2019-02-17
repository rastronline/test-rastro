const passport = require("passport");
const mongoose = require("mongoose");
const Article = require("../models/article.model");
const User = require("../models/user.model");
const constants = require("../constants");

const formattedArticles = (articles) => {
  return articles.map(article => { 
    article.name = (article.name.length > 25) ? `${article.name.substr(0, 25)} ...` : article.name;
    article.description = (article.description.length > 25) ? `${article.description.substr(0, 100)} ...` : article.description;
    article.publicationDate = new Date(article.createdAt).toLocaleDateString();
    let categoryName = constants.CATEGORIES[constants.CATEGORIES.map(cat => cat.id).indexOf(article.category)].name;
    article.category = categoryName;
    return article;
  });
}

module.exports.formattedArticles = formattedArticles;


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
  //let keyword = "";
  constants.KEYWORDS ="";

  console.log("CONSTANTE DE CAT ANTES", constants.CATEGORY_SELECTED)
  console.log("el req.category", req.query.category)
  
  constants.CATEGORY_SELECTED = req.query.category || constants.CATEGORY_SELECTED;
  constants.KEYWORDS = req.query.keyword || constants.KEYWORDS;
  
  console.log("CONSTANTE DE CAT DESPUESSS", constants.CATEGORY_SELECTED)

  /* if (constants.FIRST_SEARCH) {
    constants.FIRST_SEARCH = false;
    req.user.hobbies.map(hobby => categoriesArr.push(hobby))
  } else { */
    fieldsForm = req.query;
    //constants.CATEGORY_SELECTED = req.category;
    categoriesArr = getCategoriesArray(constants.CATEGORY_SELECTED);
    keyword = req.query.keyword;

    console.log("Y KEYWORDS ES ", constants.KEYWORDS)
  //}

  Article.find({name: { $regex: `${constants.KEYWORDS}`, $options: 'i' },
                //priceAppraiser: {$gte: Number.parseInt(req.body.minPrice), $lte: Number.parseInt(req.body.maxPrice)},
                category: {$in: categoriesArr},
                owner: {$ne: req.user.id },
                isSold: false,
                isActive: true,
                isAuction: false})
    .then((articles) => { 
      articles = formattedArticles(articles);
      res.render("articles/list", { articles, fieldsForm })})
    .catch(err => next(err))  
}

module.exports.listAuctions = (req, res, next) => {

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

  console.log("articulos subastados\n")
  Article.find({//name: { $regex: `${keyword}`, $options: 'i' },
                //priceAppraiser: {$gte: Number.parseInt(req.body.minPrice), $lte: Number.parseInt(req.body.maxPrice)},
                //category: {$in: categoriesArr},
                owner: {$ne: req.user.id },
                isSold: false,
                isActive: true,
                isAuction: true})
    .then((articles) => { 
      //res.send({articles})

      articles = formattedArticles(articles);
      res.render("articles/list", { articles, fieldsForm })})
    .catch(err => next(err))  
}

module.exports.get = (req, res, next) => {
  Article.findById(req.params.id)
    .populate("owner")  
    .populate("buyer")
      .then(article => res.render('articles/details', { article }))
      .catch(err => next(err));
};

module.exports.listByUser = (req, res, next) => {
  Article.find({owner: req.params.userId})
    .populate("owner")
      .then(articles => res.render("articles/articlesByUser", { articles }))
      .catch(err => next(err));
}   

const remove = (req, res, next) => {
  Article.findByIdAndDelete(req.params.id)
    .then(article => res.redirect(req.params.path))
    .catch(err => next(err));
};

module.exports.remove = remove;

module.exports.doDelete = (req, res, next) => {
  req.params.path = `/users/${req.body.pathBack}/`;
  remove(req, res, next);
};

module.exports.create = (req, res, next) => {
  res.render("articles/new");
};

module.exports.doCreate = (req, res, next) => {
  const name = req.body.name;
  const priceSeller = req.body.priceSeller;
  const description = req.body.description;
  const category = req.body.category || "";
  const condition = req.body.condition || "";

  //res.send(req.files)
  //const photosArticle = req.files || [];
  if (!name || !priceSeller || !description || !category || !condition) {
    res.render("articles/new", {
      article: req.body,
      errors: {
        name: name ? undefined : "Tienes que ponerle un nombre al artículo",
        priceSeller: priceSeller ? undefined : "Debes proponer un precio de venta",
        description: description ? undefined : "Debes añadir una descripción del artículo",
        category: category ? undefined : "Debes encasillarlo en una categoría",
        condition: condition ? undefined : "Tienes que incluir el estado en que se encuenta"
        //photos: photos ? [] : "Debes incluir al menos una foto del artículo"
      }
    })
  } else {
    const article = new Article(req.body);
    article.save()
      .then(article => {
        if (req.files) {
          return (
            Article.findByIdAndUpdate(article.id, {
                  $set:{location: {
                          type: 'Point',
                          coordinates: [req.body.longitude, req.body.latitude]},
                        //photos: req.files.map(photo => photo.filename)}})
                          photos: req.files.map(photo => photo.secure_url)}})

              .then(article => res.redirect("/users/pricing"))
              .catch(err => next(err))
          );
        } else {
          res.redirect("/users/pricing")
        }})
      .catch(error => {
        if (error instanceof mongoose.Error.ValidationError) {
          res.render("articles/new", { article: req.body, errors: error.errors });
        } else {
          next(error);
        }});
  }
};

module.exports.edit = (req, res, next) => {
  Article.findById(req.params.id)
    .then(article => res.render("articles/edit", { article }))
    .catch(err => next(err));
  };

module.exports.doEdit = (req, res, next) => {

  res.send(req.body)

  const name = req.body.name;
  const description = req.body.description;
  //const photosArticle = req.files || [];
  if (!name || !description) {
    res.render("articles/new", {
      article: req.body,
      errors: {
        name: name ? undefined : "Tienes que ponerle un nombre al artículo",
        description: description ? undefined : "Debes añadir una descripción del artículo",
        //photos: photos ? [] : "Debes incluir al menos una foto del artículo"
      }
    })
  } else {
    Article.findByIdAndUpdate(req.params.id,
                            { $set: req.body,
                                    location: {
                                      type: "Point",
                                      coordinates: [req.body.longitude, req.body.latitude]
                                    }
                            })
      .then(article => {
        if (req.files) {
          return (
            Article.findByIdAndUpdate(article.id, {
                $set: { photos: req.files.map(photo => photo.filename) }})
              .then(article => res.redirect("/users/pricing")));
        } else {
          res.redirect("/users/pricing");
        }})
      .catch(err => {
        if (error instanceof mongoose.Error.ValidationError) {
          res.render("articles/edit", { article: req.body, errors: error.errors });
        } else {
          next(error);
        }});
  }
};

module.exports.buy = (req, res, next) => {
  Article.findByIdAndUpdate(req.params.articleId, {
    $set: {
      isSold: true,
      buyer: req.user.id,
      dateOfPurchase: Date.now()
    }
  })
    .then(article => {
      res.redirect("/articles/list");
    })
    .catch(err => next(err));
};

module.exports.bid = (req, res, next) => {
/*   Article.findByIdAndUpdate(req.params.articleId, {
    $set: {
      buyer: req.user.id,
      priceAuction: req.body.bid
    }
  })
    .then(article => {
      res.redirect("/articles/searchInAuction");
    })
    .catch(err => next(err)); */

    Article.findById(req.params.articleId)
      .populate("buyer")
      .then(article => {
        if(req.body.bid <= article.priceAuction) {
          if (article.buyer) {
          //mandar un mensaje al que hasta ahora era al lider de la puja
          }
          article.buyer = req.user.id;
          article.priceAuction = req.body.bid;
          article.save()
            .then(article => {
              res.render("/articles/listInAuction");  
            })
            .catch(err => next(err))
        }})
      .catch(err => {
        //devolver a la vista diciendo que la cantidad introducida no ha sido la correcta
      });
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
      next()
      //res.redirect(`/articles/${req.params.articleId}`);
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
      next()
      //let favorites = user.favorites;
      //res.redirect(`/users/favorites`);
    })
    .catch(err => next(err));
};

module.exports.auctionFinished = (req, res, next) => {
  
  Article.findById(req.params.articleId)
    .populate("buyer")
    .then(article => {
      console.log("\n\nLA SUBASTA SE ACABOOOO00")
      if (typeof(article.buyer) == "object") {
        article.dateOfPurchase = Date.now();
        article.isSold = true;
        article.priceAppraiser = article.priceAuction;
      } else {
        article.isAuction = false;
        article.alreadyAuctioned = true;
        article.isActive = false;
      }
      article.save()
        .then(article => {
          console.log(`GUARDE EL ARTICULO SUBASTADO ${article.name}`)
          next()
        })
        .catch(err => next(err));
    })
    //.catch(err => next(err));
}
