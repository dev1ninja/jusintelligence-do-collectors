const compareMonth = require('../src/downloader/compareMonth');

describe('Comparing Month', () => {
    it('return boolen based on result', () => {
        expect(compareMonth('2021-10-08', '2018-10-08')).toEqual(false)
    })
})