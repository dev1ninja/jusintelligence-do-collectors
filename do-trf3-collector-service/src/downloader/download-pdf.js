const { DownloaderHelper } = require('node-downloader-helper');

function downloadPdf(pdfLink, dest_dir) {
  console.log(pdfLink)
  return new Promise((resolve, reject) => {
    var pdf = new DownloaderHelper(pdfLink, dest_dir, {
      override: true
    });
    pdf.on('end', () => resolve());
    pdf.start();
  });
}

module.exports = downloadPdf;