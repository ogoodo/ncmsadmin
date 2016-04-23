
'use strict'

const webpack = require('webpack')
let wpconfig = require('./webpack.config.base.js')

// 压缩JS与CSS
wpconfig.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
        test: /(\.jsx|\.js)$/,
        minimize: true,  //--optimize-minimize
        compress: {
            unused: true,
            dead_code: true,
            warnings: false
        },
        //排除混淆关键词
        except: ['$super', '$', 'exports', 'require'],
    }),
    // definePlugin 接收字符串插入到代码当中, 所以你需要的话可以写上 JS 的字符串
    new webpack.DefinePlugin({
        // 压缩React
        "process.env": { NODE_ENV: JSON.stringify("production")},
        // ENV: JSON.stringify("mobile"),
        __ENV__: JSON.stringify(require("../config/env.config.js").client( "production")),
        // __DEV__ 之类的可以配置js里的全局变量(做开关)比如只有开发版输出log的开关, 
        //    正式版用uglify dead-code elimination, 任何这种代码都会被剔除(输出日志之类辅助开发的代码)
        __DEV__: JSON.stringify( false),
        // ENVIRONMENT: JSON.stringify(process.env.NODE_ENV || 'development'),
        // VERSION: JSON.stringify(require('./package.json').version),
        // __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
        // __PRERELEASE__: JSON.stringify(JSON.parse(process.env.BUILD_PRERELEASE || 'false'))
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin()
);

// wpconfig.devtool = 'source-map'
module.exports = wpconfig;
