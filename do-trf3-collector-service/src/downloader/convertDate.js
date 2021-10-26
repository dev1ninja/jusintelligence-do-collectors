function convertDate(date){
  var parsed = date.split('/');
  return `${parsed[2]}-${parsed[1]}-${parsed[0]}`;
}
module.exports = convertDate;