const fs = require('fs');
const downloadPdf = require('./download-pdf');
const upload2aws = require('../s3bucket/upload');
const getPdfLists = require('./get_pdf_lists');

async function main( message, dest_dir, callback ) {

  const pdf_lists = await getPdfLists(message);
  const downloads = [];

  console.log('This is Pdf link: ', pdf_lists);

  for(let i = 0; i < pdf_lists.length; i++){
    downloads.push(downloadPdf(pdf_lists[i], dest_dir));
  }

  console.log("------- PDF downloading started -------\n");
  await Promise.all(downloads).then(async value => {
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
      sendJsonData[i]['uf'] = 'DF';
      sendJsonData[i]['search'] = message.search;
    } // Finished to upload.

    console.log("-----------------------")
    const producer = require('../config/kafka-producer')(ambiente, sendJsonData); // Start to send message to `do_processor_final_<env>` kafka topic

    producer().catch( err => {
      console.error("erro in producer: ", err);
    });

  });
  
}

module.exports = index;