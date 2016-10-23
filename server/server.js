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

function isDevelopment() {
    const env = getArg('--NODE_ENV')
    console.log('env', env, (env === 'development'))
    return env === 'development'
    //return process.env.NODE_ENV ? process.env.NODE_ENV.trim()==='production' : false;
}

const webdir = path.join(__dirname, isDevelopment()?'../build/development':'../build/production')

app.use(logger('dev'));
app.use(function (req, res, next) {
    // console.log('服务器重写:', req.url );
    // 能夠重写成功
    if (req.url.indexOf('.') === -1 && req.url.indexOf('__webpack_hmr') === -1) {
        req.url = '/index.html'
    }
    next();
    //404后处理, 要编译成本地文件才行
    if (!res.hasOwnProperty('statusCode') && !res.finished) {
        console.log('404捕获参数: ', res.hasOwnProperty('statusCode'), res.statusCode, ' url:', req.url)
        if (req.url.indexOf('/dist/dll/') === 0) {
            // try {
            //     const filename = path.join(webdir, req.url)
            //     const file = fs.readFileSync(filename, 'utf8')
            //     res.send(file)
            //     console.log(`发送重定向文件: ${filename}`)
            // } catch (err) {
            //     console.error('error: server.js', err)
            // }
        }
    }
})
//url重写支持http://127.0.0.1:3001/page1/tab2这种类型加载
//app.use(rewrite(/(^\/(\w+))+/, '/index.html'));
// app.use(rewrite(/^[^.]+$/, '/index.html'));
//app.use(rewrite('/page1', '/index.html'))


// app.get('*', function(req, res){
//     res.render('404.html', {
//         title: 'No Found'
//     })
// });
// app.use(function catchError(req, res, next, err) {
//     console.error('Caught error', err);
//     res.status(500).json({
//         error: err
//     });
// });
/**
 * 命令行传入参数格式: --ENV=devlopment
 * @param {string} argKey 参数名格式--ENV这种格式
 */
function getArg(argKey) {
    argKey = argKey.charAt(argKey.length-1) === '=' ? argKey : `${argKey}=`
    const argv = process.argv
    for (const item of argv) {
        // console.log('env', item, item.indexOf(argKey))
        if (item.indexOf(argKey) === 0) {
            return item.replace(argKey, '').trim()
        }
    }
    return 'development'
}

// 设想是进过静态目录过滤, 没有的交给动态生成去处理
app.use(express.static(webdir))
console.log(`网址静态目录: ${webdir}`)

if (isDevelopment()) {
    config.init('development')
    console.log('调试服务器插件启动{{')
    const webpackConfig = require('../config/webpack.config.js')
    const myConfig = Object.create(webpackConfig)
    //myConfig = webpackConfig;
    myConfig.devtool = 'eval';
    myConfig.debug = true;
    // console.log('myConfig=', myConfig);
    // console.log('webpackConfig=', webpackConfig);

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
    console.log('webdir:', webdir)
    console.log('publicPath:', myConfig.output.publicPath)
    //会自动用webpack构建到内存
    const compiler = webpack(myConfig);
    app.use(require('webpack-dev-middleware')(compiler, serverOptions))
    app.use(require('webpack-hot-middleware')(compiler));
    console.log('调试服务器插件启动}}')
}
app.listen(3001, function () {
  console.log('Server listening on http://localhost:3001, Ctrl+C to stop')
})
