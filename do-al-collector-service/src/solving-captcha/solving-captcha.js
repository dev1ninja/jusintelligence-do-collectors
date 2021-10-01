const bestcaptchasolver = require('bestcaptchasolver');
const { DownloaderHelper } = require('node-downloader-helper');
const cheerio = require('cheerio');
const got = require('got');
const ACCESS_TOKEN = 'AAE6473685E04A6CB52BCC449D84ACB5';
const SITE_KEY = '6LfALTkUAAAAALzYBt8XXduGuX-XRaljNf99yVpX';

function parsingUrl(page_url){

}

async function getUuid(page_url){
  await got(page_url).then(response => {
    console.log(page_url)
    console.log(response.body)
    //const $ = cheerio.load(response.body);
    console.log("Cheerio Loaded")
    //console.log($('tbody > tr > td:nth-child(2) > table > tbody > tr > td > #uuidCaptcha').attr('value'))
    //$('#sessaoCaptcha > tbody > tr > td:nth-child(2) > table > tbody > tr > td > #uuidCaptcha').attr('value')
  })
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
   //const url = `https://www2.tjal.jus.br/cdje/getPaginaDoDiario.do?conversationId=&cdVolume=${}&nuDiario=${}&cdCaderno=${}&nuSeqpagina=${}&dtDiario=&uuidCaptcha=sajcaptcha_${data.gresponse}`
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


