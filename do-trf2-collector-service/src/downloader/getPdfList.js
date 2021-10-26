const cheerio = require('cheerio');
const fs = require('fs');

function getPdfList(response, page, download_pdf_list) {
  const $ = cheerio.load(response);
  fs.writeFileSync('./text.txt', $.html())
  $('#ctl00_ContentPlaceHolder_ctrListaDiarios_upnDiarios > #divLDIConteudo > #ctl00_ContentPlaceHolder_ctrListaDiarios_pnlDiarios > div:nth-child(1)').find('div.LDIConteinerCaderno > #VCConteudo > div:nth-child(2) > div > div > table.EstiloGrid > tbody > tr.LinhaGrid > td:nth-child(1) > a').each((idx, elem) => {
    console.log($(elem).text());
  })
}

module.exports = getPdfList;