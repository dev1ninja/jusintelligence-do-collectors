const minMonth = require('../src/downloader/minMonth');

it('return decreasing a month', () => {
  expect(minMonth('2021-01-28')).toEqual('2020-12-01');
})