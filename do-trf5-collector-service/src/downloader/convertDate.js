function convertDate(date){
  var parsed = date.split('-');
  return `${parseInt(parsed[0])}_${parseInt(parsed[1])}`;
}
module.exports = convertDate;