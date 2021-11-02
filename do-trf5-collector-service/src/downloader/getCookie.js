function getCookie(response){
  const cookie = response['set-cookie'][0];
  const parseCookie = cookie.split(';')[0].split('=');
  return `${parseCookie[0].toLowerCase()}=${parseCookie[1]}`;
}

module.exports = getCookie;