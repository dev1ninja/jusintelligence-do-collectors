const cheerio = require('cheerio');
const got = require('got');
const fs = require('fs');
const { DownloaderHelper } = require('node-downloader-helper');
const upload2aws = require('../s3bucket/upload2aws');


const pdf_lists = [];

async function scrapPdf(config, search_url, message, ambiente) {

    console.log('PDF downloading');

    await got(search_url).then( response => {

        const $ = cheerio.load(response.body);

        $('.search-result').find('li > a').each((idx, elem) => {
          if($(elem).text().trim() == 'PDF'){
            const item = $(elem).attr('href');
            pdf_lists.push(item);
          }
        })

        $('ul.pagination').find('li.page-item').each(async (idx, elem) => {
          if($(elem).attr('class').includes('page-item active navigation')){
            if($(elem).next().hasClass('page-item navigation')){
              scrapPdf(config, $(elem).next('li').find('a').attr('href'), message);
            } else {
              const search_result_dir = `./${message.date_ini}-${message.date_end}`;
              const download_await = [];
              if(!fs.existsSync(search_result_dir)){
                fs.mkdirSync(search_result_dir)
              }
              for(let i = 0;i < pdf_lists.length; i++){
                const download = () => {
                  return new Promise(function (resolve, reject) {
                    var pdf = new DownloaderHelper(pdf_lists[i], search_result_dir);
                    console.log("Download Starting....")
                    pdf.on('end', () => resolve());
                    pdf.start();
                  })
                }
                download_await.push(download());
              }

              console.log("This is download await: ", download_await);
              
              await Promise.all(download_await).then(async () => {
                console.log(`${pdf_lists.length} files Downloaded!`);
                const sendJsonData = await upload2aws(search_result_dir);
                for(let i = 0; i < sendJsonData.length; i++){
                  sendJsonData[i]["uf"] = "MA";
                  sendJsonData[i]["search"] = message.search;
                }
                const producer = require('../config/kafka-producer')(ambiente, sendJsonData);
                producer().catch( err => {
                  console.error("error in producer: ", err)
                })
              });
              return ;
            }
            console.log($(elem).next('li').find('a').attr('href'));
          }
        });
    }).catch(err => {
      console.log(err);
    });
} 

module.exports = scrapPdf;