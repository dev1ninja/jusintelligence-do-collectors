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

var pdf_lists = []
function downloadPDFsOfPage(page, cookie, pdf_lists){ //to get the response per page

  console.log("---------downloadPDFsofPage function called!------------");

  console.log("download page : ", page);
  var options = {
    'method': 'POST',
    'url': 'https://www2.tjal.jus.br/cdje/trocaDePagina.do',
    'headers': {
      'Connection': 'keep-alive',
      'sec-ch-ua': '"Chromium";v="94", "Google Chrome";v="94", ";Not A Brand";v="99"',
      'sec-ch-ua-mobile': '?0',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Safari/537.36',
      'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'Accept': 'text/javascript, text/html, application/xml, text/xml, */*',
      'X-Prototype-Version': '1.6.0.3',
      'X-Requested-With': 'XMLHttpRequest',
      'sec-ch-ua-platform': '"Windows"',
      'Origin': `${HOME_PAGE_URL}`,
      'Sec-Fetch-Site': 'same-origin',
      'Sec-Fetch-Mode': 'cors',
      'Sec-Fetch-Dest': 'empty',
      'Referer': `${SEARCH_PAGE_URL}`,
      'Accept-Language': 'en-US,en;q=0.9',
      'Cookie': `${cookie}`
    },
    body: `pagina=${page}&_=`
  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    const $ = cheerio.load(response.body);
    $('table:nth-child(3)').find('tr.fundocinza1 > td:nth-child(2) > table > tbody > tr > td > a:first-child').each((idx, elem) => {
      console.log($(elem).attr('onclick'));
      pdf_lists.push($(elem).attr('onclick'));
    })
    console.log("This is download pdf lists", pdf_lists);
  });

}

function convertDate(date){
  const formatDate = new Date(date);
  return `${formatDate.getDate()}/${formatDate.getMonth()+1}/${formatDate.getFullYear()}`;
}

function convertLink(str) {
	let a = str.replace("return popup('", "")
	let b = a.replace("');", "")
  let newLink = HOME_PAGE_URL + "/" + b;
  return newLink;
}

async function sendSearchRequest(message){ // this is first download
  console.log("---------sendSearchRequest function called!------------");
  console.log("This is search value ----------------", message);
  const options = {
    'method': 'POST',
    'url': `${SEARCH_PAGE_URL}`,
    'headers': {
      'Connection': 'keep-alive',
      'Cache-Control': 'max-age=0',
      'sec-ch-ua': '"Chromium";v="94", "Google Chrome";v="94", ";Not A Brand";v="99"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Windows"',
      'Upgrade-Insecure-Requests': '1',
      'Origin': `${HOME_PAGE_URL}`,
      'Content-Type': 'application/x-www-form-urlencoded',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
      'Sec-Fetch-Site': 'same-origin',
      'Sec-Fetch-Mode': 'navigate',
      'Sec-Fetch-User': '?1',
      'Sec-Fetch-Dest': 'document',
      'Referer': `${SEARCH_PAGE_URL}`,
      'Accept-Language': 'en-US,en;q=0.9',
    },
    form: {
      'dadosConsulta.dtInicio': convertDate(message.date_ini),
      'dadosConsulta.dtFim': convertDate(message.date_end),
      'dadosConsulta.cdCaderno': '-11',
      'dadosConsulta.pesquisaLivre': message.search,
      'pagina': ''
    }
  };
  await request(options, function (error, response) {
    if (error) {
      consolel.log("Error!----------------------------", error);
    }
    fs.writeFileSync("test.txt", response.body)
    const $ = cheerio.load(response.body);
    const szPages = $('#divResultadosSuperior').find('table > tbody > tr > td:first-child').text();
    const szTexts = szPages.split(' ');
    const nPages = Math.ceil(szTexts[szTexts.length - 2] / 10);
    for(let i = 1; i <= nPages; i ++)
    {
      downloadPDFsOfPage(i, response.headers['set-cookie'][0], pdf_lists);
    }
    //await scrapPdf(response.body, response.headers['set-cookie'][0]);
  });
}

async function scrapPdfCall(config, search_url, message, ambiente) {
  console.log("---------scrapPdfCall function called!------------");
  await sendSearchRequest(message);
  /*const dom = await loadListView()
  loadJquery(dom);
  setSearchValue(message)
  await pressSearchBtn();
  findLinkElement();*/
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
    for(let i = 0; i < sendJsonData.length; i++){
      sendJsonData[i]["uf"] = "al";
      sendJsonData[i]["search"] = message.search;
    }
    const producer = require('../config/kafka-producer')(config, ambiente, sendJsonData);
    producer().catch( err => {
        console.error("error in consumer: ", err)
    })
  */
}

module.exports = scrapPdfCall;