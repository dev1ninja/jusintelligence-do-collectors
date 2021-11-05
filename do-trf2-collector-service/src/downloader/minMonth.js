function minMonth(date){
  var parseDate = date.split('-');
  if(parseInt(parseDate[1]) - 1 < 0){
    return `${parseInt(parseDate[0]) - 1}-12-01`;
  } else{
    return `${parseDate[0]}-${parseInt(parseDate[1])-1}-01`;
  }
}
module.exports = minMonth;