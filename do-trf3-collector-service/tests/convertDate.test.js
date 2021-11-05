const convertDate = require('../src/downloader/convertDate');
  
it('Return date converted', () => {
  expect(convertDate('03/04/2021')).toEqual('2021-04-03')
})