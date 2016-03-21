
'use strict'

const webpack = require('webpack');
let wpconfig = require('./webpack.base.config.js')

// 压缩JS与CSS
wpconfig.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
        test: /(\.jsx|\.js)$/,
        minimize: true,
        compress: {
            unused: true,
            dead_code: true,
            warnings: false
        },
        //排除混淆关键词
        except: ['$super', '$', 'exports', 'require'],
    }),
    // 压缩React
    new webpack.DefinePlugin({ "process.env": { NODE_ENV: JSON.stringify("production")} }),    
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin()
);

module.exports = wpconfig;
