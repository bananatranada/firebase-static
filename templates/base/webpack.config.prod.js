var path = require('path')
var webpack = require('webpack')
var autoprefixer = require('autoprefixer')
var ExtractTextPlugin = require("extract-text-webpack-plugin")

var config = {
  devtool: 'source-map',
  entry: [
    'babel-polyfill',
    './app/app',
  ],
  output: {
    path: path.resolve('./public/dist'), // not just for bundle.js, but for outputs of loaders as well
    publicPath: '/dist/', // it's NOT the public dir. it's just to prefix when require(), url(), src
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new ExtractTextPlugin('assets/css/main.css'),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        include: [
          path.resolve(__dirname, 'src')
        ]
      },
      { test: /\.css$/,           loader: ExtractTextPlugin.extract('style', 'css', 'postcss') },
      { test: /\.json$/,          loader: 'json' },
      { test: /\.(jpg|jpeg)$/,    loader: `url?limit=10000&mimetype=image/jpeg&name=img/[name].[ext]` },
      { test: /\.png$/,           loader: `url?limit=10000&mimetype=image/png&name=img/[name].[ext]` },
      { test: /\.svg$/,           loader: 'url?limit=10000&mimetype=image/svg+xml&name=../fonts/[name].[ext]' },
      { test: /\.woff$/,          loader: 'url?limit=10000&mimetype=application/x-font-woff&name=fonts/[name].[ext]' },
      { test: /\.woff2$/,         loader: 'url?limit=10000&mimetype=font/woff2&name=fonts/[name].[ext]' },
      { test: /\.ttf$/,           loader: 'url?limit=10000&mimetype=application/x-font-ttf&name=fonts/[name].[ext]' },
      { test: /\.eot$/,           loader: 'url?limit=10000&mimetype=application/vnd.ms-fontobject&name=fonts/[name].[ext]' },
      { test: /\.mp4$/,           loader: 'file?mimetype=video/mp4&name=vids/[name].[ext]' },
    ]
  },
  postcss: [ autoprefixer() ],
}

module.exports = config