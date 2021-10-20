const mockAxios = require('jest-mock-axios').default;
const doAxios = require('../src/downloader/doAxios');
const RESPONSE = require('./data-for-doAxios');
const { SEARCH_URL, ORIGIN_PAGE_URL } = require('../src/reqParams/urls');

var data = JSON.stringify({
  'parametros': {
    'num_cnj': null,
    'num_dje_formatado': null,
    'num_dje': null,
    'nome_parte': null,
    'nome_advogado': null,
    'oab_advogado': null,
    'palavras_chave': 'HABEAS CORPUS',
    'dt_divulgacao_incio': '2021-09-30',
    'dt_divulgacao_fim': '2021-10-17',
    'dataDivulgacao': null,
    'num_dje_formatado_pesquisa': null,
    'chave_consumo': null
  },
  'catpcha': null
});
  
var config = {
  method: 'post',
  url: SEARCH_URL,
  headers: { 
    'Connection': 'keep-alive', 
    'sec-ch-ua': '"Chromium";v="94", "Google Chrome";v="94", ";Not A Brand";v="99"', 
    'Accept': 'application/json', 
    'Content-Type': 'application/json', 
    'sec-ch-ua-mobile': '?0', 
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36', 
    'sec-ch-ua-platform': '"Windows"', 
    'Origin': ORIGIN_PAGE_URL, 
    'Sec-Fetch-Site': 'same-site', 
    'Sec-Fetch-Mode': 'cors', 
    'Sec-Fetch-Dest': 'empty', 
    'Referer': ORIGIN_PAGE_URL, 
    'Accept-Language': 'en'
  },
  data : data
};

it('mock test', async () => {
  const result = await doAxios(config);
  expect(result.dados.dados.length).toEqual(20);
})