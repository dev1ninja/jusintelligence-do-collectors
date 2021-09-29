const { DocDB } = require("aws-sdk");
const { SEARCH_PAGE_URL } = require('../reqParams/urls');

module.exports = async (config, message, ambiente) => {

    let newMessage = JSON.parse(message);

    console.log(`handle message: ${newMessage}`);
    
    const date_ini = new Date(newMessage.date_ini);
    const date_end = new Date(newMessage.date_end);

    await require("../scrapper/scrapper")(config, search_url, newMessage, ambiente);
    console.log("This is Search URL", search_url);
}