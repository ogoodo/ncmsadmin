const express = require('express')
const rewrite = require('express-urlrewrite')
const path = require('path')
const webpack = require('webpack')
//var webpackDevMiddleware = require('webpack-dev-middleware')
const app = express()
const logger = require('morgan')
const fs = require('fs')
const config = require('../config/env.config.js')

const onFinished = require('on-finished')

/**
 * 开发使用
 */

config.initPath('development')
const webdir = config.OUT_PATH // path.join(__dirname, '../build/development')

app.use(logger('dev'));
app.use(function (req, res, next) {
    // 能夠重写成功
    if (req.url.indexOf('.') === -1 && req.url.indexOf('__webpack_hmr') === -1) {
        req.url = '/index.html'
    }
    next();
    //404后处理, 要编译成本地文件才行
    // res.hasOwnProperty('statusCode') 这个能判断是否url处理成功
    if (!res.hasOwnProperty('statusCode') && !res.finished) {
        console.log('404捕获参数: ', res.hasOwnProperty('statusCode'), res.statusCode, res.finished, ' url:', req.url)
        if (req.url.indexOf('/dist/dll/') === 0 ||
            req.url.indexOf('/font/iconfont/') === 0
        ) {
            try {
                const filename = path.join(webdir, req.url)
                const file = fs.readFileSync(filename, 'utf8')
                res.send(file)
                console.log(`发送重定向文件: ${filename}`)
            } catch (err) {
                console.error('error: server-dev.js', err)
            }
        }
    } else {
        console.log('200捕获参数: ', res.hasOwnProperty('statusCode'), res.statusCode, res.finished, ' url:', req.url)
    }
})
//url重写支持http://127.0.0.1:3001/page1/tab2这种类型加载
//app.use(rewrite(/(^\/(\w+))+/, '/index.html'));
// app.use(rewrite(/^[^.]+$/, '/index.html'));
//app.use(rewrite('/page1', '/index.html'))


console.log('调试服务器插件启动{{')
const webpackConfig = require('../config/webpack.config.js')
const myConfig = Object.create(webpackConfig)
myConfig.devtool = 'eval'
myConfig.debug = true

const serverOptions = {
    //contentBase: 'http://' + host + ':' + port,
    // quiet: true, //关掉输出的一堆信息, 但是eslint检测报告也关掉了
    // noInfo: true,
    // hot: true,
    // inline: true,
    // lazy: false,
    //publicPath: '/build/dist/',
    publicPath:  myConfig.output.publicPath,
    headers: { 'Access-Control-Allow-Origin': '*' },
    stats: { colors: true }
}
//会自动用webpack构建到内存
const compiler = webpack(myConfig);
app.use(require('webpack-dev-middleware')(compiler, serverOptions))
app.use(require('webpack-hot-middleware')(compiler));
console.log('调试服务器插件启动}}')

app.listen(3001, function () {
  console.log('Server listening on http://localhost:3001, Ctrl+C to stop')
})
