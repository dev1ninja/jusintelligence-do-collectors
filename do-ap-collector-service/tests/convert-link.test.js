const convertLink = require('../src/downloader/convert-link');

const obj = {
    "id": 3346,
    "num_diario": 2021000182,
    "datadivulgacao": "2021-10-15 18:41:42.684618"
};

describe('get converted new link', () => {
    it('return converted new link', () => {
        expect(convertLink(obj)).toEqual('https://tucujuris.tjap.jus.br/api/publico/download-diario?id=3346&numeroDiario=2021000182&captcha=null');
    });
});