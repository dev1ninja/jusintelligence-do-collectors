const qs = require('qs');
const fs = require('fs');
const doAxios = require('./doAxios');
const calcEveArg = require('./calcEveArg');
const cheerio = require('cheerio');
const getLinklkbCadAdmTRF = require('./getLinklkbCadAdmTRF');

const { SEARCH_PAGE_URL, ORIGIN } = require('../reqParams/urls');
const { ID_LISTS } = require('../reqParams/name-download');
const convertDate = require('./convertDate');

async function getToken(viewState, eventValidation, dateList, index, curDate, dest_dir){
  if(index >= dateList.length){
    console.log('finished---------------------')
    return ;
  }
  console.log('Calling getToken function!');
  console.log(dateList[index], calcEveArg(dateList[index]));
  var data = qs.stringify({
    'ctl00$ScriptManager': 'ctl00$ContentPlaceHolder$ctrInicial$upnUpdatePanel|ctl00$ContentPlaceHolder$ctrInicial$ctrCadernosPorAreaJudicial$calCalendario',
    '__EVENTTARGET': 'ctl00$ContentPlaceHolder$ctrInicial$ctrCadernosPorAreaJudicial$calCalendario',
    '__EVENTARGUMENT': calcEveArg(dateList[index]),
    '__LASTFOCUS': '',
    '__VIEWSTATE': viewState,
    '__EVENTVALIDATION': eventValidation,
    'ctl00$ContentPlaceHolder$ctrInicial$ctrCadernosPorAreaJudicial$tbxDataEdicoes': curDate,
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
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36', 
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

  const response = await doAxios(config);
  const $ = cheerio.load(response);

  var downloadLists = [];

  for(let i = 0; i < ID_LISTS.length; i++){
    if($(`#${ID_LISTS[i]}`).attr('href') != undefined){
      downloadLists.push(await getLinklkbCadAdmTRF(viewState, eventValidation, dateList[index], dest_dir, i));
    }
  }

  await Promise.all(downloadLists);
  
  var nViewState;
  var nEventValidation;
  var str_ini = JSON.stringify(response).split('|hiddenField|');
  for(let i = 0; i < str_ini.length; i++){
    if(str_ini[i].includes('__VIEWSTATE')){
      nViewState = str_ini[i].split('|')[1];
    }
    if(str_ini[i].includes('__EVENTVALIDATION')){
      nEventValidation = str_ini[i].split('|')[1];
    }
  }
  var cDate = convertDate(dateList[index]);
  index++;
  await getToken(nViewState, nEventValidation, dateList, index, cDate, dest_dir);

  // return response;
}
module.exports = getToken;