function getPdfLink(obj) {
  var url = obj.urlDiario.split('#')[0];
  return url;
}
module.exports = getPdfLink;