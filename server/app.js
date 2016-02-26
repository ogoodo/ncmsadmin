var express = require('express')
var rewrite = require('express-urlrewrite')
var path = require('path')
var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackConfig = require('../webpack.config.js')
var myConfig = Object.create(webpackConfig);
myConfig.devtool = 'eval';
myConfig.debug = true;

var app = express()

//会自动用webpack构建到内存
app.use(webpackDevMiddleware(webpack(myConfig), {
    //publicPath: '/build/dist/',
    publicPath:  myConfig.output.publicPath,
    stats: {
        colors: true
    }
}))


//url重写支持http://127.0.0.1:3001/page1/tab2这种类型加载
app.use(rewrite(/(^\/(\w+))+/, '/index.html'));

app.use(express.static(path.join(__dirname, '../build')))

app.listen(3001, function () {
  console.log('Server listening on http://localhost:3001, Ctrl+C to stop')
})