const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {

  app.post('/api/pay-with-stripe', requireLogin, async (req, res) => {
    const charge = await stripe.charges.create({
        amount: 500,
        currency: 'usd',
        source: req.body.id,
        description: 'Pay $5 for 5 credits'
    });

    req.user.credit += 5;
    const user = await req.user.save();
    res.send(user);
  })

}