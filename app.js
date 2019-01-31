require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
/* const cookieParser = require('cookie-parser'); */
const logger = require('morgan');
//const session = require('express-session');
/* const MongoStore = require("connect-mongo")(session); */
const passport = require('passport');
const mongoose = require('mongoose');
const indexRouter = require('./routes/index.routes');
const usersRouter = require('./routes/users.routes');
const sessionsRouter = require('./routes/sessions.routes')


require('./configs/db.config');
require('./configs/passport.config');


const app = express();

app.use(passport.initialize());
app.use(passport.session());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
/* app.use(cookieParser()); */
app.use(express.static(path.join(__dirname, 'public')));
/* app.use(session({
  secret: 'SuperSecret - (Change it)',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 1000
  },
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60
  })
})); */

app.use('/', indexRouter);
app.use('/sessions', sessionsRouter)
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
