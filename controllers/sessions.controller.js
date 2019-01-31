const passport = require('passport');
const mongoose = require('mongoose');

module.exports.create = (req, res, next) => {
  res.render('sessions/create');
}

module.exports.createWithIDPCallback = (req, res, next) => {
  /* res.send(`
    TODO: callback for social login. use the right strategy (check req.params)
  `); */
  //passport.authenticate(`${req.params.facebook}-auth`, (error, user) => {
  passport.authenticate(`${req.params.provider}-auth`, (error, user) => {
    if (error) {
      next(error);
    } else {
      req.login(user, (error) => {
        if (error) {
          next(error)
        } else {
          res.redirect(`/users`)
        }
      });
    }
  })(req, res, next);
}