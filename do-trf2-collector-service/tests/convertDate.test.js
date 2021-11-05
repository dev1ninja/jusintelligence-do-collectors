const convertDate = require('../src/downloader/convertDate');

describe('Convert Date as required format', () => {
    const date = '2021-10-28';
    it('return 28/10/2021', () => {
        expect(convertDate(date)).toEqual('28/10/2021')
    })
})