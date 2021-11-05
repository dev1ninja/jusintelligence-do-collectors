const getSearchDateList = require('../src/downloader/getSearchDateList');

const message = '{"search": "something", "date_ini": "2021-09-28", "date_end": "2021-10-01"}';
const allDatelist = ['http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2021-11-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2021-10-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2021-09-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2021-08-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2021-07-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2021-06-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2021-05-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2021-04-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2021-03-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2021-02-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2021-01-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2020-12-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2020-11-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2020-10-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2020-09-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2020-08-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2020-07-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2020-06-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2020-05-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2020-04-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2020-03-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2020-02-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2020-01-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2019-12-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2019-11-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2019-10-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2019-09-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2019-08-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2019-07-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2019-06-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2019-05-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2019-04-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2019-03-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2019-02-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2019-01-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2018-12-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2018-11-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2018-10-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2018-09-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2018-08-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2018-07-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2018-06-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2018-05-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2018-04-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2018-03-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2018-02-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2018-01-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2017-12-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2017-11-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2017-10-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2017-09-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2017-08-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2017-07-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2017-06-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2017-05-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2017-04-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2017-03-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2017-02-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2017-01-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2016-12-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2016-11-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2016-10-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2016-09-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2016-08-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2016-07-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2016-06-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2016-05-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2016-04-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2016-03-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2016-02-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2016-01-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2015-12-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2015-11-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2015-10-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2015-09-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2015-08-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2015-07-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2015-06-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2015-05-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2015-04-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2015-03-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2015-02-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2015-01-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2014-12-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2014-11-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2014-10-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2014-09-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2014-08-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2014-07-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2014-06-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2014-05-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2014-04-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2014-03-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2014-02-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2014-01-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2013-12-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2013-11-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2013-10-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2013-09-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2013-08-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2013-07-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2013-06-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2013-05-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2013-04-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2013-03-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2013-02-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2013-01-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2012-12-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2012-11-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2012-10-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2012-09-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2012-08-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2012-07-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2012-06-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2012-05-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2012-04-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2012-03-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2012-02-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2012-01-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2011-12-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2011-11-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2011-10-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2011-09-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2011-08-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2011-07-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2011-06-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2011-05-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2011-04-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2011-03-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2011-02-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2011-01-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2010-12-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2010-11-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2010-10-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2010-09-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2010-08-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2010-07-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2010-06-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2010-05-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2010-04-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2010-03-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2010-02-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2010-01-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2009-12-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2009-11-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2009-10-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2009-09-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2009-08-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2009-07-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2009-06-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2009-05-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2009-04-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2009-03-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2009-02-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2009-01-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2008-12-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2008-11-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2008-10-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2008-09-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2008-08-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2008-07-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2008-06-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2008-05-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2008-04-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2008-03-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2008-02-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2008-01-01','http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2007-12-01']

const result = [
  'http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2021-10-01',
  'http://web.trf3.jus.br/diario/Consulta/PublicacoesAnteriores/2021-09-01'
]

it('Return Search Date List', () => {
  expect(getSearchDateList(JSON.parse(message), allDatelist)).toEqual(result)
})