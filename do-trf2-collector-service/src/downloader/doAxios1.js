const axios = require('axios');

function doAxios(config) {
  return new Promise(function (resolve, reject) {
    axios(config)
    .then(response => {
      resolve(response);
    })
    .catch(error => {
      reject(error);
    })
  });
}

module.exports = doAxios;