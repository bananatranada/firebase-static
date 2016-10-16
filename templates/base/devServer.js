import 'babel-polyfill'
import path from 'path'

import express from 'express'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackConfigDev from './webpack.config.dev'

const app = express()
const port = 3000
// SPA's don't need 404
// app.use(webpackDevMiddleware(webpack(webpackConfigDev), {
//     noInfo: true,
//     publicPath: webpackConfigDev.output.publicPath,
// }))
const compiler = webpack(webpackConfigDev)
app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: webpackConfigDev.output.publicPath
}))
app.use(webpackHotMiddleware(compiler))

// static middleware allows access to a directory from a path.
// this is required because we're not explicitly listening to
// such routes
app.use(express.static(path.join(__dirname, 'public')))

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'public/index.html'))
})

app.listen(port, function () {
    console.log(`firebase-static listening on port ${port}`)
})