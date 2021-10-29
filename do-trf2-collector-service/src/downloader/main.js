const fs = require('fs');
const qs = require('qs');
const getDateList = require('./getDateList');
const getFirstResponse = require('./getFirstResponse');
const getViewState = require('./getViewState');
const getEventValidation = require('./getEventValidation');
const getDate = require('./getDate');
const convertDate = require('./convertDate');
const doAxios = require('./doAxios');
const downloadPdf = require('./download-pdf');
const upload2aws = require('../s3bucket/upload');
const { FILTER_PAGE_URL, SEARCH_PAGE_URL } = require('../reqParams/urls');
const getToken = require('./getToken');

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;


// const virtualConsole = new jsdom.VirtualConsole();
/*
async function loadSearchQueryPage(){
  var resourceLoader = new jsdom.ResourceLoader({
    strictSSL: false
  })
  return new Promise(async (resolve, reject) => {
    JSDOM.fromURL(FILTER_PAGE_URL, {
      referrer: SEARCH_PAGE_URL,
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36',
      includeNodeLocations: true,
      storageQuota: 10000000,
      runScripts: 'dangerously',
      resources: resourceLoader,
      virtualConsole,
      cookieJar,
    }).then(dom => {
      resolve(dom);
    }).catch(error => {
      reject(error);
    })
  })
}

function loadJquery(dom){
  delete require.cache[require.resolve('jquery')]
  global.window = dom.window;
  global.document = dom.window.document;
  global.$ = require('jquery');
}
*/
async function main( message, dest_dir, callback ) {

  const dateList = getDateList(message);
  console.log(dateList);

  const response = await getFirstResponse();

  var viewState = getViewState(response);
  var eventValidation = getEventValidation(response);
  var curDate = getDate(response);
  var pdfList = [];
  console.log("asdfasdf",curDate)

  await getToken(viewState, eventValidation, dateList, 0, pdfList, curDate);

  // await getPdfList(response, 0, download_pdf_list);
  // const all_pdf_list = getAllPdfList(response);

  // const download_pdf_list = getPdfList(message, all_pdf_list);

  // console.log('Date Ini: ', Date.parse(message.date_ini));
  // console.log('Date End: ', Date.parse(message.date_end));
  // // console.log('Download PDF Link: ', download_pdf_list);

  // if(download_pdf_list.length === 0){
  //   console.log("-------- :( There is no search result. ---------");
  //   return ;
  // }

  // const downloads = [];

  // // console.log('This is Pdf link: ', pdf_lists);

  // for(let i = 0; i < download_pdf_list.length; i++){
  //   downloads.push(downloadPdf(download_pdf_list[i], dest_dir));
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
/*
    const sendJsonData = await upload2aws(dest_dir); // Upload all downloaded PDF files to AWS

    for(let i = 0; i < sendJsonData.length; i++){
      sendJsonData[i]['uf'] = 'TRF1';
      sendJsonData[i]['search'] = message.search;
    } // Finished to upload.

    console.log("-----------------------");
    const producer = require('../config/kafka-producer')(ambiente, sendJsonData); // Start to send message to `do_processor_final_<env>` kafka topic

    producer().catch( err => {
      console.error("erro in producer: ", err);
    });*/
  });
  
}

module.exports = index;