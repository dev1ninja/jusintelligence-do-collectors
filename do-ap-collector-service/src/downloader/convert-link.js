function convertLink(obj) {
	var newLink = `https://tucujuris.tjap.jus.br/api/publico/download-diario?id=${obj.id}&numeroDiario=${obj.num_diario}&captcha=null`
  return newLink;
}

module.exports = convertLink;