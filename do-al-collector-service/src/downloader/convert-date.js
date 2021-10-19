function convertDate(date){
  const formatDate = new Date(date);
  return `${formatDate.getDate()+1}/${formatDate.getMonth()+1}/${formatDate.getFullYear()}`;
}

module.exports = convertDate;