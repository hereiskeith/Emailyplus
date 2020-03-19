const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  })
})

// console.developers.google.com
passport.use(new GoogleStrategy(
  {
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
  },
  (accessToken, refreshToken, profile, done) => {
    User.findOne({ googleId: profile.id }).then((existingUser) => {
      if(existingUser) {
        // we don't need to create a new record
        done(null, existingUser);
      } else {
        new User({ googleId: profile.id })
          .save()
          .then(user => {
            done(null, user)
          });
      }
    })
  }
  )
);