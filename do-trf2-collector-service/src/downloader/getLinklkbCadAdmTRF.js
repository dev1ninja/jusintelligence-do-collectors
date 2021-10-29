const convertDate = require('./convertDate');
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const { promisify } = require('util');
const stream = require('stream');
const finished = promisify(stream.finished);

const { SEARCH_PAGE_URL, ORIGIN } = require('../reqParams/urls');
const { TYPE_OF_PDF, EVENT_TARGETS } = require('../reqParams/name-download')

async function getLinklkbCadAdmTRF(viewState, eventValidation, date, dest_dir, index) {
  var data_form = new FormData();
  data_form.append('__EVENTTARGET', EVENT_TARGETS[index]);
  data_form.append('__EVENTARGUMENT', '');
  data_form.append('__LASTFOCUS', '');
  data_form.append('__VIEWSTATE', viewState);
  data_form.append('__EVENTVALIDATION', eventValidation);
  data_form.append('ctl00$ContentPlaceHolder$ctrInicial$ctrCadernosPorAreaJudicial$tbxDataEdicoes', convertDate(date));
  data_form.append('ctl00$ContentPlaceHolder$ctrInicial$ctrCadernosPorAreaJudicial$meeDataInicial_ClientState', '');
  data_form.append('ctl00$ContentPlaceHolder$ctrInicial$ctrCadernosPorAreaJudicial$OpcaoVisualizacao', 'rbtPDF');
  data_form.append('ctl00$ContentPlaceHolder$ctrInicial$OpcaoPesquisa', 'rbtDiario');
  
  var config = {
    method: 'post',
    url: SEARCH_PAGE_URL,
    responseType: 'stream',
    headers: { 
      'Connection': 'keep-alive', 
      'Cache-Control': 'max-age=0', 
      'sec-ch-ua': '"Google Chrome";v="95", "Chromium";v="95", ";Not A Brand";v="99"', 
      'sec-ch-ua-mobile': '?0',  
      'Upgrade-Insecure-Requests': '1', 
      'Origin': ORIGIN, 
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36', 
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9', 
      'Sec-Fetch-Site': 'same-origin', 
      'Sec-Fetch-Mode': 'navigate', 
      'Sec-Fetch-User': '?1', 
      'Sec-Fetch-Dest': 'document', 
      'Referer': SEARCH_PAGE_URL, 
      'Accept-Language': 'en-US,en;q=0.9',
      ...data_form.getHeaders()
    },
    data : data_form
  };
  return new Promise((resolve, reject) => {
    var parseDate = date.split('-');
    var pdfName = `CADERNO_${parseDate[2]}${parseDate[1]}${parseDate[0]}_${TYPE_OF_PDF[index]}`;
    console.log("pdfName", pdfName)
    axios(config).then(response => {
      var writeStream = fs.createWriteStream(`${dest_dir}/${pdfName}.pdf`);
      response.data.pipe(writeStream);
      finished(writeStream);
      resolve('Success!')
    })
    .catch(err => {
      console.log('Opps, something went wrong!');
      resolve('Failed');
    })
  })
  // console.log(response)
}
module.exports = getLinklkbCadAdmTRF;