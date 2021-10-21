const convertDate = require('../src/downloader/convert_date');

const date = '2020-10-21';

describe('get converted new date', () => {
    it('return converted new date', () => {
        expect(convertDate(date)).toEqual('21/10/2020');
    });
});