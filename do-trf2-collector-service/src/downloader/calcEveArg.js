function calcEveArg (date){
  const fixedEventArg = 7944; // 2021/10/01

  var date1 = new Date("2021-10-01");
  var date2 = new Date(date);
  date2.setUTCHours(0,0,0,0)
    
  var Difference_In_Time = date2.getTime() - date1.getTime();
    
  var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

  // var date_ini = Date.parse('2021-10-01');
  // var date_end = Date.parse(date);
  // var diff = (date_end - date_ini) / 86400000;
  console.log(date1, date2)
  console.log(date, ':', 7944 + Difference_In_Days)
  return fixedEventArg + Difference_In_Days;
}
module.exports = calcEveArg;