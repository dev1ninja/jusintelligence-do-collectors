const getPdfLink = require('../src/downloader/get_pdf_link');

const origin = 'https://dje.tjdft.jus.br/dje/jsp/dje/DownloadDeDiario.jsp?dj=DJ198_2021-ASSINADO.PDF#page=187&statusDoDiario=ASSINADO';

describe('get PDF link', () => {
	it('return PDF link', () => {
			expect(getPdfLink(origin)).toEqual('https://dje.tjdft.jus.br/dje/jsp/dje/DownloadDeDiario.jsp?dj=DJ198_2021-ASSINADO.PDF');
	});
});