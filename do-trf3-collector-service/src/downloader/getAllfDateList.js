const { ORIGIN_PAGE_URL, REFERER_URL } = require('../reqParams/urls');
const convertLink = require('./convertLink');
const cheerio = require('cheerio');
const axios = require('axios').default;
const tough = require('tough-cookie');
const cookieJar = new tough.CookieJar();

axios.defaults.jar = cookieJar;

function getAllDateList(){
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
      'Cookie': cookieJar.getCookieStringSync(ORIGIN_PAGE_URL)
    }
  };
  return axios(config).then(response => {
    const $ = cheerio.load(response.data);
    let all = $('#container > #conteudoPrincipal').find('fieldset');
    $(all.get(2)).find('div.btn-toolbar > #botao-anteriores > #edicoesAnteriores > li').each((idx, elem) => {
      allDateList.push(convertLink($(elem).find('a').attr('href')));
    });
    return allDateList;
  }).catch(error => {
    console.log(error);
  })
}

module.exports = getAllDateList;