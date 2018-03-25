const express=require("express");
const bodyParser= require("body-parser");
const mongoose= require("mongoose");
const path = require('path');
const cors= require('cors');
const binance = require('node-binance-api');
const http = require('http');
const socket = require('socket.io');

const routes= require("./routes/route.js");

const app= express();

                                                                    // DATABASE CONNECTION
mongoose.connect("mongodb://admin:admin@ds211558.mlab.com:11558/an");
mongoose.Promise=global.Promise;
                                                                        // Middleware
app.use(cors(
{
  origin: 'http://localhost:4200'
}))

var server = app.listen(process.env.port||3000,function ()
{
  console.log("*you are listeninig for request*");
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use('/api', routes);
var io = socket(server);
var clients = {};

binance.options(
{
  APIKEY: '<vmPUZE6mv9SD5VNHk4HlWFsOr6aKE2zvsw0MuIgwCIPy6utIco14y7Ju91duEh8A>',
  APISECRET: '<NhqPtmdSJYdKjVHjA7PZj4Mge3R5YNiP1e3UZjInClVN65XAbvqqM6A7H5fATj0j>',
  useServerTime: true,
  test: true
});

io.on('connection', function(socket)
{
  socket.on('add-message', function()
  {
    console.log("dassa");
    binance.websockets.candlesticks(['BNBBTC'], "1m", (candlesticks) =>
    {
      let { e:eventType, E:eventTime, s:symbol, k:ticks } = candlesticks;
      let { o:open, h:high, l:low, c:close, v:volume, n:trades, i:interval, x:isFinal, q:quoteVolume, V:buyVolume, Q:quoteBuyVolume } = ticks;
      console.log(symbol+" "+interval+" candlestick update");
      console.log("open: "+open);
      console.log("high: "+high);
      console.log("low: "+low);
      console.log("close: "+close);
      console.log("volume: "+volume);
      console.log("isFinal: "+isFinal);
      io.sockets.emit("price",{ type: 'new-message', open:open, high:high, low:low, close:close, volume:volume, isFinal:isFinal });
    });
  });
});

app.get('*', (req, res) =>
{
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.use(function (err,req,res,next)
{
  res.status(422).send({error: err.message});
});

process.env.jwtsecret = '$2a$06$GXmQiERBvYRGD91bIJLWRO2m4WGUpj7IRuSuve3pZ3B5rRtLIzm2G';
