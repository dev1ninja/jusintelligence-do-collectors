const qs = require('qs');
const axios = require('axios');
const fs = require('fs');
const { promisify } = require('util')
const stream = require('stream');
const finished = promisify(stream.finished);

const { SEARCH, ORIGIN } = require('../reqParams/urls');

function downloadPdf(pdf, viewState, cookie, dest_dir){
  var data = qs.stringify({
    'frmPesquisa:_idcl': pdf.linkId,
    'frmPesquisa': '',
    'autoScroll': '',
    'frmPesquisa:j_idcl': '',
    'frmPesquisa:_link_hidden_': '',
    'javax.faces.ViewState': viewState 
  });
  var config = {
    method: 'post',
    url: SEARCH,
    headers: { 
      'Origin': ORIGIN, 
      'Referer': SEARCH, 
      'Cookie': cookie, 
      'Sec-Fetch-User': '?1', 
      'Sec-Fetch-Dest': 'document', 
      'Connection': 'keep-alive', 
      'Cache-Control': 'max-age=0', 
      'sec-ch-ua': '"Google Chrome";v="95", "Chromium";v="95", ";Not A Brand";v="99"', 
      'Upgrade-Insecure-Requests': '1', 
      'Content-Type': 'application/x-www-form-urlencoded', 
      'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36', 
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9', 
      'Sec-Fetch-Site': 'same-origin', 
      'Sec-Fetch-Mode': 'navigate', 
      'Accept-Language': 'en-US,en;q=0.9'
    },
    data : data
  };
  return new Promise(function (resolve, reject){
    axios({...config, responseType: 'stream'})
    .then(function (response) {
      var writeStream = fs.createWriteStream(`${dest_dir}/${pdf.name}.pdf`);
      response.data.pipe(writeStream);
      finished(writeStream);
      resolve('Success!');
    })
    .catch(function (error) {
      console.log("There is no article in this link: ", pdf.name);
      resolve('Failed');
    });
  })
}

module.exports = downloadPdf;