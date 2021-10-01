const cheerio = require('cheerio');
const got = require('got');
const fs = require('fs');
const { DownloaderHelper } = require('node-downloader-helper');
const upload_aws = require('../s3bucket/upload');

const pdf_lists = [];

async function scrapPdf(config, search_url, message, ambiente) {
    console.log('PDF downloading');
    await got(search_url).then(response => {
        const $ = cheerio.load(response.body);
        
        $('#the_content').find('.info-box > a').each((idx, elem) => {
            const item = $(elem).attr('href');
            pdf_lists.push(item);
        })
        if(!$('ul.pagination').length){
          console.log("No Pagination----------------", pdf_lists)
          return ;
        } else {
          $('ul.pagination').find('li.page-item').each((idx, elem) => {
            if($(elem).attr('class').includes('page-item active')){
              if($(elem).next().hasClass('page-item')){
                const search_page_url = "https://transparencia.tjpi.jus.br" + $(elem).next('li').find('a').attr('href')
                scrapPdf(config, search_page_url, message, ambiente);
              } else {
                console.log("Function exited--------------");
                return ;
              }
            }
          });

        }
    }).catch(err => {
        console.log(err);
    });
} 

async function scrapPdfCall(config, search_url, message, ambiente) {
  await scrapPdf(config, search_url, message, ambiente);
  console.log("This is listener-search-url pdf_lists----------------------", pdf_lists);

    const search_result_dir = `./${message.date_ini}-${message.date_end}`;
    const download_await = [];

    if(!fs.existsSync(search_result_dir)){
        fs.mkdirSync(search_result_dir)
    }

    for(let i = 0;i < pdf_lists.length; i++){
        const download = new DownloaderHelper(pdf_lists[i], search_result_dir);
        download_await.push(download.start());
    }
    console.log("This is download await: ", download_await);
    await Promise.all(download_await);
    console.log(`${pdf_lists.length} files Downloaded!`);
    const sendJsonData = await upload_aws(search_result_dir);
    for(let i = 0; i < sendJsonData.length; i++){
      sendJsonData[i]["uf"] = "PI";
      sendJsonData[i]["search"] = message.search;
    }
    console.log("newJSON =============", sendJsonData);
    // const producer = require('../config/kafka-producer')(config, ambiente, sendJsonData);
    // producer().catch( err => {
    //     console.error("error in consumer: ", err)
    // })
}

module.exports = scrapPdfCall;