const cheerio = require('cheerio');

function getViewState(response){
  const $ = cheerio.load(response);
  const viewState = $('input[name=javax.faces.ViewState]').val();
  return viewState;
}

module.exports = getViewState;