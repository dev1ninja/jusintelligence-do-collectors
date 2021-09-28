const cheerio = require('cheerio');
const got = require('got');
const fs = require('fs');
const { DownloaderHelper } = require('node-downloader-helper');


const pdf_lists = [];

function scrapPdf(config, search_url, message) {
    console.log('PDF downloading');
    got(search_url).then(response => {
        const $ = cheerio.load(response.body);
        $('.search-result').find('li > a').each((idx, elem) => {
          if($(elem).text().trim() == 'PDF'){
            const item = $(elem).attr('href');
            pdf_lists.push(item);
          }
        })
        $('ul.pagination').find('li.page-item').each((idx, elem) => {
          if($(elem).attr('class').includes('page-item active navigation')){
            if($(elem).next().hasClass('page-item navigation')){
              scrapPdf(config, $(elem).next('li').find('a').attr('href'), message);
            } else {
              if(!fs.existsSync(`./${message.date_ini}-${message.date_end}`)){
                fs.mkdirSync(`./${message.date_ini}-${message.date_end}`)
              }
              for(let i = 0;i < pdf_lists.length; i++){
                const download = new DownloaderHelper(pdf_lists[i], `./${message.date_ini}-${message.date_end}`);
                download.on('end', () => console.log('Download Completed'))
                download.start();
              }
              console.log(`${pdf_lists.length} files Downloaded!`);
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