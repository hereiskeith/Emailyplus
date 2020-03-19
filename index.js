const express = require('express');
// node.js runtime only has support for commonJS module on the server side
// commonJS implemented in node.js for requiring and sharing code between different files
// node.js doesn't have support for ES2015 module

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys');

const app = express();
// Define a new application that represents a running express app

// console.developers.google.com
passport.use(new GoogleStrategy(
  {
  clientID: keys.googleClientID,
  clientSecret: keys.googleClientSecret,
  callbackURL: '/auth/google/callback'
  },
  (accessToken, refreshToken, profile, done) => {
    console.log(accessToken, refreshToken, profile);
  }
  )
);

app.get(
  '/auth/google',
  passport.authenticate('google', {
  scope: ['profile', 'email']
  })
);

app.get('/auth/google/callback', passport.authenticate('google'));


// Whenever Heroku runs on app, it has the ability to
// inject what are called environment variables
// Environment variables are variables that are set in the underlying
// runtime that node is running on top of
const PORT = process.env.PORT || 5000;
// It says looking ar the underlying environment and see if they have
// declare a port for us to use
app.listen(PORT);
// Tell node.js to listen to port 5000








// Create a route handler
// app.get('/', (req, res) => {
//   // '/': watch for requests trying to access '/'
//   res.send({ bye: 'buddy' });
//   // Tell the express that we want to immediately
//   //close the request and send back response containing the JSON data
// });