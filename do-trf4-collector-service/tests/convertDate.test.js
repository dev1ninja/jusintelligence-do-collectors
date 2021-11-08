const convertDate = require('../src/downloader/convertDate');

it('convertDate function test', () => {
  const date = '2021-10-28';
  expect(convertDate(date)).toEqual('2021_10');
})