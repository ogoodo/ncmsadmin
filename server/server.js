var express = require('express')
var rewrite = require('express-urlrewrite')
var path = require('path')
var webpack = require('webpack')
//var webpackDevMiddleware = require('webpack-dev-middleware')
var app = express()
var logger = require('morgan');
var fs=require("fs");

var onFinished = require('on-finished')
app.use(logger('dev'));
app.use(function(req, res, next){
    // console.log('服务器重写:', req.url );
    // 能夠重写成功
    if(req.url.indexOf('.')===-1 && req.url.indexOf('__webpack_hmr')===-1){
        req.url = '/index.html'
    }
    next();
    // //404后处理, 要编译成本地文件才行
    // if(!res.hasOwnProperty('statusCode') && !res.finished ){
    //     console.log('服务器重写2:', res.hasOwnProperty('statusCode'), res.statusCode, ' url:', req.url );
    //     try{
    //         var fff = path.join(process.cwd(), './build/index.html')
    //         var file = fs.readFileSync(fff, "utf8")
    //         res.send(file)
    //     }catch(err){
    //         console.error('server.js', err)
    //     }
    // }
});
//url重写支持http://127.0.0.1:3001/page1/tab2这种类型加载
//app.use(rewrite(/(^\/(\w+))+/, '/index.html'));
// app.use(rewrite(/^[^.]+$/, '/index.html'));
//app.use(rewrite('/page1', '/index.html'))

app.use(express.static(path.join(__dirname, '../build')))

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
const isDevelopment = function () {
    return process.env.NODE_ENV ? process.env.NODE_ENV.trim()==='development' : false;
    //return process.env.NODE_ENV ? process.env.NODE_ENV.trim()==='production' : false;
};

if(isDevelopment()){
    console.log('调试服务器插件启动{{')
    var webpackConfig = require('../config/webpack.config.js')
    var myConfig = Object.create(webpackConfig)
    //myConfig = webpackConfig;
    myConfig.devtool = 'eval';
    myConfig.debug = true;
    // console.log('myConfig=', myConfig);
    // console.log('webpackConfig=', webpackConfig);

    var serverOptions = {  
        //contentBase: 'http://' + host + ':' + port,
        // quiet: true, //关掉输出的一堆信息, 但是eslint检测报告也关掉了
        // noInfo: true,
        // hot: true,
        // inline: true,
        // lazy: false,
        //publicPath: '/build/dist/',
        publicPath:  myConfig.output.publicPath,
        headers: {'Access-Control-Allow-Origin': '*'},
        stats: {colors: true}
    }
    //会自动用webpack构建到内存
    var compiler = webpack(myConfig);
    app.use(require('webpack-dev-middleware')(compiler, serverOptions))
    app.use(require('webpack-hot-middleware')(compiler));
    console.log('调试服务器插件启动}}')
}
app.listen(3001, function () {
  console.log('Server listening on http://localhost:3001, Ctrl+C to stop')
})