const calcEveArg = require('../src/downloader/calcEveArg');

describe('calculator specific number based on date', () => {
  const date = '2021-09-01';
  it('return specific number', () => {
    expect(calcEveArg(date)).toEqual(7914);
  });
});