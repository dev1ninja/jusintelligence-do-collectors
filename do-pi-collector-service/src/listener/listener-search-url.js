function pad(d) {
    return (d < 10) ? '0' + d.toString() : d.toString();
}

module.exports = async (config, message, ambiente) => {

    let newMessage = JSON.parse(message);

    if(newMessage.jusbrasil && newMessage.search != null){
        const sendJsonData = {
            "id": newMessage.id,
            "search": newMessage.search,
            "uf": "PI",
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
    
        const search_url = `https://transparencia.tjpi.jus.br/diarios?q%5Bterms%5D=Parecer&q%5Bdisponibilization_gt%5D=${date_ini.getFullYear()}-${pad(date_ini.getMonth()+1)}-${pad(date_ini.getDate()+1)}&q%5Bdisponibilization_lt%5D=${date_end.getFullYear()}-${pad(date_end.getMonth()+1)}-${pad(date_end.getDate()+1)}&advanced_=Pesquisar`
    
        console.log("This is Search URL", search_url);
    
        await require("../downloader/downloader")(config, search_url, newMessage, ambiente);
    }
    
}