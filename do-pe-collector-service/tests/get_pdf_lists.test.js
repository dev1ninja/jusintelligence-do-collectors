const getPdfLists = require('../src/downloader/get_pdf_lists');
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

const message = {"search": "HABEAS CORPUS", "date_ini": "2021-09-30", "date_end": "2021-10-05"};

describe('get PDF lists', () => {
    it('return PDF lists', () => {
        expect(getPdfLists(message).length).toEqual(4);
    });
});