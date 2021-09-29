const { DocDB } = require("aws-sdk");
const { HOME_PAGE_URL, SEARCH_PAGE_URL } = require("../reqParams/urls");

module.exports = async (config, message) => {

    let newMessage = JSON.parse(message);

    console.log(`handle message: ${newMessage.date_ini}`);
    
    const date_ini = new Date(newMessage.date_ini);
    const date_end = new Date(newMessage.date_end);

    require("../downloader/downloader")(config, search_url, newMessage);
    console.log("This is Search URL", search_url);
}