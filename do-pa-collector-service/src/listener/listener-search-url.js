const { SEARCH_PAGE_URL } = require('../reqParams/urls');

module.exports = async (config, message, ambiente) => {

    let newMessage = JSON.parse(message);

    console.log("Call downloader ----------------------------");
    
    await require("../downloader/downloader")(config, SEARCH_PAGE_URL, newMessage, ambiente);
}