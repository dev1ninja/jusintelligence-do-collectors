const fs = require('fs');
const getDownloadMonthList = require('./getDownloadMonthList');
const getFirstResponse = require('./getFirstResponse');
const getViewState = require('./getViewState');
const getCookie = require('./getCookie');
const downloadPdf = require('./download-pdf');
const upload2aws = require('../s3bucket/upload');
const getPdfList = require('./getPdfList');
const getMonthList = require('./getMonthList');

async function main( message, dest_dir, callback ) {

  const downMonthList = getDownloadMonthList(message);
  console.log('Month List to download: ', downMonthList);

  const firRes = await getFirstResponse();

  const firViewState = getViewState(firRes.data);
  console.log('Fir ViewState: ', firViewState);

  const firCookie = getCookie(firRes.headers);
  console.log('Fir Cookie: ', firCookie);

  const monthRes = await getMonthList(message, firViewState, firCookie);

  const monthViewState = getViewState(monthRes.data);
  // console.log('Month ViewState: ', monthViewState);

  const pdfRes = await getPdfList(message, downMonthList, monthViewState, firCookie, 0);

  // console.log("------- PDF downloading started -------\n", downloads.length);
  // await Promise.all(downloads).then(value => {
  //   console.log(value);
  //   console.log("------- PDF downloading finished -------\n");
  //   callback();
  // });
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
    //   sendJsonData[i]['uf'] = 'TRF5';
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