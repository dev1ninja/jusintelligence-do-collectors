const { ORIGIN_PAGE_URL, REFERER_URL } = require('../reqParams/urls');
const doAxios = require('./doAxios');
const cheerio = require('cheerio');

async function getAllDateList(){
  var allDateList = [];
  var config = {
    method: 'get',
    url: ORIGIN_PAGE_URL,
    headers: { 
        'Connection': 'keep-alive', 
        'Cache-Control': 'max-age=0', 
        'Upgrade-Insecure-Requests': '1', 
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36', 
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9', 
        'Referer': REFERER_URL, 
        'Accept-Language': 'en-US,en;q=0.9', 
    }
  };
  var response = await doAxios(config);
  const $ = cheerio.load(response);
  $('#container').find('#conteudoPrincipal > fieldset:nth-child(3) > div.btn-toolbar > #botao-anteriores > ul > #edicoesAnteriores > li').each((idx, elem) => {
    allDateList.push($(elem).find('a').attr('href'));
  })
  console.log(allDateList);
}

module.exports = getAllDateList;