const convertLink = require('../src/downloader/convert_link');

const origin = '../../data/files/52/D5/78/D8/0765C71026EF45C7F32809C2/Caderno_AC_2021-10-06_XIII_184.pdf';

describe('get converted PDF link', () => {
	it('return converted PDF link', () => {
	expect(convertLink(origin)).toEqual('https://portal.trf1.jus.br/data/files/52/D5/78/D8/0765C71026EF45C7F32809C2/Caderno_AC_2021-10-06_XIII_184.pdf');
	});
});