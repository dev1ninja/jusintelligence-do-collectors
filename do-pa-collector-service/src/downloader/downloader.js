const solveCaptcha = require('../solving-captcha/solving-captcha');

async function scrapPdfCall(config, search_url, message, ambiente) {
  console.log("--------Start Solve Captcha------------")
  await solveCaptcha(search_url, message);
}

module.exports = scrapPdfCall;