const cheerio = require('cheerio');

function getDate(response){
  const $ = cheerio.load(response);
  const viewState = $('input[name = ctl00$ContentPlaceHolder$ctrInicial$ctrCadernosPorAreaJudicial$tbxDataEdicoes]').val();
  return viewState;
}

module.exports = getDate;