const fs = require('fs');
const getAllDateList = require('./getAllfDateList');
const getPdfListPerMonth = require('./getPdfListPerMonth');
const getSearchDateList = require('./getSearchDateList');
const doAxios = require('./doAxios');
const downloadPdf = require('./download-pdf');
const upload2aws = require('../s3bucket/upload');

async function main( message, dest_dir, callback ) {

  const allDateList = await getAllDateList();
  // console.log(allDateList);

  const searchDateList = getSearchDateList(message, allDateList);
  // console.log(searchDateList);

  const promiseList = [];
  const allPdfList = [];

  for(let i = 0; i < searchDateList.length; i++){
    promiseList.push(await getPdfListPerMonth(searchDateList[i], allPdfList, message))
  }

  await Promise.all(promiseList);

  const downloads = [];
  console.log(allPdfList.length)
  for(let i = 0; i < allPdfList.length; i++){
    downloads.push(downloadPdf(allPdfList[i].value, dest_dir));
  }

  console.log("------- PDF downloading started -------\n", downloads.length);
  await Promise.all(downloads).then(value => {
    console.log(value);
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
      sendJsonData[i]['uf'] = 'TRF3';
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