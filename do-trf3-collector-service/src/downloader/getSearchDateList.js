function getSearchDateList(message, allDateList){
  var parsed_ini = message.date_ini.split('-');
  var parsed_end = message.date_end.split('-');
  var month_ini = `${parsed_ini[0]}-${parsed_ini[1]}`;
  var month_end = `${parsed_end[0]}-${parsed_end[1]}`;
  var index_ini;
  var index_end;
  var searchDateList = [];
  for(let i = 0; i < allDateList.length; i++){
    if(allDateList[i].includes(month_ini)){
      index_end = i;
    } 
    if(allDateList[i].includes(month_end)){
      index_ini = i;
    }
  }
  console.log("index_ini: ", index_ini);
  console.log("index_end: ", index_end);
  if(index_end === index_ini){
    searchDateList.push(allDateList[index_end]);
    return searchDateList;
  }
  if(index_ini > index_end || index_ini === undefined || index_end === undefined){
    console.log('You seems type wrong search value. Please try again with new search value.')
    return ;
  }
  for(let index = index_ini; index <= index_end; index++){
    searchDateList.push(allDateList[index]);
  }
  return searchDateList;
}
module.exports = getSearchDateList;
