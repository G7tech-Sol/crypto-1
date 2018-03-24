const bitcore= require("bitcore-lib");
// const binance = require('node-binance-api');
var i=0;

// binance.options(
// {
//   APIKEY: '<vmPUZE6mv9SD5VNHk4HlWFsOr6aKE2zvsw0MuIgwCIPy6utIco14y7Ju91duEh8A>',
//   APISECRET: '<NhqPtmdSJYdKjVHjA7PZj4Mge3R5YNiP1e3UZjInClVN65XAbvqqM6A7H5fATj0j>',
//   useServerTime: true,
//   test: true
// });
                                                                              // latest price of all COINS

// binance.prices((error, ticker) =>
// {
//   console.log("prices()", ticker);
//   console.log("Price of BTC: ", ticker.BTCUSDT);
// });
                                                                              // Complete WebSocket Chart Cache

// binance.websockets.chart("IOTABTC", "3m", (symbol, interval, chart) => {
//   let tick = binance.last(chart);
//   const last = chart[tick].close;
//   console.log(chart);
//   console.log(symbol+" last price: "+last)
// });
                                                                              // ASKS & BIDS of Any Coin

// binance.websockets.depthCache(['XMRBTC'], (symbol, depth) => {
//   let bids = binance.sortBids(depth.bids);
//   let asks = binance.sortAsks(depth.asks);
//   console.log(symbol+" depth cache update");
//   console.log("bids", bids);
//   console.log("asks", asks);
//   console.log("best bid: "+binance.first(bids));
//   console.log("best ask: "+binance.first(asks));
// });
                                                              // Periods: 1m,3m,5m,15m,30m,1h,2h,4h,6h,8h,12h,1d,3d,1w,1M

// binance.websockets.candlesticks(['BNBBTC'], "1m", (candlesticks) => {
//   let { e:eventType, E:eventTime, s:symbol, k:ticks } = candlesticks;
//   let { o:open, h:high, l:low, c:close, v:volume, n:trades, i:interval, x:isFinal, q:quoteVolume, V:buyVolume, Q:quoteBuyVolume } = ticks;
//   console.log(symbol+" "+interval+" candlestick update");
//   console.log("open: "+open);
//   console.log("high: "+high);
//   console.log("low: "+low);
//   console.log("close: "+close);
//   console.log("volume: "+volume);
//   console.log("isFinal: "+isFinal);
// });
                                                                              // TRADES of Any Coin

// binance.websockets.trades(['XMRBTC'], (trades) => {
//   let {e:eventType, E:eventTime, s:symbol, p:price, q:quantity, m:maker, a:tradeId} = trades;
//   console.log(symbol+" trade update. price: "+price+", quantity: "+quantity+", maker: "+maker);
// });
                                                                              // ASKS & BIDS of Any Coin4

// binance.websockets.miniTicker(markets =>
// {
//     console.log(markets.XMRBTC);
// });

exports.address=function (req,res)
{
  var brainsrc= "satoshi";
  var input= new Buffer(brainsrc);
  var hash= bitcore.crypto.Hash.sha256(input);
  var bn= bitcore.crypto.BN.fromBuffer(hash);
  var pk= new bitcore.PrivateKey(bn).toWIF();
  var addy= new bitcore.PrivateKey(bn).toAddress();
  res.json({ success: true, brainsrc: brainsrc, PrivateKey:pk});
}

exports.price=function (req,res)
{
  res.json({ success: true, message: "hhaha"});
}
