const cheerio = require('cheerio');
const fs = require('fs');
const tough = require('tough-cookie');
const axios = require('axios').create();

const CookieFileStore = require('tough-cookie-file-store').FileCookieStore;

require('axios-cookiejar-support').default(axios);
axios.default.withCredentials = true;

const homePage = require('./home_page');
const { searchPage } = require('./search_page');
const afterSearchPage = require('./after_search_page');
const searchResultPage = require('./search_result_page');
const { parsingPage } = require('./parsing_page');
const { AFTER_SEARCH_PAGE_BODY, SEARCH_RESULT_PAGE_BODY } = require('./reqParams/bodys');
const paramsWriter = require('./paramsWriter');

let viewState;
let userAgent = {
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36'
}

let encoding = {
    'Accept-Encoding': 'gzip, deflate, br'
}

let getHeaders = {
    ...userAgent,
    ...encoding
}

let postHeaders = {
    ...userAgent,
    ...encoding,
    'Content-Type': 'application/x-www-form-urlencoded'
}

async function mainParser() {
    try {
        paramsWriter();
        const homePageRes = await homePage(axios)();

        const searchPageRes = await searchPage(axios)();

        const $ = cheerio.load(searchPageRes.data);
        const viewState = getViewState($);
        console.log(viewState);

    } catch (error) {
        console.log(error);
    }
}

mainParser();

module.exports.mainParser = mainParser