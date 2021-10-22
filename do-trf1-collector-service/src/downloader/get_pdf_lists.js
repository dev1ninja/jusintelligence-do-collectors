const doAxios = require('./doAxios');
const getPdfLink = require('./get_pdf_link');
const { ORIGIN_URL, REFERER_URL} = require('../reqParams/urls');

var pdf_lists = [];

function run(i, message) {
  return new Promise(async (resolve, reject) => {
    var config = {
      method: 'get',
      url: `https://pesquisadje-api.tjdft.jus.br/v1/buscador?query=${message.search}&pagina=${i}&dataInicio=${message.date_ini}&dataFim=${message.date_end}`,
      headers: { 
        'Connection': 'keep-alive', 
        'Access-Control-Allow-Origin': '*', 
        'Accept': 'application/json, text/plain, */*', 
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36', 
        'Origin': ORIGIN_URL, 
        'Sec-Fetch-Site': 'same-site', 
        'Sec-Fetch-Mode': 'cors', 
        'Sec-Fetch-Dest': 'empty', 
        'Referer': REFERER_URL, 
        'Accept-Language': 'en-US,en;q=0.9'
      }
    };
    const response = await doAxios(config);
    for(let j = 0; j < response.documentos.length; j++){
      if(!pdf_lists.includes(getPdfLink(response.documentos[j]))){
        pdf_lists.push(getPdfLink(response.documentos[j].urlDiario));
      }
    }
    resolve();
  });
}

async function getPdfLists(totalPage, message) {
  console.log('Total Page: ', totalPage);
  var downloads = [];
  for(let i = 0; i < totalPage; i++){
    downloads.push(run(i, message));
  }
  await Promise.all(downloads).then(value => {
    console.log('------------- Finished to get the PDF lists. --------------');
  })
  return pdf_lists;
}

module.exports = getPdfLists;