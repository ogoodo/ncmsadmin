
'use strict'

const webpack = require('webpack')
let wpconfig = require('./webpack.base.config.js')
var OpenBrowserPlugin = require('open-browser-webpack-plugin')
//console.log('process.env.CONFIG==', process.env.CONFIG)

wpconfig.plugins.push(
    new webpack.DefinePlugin({
        // __ENV__: JSON.stringify("mobile"),
        __ENV__: JSON.stringify(require("../config/env.config.js").client(process.env.NODE_ENV || "development")),
        __DEV__: JSON.stringify(true),
    }),
    // 这句有可能冲突(webpack wait until bundle finished)
    // new OpenBrowserPlugin({ url: 'http://localhost:3001' }),
    // 参考： https://github.com/glenjamin/webpack-hot-middleware
    // 热替换，热替换和dev-server的hot有什么区别？不用刷新页面，可用于生产环境    
    //new webpack.optimize.OccurenceOrderPlugin(), //1.0好像可以不要
    new webpack.HotModuleReplacementPlugin(),    
    new webpack.NoErrorsPlugin()  // 防止报错的插件
);
wpconfig.entry.bundle.unshift('webpack-hot-middleware/client');
// console.log(wpconfig.entry.bundle)
// wpconfig.devtool = 'eval'
wpconfig.devtool = 'cheap-module-eval-source-map'
// wpconfig.devtool = 'source-map' //规定了在开发环境下才使用 source-map
//wpconfig.devtool = '#eval-source-map'

module.exports = wpconfig;
