const fs = require('fs');
const getDateList = require('./getDateList');
const getFirstResponse = require('./getFirstResponse');
const getViewState = require('./getViewState');
const getEventValidation = require('./getEventValidation');
const minMonth = require('./minMonth');
const compareMonth = require('./compareMonth');
const getDate = require('./getDate');
const returnViewState = require('./returnViewState');
const upload2aws = require('../s3bucket/upload');
const getToken = require('./getToken');

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

async function main( message, dest_dir, callback ) {

  const dateList = getDateList(message);
  // console.log(dateList);

  const response = await getFirstResponse();

  var viewState = getViewState(response);
  var eventValidation = getEventValidation(response);
  var curDate = getDate(response);
  var temp = curDate.split('/');
  var nCurDate = `${temp[2]}-${temp[1]}-${temp[0]}`;

  if(compareMonth(message.date_ini, nCurDate)){
    await getToken(viewState, eventValidation, dateList, 0, curDate, dest_dir);
  } else{
    const res = await returnViewState(viewState, eventValidation, curDate, minMonth(nCurDate), message.date_ini);
    // console.log(res)
    await getToken(res.viewState, res.eventValidation, dateList, 0, curDate, dest_dir);
  }

  callback();
}

async function index( config, message, ambiente ) {
  
  const dest_dir = `./${message.date_ini}-${message.date_end}`; 
  
  //Create Director based on message's date
  if(!fs.existsSync(dest_dir)){ 
    fs.mkdirSync(dest_dir);
  }

  await main( message, dest_dir, async () => {
    const sendJsonData = await upload2aws(dest_dir); // Upload all downloaded PDF files to AWS

    for(let i = 0; i < sendJsonData.length; i++){
      sendJsonData[i]['uf'] = 'TRF2';
      sendJsonData[i]['search'] = message.search;
      sendJsonData[i]['id'] = message.id;
    } // Finished to upload.

    console.log("-----------------------");
    const producer = require('../config/kafka-producer')(ambiente, sendJsonData); // Start to send message to `do_processor_final_<env>` kafka topic

    producer().catch( err => {
      console.error("erro in producer: ", err);
    });
  });
  
}

module.exports = index;