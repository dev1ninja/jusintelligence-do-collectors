module.exports = async (config, message, ambiente) => {

    let newMessage = JSON.parse(message);
    if(newMessage.jusbrasil && newMessage.search != null){
        const sendJsonData = {
            "id": newMessage.id,
            "search": newMessage.search,
            "uf": "TRF3",
            "jusbrasil": newMessage.jusbrasil,
            "date_ini": newMessage.date_ini,
            "date_end": newMessage.date_end
        }
        const producer = require('../config/kafka-producer')(ambiente, sendJsonData);
        producer().catch( err => {
            console.error("error in producer: ", err);
        })
    } else {
        let date_ini = new Date(newMessage.date_ini);
        let date_end = new Date(newMessage.date_end);
    
        if(date_ini > date_end){
            throw new Error('Initial date should be less than end date.');
        }
    
        await require("../downloader/main")(config, newMessage, ambiente);
    }
}