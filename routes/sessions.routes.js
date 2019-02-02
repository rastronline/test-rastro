const express = require('express');
const router = express.Router();
const passport = require('passport');
const sessionsController = require('../controllers/sessions.controller');

router.get('/create', sessionsController.create);
//router.post('/facebook', (req, res, next) => {res.send("probandoo")});
router.post('/facebook', passport.authenticate('facebook-auth', {scope:['email']}));
//router.get('/facebook/cb');
router.post('/google', passport.authenticate('google-auth', { scope: ['openid', 'profile', 'email'] }));

router.get('/:provider/cb',sessionsController.createWithIDPCallback);
  /* function(req, res) {
    // Successful authentication, redirect home.
    //res.redirect('/');
    res.send("LOGADOOOOOO");
  }); */

module.exports = router;