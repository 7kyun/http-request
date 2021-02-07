// 创建应用示例
const express = require('express')
const app = express()

const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackConfig = require('./webpack.config')
const compiler = webpack(webpackConfig) // 生成 预编译缓存
// 调用 compiler 中间件
app.use(webpackDevMiddleware(compiler, {
  publicPath: '/_build_/',
  stats: {
    colors: true,
    chunks: false
  }
}))
app.use(webpackHotMiddleware(compiler))

app.use(express.static(__dirname))

const bodyParser = require("body-parser")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const port = process.env.PORT || 7826
module.exports = app.listen(port, () => {
  console.log(`Serve listening on http://localhost:${port}, Ctrl + C to stop`)
})

// 路由
let router = express.Router()
router.get('/simple/get', (req, res) => {
  res.json({
    code: 200,
    msg: '成功'
  })
})
router.get('/base/get', (req, res) => {
  res.json(req.query)
})

// 路由监听
app.use(router)