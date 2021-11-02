function getDate(str) {
  var parsed = str.split('/');
  return `${parsed[2]}-${parsed[1]}-${parsed[0]}`
}
module.exports = getDate;