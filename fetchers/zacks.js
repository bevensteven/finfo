const axios = require("axios");
const cheerio = require("cheerio");

const url = "https://www.zacks.com/stock/quote/";

// Key Earnings Data
// Zacks Rank
// Style Scores

exports.fetchData = async (ticker) => {
  let response = await axios(url + ticker);

  // TODO: handle "no response" pages
  const $ = cheerio.load(response.data);

  const keyEarningsData = $("#stock_key_earnings")
    .find("tr")
    .map(function (i, el) {
      let val = $(this).text();
      return $(this).text();
    })
    .get()
    .map((v) =>
      v
        .split("\n")
        .map((v) => v.trim())
        .filter((v) => v.length > 0)
    )
    .reduce((o, [k, v]) => {
      o[k] = v;
      return o;
    }, {});

  const zacksRank = $("div.zr_rankbox > p.rank_view")
    .first()
    .text()
    .trim()
    .split(" ")
    .filter((w) => w.trim().length > 0);
  const styleScores = $("div.zr_rankbox.composite_group > p.rank_view")
    .text()
    .trim()
    .split(" | ")
    .map((v) => v.split(String.fromCharCode(160)))
    .reduce((o, [v, k]) => {
      o[k] = v;
      return o;
    }, {});
  const industryRank = $("div.zr_rankbox.industry_rank > p.rank_view")
    .text()
    .trim()
    .split("  ")
    .filter((w) => w.length > 0);

  const result = {
    zacksRank,
    styleScores,
    industryRank,
    keyEarningsData,
  };
  console.log(result);
  return result;
};
