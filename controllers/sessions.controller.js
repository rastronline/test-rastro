const passport = require("passport");
const mongoose = require("mongoose");
const constants = require("../constants")

module.exports.create = (req, res, next) => {
  res.render('sessions/create');
}

module.exports.createWithIDPCallback = (req, res, next) => {
  passport.authenticate(`${req.params.provider}-auth`, (error, user) => {
    if (error) {
      next(error);
    } else {
      req.login(user, (error) => {
        if (error) {
          next(error)
        } else { if (user.role == "GUEST") {
            constants.FIRST_SEARCH = true;
            res.redirect("/articles/search");
          } else {
            res.redirect('/admins')
         }
        }
      });
    }
  })(req, res, next);
}

module.exports.delete = (req, res, next) => {
  req.logout();
  res.redirect('/sessions/create');
}