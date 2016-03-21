var express = require('express')
var rewrite = require('express-urlrewrite')
var path = require('path')
var webpack = require('webpack')
//var webpackDevMiddleware = require('webpack-dev-middleware')
var app = express()


const isDevelopment = function () {
    return process.env.NODE_ENV ? process.env.NODE_ENV.trim()==='development' : false;
    //return process.env.NODE_ENV ? process.env.NODE_ENV.trim()==='production' : false;
};

app.use(function(res, req, next){
    //console.log('网址访问'); //要运行下gulp p
    next();
    //debugger;
});

if(isDevelopment()){
    var webpackConfig = require('../config/webpack.config.js')
    var myConfig = Object.create(webpackConfig);
    myConfig.devtool = 'eval';
    myConfig.debug = true;

    var serverOptions = {  
        //contentBase: 'http://' + host + ':' + port,
        // quiet: true,
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
}

//url重写支持http://127.0.0.1:3001/page1/tab2这种类型加载
//app.use(rewrite(/(^\/(\w+))+/, '/index.html'));

app.use(express.static(path.join(__dirname, '../build')))

app.listen(3001, function () {
  console.log('Server listening on http://localhost:3001, Ctrl+C to stop')
})