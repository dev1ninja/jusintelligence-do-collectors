const { SEARCH_PAGE_URL } = require('../reqParams/urls');

function pad(d) {
    return (d < 10) ? '0' + d.toString() : d.toString();
}

module.exports = async (config, message, ambiente) => {

    let newMessage = JSON.parse(message);

    console.log(`handle message: ${newMessage.date_ini}`);
    
    const date_ini = new Date(newMessage.date_ini);
    const date_end = new Date(newMessage.date_end);

    console.log("Call downloader ----------------------------");

    await require("../downloader/downloader")(config, SEARCH_PAGE_URL, newMessage, ambiente);
}