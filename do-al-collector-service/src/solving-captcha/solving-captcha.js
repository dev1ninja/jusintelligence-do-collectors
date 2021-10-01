const bestcaptchasolver = require('bestcaptchasolver');
const express = require('bestcaptchasolver');

const ACCESS_TOKEN = 'AAE6473685E04A6CB52BCC449D84ACB5';
const SITE_KEY = '6LfALTkUAAAAALzYBt8XXduGuX-XRaljNf99yVpX';

function solveCaptcha(page_url){
  var captcha_id = undefined;
  bestcaptchasolver.set_access_token(ACCESS_TOKEN);

  bestcaptchasolver.account_balance().then( (balance) => {
    console.log("Balance: $" + balance);
    console.log('Solving recaptcha...');
    return bestcaptchasolver.submit_captcha({
      page_url: page_url,
      site_key: SITE_KEY,
    });
  }).then( id => {
    captcha_id = id;
    return bestcaptchasolver.retrieve_captcha(id);
  }).then( data => {
    console.log(`Recaptcha response: ${data.gresponse}`);
  }).catch( err => {
    console.log(`Error: ${err.message || err}`);
  }).then( () => {
    console.log(`Example finished !`);
  });
}

module.exports = solveCaptcha