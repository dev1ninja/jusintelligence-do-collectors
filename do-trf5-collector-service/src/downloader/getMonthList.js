const doAxios = require('./doAxios');
const { SEARCH, ORIGIN, REFERER } = require('../reqParams/urls');
const { STATE } = require('../reqParams/state-info');

async function getMonthList(message, viewState, cookie) {
  var parseDate = message.date_ini.split('-');
  var data = `AJAXREQUEST=_viewRoot&frmVisao%3Aorgao=${STATE[message.search]}&frmVisao%3Aedicao=1&frmVisao%3Aperiodo=${parseDate[0]}&frmVisao%3Ameses=&frmVisao=frmVisao&autoScroll=&javax.faces.ViewState=${viewState}%3D&frmVisao%3Aj_id42=frmVisao%3Aj_id42&`;

  var config = {
    method: 'post',
    url: `${SEARCH};${cookie}`,
    headers: { 
      'Connection': 'keep-alive', 
      'sec-ch-ua': '"Google Chrome";v="95", "Chromium";v="95", ";Not A Brand";v="99"', 
      'sec-ch-ua-mobile': '?0', 
      'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36', 
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8', 
      'Accept': '*/*', 
      'Origin': ORIGIN, 
      'Sec-Fetch-Site': 'same-origin', 
      'Sec-Fetch-Mode': 'cors', 
      'Sec-Fetch-Dest': 'empty',
      'Referer': REFERER,
      'Accept-Language': 'en-US,en;q=0.9'
    },
    data : data
  };
  const response = await doAxios(config);
  return response;
}

module.exports = getMonthList;