const { DOWNLOAD_PREFIX } = require('../reqParams/urls');

function convertLink(link) {
  return DOWNLOAD_PREFIX + link;
}

module.exports = convertLink;