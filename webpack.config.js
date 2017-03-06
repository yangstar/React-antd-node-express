var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

  devtool: 'eval-source-map',

  entry: [
    'babel-polyfill',
    'webpack-hot-middleware/client',
    './src/index.js'
  ],
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, './build'),

  },

  plugins: [

    new webpack.HotModuleReplacementPlugin(),

    new webpack.NoErrorsPlugin(),

    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      },
      '__DEVTOOLS__': process.env.DEVTOOLS === 'true' ? true : false
    }),

    new HtmlWebpackPlugin({
      title: '模板系统',
      filename: 'index.html',
      template: 'index.template.html',
      // favicon: path.join(__dirname, 'src', 'global', 'assets', 'images', 'favicon.ico')
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader!cssnext-loader'
      },
      {
        test: /\.(jpe?g|png)$/,
        loader: 'url-loader?limit=20000',
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  }
};
