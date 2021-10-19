const upload2aws = require('../s3bucket/upload');
const { ORIGIN_PAGE_URL, SEARCH_URL } = require('../reqParams/urls');
const fs = require('fs');
const doAxios = require('./doAxios');
const downloadPdf = require('./download-pdf');
const convertLink = require('./convert-link');

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
  const pdf_lists = [];
  console.log('This is response count: ', response.dados.dados.length);
  for(let i = 0; i < response.dados.dados.length; i++){
    pdf_lists.push(convertLink(response.dados.dados[i]));
  }
  const dest_dir = `./${message.date_ini}-${message.date_end}`;
  if(!fs.existsSync(dest_dir)){
    fs.mkdirSync(dest_dir);
  }
  const downloads = [];
  for(var i = 0; i < pdf_lists.length; i ++)
  {
    downloads.push(downloadPdf(pdf_lists[i], dest_dir));
  }
  console.log("------- download start --------");
  await Promise.all(downloads).then((values) => {
    console.log("------- download end --------");
    console.log("downloaded count", downloads.length);
    callback();
  })
}

async function main(config, message, ambiente ) {
  console.log("This is your message: ", message);
  console.log("---------main function called!------------");
  await sendSearchRequest(config, message, ambiente, async () => {
    const search_result_dir = `./${message.date_ini}-${message.date_end}`;
    console.log("This is directory: ", search_result_dir);
    const sendJsonData = await upload2aws(search_result_dir);
    for(let i = 0; i < sendJsonData.length; i++){
      sendJsonData[i]["uf"] = "AP";
      sendJsonData[i]["search"] = message.search;
    }
    const producer = require('../config/kafka-producer')(ambiente, sendJsonData);
    producer().catch( err => {
        console.error("error in consumer: ", err)
    })
  });
}

module.exports = main;