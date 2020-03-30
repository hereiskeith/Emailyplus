const _ = require('lodash');
const { Path } = require('path-parser');
const { URL } = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = app => {

  app.get('/api/survey', requireLogin, async (req, res) => {
    const survey = await Survey.find({ _user: req.user.id })
      .select({ recipients: false });

    res.send(survey);
  })

  app.get('/api/survey/:surveyId/:choice', (req, res) => {
    res.send('Thanks for your voting!');
  });

  const p = new Path('/api/survey/:surveyId/:choice');

  app.post('/api/survey/webhooks', (req, res) => {

   _.chain(req.body)
     .map(({ url, email }) => {
        const match = p.test(new URL(url).pathname);
        if(match) {
          return {email: email, surveyId: match.surveyId, choice: match.choice}
        }
      })
    .compact()
    .uniqBy('email', 'surveyId')
     .each(({ surveyId, email, choice }) => {
       Survey.updateOne({
         _id: surveyId,
         recipients: {
           $elemMatch: {
             email: email,
             responded: false
           }
         }
       }, {
         $inc: { [choice]: 1 },
         $set: { 'recipients.$.responded': true },
         lastResponded: new Date()
       }).exec();
     })
    .value();

    res.send({});
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