const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = app => {

  app.get('/api/survey/thanks', (req, res) => {
    res.send('Thanks for your voting!');
  });

  app.post('/api/survey', requireLogin, requireCredits, async (req, res) => {

    const { title, body, subject, recipients } = req.body;

    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(',').map(email => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now()
    });

    const mailer = new Mailer(survey, surveyTemplate(survey));

    try {
      await mailer.send();
      await survey.save();
      req.user.credit -= 1;
      const user = await req.user.save();

      res.send(user);
    } catch(err) {
      res.status(422).send(err);
    }
  });
};