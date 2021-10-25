const cheerio = require('cheerio');

function getEventValidation(response){
  const $ = cheerio.load(response);
  const eventValidation = $('input[name = __EVENTVALIDATION]').val();
  return eventValidation;
}

module.exports = getEventValidation;