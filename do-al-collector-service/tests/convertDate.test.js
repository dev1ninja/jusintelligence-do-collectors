const convertDate = require('../src/downloader/convert-date');

test('Convert Date 2021-09-13 should be 13/09/2021', () => {
    expect(convertDate("2021-09-13")).toBe("13/09/2021");
});