const { describe } = require('jest-circus');
const convertLink = require('../src/downloader/convert-link');

describe('get converted link', () => {
  it('return converted link', () => {
    expect(convertLink("return popup('/cdje/consultaSimples.do?cdVolume=13&nuDiario=2904&cdCaderno=3&nuSeqpagina=228');")).toEqual("https://www2.tjal.jus.br/cdje/consultaSimples.do?cdVolume=13&nuDiario=2904&cdCaderno=3&nuSeqpagina=228");
  });
});