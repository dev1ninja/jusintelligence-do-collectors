function getPdfLink(str) {
  var url = str.split('#')[0];
  return url;
}
module.exports = getPdfLink;