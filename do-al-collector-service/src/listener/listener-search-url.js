const { SEARCH_PAGE_URL } = require('../reqParams/urls');

function pad(d) {
    return (d < 10) ? '0' + d.toString() : d.toString();
}

module.exports = async (config, message, ambiente) => {

    let newMessage = JSON.parse(message);

    await require("../downloader/downloader")(config, SEARCH_PAGE_URL, newMessage, ambiente);
}