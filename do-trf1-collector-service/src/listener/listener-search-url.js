module.exports = async (config, message, ambiente) => {

    let newMessage = JSON.parse(message);

    await require("../downloader/main")(config, newMessage, ambiente);
}