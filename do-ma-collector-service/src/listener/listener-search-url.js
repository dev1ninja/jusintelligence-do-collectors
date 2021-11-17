module.exports = async (config, message, ambiente) => {

    let newMessage = JSON.parse(message);

    if(newMessage.jusbrasil && newMessage.search != null){
        const sendJsonData = {
            "id": newMessage.id,
            "search": newMessage.search,
            "uf": "MA",
            "jusbrasil": newMessage.jusbrasil,
            "date_ini": newMessage.date_ini,
            "date_end": newMessage.date_end
        }
        const producer = require('../config/kafka-producer')(ambiente, sendJsonData);
        producer().catch( err => {
            console.error("error in producer: ", err);
        })
    } else {
        const date_ini = new Date(newMessage.date_ini);
        const date_end = new Date(newMessage.date_end);
    
        const search_url = `https://www.tjma.jus.br/portal/diario?data_inicial=${date_ini.getDate()+1}%2F${date_ini.getMonth()+1}%2F${date_ini.getFullYear()}&data_final=${date_end.getDate()+1}%2F${date_end.getMonth()+1}%2F${date_end.getFullYear()}&pesquisar=`;
    
        console.log("This is Search URL", search_url);
        await require("../downloader/downloader")(config, search_url, newMessage, ambiente);
    }
}