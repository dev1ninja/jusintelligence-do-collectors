function compareMonth(date_cur, date_ini) {
  var cur_date = date_cur.split('-');
  var ini_date = date_ini.split('-');
  console.log(`${cur_date[0]}-${cur_date[1]}`, ':', `${ini_date[0]}-${ini_date[1]}`)
  if(`${cur_date[0]}-${cur_date[1]}` == `${ini_date[0]}-${parseInt(ini_date[1])}`){
    return true;
  }
  return false;
}
module.exports = compareMonth;