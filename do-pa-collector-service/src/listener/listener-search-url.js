const { SEARCH_PAGE_URL } = require('../reqParams/urls');

module.exports = async (config, message, ambiente) => {

    let newMessage = JSON.parse(message);

    if(newMessage.jusbrasil && newMessage.search != null){
        const sendJsonData = {
            "id": newMessage.id,
            "search": newMessage.search,
            "uf": "PA",
            "jusbrasil": newMessage.jusbrasil,
            "date_ini": newMessage.date_ini,
            "date_end": newMessage.date_end
        }
        const producer = require('../config/kafka-producer')(ambiente, sendJsonData);
        producer().catch( err => {
            console.error("error in producer: ", err);
        })
    } else {
        console.log("Call downloader ----------------------------");
        await require("../downloader/downloader")(config, SEARCH_PAGE_URL, newMessage, ambiente);
    }

}