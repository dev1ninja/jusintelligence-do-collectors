const fs = require('fs');
const doAxios = require('./doAxios');
const downloadPdf = require('./download-pdf');
const upload2aws = require('../s3bucket/upload');
const getPdfLists = require('./get_pdf_lists');
const { ORIGIN_URL, REFERER_URL} = require('../reqParams/urls');

async function main( message, dest_dir, callback ) {

  var pdf_lists;

  console.log(`https://pesquisadje-api.tjdft.jus.br/v1/buscador?query=${message.search}&pagina=0&dataInicio=${message.date_ini}&dataFim=${message.date_end}`);
  var config = {
    method: 'get',
    url: `https://pesquisadje-api.tjdft.jus.br/v1/buscador?query=${message.search}&pagina=0&dataInicio=${message.date_ini}&dataFim=${message.date_end}`,
    headers: { 
      'Connection': 'keep-alive', 
      'Access-Control-Allow-Origin': '*', 
      'Accept': 'application/json, text/plain, */*', 
      'sec-ch-ua-mobile': '?0', 
      'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36', 
      'sec-ch-ua': '"Chromium";v="94", "Google Chrome";v="94", ";Not A Brand";v="99"', 
      'Origin': ORIGIN_URL, 
      'Sec-Fetch-Site': 'same-site', 
      'Sec-Fetch-Mode': 'cors', 
      'Sec-Fetch-Dest': 'empty', 
      'Referer': REFERER_URL, 
      'Accept-Language': 'en-US,en;q=0.9'
    }
  };

  const response = await doAxios(config);

  // const pdf_lists = await getPdfLists(response.totalPaginas, message);

  // console.log('PDF count: ',pdf_lists.length);

  // const downloads = [];

  // console.log('This is Pdf link: ', pdf_lists);

  // for(let i = 0; i < pdf_lists.length; i++){
  //   downloads.push(downloadPdf(pdf_lists[i], dest_dir));
  // }

  // console.log("------- PDF downloading started -------\n");
  // await Promise.all(downloads).then(value => {
  //   console.log("------- PDF downloading finished -------\n");
  //   callback();
  // })
}

async function index( config, message, ambiente ) {
  
  const dest_dir = `./${message.date_ini}-${message.date_end}`; 
  
  //Create Director based on message's date
  if(!fs.existsSync(dest_dir)){ 
    fs.mkdirSync(dest_dir);
  }

  await main( message, dest_dir, async () => {

    // const sendJsonData = await upload2aws(dest_dir); // Upload all downloaded PDF files to AWS

    // for(let i = 0; i < sendJsonData.length; i++){
    //   sendJsonData[i]['uf'] = 'TRF1';
    //   sendJsonData[i]['search'] = message.search;
    // } // Finished to upload.

    // console.log("-----------------------");
    // const producer = require('../config/kafka-producer')(ambiente, sendJsonData); // Start to send message to `do_processor_final_<env>` kafka topic

    // producer().catch( err => {
    //   console.error("erro in producer: ", err);
    // });
  });
  
}

module.exports = index;