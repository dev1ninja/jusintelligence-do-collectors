const cheerio = require('cheerio');

function getViewState(response){
  const $ = cheerio.load(response);
  const viewState = $('input[name = __VIEWSTATE]').val();
  return viewState;
}

module.exports = getViewState;