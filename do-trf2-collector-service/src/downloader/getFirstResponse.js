const doAxios = require('./doAxios');
const { URL, FILTER_PAGE_URL } = require('../reqParams/urls');
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
async function getFirstResponse(){
  var config = {
    method: 'get',
    url: URL,
    headers: { 
      'Connection': 'keep-alive', 
      'sec-ch-ua': '"Chromium";v="94", "Google Chrome";v="94", ";Not A Brand";v="99"', 
      'sec-ch-ua-mobile': '?0', 
      'sec-ch-ua-platform': '"Linux"', 
      'Upgrade-Insecure-Requests': '1', 
      'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36', 
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9', 
      'Sec-Fetch-Site': 'same-origin', 
      'Sec-Fetch-Mode': 'navigate', 
      'Sec-Fetch-User': '?1', 
      'Sec-Fetch-Dest': 'document', 
      'Referer': FILTER_PAGE_URL, 
      'Accept-Language': 'en-US,en;q=0.9', 
      'Cookie': '_ga=GA1.3.590085486.1634919969; ASP.NET_SessionId=fmb22fmmi2modd4505bfuj45'
    }
  };
  const response = await doAxios(config);
  return response;
}

module.exports = getFirstResponse;