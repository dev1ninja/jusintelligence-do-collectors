const qs = require('qs');
const convertDate = require('./convert_date');
const doAxios = require('./doAxios');
const getPdfLink = require('./get_pdf_link');
const { ORIGIN_PAGE_URL, SEARCH_PAGE_URL } = require('../reqParams/urls');
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

async function getPdfLists(message) {

  var pdf_lists = [];

  var date_ini = Date.parse(message.date_ini);
  console.log("Date Ini", date_ini);
  var date_end = Date.parse(message.date_end);
  console.log("Date End", date_end);

  for(let i = date_ini; i <= date_end; i+=86400000){
    let date = new Date(i);
    let parsedDate = convertDate(date.toISOString().split('T')[0]);
    console.log("Parsed Date", parsedDate);
    var data = qs.stringify({
      'visaoId': 'tjdf.djeletronico.comum.internet.apresentacao.VisaoDiarioEletronicoInternetPorData',
      'controladorId': 'tjdf.djeletronico.comum.internet.apresentacao.ControladorDiarioEletronicoInternetPorData',
      'nomeDaPagina': 'dados',
      'comando': 'consultarDiariosDaData',
      'enderecoDoServlet': 'djeletronico',
      'visaoAnterior': 'tjdf.djeletronico.comum.internet.apresentacao.VisaoDiarioEletronicoInternetPorData',
      'tokenDePaginacao': '8',
      'internet': '1',
      'diariosConsultados': 'id,ano,numero,dataDePublicacaoDoDiario,linkBaixarPDF,linkBaixarP7S',
      'diariosConsultados_qtd': '1',
      'data': parsedDate
    });
    var config = {
      method: 'post',
      url: SEARCH_PAGE_URL,
      headers: { 
        'Connection': 'keep-alive', 
        'Cache-Control': 'max-age=0', 
        'sec-ch-ua': '"Chromium";v="94", "Google Chrome";v="94", ";Not A Brand";v="99"', 
        'sec-ch-ua-mobile': '?0', 
        'Upgrade-Insecure-Requests': '1', 
        'Origin': ORIGIN_PAGE_URL, 
        'Content-Type': 'application/x-www-form-urlencoded', 
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36', 
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9', 
        'Sec-Fetch-Site': 'same-origin', 
        'Sec-Fetch-Mode': 'navigate', 
        'Sec-Fetch-User': '?1', 
        'Sec-Fetch-Dest': 'document', 
        'Referer': SEARCH_PAGE_URL, 
        'Accept-Language': 'en-US,en;q=0.9'
      },
      data : data
    };
    var response = await doAxios(config);
    pdf_lists.push(...getPdfLink(response));
  }
  return pdf_lists; 
}

module.exports = getPdfLists;