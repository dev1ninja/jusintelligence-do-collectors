const qs = require('qs');
const doAxios = require('./doAxios');
const cheerio = require('cheerio');
const convertLink = require('./convertLink');
const { SEARCH_PAGE_URL, ORIGIN_PAGE_URL, SEARCH_QUERY_PAGE } = require('../reqParams/urls');

function convertDate(date) {
  var parsed = date.split('/');
  return `${parsed[2]}-${parsed[1]}-${parsed[0]}`;
}

async function getPdfListPerMonth(month, allPdfList, message){
  console.log("Get PDF List Per Month function called.", month);

  var date_ini = new Date(message.date_ini);
  var date_end = new Date(message.date_end);
  // console.log(date_ini);
  // console.log(date_end);

  var data = qs.stringify({
    'edAnteriores': month 
  });
  var config = {
    method: 'post',
    url: SEARCH_PAGE_URL,
    headers: { 
      'Connection': 'keep-alive', 
      'Cache-Control': 'max-age=0', 
      'sec-ch-ua': '"Google Chrome";v="95", "Chromium";v="95", ";Not A Brand";v="99"', 
      'sec-ch-ua-mobile': '?0', 
      'Upgrade-Insecure-Requests': '1', 
      'Origin': ORIGIN_PAGE_URL, 
      'Content-Type': 'application/x-www-form-urlencoded', 
      'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36', 
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9', 
      'Sec-Fetch-Site': 'same-origin', 
      'Sec-Fetch-Mode': 'navigate', 
      'Sec-Fetch-User': '?1', 
      'Sec-Fetch-Dest': 'document', 
      'Referer': SEARCH_QUERY_PAGE, 
      'Accept-Language': 'en-US,en;q=0.9'
    },
    data : data
  };

  const response = await doAxios(config);
  const $ = cheerio.load(response);

  $('#divAreaGlobal').find('section > #divAreaGlobalConteudo > #divConteudo > div.areaConteudo > form > a').each((idx, elem) => {
    var key = convertDate($(elem).text().split(' ')[0]);
    var href = convertLink($(elem).attr('href'));
    allPdfList.push({key:`${key}`, value: href});
  })

  var i = 0;
  while( i < allPdfList.length ) {
    var newDate = new Date(allPdfList[i].key);
    if(newDate < date_ini){
      allPdfList.splice(i, 1);
      // console.log("Date Ini: ", newDate)
    } else if(newDate > date_end){
      allPdfList.splice(i, 1);
      // console.log("Date End", newDate)
    } else {
      ++i;
    }
  }
  return allPdfList;
}

module.exports = getPdfListPerMonth;