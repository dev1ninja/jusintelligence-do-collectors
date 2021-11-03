const mockAxios = require('jest-mock-axios').default;
const doAxios = require('../src/downloader/doAxios');

it('mock test', async () => {
  
  const response = {
    'lalala': 'lalalalla',
    'config': {},
    'headers': {},
    'status': 200,
    'statusText': 'OK',
  }

  const promise = doAxios();

  expect(mockAxios.get).toHaveBeenCalledWith();

  mockAxios.mockResponse(response);
  const result = await promise;
  expect(result).toEqual(response)
})