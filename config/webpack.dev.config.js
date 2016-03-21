
'use strict'

const webpack = require('webpack')
let wpconfig = require('./webpack.base.config.js')



wpconfig.plugins.push(
    //热替换，热替换和dev-server的hot有什么区别？不用刷新页面，可用于生产环境
    new webpack.HotModuleReplacementPlugin()
);

// wpconfig.devtool = 'eval'
// wpconfig.devtool = 'cheap-module-eval-source-map'
wpconfig.devtool = 'source-map' //规定了在开发环境下才使用 source-map
// 配置webpack-dev-server  当代码更新的时候自动刷新浏览器
wpconfig.devServer = { 
    historyApiFallback: true, 
    hot: true, 
    inline: true, 
    progress: true, 
}
module.exports = wpconfig;