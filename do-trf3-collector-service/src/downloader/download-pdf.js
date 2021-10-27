var axios = require('axios');
var fs = require('fs');
const { promisify } = require('util')
const stream = require('stream');
const finished = promisify(stream.finished);

function downloadPdf(pdfLink, dest_dir){
  var config = {
    method: 'get',
    url: pdfLink,
    headers: { 
      'Connection': 'keep-alive', 
      'Upgrade-Insecure-Requests': '1', 
      'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36', 
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9', 
      'Accept-Language': 'en-US,en;q=0.9'
    }
  };
  return new Promise(function (resolve, reject){
    axios({...config, responseType: 'stream'})
    .then(function (response) {
      var writeStream = fs.createWriteStream(`${dest_dir}/${response.headers['content-disposition'].split("filename=")[1]}`);
      response.data.pipe(writeStream);
      finished(writeStream);
      resolve();
    })
    .catch(function (error) {
      console.log("There is no article in this link: ", pdfLink);
      reject(error);
    });
  })
}

module.exports = downloadPdf;