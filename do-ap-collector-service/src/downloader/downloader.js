// const request = require('request')
const axios = require('axios');
const cheerio = require('cheerio');
const upload2aws = require('../s3bucket/upload');
const solveCaptcha_downloads = require('../solving-captcha/solving-captcha');
const { HOME_PAGE_URL, ORIGIN_PAGE_URL, SEARCH_URL } = require('../reqParams/urls');
const fs = require('fs');
// const { config } = require('process');

var pdf_lists = []
var pdf_name = 0;

function doAxios(config) {
  return new Promise(function (resolve, reject) {
    axios(config)
    .then(response => {
      resolve(response.data);
    })
    .catch(error => {
      reject(error);
    })
  });
}

// async function downloadPDFsOfPage(page, cookie, pdf_lists, message){ //to get the response per page

//   console.log("---------downloadPDFsofPage function called!------------");

//   console.log("download page : ", page);
//   var options = {
//     'method': 'POST',
//     'url': 'https://www2.tjal.jus.br/cdje/trocaDePagina.do',
//     'headers': {
//       'Connection': 'keep-alive',
//       'sec-ch-ua': '"Chromium";v="94", "Google Chrome";v="94", ";Not A Brand";v="99"',
//       'sec-ch-ua-mobile': '?0',
//       'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Safari/537.36',
//       'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
//       'Accept': 'text/javascript, text/html, application/xml, text/xml, */*',
//       'X-Prototype-Version': '1.6.0.3',
//       'X-Requested-With': 'XMLHttpRequest',
//       'sec-ch-ua-platform': '"Windows"',
//       'Origin': `${HOME_PAGE_URL}`,
//       'Sec-Fetch-Site': 'same-origin',
//       'Sec-Fetch-Mode': 'cors',
//       'Sec-Fetch-Dest': 'empty',
//       'Referer': `${search_url}`,
//       'Accept-Language': 'en-US,en;q=0.9',
//       'Cookie': `${cookie}`
//     },
//     body: `pagina=${page}&_=`
//   };

//   var response = await doRequest(options);
//   const $ = cheerio.load(response.body);
//   const downloads = [];  

//   $('table:nth-child(3)').find('tr.fundocinza1 > td:nth-child(2) > table > tbody > tr > td > a:first-child').each((idx, elem) => {
//     console.log($(elem).attr('onclick'));
//     pdf_lists.push($(elem).attr('onclick'));
//     downloads.push(solveCaptcha_downloads(convertLink($(elem).attr('onclick')), message, pdf_name));
//     pdf_name++;
//   });

//   await Promise.all(downloads).then(() => {
//     console.log("**************function ended");
//   });

// }

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

async function sendSearchRequest(config, message, ambiente, callback){ // this is first download

  var data = JSON.stringify({
    'parametros': {
      'num_cnj': null,
      'num_dje_formatado': null,
      'num_dje': null,
      'nome_parte': null,
      'nome_advogado': null,
      'oab_advogado': null,
      'palavras_chave': message.search,
      'dt_divulgacao_incio': message.date_ini,
      'dt_divulgacao_fim': message.date_end,
      'dataDivulgacao': null,
      'num_dje_formatado_pesquisa': null,
      'chave_consumo': null
    },
    'catpcha': null
  });
  
  var config = {
    method: 'post',
    url: SEARCH_URL,
    headers: { 
      'Connection': 'keep-alive', 
      'sec-ch-ua': '"Chromium";v="94", "Google Chrome";v="94", ";Not A Brand";v="99"', 
      'Accept': 'application/json', 
      'Content-Type': 'application/json', 
      'sec-ch-ua-mobile': '?0', 
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36', 
      'sec-ch-ua-platform': '"Windows"', 
      'Origin': ORIGIN_PAGE_URL, 
      'Sec-Fetch-Site': 'same-site', 
      'Sec-Fetch-Mode': 'cors', 
      'Sec-Fetch-Dest': 'empty', 
      'Referer': ORIGIN_PAGE_URL, 
      'Accept-Language': 'en'
    },
    data : data
  };

  var response = await doAxios(config);
  console.log("-------This is Axios Response Result-------\n", response.dados);
  fs.writeFileSync('./test.txt', response.dados);
  const $ = cheerio.load(response);

/*  const downloads = [];
  for(var i = 1; i <= nPages; i ++)
  {
    downloads.push(downloadPDFsOfPage(i, response.headers['set-cookie'][0], pdf_lists, message));
  }
  console.log("downloads count", downloads.length);
  console.log("------- promise start --------");
  await Promise.all(downloads).then((values) => {
    console.log("------- promise end --------");
    callback();
  })*/  
}

async function scrapPdfCall(config, message, ambiente ) {
  console.log("---------scrapPdfCall function called!------------");
  await sendSearchRequest(config, message, ambiente, async ()=>{
    // const search_result_dir = `./${message.date_ini}-${message.date_end}`;
    // console.log("This is directory: ", search_result_dir);
    // const sendJsonData = await upload2aws(search_result_dir);
    // for(var i = 0; i < sendJsonData.length; i++){
    //   sendJsonData[i]["uf"] = "AP";
    //   sendJsonData[i]["search"] = message.search;
    // }
    // const producer = require('../config/kafka-producer')(ambiente, sendJsonData);
    // producer().catch( err => {
    //     console.error("error in consumer: ", err)
    // })
  });
  
}

module.exports = scrapPdfCall;