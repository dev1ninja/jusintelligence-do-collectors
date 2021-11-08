const convertDate = require('../src/downloader/convertDate');

const date = '2021-10-28';

it('convertDate function test', () => {
  expect(convertDate(date)).toEqual('2021_10');
})