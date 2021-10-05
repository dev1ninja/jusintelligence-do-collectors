const request = require('request')
const util = require('util')
const timer = util.promisify(setTimeout)
const fs = require('fs')
const cheerio = require('cheerio');
const upload_aws = require('../s3bucket/upload');
const solveCaptcha_downloads = require('../solving-captcha/solving-captcha');
const { HOME_PAGE_URL } = require('../reqParams/urls');

var pdf_lists = []
var pdf_name = 0;

function doRequest(options) {
  return new Promise(function (resolve, reject) {
    request(options, function (error, res) {
      if (!error && res.statusCode == 200) {
        resolve(res);
      } else {
        reject(error);
      }
    });
  });
}

async function downloadPDFsOfPage(page, cookie, pdf_lists, search_url, message){ //to get the response per page

  console.log("---------downloadPDFsofPage function called!------------");

  console.log("download page : ", page);
  var options = {
    'method': 'POST',
    'url': 'https://www2.tjal.jus.br/cdje/trocaDePagina.do',
    'headers': {
      'Connection': 'keep-alive',
      'sec-ch-ua': '"Chromium";v="94", "Google Chrome";v="94", ";Not A Brand";v="99"',
      'sec-ch-ua-mobile': '?0',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Safari/537.36',
      'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'Accept': 'text/javascript, text/html, application/xml, text/xml, */*',
      'X-Prototype-Version': '1.6.0.3',
      'X-Requested-With': 'XMLHttpRequest',
      'sec-ch-ua-platform': '"Windows"',
      'Origin': `${HOME_PAGE_URL}`,
      'Sec-Fetch-Site': 'same-origin',
      'Sec-Fetch-Mode': 'cors',
      'Sec-Fetch-Dest': 'empty',
      'Referer': `${search_url}`,
      'Accept-Language': 'en-US,en;q=0.9',
      'Cookie': `${cookie}`
    },
    body: `pagina=${page}&_=`
  };

  var response = await doRequest(options);
  const $ = cheerio.load(response.body);
  const downloads = [];  

  $('table:nth-child(3)').find('tr.fundocinza1 > td:nth-child(2) > table > tbody > tr > td > a:first-child').each((idx, elem) => {
    console.log($(elem).attr('onclick'));
    pdf_lists.push($(elem).attr('onclick'));
    downloads.push(solveCaptcha_downloads(convertLink($(elem).attr('onclick')), message, pdf_name));
    pdf_name++;
  });

  await Promise.all(downloads).then(() => {
    console.log("**************function ended");
  });

}

function convertDate(date){
  const formatDate = new Date(date);
  return `${formatDate.getDate()+1}/${formatDate.getMonth()+1}/${formatDate.getFullYear()}`;
}

function convertLink(str) {
	var a = str.replace("return popup('/", "")
	var b = a.replace("');", "")
  var newLink = "https://www2.tjal.jus.br" + "/" + b;
  return newLink;
}

async function sendSearchRequest(config, search_url, message, ambiente, callback){ // this is first download
  console.log("---------sendSearchRequest function called!------------");
  console.log("This is search value ----------------", message);
  const options = {
    'method': 'POST',
    'url': 'https://www2.tjal.jus.br/cdje/consultaAvancada.do',
    'headers': {
      'Connection': 'keep-alive',
      'Cache-Control': 'max-age=0',
      'sec-ch-ua': '"Chromium";v="94", "Google Chrome";v="94", ";Not A Brand";v="99"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Windows"',
      'Upgrade-Insecure-Requests': '1',
      'Origin': `${HOME_PAGE_URL}`,
      'Content-Type': 'application/x-www-form-urlencoded',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
      'Sec-Fetch-Site': 'same-origin',
      'Sec-Fetch-Mode': 'navigate',
      'Sec-Fetch-User': '?1',
      'Sec-Fetch-Dest': 'document',
      'Referer': `${search_url}`,
      'Accept-Language': 'en-US,en;q=0.9',
    },
    form: {
      'dadosConsulta.dtInicio': convertDate(message.date_ini),
      'dadosConsulta.dtFim': convertDate(message.date_end),
      'dadosConsulta.cdCaderno': '-11',
      'dadosConsulta.pesquisaLivre': message.search,
      'pagina': ''
    }
  };

  var response = await doRequest(options);
  const $ = cheerio.load(response.body);
  const szPages = $('#divResultadosSuperior').find('table > tbody > tr > td:first-child').text();
  const szTexts = szPages.split(' ');
  const nPages = Math.ceil(szTexts[szTexts.length - 2] / 10);
  console.log("This is Number of Page: -----------", nPages);

  const downloads = [];
  for(var i = 1; i <= nPages; i ++)
  {
    downloads.push(downloadPDFsOfPage(i, response.headers['set-cookie'][0], pdf_lists, search_url, message));
  }
  console.log("downloads count", downloads.length);
  console.log("------- promise start --------");
  await Promise.all(downloads).then((values) => {
    console.log("------- promise end --------");
    callback();
  })
  
}

async function scrapPdfCall(config, search_url, message, ambiente ) {
  console.log("---------scrapPdfCall function called!------------");
  await sendSearchRequest(config, search_url, message, ambiente, async ()=>{
    const search_result_dir = `./${message.date_ini}-${message.date_end}`;
    console.log("This is directory: ", search_result_dir);
    const sendJsonData = await upload_aws(search_result_dir);
    for(var i = 0; i < sendJsonData.length; i++){
      sendJsonData[i]["uf"] = "AL";
      sendJsonData[i]["search"] = message.search;
    }
    const producer = require('../config/kafka-producer')(config, ambiente, sendJsonData);
    producer().catch( err => {
        console.error("error in consumer: ", err)
    })
  });
  
}

module.exports = scrapPdfCall;