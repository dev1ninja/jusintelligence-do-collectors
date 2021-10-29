const convertDate = require('./convertDate');

function getDownloadDateList(message) {
  var date_ini = new Date(message.date_ini);
  var date_end = new Date(message.date_end);
  var downloadDateList = [];
  while (date_ini <= date_end){
    downloadDateList.push(convertDate(date_ini.toISOString().split('T')[0]));
    date_ini.setMonth(date_ini.getMonth() + 1);
  }
  return downloadDateList;
}
module.exports = getDownloadDateList;