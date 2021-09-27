const { DocDB } = require("aws-sdk");

module.exports = (message, config) => {
    console.log(`handle message: ${message}`);
    
    const date_ini = new Date(message.date_ini);
    const date_end = new Date(message.date_end);
    const search_url = `https://www.tjma.jus.br/portal/diario?data_inicial=${date_ini.getDate()}%2F${date_ini.getMonth()+1}%2F${date_ini.getFullYear()}&data_final=${date_end.getDate()}%2F${date_end.getMonth()}%2F${date_end.getFullYear}&pesquisar=`;

    
}