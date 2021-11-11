const getDate = require('../src/downloader/getDate');

const date = '28/10/2021';

it('getDate function test', () => {
  expect(getDate(date)).toEqual('2021-10-28');
})