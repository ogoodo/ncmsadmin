const express = require('express')
const compression = require('compression')
const path = require('path')
const app = express()
const logger = require('morgan')
const program = require('commander')
const config = require('../config/env.config.js')


program
    .version('0.0.1')
    .usage('[options] [value ...]')
    .option('--NODE_ENV, --nodeEnv <string>', 'a string argument')
    .parse(process.argv) // 解析commandline arguments

console.log('命令行参数*****************:')
console.log('  NODE_ENV:', program.nodeEnv)

config.initPath(program.nodeEnv)
const webdir = config.OUT_PATH

app.use(logger('production'))
app.use(compression())
app.use(function (req, res, next) {
    // 能夠重写成功
    if (req.url.indexOf('.') === -1 && req.url.indexOf('__webpack_hmr') === -1) {
        req.url = '/index.html'
    }
    next();
})

// 设想是进过静态目录过滤, 没有的交给动态生成去处理
app.use(express.static(webdir))
console.log(`网址静态目录: ${webdir}`)

app.listen(3001, function () {
  console.log('Server listening on http://localhost:3001, Ctrl+C to stop')
})
