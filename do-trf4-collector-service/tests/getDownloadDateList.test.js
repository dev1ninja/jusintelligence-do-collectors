const getDownloadDateList = require('../src/downloader/getDownloadDateList');

const message = {"search": "something", "date_ini": "2021-09-29", "date_end": "2021-10-10"}
it('getDownloadDateList function test', () => {
  expect(getDownloadDateList(message)).toEqual(["2021_9", "2021_10"])
})