const { DocDB } = require("aws-sdk");

module.exports = async (config, message) => {
    console.log(`handle message: ${message}`);

    let newMessage = JSON.parse(message);

    newMessage.date_ini = '2021-08-10'; // test 
    newMessage.date_end = '2021-09-20'; // test
    
    const date_ini = new Date(newMessage.date_ini);
    const date_end = new Date(newMessage.date_end);
    const search_url = `https://www.tjma.jus.br/portal/diario?data_inicial=${date_ini.getDate()+1}%2F${date_ini.getMonth()+1}%2F${date_ini.getFullYear()}&data_final=${date_end.getDate()+1}%2F${date_end.getMonth()+1}%2F${date_end.getFullYear()}&pesquisar=`;

    require("../downloader/downloader")(config, search_url, newMessage);
    console.log("This is Search URL", search_url);
}