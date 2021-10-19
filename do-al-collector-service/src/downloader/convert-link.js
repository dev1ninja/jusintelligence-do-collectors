function convertLink(str) {
	var a = str.replace("return popup('/", "")
	var b = a.replace("');", "")
  var newLink = "https://www2.tjal.jus.br" + "/" + b;
  return newLink;
}

module.exports = convertLink;