//const createError = require('http-errors');

module.exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    next()
  } else {
    res.redirect('/sessions/create');
  }
}

module.exports.isNotAuthenticated = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next()
  } else {
    res.redirect('/articles/search');
  }
}

module.exports.checkRole = (role) => {
  return (req, res, next) => {
    if (req.isAuthenticated() && req.user.role === role) {
      next();
    } else {
      next(createError(403, 'Insufficient privileges'))
    }
  }
}
