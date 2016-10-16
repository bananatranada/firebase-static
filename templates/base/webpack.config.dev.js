var path = require('path')
var webpack = require('webpack')
var autoprefixer = require('autoprefixer')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin')

var config = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    'babel-polyfill',
    './app/app'
  ],
  output: {
    path: path.resolve('./public'), // bundle.js location
    publicPath: '/', // when using require(), url() or src, loaders?, etc webpack transforms the path to /public/.
    filename: 'bundle.js'   // it may be /public/dist/img/.. as configured by loaders
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"'
    }),
    new HtmlWebpackPlugin({
      title: 'My App',
      template: 'app/templates/index.ejs',
      filename: 'index.html',
      alwaysWriteToDisk: true,
    }),
    new HtmlWebpackHarddiskPlugin(),
  ],
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel',
        include: [
          path.resolve(__dirname, 'app/')
        ]
      },
      { test: /\.css$/,           loader: 'style!css!postcss' },
      { test: /\.json$/,          loader: 'json' },
      { test: /\.(jpg|jpeg)$/,    loader: `url?limit=10000&mimetype=image/jpeg&name=img/[name].[ext]` },
      { test: /\.png$/,           loader: `url?limit=10000&mimetype=image/png&name=img/[name].[ext]` },
      { test: /\.svg$/,           loader: 'url?limit=10000&mimetype=image/svg+xml&name=fonts/[name].[ext]' },
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