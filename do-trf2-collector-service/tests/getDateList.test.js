const getDateList = require('../src/downloader/getDateList');

describe('Get Date List between initial date and end date', () => {
    const message = {"search": "something", "date_ini": "2020-12-28", "date_end": "2021-01-03"};
    it('return all date list between 2020-12-28 and 2021-01-03', () => {
        expect(getDateList(message)).toEqual(['2020-12-28','2020-12-29','2020-12-30','2020-12-31','2021-01-01'])
    })
})