const doAxios = require('./doAxios');
const cheerio = require('cheerio');
const convertLink = require('./convertLink');
const convertDate = require('./convertDate');

async function getPdfListPerMonth(link, allPdfList, message){
  console.log("Get PDF List Per Month function called.");

  var date_ini = new Date(message.date_ini);
  var date_end = new Date(message.date_end);
  console.log(date_ini)
  console.log(date_end)

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
  
  const response = await doAxios(config);
  const $ = cheerio.load(response);

  $('#container > #conteudoPrincipal > div > div > ul > li').each((idx, elem) => {
    var key = convertDate($(elem).find('a').text().split(' ')[0]);
    var href = convertLink($(elem).find('a').attr('href'));
    allPdfList.push({key:`${key}`, value: href});
  })
  var i = 0;
  while( i < allPdfList.length ) {
    console.log("All PDf List Length: ", allPdfList.length);
    var newDate = new Date(allPdfList[i].key);
    if(newDate < date_ini){
      allPdfList.splice(i, 1);
      console.log("Date Ini: ", newDate)
    } else if(newDate > date_end){
      allPdfList.splice(i, 1);
      console.log("Date End", newDate)
    } else {
      ++i;
    }
  }
  return allPdfList;
}

module.exports = getPdfListPerMonth;