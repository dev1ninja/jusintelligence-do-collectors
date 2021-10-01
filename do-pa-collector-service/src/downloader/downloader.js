const upload_aws = require('../s3bucket/upload');
const solveCaptcha = require('../solving-captcha/solving-captcha');

async function scrapPdfCall(config, search_url, message, ambiente) {
  await solveCaptcha(search_url, message);
  const search_result_dir = `./${message.date_ini}-${message.date_end}`;
  const sendJsonData = await upload_aws(search_result_dir);
  for(let i = 0; i < sendJsonData.length; i++){
    sendJsonData[i]["uf"] = "al";
    sendJsonData[i]["search"] = message.search;
  }/*
  const producer = require('../config/kafka-producer')(config, ambiente, sendJsonData);
  producer().catch( err => {
    console.error("error in consumer: ", err)
  })*/
}

module.exports = scrapPdfCall;