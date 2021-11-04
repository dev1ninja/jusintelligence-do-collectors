function getDateList(message){
  var date_ini = Date.parse(message.date_ini);
  var date_end = Date.parse(message.date_end);
  var dateList = [];
  for(let i = date_ini; i <= date_end; i += 86400000){
    var date = new Date(i);
    if(date.getDay() != 6 && date.getDay() != 5){
      dateList.push(date.toISOString().split('T')[0]);
    }
  }
  return dateList;
}
module.exports = getDateList;