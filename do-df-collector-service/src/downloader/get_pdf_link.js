const cheerio = require('cheerio');

function getPdfLink(response) {
  var link_lists = [];
  const $ = cheerio.load(response);
  $('#estrutura').find('form[action="djeletronico"] > #contEsq > #tabela_diariosConsultados > tbody > tr').each((idx, elem) => {
    link_lists.push($(elem).find('td:nth-child(4) > a').attr('href'));
  });
  return link_lists;
}

module.exports = getPdfLink;