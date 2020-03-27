const express = require('express');
// node.js runtime only has support for commonJS module on the server side
// commonJS implemented in node.js for requiring and sharing code between different files
// node.js doesn't have support for ES2015 module
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/User');
require('./models/Survey');
require('./services/passport');


mongoose.connect(keys.mongoURI);

const app = express();
// Define a new application that represents a running express app

app.use(bodyParser.json());
app.use(cookieSession({
  maxAge: 30 * 24 * 60 * 60 * 1000,
  keys: [keys.cookieKey]
}));

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

if(process.env.NODE_ENV === 'production') {
  // Express will serve up production assets
  // like our main.js file, or main.css file.
  app.use(express.static('client/build'));

  // Express will serve up the index file
  // if it doesn't recognize the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}



// Whenever Heroku runs on app, it has the ability to
// inject what are called environment variables
// Environment variables are variables that are set in the underlying
// runtime that node is running on top of
const PORT = process.env.PORT || 5000;
// It says looking ar the underlying environment and see if they have
// declare a port for us to use
app.listen(PORT);
// Tell node.js to listen to port 5000








