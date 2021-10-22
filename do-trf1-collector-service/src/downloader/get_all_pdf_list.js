const cheerio = require('cheerio');
const convertLink = require('./convert_link');
const getPdfLink = require('./get_pdf_link');

function getAllPdfList(response) {
  var pdf_lists = {};
  const $ = cheerio.load(response);
  $('#principal').find('#conteudo > div:nth-child(2) > div > ul > li > ul > li').each((idx, elem) => {
    var sub_pdf_lists = [];
    var date = Date.parse($(elem).find('.abreCascata').text().split(' ')[1]);
    $(elem).find('ul.cascata > li > a').each((idx, element) => {
      sub_pdf_lists.push(convertLink($(element).attr('href')));
    })
    pdf_lists[`${date}`] = sub_pdf_lists;
  });
  return pdf_lists;
}

module.exports = getAllPdfList;