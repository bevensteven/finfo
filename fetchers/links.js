
// define url links here
const robintrackUrl = 'https://robintrack.net/symbol/';
const finvizUrl = 'https://finviz.com/quote.ashx?t=';

module.exports = (ticker) => {
  return {
    "Robintrack": robintrackUrl + ticker,
    "FinViz": finvizUrl + ticker,
  }
}
