// 创建应用示例
const express = require('express')
const app = express()

const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackConfig = require('./webpack.config')
const compiler = webpack(webpackConfig) // 生成 预编译缓存
// 调用 compiler 中间件
app.use(
  webpackDevMiddleware(compiler, {
    publicPath: '/_build_/',
    stats: {
      colors: true,
      chunks: false
    }
  })
)
app.use(webpackHotMiddleware(compiler))

app.use(express.static(__dirname))

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const port = process.env.PORT || 7826
module.exports = app.listen(port, () => {
  console.log(`Serve listening on http://localhost:${port}, Ctrl + C to stop`)
})

// 路由
let router = express.Router()
/**
 * Simple
 */
router.get('/simple/get', (req, res) => {
  res.json({
    code: 200,
    msg: '成功'
  })
})
/**
 * base
 */
router.get('/base/get', (req, res) => {
  res.json(req.query)
})
router.post('/base/post', (req, res) => {
  res.json(req.body)
})
router.post('/base/buffer', (req, res) => {
  let msg = []
  // 监听数据传输
  req.on('data', chunk => {
    if (chunk) {
      msg.push(chunk)
    }
  })
  // 监听数据传输结束
  req.on('end', () => {
    let buf = Buffer.concat(msg)
    res.json(buf.toJSON())
  })
})
/**
 * Error
 */
router.get('/error/get', (req, res) => {
  if (Math.random() > 0.5) {
    res.json({ msg: '成功' })
  } else {
    res.status(500)
    res.end()
  }
})
router.get('/error/timeout', (req, res) => {
  setTimeout(() => {
    res.json({ msg: '成功' })
  }, 3000)
})
/**
 * Extend
 */
router.get('/extend/get', (req, res) => {
  res.json({ msg: 'This is "extend get"' })
})
router.options('/extend/options', (req, res) => {
  res.json({ msg: 'This is "extend options"' })
})
router.delete('/extend/delete', (req, res) => {
  res.json({ msg: 'This is "extend delete"' })
})
router.head('/extend/head', (req, res) => {
  res.end()
})
router.post('/extend/post', (req, res) => {
  res.json(req.body)
})
router.put('/extend/put', (req, res) => {
  res.json(req.body)
})
router.patch('/extend/patch', (req, res) => {
  res.json(req.body)
})
router.get('/extend/user', (req, res) => {
  res.json({
    code: 0,
    msg: '成功',
    data: {
      name: 'Kyun',
      age: 18
    }
  })
})
/**
 * Interceptor
 */
router.get('/interceptor/get', (req, res) => {
  res.send('hello')
})
/**
 * Config
 */
router.post('/config/post', (req, res) => {
  res.json(req.body)
})

// 路由监听
app.use(router)
