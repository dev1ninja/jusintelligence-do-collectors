const convertLink = require('../src/downloader/convertLink');

it('Return link converted', () => {
  expect(convertLink('/diario/Consulta/BaixarPdf/26857')).toEqual('http://web.trf3.jus.br/diario/Consulta/BaixarPdf/26857')
})