module.exports = async (config, message, ambiente) => {

    let newMessage = JSON.parse(message);
    let date_ini = new Date(newMessage.date_ini);
    let date_end = new Date(newMessage.date_end);

    if(date_ini > date_end){
        throw new Error('Initial date should be less than end date.');
    }

    await require("../downloader/main")(config, newMessage, ambiente);
}