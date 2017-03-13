var path = require('path');
var express = require('express');
var webpack = require('webpack');
var proxy = require('http-proxy-middleware');
var open = require('open');
var config = require('./webpack.config');
var app = express();
var compiler = webpack(config);
var host = require('ip').address() || 'localhost';
var port = 3001;

var hostProxy = proxy({

  // target: 'http://10.10.2.178:8080',
   //target: 'http://10.10.1.80:8090',
  //target: 'http://yf2z.rap.rdjry.com/mockjsdata/3',
  target: 'http://localhost',
  changeOrigin: true,
  logLevel: 'debug'
});

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
  hot: true,
  stats: { colors: true }
}));

app.use(require('webpack-hot-middleware')(compiler));

// 通常用于加载静态资源
app.use(express.static(__dirname + '/build'))


app.get('*', function (req, res) {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

app.use('*', hostProxy);

app.listen(port, host, function (err) {
  if (err) {
    console.error(err);
    return;
  }
  var url = ['http://', host, ':', port ].join('');
  open(url);
  console.log('Listening at ', url);

});

