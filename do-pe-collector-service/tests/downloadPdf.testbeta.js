const downloadPdf = require('../src/downloader/download-pdf');
const fs = require('fs');

describe('download test', () => {
    it('download test', async () => {
      const testLink = `https://tucujuris.tjap.jus.br/api/publico/download-diario?id=3346&numeroDiario=2021000182&captcha=null`;
      const destDir = './test';
      if(!fs.existsSync(destDir)){
        fs.mkdirSync(destDir);
      }
      await downloadPdf(testLink, destDir);
      const expectFileName = 'tjapDJE2021000182.pdf';
      expect(fs.existsSync(`./test/tjapDJE2021000182.pdf`)).toBe(true);
    }, 20000)
})