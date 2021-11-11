const getDownloadMonthList = require('../src/downloader/getDownloadMonthList');

const message = {"search": "CE", "date_ini": "2021-09-29", "date_end": "2021-10-11"};

it('getDownloadMonthList function test', () => {
  expect(getDownloadMonthList(message)).toEqual(["2021_9", "2021_10"]);
})