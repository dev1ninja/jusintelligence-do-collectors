const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const axios = require('axios').default;
const request = require('request')
const decache = require('decache')
const axiosCookieJarSupport = require('axios-cookiejar-support').default
const tough = require('tough-cookie')
const util = require('util')
const timer = util.promisify(setTimeout)
const fs = require('fs')
const cheerio = require('cheerio');
const got = require('got');
const { DownloaderHelper } = require('node-downloader-helper');
const upload_aws = require('../s3bucket/upload');
const { SEARCH_PAGE_URL, HOME_PAGE_URL } = require('../reqParams/urls');

const virtualConsole = new jsdom.VirtualConsole();

const cookieJar = new tough.CookieJar();

axios.defaults.jar = cookieJar

function loadJquery(dom){
  delete require.cache[require.resolve('jquery')]
  global.window = dom.window
  global.document = dom.window.document
  global.$ = require('jquery')
  // console.log("loadJquery ***********", document.getElementById("dtInicioString").id)
}

async function loadListView(){
  const dom = await JSDOM.fromURL(SEARCH_PAGE_URL, {
      referrer: HOME_PAGE_URL,
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36',
      includeNodeLocations: true,
      storageQuota: 10000000,
      runScripts: 'dangerously',
      resources: "usable",
      virtualConsole,
      cookieJar,
  }).then((dom) => {return dom});
  // console.log("This is the Body", dom.window.document.body.textContent.trim())
  return dom
}

function setSearchValue(message){
  const inputIds = [
    "dtInicioString",
    "dtFimString",
    "procura"
  ]
  const matches = [];
  matches.push(message.date_ini);
  matches.push(message.date_end);
  matches.push(message.search);
  console.log("This is document ------------------------", document);
  console.log("This is matches ------- ", matches);
  for(let i = 0; i < inputIds.length; i++){
    let $input = document.getElementById(inputIds[i])
    $($input).val(matches[i]);
  }
  console.log("This is Set Search Value -------------------", document.getElementById("dtInicioString").value)
  console.log("This is Set Search Value -------------------", document.getElementById("dtFimString").value)
}

async function pressSearchBtn(){
  await timer(1000)
  console.log(document.getElementsByClassName("spwBotaoDefault")[2].value, "pressed")
  document.getElementsByClassName("spwBotaoDefault")[2].click()
  await timer(10000)
}

function findLinkElement(){
  //console.log("document", document);
  const table = document.getElementById('divResultadosInferior');
  console.log("This is table", table);
  //console.log("-------------------\n", document.getElementsByTagName("div"));
  // const $as = Array.from($($table).find('.fundocinzal > td:second-child > table > tbody > tr > td > a:first-child')).each
  // console.log("process ids", $($table).find('.fundocinzal > td:second-child > table > tbody > tr > td > a:first-child'));
  ///return $as[0]
}

const pdf_lists = [];

async function scrapPdf(config, search_url, message, ambiente) {
    console.log('PDF downloading');
    await got(search_url).then(response => {
        const $ = cheerio.load(response.body);
        
        $('#the_content').find('.info-box > a').each((idx, elem) => {
            const item = $(elem).attr('href');
            console.log(item);
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
                console.log("This is exit function--------------", pdf_lists);
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
  const dom = await loadListView()
  loadJquery(dom);
  setSearchValue(message)
  await pressSearchBtn();
  findLinkElement();
  // console.log("Here is document -------------------------- ", document)
  /*
  await scrapPdf(config, search_url, message, ambiente);
  console.log("This is listener-search-url pdf_lists----------------------", pdf_lists);

    const search_result_dir = `./${message.date_ini}-${message.date_end}`;
    const download_await = [];
    console.log("This is PDF lists : ", pdf_lists.length);

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
    const producer = require('../config/kafka-producer')(config, ambiente, sendJsonData);
    producer().catch( err => {
        console.error("error in consumer: ", err)
    })
  */
}

module.exports = scrapPdfCall;