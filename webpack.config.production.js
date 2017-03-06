var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

  entry: {
    bundle: [ 'babel-polyfill', './src/index.js' ],
    // vendors: ['react', 'global', 'react-dom', 'react-router']
  },

  output: {
    path: path.join(__dirname, 'dist'),
    filename: './build.js',
    chunkFilename: "[id].chunk.js",
    publicPath: ''
  },

  plugins: [

    new webpack.optimize.DedupePlugin(),

    new webpack.optimize.OccurenceOrderPlugin(),

    new webpack.NoErrorsPlugin(),

    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),

    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }),

    new ExtractTextPlugin('app.[chunkhash:3].css', { allChunks: true }),

    // new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.[chunkhash:8].js'),

    new HtmlWebpackPlugin({
      title: '新城保理MS',
      filename: 'index.html',
      template: 'index.template.html',
      // favicon: path.join(__dirname, 'src', 'global', 'assets', 'images', 'favicon.ico')
    })
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!cssnext-loader')
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