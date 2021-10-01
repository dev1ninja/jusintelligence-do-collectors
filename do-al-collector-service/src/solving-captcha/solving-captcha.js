const bestcaptchasolver = require('bestcaptchasolver');
const { DownloaderHelper } = require('node-downloader-helper');
const cheerio = require('cheerio');
const got = require('got');

const { SITE_KEY, ACCESS_TOKEN } = require('../reqParams/recaptcha-info');

async function getUuid(page_url){
  
}

async function solveCaptcha(page_url){
  var captcha_id = undefined;
  bestcaptchasolver.set_access_token(ACCESS_TOKEN);

  await bestcaptchasolver.account_balance().then( (balance) => {
    console.log("Balance: $" + balance);
    console.log('Solving recaptcha...');
    return bestcaptchasolver.submit_recaptcha({
      page_url: page_url,
      site_key: SITE_KEY,
      user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Safari/537.36'
    });
  }).then( id => {
    captcha_id = id;
    return bestcaptchasolver.retrieve_captcha(id);
  }).then( async (data) => {
    console.log(`Recaptcha response: ${JSON.stringify(data)}`);
    console.log('PDF downloading...');
    const dl = new DownloaderHelper(page_url, './downloads');
    dl.on('end', () => console.log('Download Completed'))
    dl.start();
  }).catch( err => {
    console.log(`Error: ${err.message || err}`);
  }).then( () => {
    console.log(`Example finished !`);
  });
}
getUuid('https://www2.tjal.jus.br/cdje/consultaSimples.do?cdVolume=13&nuDiario=2904&cdCaderno=3&nuSeqpagina=225')
solveCaptcha('https://www2.tjal.jus.br/cdje/consultaSimples.do?cdVolume=13&nuDiario=2904&cdCaderno=3&nuSeqpagina=225')


