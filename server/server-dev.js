const express = require('express')
const rewrite = require('express-urlrewrite')
const path = require('path')
const webpack = require('webpack')
//var webpackDevMiddleware = require('webpack-dev-middleware')
const app = express()
const logger = require('morgan')
const fs = require('fs')
const opn = require('opn')
const proxy = require('http-proxy-middleware')
const config = require('../config/env.config.js')

const onFinished = require('on-finished')

/**
 * 开发使用
 */
// async function testt() {
//     return new Promise((reslove, reject) => {
//         setTimeout(() => {
//             console.log('async function =================================================11')
//             reslove(10)
//         }, 100)
//     })
// }

// async function testa() {
//     const ttasync = await testt()
//     console.log('async function =================================================22')
// }
// testa()

config.initPath('development')
process.env.NODE_ENV = 'development'
const webdir = config.OUT_PATH // path.join(__dirname, '../build/development')

app.use(logger('dev'));
/**
 * ajax跨域处理
 * chrome首页的url: http://localhost:3001
 * chrome接口的url: http://127.0.0.1:3001
 */
app.use(function(req, res, next) {
    console.log('访问的url: ', req.url)
    // console.error('method:', req.method)
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001')
    if (req.method === 'OPTIONS') {
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS')
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept, X-Requested-With')
        res.setHeader('Access-Control-Allow-Credentials', true)
        res.end()
    } else if (req.method === 'POST') {
        res.setHeader('Access-Control-Allow-Credentials', true)
        next()
    } else {
        next()
    }
})

/**
 * 反向代理
 * 这里可以配置哪些url走服务器接口, 哪些走本地mock, 或者伙伴的机器
 */
function proxyFunc(req, res, next) {
    // 参考: https://github.com/chimurai/http-proxy-middleware
    delete require.cache[require.resolve('./proxy-list.js')];
    return proxy({
        // target: 'http://127.0.0.1:3001', // 这里是要反向代理的api域名
        target: 'http://localhost:3018', // 这里是要反向代理的api域名
        changeOrigin: true,
        // toProxy: false,
        // prependPath: false,
        // ignorePath: true,
        pathRewrite: require('./proxy-list.js').pathRewrite, // 这个模式比较好, 能动态配置, js文件内可以写注释
        router: require('./proxy-list.js').router,
        // pathRewrite: JSON.parse(fs.readFileSync(path.join(__dirname, 'proxy-list.json'), 'utf8')),
        // router: {
        //     // when request.headers.host == 'dev.localhost:3000',
        //     // override target 'http://www.example.org' to 'http://localhost:8000'
        //     'dev.localhost:3000'         : 'http://localhost:8000',
        //     'integration.localhost:3000' : 'http://localhost:8001',    // host only
        //     'staging.localhost:3000'     : 'http://localhost:8002',    // host only
        //     'localhost:3000/api'         : 'http://localhost:8003',    // host + path
        //     '/rest'                      : 'http://localhost:8004',    // path only
        //     '/api/com/ogoodo/qryList.do' : 'http://localhost:3001/mock/com/ogoodo/test-proxy.do',
        // },
        onError(err, req2, res2) {
            res2.writeHead(500, {
                'Content-Type': 'application/json'
            });
            const json = { code: 444, msg: '反向代理错误, 有可能是代理的域名不能访问' }
            // res2.json(json) // 这样发送回报错
            res2.end(JSON.stringify(json))
        }
    })(req, res, next)
}
// app.use('/mock', proxy({ target: 'http://localhost:3001' }))
app.use('/api', function(req, res, next) {
    console.log('req.headers.host: ', req.headers.host)
    console.log('req.headers.referer: ', req.headers.referer)
    console.log('req.headers.origin: ', req.headers.origin)
    // console.log('req: ', req)
    if (!req.headers.origin) {
        console.log('使用反向代理(浏览器直接访问接口url): ', req.url)
        proxyFunc(req, res, next)
    } else if (req.headers.origin.indexOf(req.headers.host) >= 0) {
        console.log('使用反向代理(接口和宿主url域名一致): ', req.url)
        proxyFunc(req, res, next)
    } else {
        console.log('使用反向代理(接口和页面域名不一致): ', req.url)
        proxyFunc(req, res, next)
        // console.log('跳过反向代理: ', req.url)
        // next()
    }
})

// /**
//  * 本地mock数据
//  */
// app.use('/mock', function(req, res, next) {
//     console.log(`进入app.use('/mack')分支(${req.method}): ${req.url}`)
//     try {
//         const filename = path.join(config.ROOT_PATH, 'mock', req.url)
//         if (fs.existsSync(filename)) {
//             const doc = fs.readFileSync(filename, 'utf8')
//             // res.setHeader('Content-Type', 'application/json')
//             res.contentType('application/json')
//             // res.json({ file2:12 })
//             res.json(JSON.parse(doc))
//             console.log(`发送重定向mock文件: ${filename}`)
//             console.log(`发送重定向mock内容: ${doc}`)
//         } else {
//             console.log(`无mock文件: ${filename}`)
//         }
//     } catch (err) {
//         console.error('\r\n\r\n error: server-dev.js', err)
//     }
//     res.end()
// })
app.use(function (req, res, next) {
    // 能夠重写成功
    if (req.url.indexOf('.') === -1 &&
        req.url.indexOf('__webpack_hmr') === -1 &&
        req.url.indexOf('/mock/') === -1 // mock数据
        ) {
        console.log('重定向的url:', req.url)
        req.url = '/index.html'
    } else {
        console.log('没有重定向的url:', req.url)
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
                if (fs.existsSync(filename)) {
                    const doc = fs.readFileSync(filename, 'utf8')
                    res.send(doc)
                    console.log(`发送重定向文件: ${filename}`)
                }
            } catch (err) {
                console.error('\r\n\r\n error: server-dev.js', err)
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
  console.log('http://127.0.0.1:3001/config  里可以管理mock数据')
  opn('http://localhost:3001/admin/test/testa')
})


/**
 * 发送接口数据
 */
function sendProxyApi(req, res, next) {
    console.log(`进入app.use('/mack')分支(${req.method}): ${req.url}`)
    try {
        const filename = path.join(config.ROOT_PATH, 'mock', req.url)
        if (fs.existsSync(filename)) {
            const doc = fs.readFileSync(filename, 'utf8')
            // res.setHeader('Content-Type', 'application/json')
            res.contentType('application/json')
            // res.json({ file2:12 })
            const json = JSON.parse(doc)
            json.__proxyMsg__ = {
                proxyUrl: `[${req.method}]${req.headers.host}${req.originalUrl}`,
            }
            res.json(json)
            console.log(`发送重定向mock文件: ${filename}`)
            console.log(`发送重定向mock内容: ${doc}`)
            return true;
        } else {
            console.log(`无mock文件: ${filename}`)
        }
    } catch (err) {
        console.error('\r\n\r\n error: server-dev.js', err)
    }
    return false;
    // res.end()
}

const appApiA = express()
appApiA.use(logger('dev-api11'));
appApiA.use('/mock/', function(req, res, next) {
    console.log('DEV-API11访问的url: ', req.url)
    const b = sendProxyApi(req, res, next)
    if (!b) {
        next()
    }
})
appApiA.use(function(req, res, next) {
    res.contentType('application/json')
    res.json({ code: 444, msg: '本地无此代理' })
})
appApiA.listen(3011, function () {
  console.log('API Server listening on http://localhost:3011, Ctrl+C to stop')
})

const appApiB = express()
appApiB.use(logger('dev-api12'));
appApiB.use('/mock/', function(req, res, next) {
    console.log('DEV-API12访问的url: ', req.url)
    const b = sendProxyApi(req, res, next)
    if (!b) {
        next()
    }
})
appApiB.use(function(req, res, next) {
    res.contentType('application/json')
    res.json({ code: 444, msg: '本地无此代理' })
})
appApiB.listen(3012, function () {
  console.log('API Server listening on http://localhost:3011, Ctrl+C to stop')
})

