const doAxios = require('./doAxios');
const { SEARCH_PAGE_URL } = require('../reqParams/urls');

async function getFirstResponse(){
  var config = {
    method: 'get',
    url: SEARCH_PAGE_URL,
    headers: { 
      'Connection': 'keep-alive', 
      'Cache-Control': 'max-age=0', 
      'sec-ch-ua': '"Google Chrome";v="95", "Chromium";v="95", ";Not A Brand";v="99"', 
      'sec-ch-ua-mobile': '?0', 
      'Upgrade-Insecure-Requests': '1', 
      'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36', 
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9', 
      'Sec-Fetch-Site': 'none', 
      'Sec-Fetch-Mode': 'navigate', 
      'Sec-Fetch-User': '?1', 
      'Sec-Fetch-Dest': 'document', 
      'Accept-Language': 'en-US,en;q=0.9'
    }
  };
  const response = await doAxios(config);
  return response;
}

module.exports = getFirstResponse;