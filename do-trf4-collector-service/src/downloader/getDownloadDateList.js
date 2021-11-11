const convertDate = require('./convertDate');

function convert(date){

  let parseDate = date.split('-');
  return `${parseDate[0]}-${parseDate[1]}-01`;

}

function convert1(date){

  var parseDate = date.split('-');

  if(parseInt(parseDate[1]) + 1 > 12){
    return `${parseInt(parseDate[0]) + 1}-01-01`;
  } else{
    return `${parseDate[0]}-${parseInt(parseDate[1])+1}-01`;
  }

}

function getDownloadDateList(message) {

  var date_ini = new Date(convert(message.date_ini));
  var date_end = new Date(convert(message.date_end));

  if(date_ini > date_end){
    console.log('Initial date must be less than end date!');
    return;
  }

  console.log(date_ini, ' : ', date_end);

  var downloadDateList = [];

  while (date_ini <= date_end){
    downloadDateList.push(convertDate(date_ini.toISOString().split('T')[0]));
    date_ini = new Date(convert1(date_ini.toISOString().split('T')[0]));
    date_ini.setUTCHours(0,0,0,0);
  }
  return downloadDateList;
}

module.exports = getDownloadDateList;