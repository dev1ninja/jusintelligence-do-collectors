function convertDate(date){
  const parseDate = date.split('-');
  return `${parseDate[2]}/${parseDate[1]}/${parseDate[0]}`;
}

module.exports = convertDate;