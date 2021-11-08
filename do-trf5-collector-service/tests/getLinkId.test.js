const getLinkId = require('../src/downloader/getLinkId');

const id = 'frmPesquisa:tDiarios:3:j_id55';

it('getLinkId function test', () => {
  expect(getLinkId(id)).toEqual('frmPesquisa:tDiarios:3:j_id67');
})