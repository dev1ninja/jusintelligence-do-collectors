const downloadPdf = require('../src/downloader/download-pdf');
const fs = require('fs');

describe('download test', () => {
  it('download test', async () => {
    const testLink = `https://portal.trf1.jus.br/data/files/52/D5/78/D8/0765C71026EF45C7F32809C2/Caderno_AC_2021-10-06_XIII_184.pdf`;
    const destDir = './test';
    if(!fs.existsSync(destDir)){
      fs.mkdirSync(destDir);
    }
    await downloadPdf(testLink, destDir);
    expect(fs.existsSync(`./test/Caderno_AC_2021-10-06_XIII_184.pdf`)).toBe(true);
  }, 20000)
})