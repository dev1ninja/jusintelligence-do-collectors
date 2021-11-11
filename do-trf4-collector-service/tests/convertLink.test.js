const convertLink = require('../src/downloader/convertLink');

it('convertLink function test', () => {
  const link = 'download.php?id_publicacao=8181';
  expect(convertLink(link)).toEqual('https://www.trf4.jus.br/trf4/diario/download.php?id_publicacao=8181');
})