const keys = require('../../config/keys');

module.exports = survey => {
  // We make use of string template, so we can write as many lines as
  // we could without making to put any escape characters
  // when we need a new line
  return `
    <html>
      <body>
        <div style="text-align:center;">
          <h3>I'd like your input.</h3>
          <p>Please answer the following question:</p>
          <p>${survey.body}</p>
          <div>
            <a href="${keys.redirectDomain}/api/survey/thanks">Yes</a>
          </div>
          <div>
            <a href="${keys.redirectDomain}/api/survey/thanks">No</a>
          </div>
        </div>
      </body>
    </html>
  `;
};