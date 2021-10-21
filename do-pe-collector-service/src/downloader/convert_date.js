function convertDate(date) {
    var splitDate = date.split('-');
    var newDate = `${splitDate[2]}/${splitDate[1]}/${splitDate[0]}`;
    return newDate;
}
module.exports = convertDate;