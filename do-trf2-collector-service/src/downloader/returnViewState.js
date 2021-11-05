const qs = require('qs');
const cheerio = require('cheerio');
const doAxios = require('./doAxios');
const compareMonth = require('./compareMonth');
const minMonth = require('./minMonth');
const calcEveArg = require('./calcEveArg');
const { SEARCH_PAGE_URL, ORIGIN } = require('../reqParams/urls');

var reObj;
//This function returns previous month's viewstate.
async function main(viewState, eventValidation, targetV, curDate, initDate) {

  var data = qs.stringify({
    'ctl00$ScriptManager': 'ctl00$ContentPlaceHolder$ctrInicial$upnUpdatePanel|ctl00$ContentPlaceHolder$ctrInicial$ctrCadernosPorAreaJudicial$calCalendario',
    '__EVENTTARGET': 'ctl00$ContentPlaceHolder$ctrInicial$ctrCadernosPorAreaJudicial$calCalendario',
    '__EVENTARGUMENT': `V${calcEveArg(curDate)}`,
    '__LASTFOCUS': '',
    '__VIEWSTATE': viewState,
    '__EVENTVALIDATION': eventValidation,
    'ctl00$ContentPlaceHolder$ctrInicial$ctrCadernosPorAreaJudicial$tbxDataEdicoes': targetV,
    'ctl00$ContentPlaceHolder$ctrInicial$ctrCadernosPorAreaJudicial$meeDataInicial_ClientState': '',
    'ctl00$ContentPlaceHolder$ctrInicial$ctrCadernosPorAreaJudicial$OpcaoVisualizacao': 'rbtPDF',
    'ctl00$ContentPlaceHolder$ctrInicial$OpcaoPesquisa': 'rbtDiario' 
  });
  var config = {
    method: 'post',
    url: SEARCH_PAGE_URL,
    headers: { 
      'Connection': 'keep-alive', 
      'sec-ch-ua': '"Google Chrome";v="95", "Chromium";v="95", ";Not A Brand";v="99"', 
      'Cache-Control': 'no-cache', 
      'Content-Type': 'application/x-www-form-urlencoded', 
      'X-MicrosoftAjax': 'Delta=true', 
      'sec-ch-ua-mobile': '?0', 
      'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36', 
      'Accept': '*/*', 
      'Origin': ORIGIN, 
      'Sec-Fetch-Site': 'same-origin', 
      'Sec-Fetch-Mode': 'cors', 
      'Sec-Fetch-Dest': 'empty', 
      'Referer': SEARCH_PAGE_URL, 
      'Accept-Language': 'en-US,en;q=0.9'
    },
    data : data
  };

  const res = await doAxios(config);
  const $ = cheerio.load(res);
  var str_ini = JSON.stringify(res).split('|hiddenField|');
  var nViewState;
  var nEventValidation;
  for(let i = 0; i < str_ini.length; i++){
    if(str_ini[i].includes('__VIEWSTATE')){
      nViewState = str_ini[i].split('|')[1];
    }
    if(str_ini[i].includes('__EVENTVALIDATION')){
      nEventValidation = str_ini[i].split('|')[1];
    }
  }
  if(compareMonth(curDate, initDate)){
    var obj = {
      viewState: nViewState,
      eventValidation: nEventValidation
    }
    reObj = obj;
  } else {
    var nCurDate = minMonth(curDate);
    await main(nViewState, nEventValidation, targetV, nCurDate, initDate);
  }
}
async function returnViewState(viewState, eventValidation, targetV, curDate, initDate){
  await main(viewState, eventValidation, targetV, curDate, initDate);
  return reObj;
}
module.exports = returnViewState;