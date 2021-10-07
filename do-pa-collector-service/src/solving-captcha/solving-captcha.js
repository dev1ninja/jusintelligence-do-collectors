const bestcaptchasolver = require('bestcaptchasolver');
const request = require('request');
const fs = require('fs');
const { DownloaderHelper } = require('node-downloader-helper');
const upload_aws = require('../s3bucket/upload');

const { SITE_KEY, ACCESS_TOKEN } = require('../reqParams/recaptcha-info');
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

async function solveCaptcha(page_url, message, ambiente){
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
    console.log(`Recaptcha response: ${data.gresponse}`);
    console.log("----------Getting PDF Lists from webpage------------");
    var options = {
      'rejectUnauthorized': false,
      'method': 'POST',
      'url': `https://dje.tjpa.jus.br/DJEletronico/rest/DJEletronicoService/publicacao/consultaPublica/${data.gresponse}`,
      'headers': {
        'Connection': 'keep-alive',
        'sec-ch-ua': '"Chromium";v="94", "Google Chrome";v="94", ";Not A Brand";v="99"',
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json;charset=UTF-8',
        'sec-ch-ua-mobile': '?0',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Safari/537.36',
        'sec-ch-ua-platform': '"Windows"',
        'Origin': 'https://dje.tjpa.jus.br',
        'Sec-Fetch-Site': 'same-origin',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Dest': 'empty',
        'Referer': 'https://dje.tjpa.jus.br/ClientDJEletronico/app/home.html',
        'Accept-Language': 'en-US,en;q=0.9',
        'Cookie': '_ga=GA1.3.513174114.1632803641; _gid=GA1.3.1778321675.1633083216'
      },
      body: `{"argumento":"${message.search}","periodo":"${message.date_ini}..${message.date_end}"}`
    };
    console.log("-------------------------this is request options-------------------\n");
    await request(options, async function (error, response) {
        if (error) {
          console.log(error)
        }
        var url_links = JSON.parse(response.body).objeto.match(/\bhttps?:\/\/\S+/gi);
        var correct_links = [];
        var download_await = [];
        const search_result_dir = `./${message.date_ini}-${message.date_end}`;
        for(let i = 0; i < url_links.length; i++){
          if(url_links[i].includes("http://dje.tjpa.jus.br/DJEletronico/rest/DJEletronicoService/publicacao/visualizarDiarioPDF")){
            correct_links.push(url_links[i]);
          }
        }
        console.log(`------------There are ${correct_links.length} pdfs for this searching------------\n` ,correct_links);
        if(!fs.existsSync(search_result_dir)){
          fs.mkdirSync(search_result_dir)
        }
        for(let i = 0;i < correct_links.length; i++){
          const download = () => {
            return new Promise(function (resolve, reject) {
              var pdf = new DownloaderHelper(correct_links[i], search_result_dir);
              console.log("Download Starting....")
              pdf.on('end', () => resolve());
              pdf.start();
            })
          }
          download_await.push(download());
          console.log("items\n", correct_links[i]);
        }
        console.log("This is download await: ", download_await);
        await Promise.all(download_await).then(async () => {
          console.log("---------------PDF Download completed-------------")
          const sendJsonData = await upload_aws(search_result_dir);
          for(let i = 0; i < sendJsonData.length; i++){
            sendJsonData[i]["uf"] = "PA";
            sendJsonData[i]["search"] = message.search;
          }
          const producer = require('../config/kafka-producer')(ambiente, sendJsonData);
          producer().catch( err => {
            console.error("error in consumer: ", err)
          })
        })
      });
    }).catch( err => {
      console.log(`Error *: ${err.message || err}`);
    }).then( () => {
      console.log(`Example finished !`);
    });
}
module.exports = solveCaptcha;