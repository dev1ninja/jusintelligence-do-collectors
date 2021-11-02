const qs = require('qs');
const doAxios = require('./doAxios');
const getViewState = require('./getViewState');
const getCookie = require('./getCookie');
const { SEARCH, ORIGIN, REFERER } = require('../reqParams/urls');
const { STATE } = require('../reqParams/state-info');

async function getPdfList(message, downMonthList, viewState, cookie, index) {
  console.log("Get Pdf List function called: ");

  if(index >= downMonthList.length){
    console.log('------------finished---------------');
    return ;
  }

  var parseDate = downMonthList[index].split('_');
  var data = qs.stringify({
    'frmVisao:orgao': STATE[`${message.search}`],
    'frmVisao:edicao': '1',
    'frmVisao:periodo': parseDate[0],
    'frmVisao:meses': parseDate[1],
    'frmVisao:j_id48': 'Pesquisar',
    'frmVisao': 'frmVisao',
    'autoScroll': '',
    'javax.faces.ViewState': viewState
  });
  var config = {
    method: 'post',
    url: `${SEARCH};${cookie}`,
    headers: { 
      'Connection': 'keep-alive', 
      'Cache-Control': 'max-age=0', 
      'sec-ch-ua': '"Google Chrome";v="95", "Chromium";v="95", ";Not A Brand";v="99"', 
      'sec-ch-ua-mobile': '?0', 
      'Upgrade-Insecure-Requests': '1', 
      'Origin': ORIGIN, 
      'Content-Type': 'application/x-www-form-urlencoded', 
      'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36', 
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9', 
      'Sec-Fetch-Site': 'same-origin', 
      'Sec-Fetch-Mode': 'navigate', 
      'Sec-Fetch-User': '?1', 
      'Sec-Fetch-Dest': 'document', 
      'Referer': REFERER, 
      'Accept-Language': 'en-US,en;q=0.9'
    },
    data : data
  };
  const response = await doAxios(config);
  const nViewState = getViewState(response.data);

  // console.log(`This is ${index}th: `, response.data)

  var data_100 = `AJAXREQUEST=_viewRoot&frmPesquisa%3Apagina=1&frmPesquisa%3AquantidadeRegistros=100&frmPesquisa=frmPesquisa&autoScroll=&javax.faces.ViewState=${nViewState}%3D&frmPesquisa%3Aj_id94=frmPesquisa%3Aj_id94&`;
  var config_100 = {
    method: 'post',
    url: SEARCH,
    headers: { 
      'Connection': 'keep-alive', 
      'sec-ch-ua': '"Google Chrome";v="95", "Chromium";v="95", ";Not A Brand";v="99"', 
      'sec-ch-ua-mobile': '?0', 
      'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36', 
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8', 
      'Accept': '*/*', 
      'Origin': ORIGIN, 
      'Sec-Fetch-Site': 'same-origin', 
      'Sec-Fetch-Mode': 'cors', 
      'Sec-Fetch-Dest': 'empty', 
      'Referer': SEARCH, 
      'Accept-Language': 'en-US,en;q=0.9', 
      'Cookie': cookie.toUpperCase()
    },
    data : data_100
  };

  const response_100 = await doAxios(config_100);
  console.log('-------------------------------download pdf test---------------------------');

  

  index++;
  await getPdfList(message, downMonthList, nViewState, cookie, index);
}

module.exports = getPdfList;