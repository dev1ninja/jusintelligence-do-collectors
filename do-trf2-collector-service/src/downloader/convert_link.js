function convertLink(link){
  return link.replace('../..', 'https://portal.trf1.jus.br');
}
module.exports = convertLink;