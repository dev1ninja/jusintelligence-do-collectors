function convertDate(date){
  var parsedDate = date.split('-');
  var convertedDate = `${parsedDate[2]}/${parsedDate[1]}/${parsedDate[0]}`;
  return convertedDate;
}

module.exports = convertDate;