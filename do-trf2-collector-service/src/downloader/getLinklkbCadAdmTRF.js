const convertDate = require('./convertDate');
const doAxios1 = require('./doAxios1');
const FormData = require('form-data');

const { SEARCH_PAGE_URL, ORIGIN } = require('../reqParams/urls');

async function getLinklkbCadAdmTRF(viewState, eventValidation, date) {
  console.log(convertDate(date))
  var data = new FormData();
  data.append('__EVENTTARGET', 'ctl00$ContentPlaceHolder$ctrInicial$ctrCadernosPorAreaJudicial$lkbCadAdmTRF');
  data.append('__EVENTARGUMENT', '');
  data.append('__LASTFOCUS', '');
  data.append('__VIEWSTATE', viewState);
  data.append('__EVENTVALIDATION', eventValidation);
  data.append('ctl00$ContentPlaceHolder$ctrInicial$ctrCadernosPorAreaJudicial$tbxDataEdicoes', convertDate(date));
  data.append('ctl00$ContentPlaceHolder$ctrInicial$ctrCadernosPorAreaJudicial$meeDataInicial_ClientState', '');
  data.append('ctl00$ContentPlaceHolder$ctrInicial$ctrCadernosPorAreaJudicial$OpcaoVisualizacao', 'rbtPDF');
  data.append('ctl00$ContentPlaceHolder$ctrInicial$OpcaoPesquisa', 'rbtDiario');
  
  var config = {
    method: 'post',
    url: SEARCH_PAGE_URL,
    headers: { 
      'Connection': 'keep-alive', 
      'Cache-Control': 'max-age=0', 
      'sec-ch-ua': '"Google Chrome";v="95", "Chromium";v="95", ";Not A Brand";v="99"', 
      'sec-ch-ua-mobile': '?0',  
      'Upgrade-Insecure-Requests': '1', 
      'Origin': ORIGIN, 
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36', 
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9', 
      'Sec-Fetch-Site': 'same-origin', 
      'Sec-Fetch-Mode': 'navigate', 
      'Sec-Fetch-User': '?1', 
      'Sec-Fetch-Dest': 'document', 
      'Referer': SEARCH_PAGE_URL, 
      'Accept-Language': 'en-US,en;q=0.9',
      ...data.getHeaders()
    },
    data : data
  };
  const response = await doAxios1(config);
  console.log(response.headers)
}
module.exports = getLinklkbCadAdmTRF;