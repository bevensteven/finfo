var express = require("express");
var router = express.Router();

const yahoo = require("../fetchers/yahoo");
const zacks = require("../fetchers/zacks");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/search", async function (req, res, next) {
  const ticker = req.query.ticker.toUpperCase();

  // fetch data
  const [yahooData, zacksData] = await Promise.all([
    yahoo.fetchData(ticker),
    zacks.fetchData(ticker),
  ]);

  res.render("results", {
    ticker,
    zacksData,
    yahooData
  });
});

module.exports = router;
