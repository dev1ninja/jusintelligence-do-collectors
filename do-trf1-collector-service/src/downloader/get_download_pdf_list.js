function getDownloadPdfList(message, all_pdf_list){
  var date_ini = Date.parse(message.date_ini);
  var date_end = Date.parse(message.date_end);
  var download_pdf_list = [];
  for(let i = date_ini; i <= date_end; i+=86400000){
    if(all_pdf_list[i] !== undefined){
      download_pdf_list.push(...all_pdf_list[i]);
    }
  }
  console.log('download pdf counts: ', download_pdf_list.length);
  return download_pdf_list;
}
module.exports = getDownloadPdfList;