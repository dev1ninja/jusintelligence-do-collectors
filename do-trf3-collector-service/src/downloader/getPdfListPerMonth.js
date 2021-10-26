const doAxios = require('./doAxios');
const cheerio = require('cheerio');

async function getPdfListPerMonth(link){
  console.log("Get PDF List Per Month function called.");

  var config = {
    method: 'get',
    url: link,
    headers: { 
      'Connection': 'keep-alive', 
      'Cache-Control': 'max-age=0', 
      'Upgrade-Insecure-Requests': '1', 
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36', 
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9', 
      'Accept-Language': 'en-US,en;q=0.9',
    }
  };

  console.log("Config: ", config);
  
  const response = await doAxios(config);
  const $ = cheerio.load(response);

  $('#container').find('#conteudoPrincipal > div > ul > li').each((idx, elem) => {
    console.log($(elem).find('a').attr('href'));
  })

}

module.exports = getPdfListPerMonth;