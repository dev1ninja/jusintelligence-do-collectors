const cheerio = require('cheerio');
const got = require('got');
const fs = require('fs');
const { DownloaderHelper } = require('node-downloader-helper');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const axios = require('axios').default;
const tough = require('tough-cookie');
const util = require('util');
const timer = util.promisify(setTimeout);
const { SEARCH_PAGE_URL, HOME_PAGE_URL } = require('../reqParams/urls');

const virtualConsole = new jsdom.VirtualConsole();

const cookieJar = new tough.CookieJar();

let userAgent = {
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36'
}

let encoding = {
    'Accept-Encoding': 'gzip, deflate, br'
}

let postHeaders = {
    ...userAgent,
    ...encoding,
    'Content-Type': 'application/x-www-form-urlencoded'
}

function loadJquery(dom) {
    delete require.cache[require.resolve('jquery')]
    global.window = dom.window
    global.document = dom.window.document
    global.$ = require('jquery')
}

async function loadSearchPage(){
    const dom = await JSDOM.fromURL(SEARCH_PAGE_URL, {
        referrer: HOME_PAGE_URL,
        userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36',
        includeNodeLocations: true,
        storageQuota: 100000000,
        runScripts: 'dangerously',
        resources: 'usable',
        virtualConsole,
        cookieJar,
    });
    return dom;
}

function setSearchValue(config, search_url, newMessage, ambiente) {
    const inputIds = [
        "dtInicioString",
        "dtFimString",
        "procura",
    ]
}

async function pressSearchBtn(){
    do{
        await timer(1000)
    }while(!window.executarReCaptcha)
    // console.log()
    console.log(document.querySelector('#avancado > .spwBotaoDefault').id, "pressed")
    document.querySelector('#avancado > .spwBotaoDefault').click()
    await timer(500)
}

async function waitLoading(){
    const $status = document.getElementById('_viewRoot:status.start')
    do{
        await timer(1000)
        console.log("loading..")
    }while($($status).css('display') != 'none')
}

async function scrap_pdf(config, search_url, newMessage, ambiente){
    const dom = await loadSearchPage();
    loadJquery(dom);
    setSearchValue(newMessage);
    await pressSearchBtn();
    await waitLoading();s
}