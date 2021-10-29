function calcEveArg (date){
  const fixedEventArg = 7944; // 2021/10/01
  var date_ini = Date.parse('2021-10-01');
  var date_end = Date.parse(date);
  var diff = (date_end - date_ini) / 86400000;
  return 7944 + diff;
}
module.exports = calcEveArg;