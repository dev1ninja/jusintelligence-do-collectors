const fs = require('fs');
const doAxios = require('./doAxios');
const downloadPdf = require('./download-pdf');
const upload2aws = require('../s3bucket/upload');
const getAllPdfList = require('./get_all_pdf_list');
const getPdfList = require('./get_download_pdf_list');
const { ORIGIN_URL } = require('../reqParams/urls');

async function main( message, dest_dir, callback ) {

  var config = {
    method: 'get',
    url: ORIGIN_URL,
    headers: { 
      'Connection': 'keep-alive', 
      'Cache-Control': 'max-age=0', 
      'sec-ch-ua': '"Chromium";v="94", "Google Chrome";v="94", ";Not A Brand";v="99"', 
      'Upgrade-Insecure-Requests': '1', 
      'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36', 
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9', 
      'Sec-Fetch-Mode': 'navigate', 
      'Sec-Fetch-User': '?1', 
      'Sec-Fetch-Dest': 'document', 
      'Accept-Language': 'en-US,en;q=0.9'
    }
  };

  const response = await doAxios(config);

  const all_pdf_list = getAllPdfList(response);

  const download_pdf_list = getPdfList(message, all_pdf_list);

  console.log('Date Ini: ', Date.parse(message.date_ini));
  console.log('Date End: ', Date.parse(message.date_end));
  // console.log('Download PDF Link: ', download_pdf_list);

  if(download_pdf_list.length === 0){
    console.log("-------- :( There is no search result. ---------");
    return ;
  }

  const downloads = [];

  // console.log('This is Pdf link: ', pdf_lists);

  for(let i = 0; i < download_pdf_list.length; i++){
    downloads.push(downloadPdf(download_pdf_list[i], dest_dir));
  }

  console.log("------- PDF downloading started -------\n");
  await Promise.all(downloads).then(value => {
    console.log("------- PDF downloading finished -------\n");
    callback();
  })
}

async function index( config, message, ambiente ) {
  
  const dest_dir = `./${message.date_ini}-${message.date_end}`; 
  
  //Create Director based on message's date
  if(!fs.existsSync(dest_dir)){ 
    fs.mkdirSync(dest_dir);
  }

  await main( message, dest_dir, async () => {

    const sendJsonData = await upload2aws(dest_dir); // Upload all downloaded PDF files to AWS

    for(let i = 0; i < sendJsonData.length; i++){
      sendJsonData[i]['uf'] = 'TRF1';
      sendJsonData[i]['search'] = message.search;
    } // Finished to upload.

    console.log("-----------------------");
    const producer = require('../config/kafka-producer')(ambiente, sendJsonData); // Start to send message to `do_processor_final_<env>` kafka topic

    producer().catch( err => {
      console.error("erro in producer: ", err);
    });
  });
  
}

module.exports = index;