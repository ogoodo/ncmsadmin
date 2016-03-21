
'use strict'

const webpack = require('webpack')
let wpconfig = require('./webpack.base.config.js')



wpconfig.plugins.push(
    // 参考： https://github.com/glenjamin/webpack-hot-middleware
    // 热替换，热替换和dev-server的hot有什么区别？不用刷新页面，可用于生产环境    
    //new webpack.optimize.OccurenceOrderPlugin(), //1.0好像可以不要
    new webpack.HotModuleReplacementPlugin(),    
    new webpack.NoErrorsPlugin()  // 防止报错的插件
);
wpconfig.entry.bundle.unshift('webpack-hot-middleware/client');
console.log(wpconfig.entry.bundle)
// wpconfig.devtool = 'eval'
// wpconfig.devtool = 'cheap-module-eval-source-map'
// wpconfig.devtool = 'source-map' //规定了在开发环境下才使用 source-map
wpconfig.devtool = '#eval-source-map'

module.exports = wpconfig;