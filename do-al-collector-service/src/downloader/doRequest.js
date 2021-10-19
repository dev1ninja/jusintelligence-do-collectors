const request = require('request');

function doRequest(options) {
  return new Promise(function (resolve, reject) {
    request(options, function (error, res) {
      if (!error && res.statusCode == 200) {
        resolve(res);
      } else {
        reject(error);
      }
    });
  });
}

module.exports = doRequest;