const fs = require('fs');
const qs = require('qs');
const getFirstResponse = require('./getFirstResponse');
const getViewState = require('./getViewState');
const getEventValidation = require('./getEventValidation');
const convertDate = require('./convertDate');
const doAxios = require('./doAxios');
const getPdfList = require('./getPdfList');
const downloadPdf = require('./download-pdf');
const upload2aws = require('../s3bucket/upload');
const getAllPdfList = require('./getPdfList');
const { ORIGIN, URL } = require('../reqParams/urls');

async function main( message, dest_dir, callback ) {

  const download_pdf_list = [];

  const firstRes = await getFirstResponse();

  const viewState = getViewState(firstRes);

  const eventValidation = getEventValidation(firstRes);

  var data = qs.stringify({
    'ctl00$ScriptManager': 'ctl00$ContentPlaceHolder$ctrListaDiarios$UpdatePanel1|ctl00$ContentPlaceHolder$ctrListaDiarios$FiltraPesquisaDiarios$btnFiltrar',
    '__EVENTTARGET': '',
    '__EVENTARGUMENT': '',
    '__LASTFOCUS': '',
    '__VIEWSTATE': viewState,
    '__EVENTVALIDATION': eventValidation,
    'ctl00$ContentPlaceHolder$ctrListaDiarios$FiltraPesquisaDiarios$ddlAreaJudicial': '4',
    'ctl00$ContentPlaceHolder$ctrListaDiarios$FiltraPesquisaDiarios$tbxDataInicial': convertDate(message.date_ini),
    'ctl00$ContentPlaceHolder$ctrListaDiarios$FiltraPesquisaDiarios$meeDataInicial_ClientState': '',
    'ctl00$ContentPlaceHolder$ctrListaDiarios$FiltraPesquisaDiarios$tbxDataFinal': convertDate(message.date_end),
    'ctl00$ContentPlaceHolder$ctrListaDiarios$FiltraPesquisaDiarios$meeDataFinal_ClientState': '',
    'ctl00$ContentPlaceHolder$ctrListaDiarios$FiltraPesquisaDiarios$ddlRegistrosPaginas': '50',
    'ctl00$ContentPlaceHolder$ctrListaDiarios$FiltraPesquisaDiarios$btnFiltrar': 'Pesquisar' 
  });
  var config = {
    method: 'post',
    url: URL,
    headers: { 
      'Connection': 'keep-alive', 
      'sec-ch-ua': '"Chromium";v="94", "Google Chrome";v="94", ";Not A Brand";v="99"', 
      'Cache-Control': 'no-cache', 
      'Content-Type': 'application/x-www-form-urlencoded', 
      'X-MicrosoftAjax': 'Delta=true', 
      'sec-ch-ua-mobile': '?0', 
      'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36', 
      'Accept': '*/*', 
      'Origin': ORIGIN, 
      'Sec-Fetch-Site': 'same-origin', 
      'Sec-Fetch-Mode': 'cors', 
      'Sec-Fetch-Dest': 'empty', 
      'Referer': URL, 
      'Accept-Language': 'en-US,en;q=0.9'
    },
    data : data
  };

  const response = await doAxios(config);

  await getPdfList(response, 0, download_pdf_list);
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