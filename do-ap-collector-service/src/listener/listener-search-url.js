module.exports = async (config, message, ambiente) => {

    let newMessage = JSON.parse(message);

    await require("../downloader/downloader")(config, newMessage, ambiente);
}