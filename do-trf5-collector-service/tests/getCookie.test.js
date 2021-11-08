const getCookie = require('../src/downloader/getCookie');

const headers = {"date":"Mon, 08 Nov 2021 20:27:50 GMT","server":"Apache/2.4.6 (Red Hat Enterprise Linux) OpenSSL/1.0.2k-fips","set-cookie":["JSESSIONID=876F7C1AFD9644B6D6A7E3CC61268897; Path=/diarioeletinternet; Secure; HttpOnly"],"expires":"0","pragma":"no-cache","cache-control":"no-cache","content-type":"text/html;charset=ISO-8859-1","keep-alive":"timeout=5, max=100","connection":"Keep-Alive","transfer-encoding":"chunked"};

it('getCookie function test', () => {
  expect(getCookie(headers)).toEqual('jsessionid=876F7C1AFD9644B6D6A7E3CC61268897');
})