const passport = require('passport');

module.exports = (app) => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get('/auth/google/callback', passport.authenticate('google'));
}





// Create a route handler
// app.get('/', (req, res) => {
//   // '/': watch for requests trying to access '/'
//   res.send({ bye: 'buddy' });
//   // Tell the express that we want to immediately
//   //close the request and send back response containing the JSON data
// });