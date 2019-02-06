const express = require('express');
const router = express.Router();
const passport = require('passport');
const sessionsController = require('../controllers/sessions.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/create', authMiddleware.isNotAuthenticated, sessionsController.create);
router.get('/delete', authMiddleware.isAuthenticated, sessionsController.delete);
//router.post('/facebook', (req, res, next) => {res.send("probandoo")});
router.post('/facebook', authMiddleware.isNotAuthenticated, passport.authenticate('facebook-auth', {scope:['email']}));
//router.get('/facebook/cb');
router.post('/google', authMiddleware.isNotAuthenticated, passport.authenticate('google-auth', { scope: ['openid', 'profile', 'email'] }));

router.get('/:provider/cb', authMiddleware.isNotAuthenticated, sessionsController.createWithIDPCallback);
  /* function(req, res) {
    // Successful authentication, redirect home.
    //res.redirect('/');
    res.send("LOGADOOOOOO");
  }); */

module.exports = router;