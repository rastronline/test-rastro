const User = require('../models/user.model');
const FBStrategy = require ('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const passport = require('passport');

passport.serializeUser((user, next) => {
  next(null, user._id);
});

passport.deserializeUser((id, next) => {
  User.findById(id)
    .then(user => {
      next(null, user);
    })
    .catch(error => next(error));
});

console.info('ID => ', process.env.FB_AUTH_CLIENT_ID)
console.info('SECRET => ', process.env.FB_AUTH_CLIENT_SECRET)

passport.use('facebook-auth', new FBStrategy({
  clientID: process.env.FB_AUTH_CLIENT_ID,
  clientSecret: process.env.FB_AUTH_CLIENT_SECRET ,
  callbackURL: process.env.FB_AUTH_CB || '/sessions/facebook/cb',
  profileFields: ['displayName', 'emails']
}, authenticateOAuthUser));

passport.use('google-auth', new GoogleStrategy({
  clientID: process.env.GOOGLE_AUTH_CLIENT_ID || 'todo',
  clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET || 'todo',
  callbackURL: process.env.GOOGLE_AUTH_CB || '/sessions/google/cb',
}, authenticateOAuthUser));

function authenticateOAuthUser(accessToken, refreshToken, profile, next) {
  let email = profile.emails[0].value;
  let socialId = `${profile.provider}Id`;
  User.findOne({$or:[{email: email}, { [`social.${socialId}`]: profile.id }]})
  //User.findOne({ ['social.facebookId']: profile.id })
    .then(user => {
      if (user) {
        next(null, user);
      } else {
        user = new User({
          name: profile.displayName,
          email: email,
          social: {
            [socialId]: profile.id
          }
          
        })
        return user.save()
          .then(user => {
            next(null, user);
          });
      }
    })
    .catch(error => next(error));
}