const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://finance.yahoo.com/calendar/earnings?symbol=';

// TODO: think about pagination

exports.fetchData = async (ticker) => {
  let response = await axios(url + ticker);

  const $ = cheerio.load(response.data);
  const earningsTable = $('#fin-cal-table').find('tr');

  let earningsReports = [];
  earningsTable.each(function () {
    const date = $(this).find("td[aria-label='Earnings Date']").text();
    const est = $(this).find("td[aria-label='EPS Estimate']").text();
    const reported = $(this).find("td[aria-label='Reported EPS']").text();
    const surprise = $(this).find("td[aria-label='Surprise(%)']").text();

    if (date) {
      earningsReports.push({
        date,
        est,
        reported,
        surprise
      });
    }
  });

  console.log(earningsReports);
  return earningsReports;
}
