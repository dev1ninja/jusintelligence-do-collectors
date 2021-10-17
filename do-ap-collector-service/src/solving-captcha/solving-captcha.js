const bestcaptchasolver = require('bestcaptchasolver');
const cheerio = require('cheerio');
const fs = require('fs');
const request = require('request');
const axios = require('axios');
const { promisify } = require('util')
const stream = require('stream');

const finished = promisify(stream.finished);

const { ACCESS_TOKEN, SITE_KEY } = require('../reqParams/recaptcha-info');

async function doRequest(options) {
  return new Promise(async function (resolve, reject) {
    await request(options, function (error, res) {
      if (!error && res.statusCode === 200) {
        resolve(res);
      } else {
        reject(error);
      }
    });
  });
}

async function doRequest_body(options) {
  return new Promise(async function (resolve, reject) {
    await request(options, function (error, res) {
      if (!error && res.statusCode === 200) {
        resolve(res.body);
      } else {
        reject(error);
      }
    });
  });
}

async function getUuid_downloads_pdf(page_url, token, cookie, message, pdf_name){
  var referer = page_url.replace("consultaSimples.do", "getPaginaDoDiario.do") + "&dtDiario=";
  var url = page_url.replace("consultaSimples.do", "getPaginaDoDiario.do") + "&uuidCaptcha=";
  console.log("GetUUID")
  var options = {
    'rejectUnauthorized': false,
    'method': 'POST',
    'url': 'https://www2.tjal.jus.br/cdje/captchaControleAcesso.do',
    'headers': {
      'Connection': 'keep-alive',
      'Pragma': 'no-cache',
      'Cache-Control': 'no-cache',
      'sec-ch-ua': '"Chromium";v="94", "Microsoft Edge";v="94", ";Not A Brand";v="99"',
      'Accept': '*/*',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'X-Requested-With': 'XMLHttpRequest',
      'sec-ch-ua-mobile': '?0',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Safari/537.36 Edg/94.0.992.31',
      'sec-ch-ua-platform': '"Windows"',
      'Origin': 'https://www2.tjal.jus.br',
      'Sec-Fetch-Site': 'same-origin',
      'Sec-Fetch-Mode': 'cors',
      'Sec-Fetch-Dest': 'empty',
      'Referer': referer,
      'Accept-Language': 'en-GB,en;q=0.9,en-US;q=0.8',
      'Cookie': cookie[0]
    },
    body: 'uuidCaptcha=&conversationId='

  };
  var response = await doRequest(options);
  console.log(JSON.parse(response.body).uuidCaptcha);
  const uuidCaptcha = JSON.parse(response.body).uuidCaptcha;


  var options1 = {
    'method': 'GET',
    'url': url,
    'headers': {
      'Connection': 'keep-alive',
      'Pragma': 'no-cache',
      'Cache-Control': 'no-cache',
      'sec-ch-ua': '"Chromium";v="94", "Microsoft Edge";v="94", ";Not A Brand";v="99"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Windows"',
      'Upgrade-Insecure-Requests': '1',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Safari/537.36 Edg/94.0.992.31',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
      'Sec-Fetch-Site': 'same-origin',
      'Sec-Fetch-Mode': 'navigate',
      'Sec-Fetch-Dest': 'frame',
      'Referer': referer,
      'Accept-Language': 'en-GB,en;q=0.9,en-US;q=0.8',
      'Cookie': cookie[0]
    }
  };
  var res = await doRequest_body(options1);
  const $ = cheerio.load(res);
  const details = []
  $('#sessaoCaptcha').find('input').each((idx, elem) => {
    var name = $(elem).attr('name');
    var value = $(elem).attr('value');
    var newJson = {}
    newJson[name] = value;
    details.push(newJson)
  })
  console.log(details)
  const pdf_url = `https://www2.tjal.jus.br/cdje/getPaginaDoDiario.do?conversationId=&cdVolume=${details[0].cdVolume}&nuDiario=${details[1].nuDiario}&cdCaderno=${details[2].cdCaderno}&nuSeqpagina=${details[3].nuSeqpagina}&dtDiario=${details[4].dtDiario}&uuidCaptcha=${uuidCaptcha}&g-recaptcha-response=${token}`;
  
  var options2 = {
    'method': 'GET',
    'url': pdf_url,
    'headers': {
      'Connection': 'keep-alive',
      'sec-ch-ua': '"Chromium";v="94", "Google Chrome";v="94", ";Not A Brand";v="99"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Windows"',
      'Upgrade-Insecure-Requests': '1',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
      'Sec-Fetch-Site': 'same-origin',
      'Sec-Fetch-Mode': 'navigate',
      'Sec-Fetch-User': '?1',
      'Sec-Fetch-Dest': 'frame',
      'Referer': 'https://www2.tjal.jus.br/cdje/getPaginaDoDiario.do?cdVolume=13&nuDiario=2903&cdCaderno=3&nuSeqpagina=306&uuidCaptcha=',
      'Accept-Language': 'en-US,en;q=0.9',
      'Cookie': cookie[0],
      'Content-Type': 'text/pdf'
    }
  };
  var request_pdf = await axios({...options2, responseType: 'stream'});
  var response_pdf = await request_pdf;
  const search_result_dir = `./${message.date_ini}-${message.date_end}`;
  if(!fs.existsSync(search_result_dir)){
      fs.mkdirSync(search_result_dir)
  }
  var writeStream = fs.createWriteStream(`./${search_result_dir}/${pdf_name}.pdf`);
  response_pdf.data.pipe(writeStream);
  await finished(writeStream);
  console.log("Success read PDF...");
}

async function solveCaptcha_downloads(page_url, message, pdf_name){
  console.log("This is Page url\n", page_url);

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
    return bestcaptchasolver.retrieve_captcha(id);
  }).then( async (data) => {
    var origin = JSON.stringify(data);
    var parsed = JSON.parse(origin);
    var cookie;
    const response = await doRequest(page_url);
    cookie = response.headers['set-cookie'];
    await getUuid_downloads_pdf(page_url, parsed.gresponse, cookie, message, pdf_name);
  }).catch( err => {
    console.log(`Error: ${err.message || err}`);
  }).then( () => {
    console.log(`Example finished !`);
  });
  console.log("----------------Ended Solve Captcha");
}
module.exports = solveCaptcha_downloads;