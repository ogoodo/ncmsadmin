const path = require('path');
const webpack = require('webpack');
const config = require('./env.config.js');

config.initPath(process.env.NODE_ENV)


const cfg = {
    entry: {
        vendor: [path.join(__dirname, 'webpack.config.dll.vendors.js')]
    },
    output: {
        path: config.DLL_PATH, // path.join(config.OUT_PATH, "dist", "dll"),
        filename: 'dll.[name].[hash].js',
        library: '[name]_[hash]'
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join(config.OUT_PATH, 'dist', 'dll', '[name]-manifest.json'),
            name: '[name]_[hash]',
            context: path.resolve(__dirname, '..', 'config') // 解析dll路径的上下文
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
    ],
    resolve: {
        root: path.resolve(__dirname, '..', 'config'),
        modulesDirectories: ['../node_modules']
    },
    //这些库不用打包处理，但是在html文件中还是需要自己去引用
    // externals:{
    //     'react': true,
    //     'react-dom': true,
    // }
}

if (process.env.NODE_ENV === 'production') {
    cfg.plugins.push(
        // 生成版要用, 暂时注释掉 2016-10-21
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.DefinePlugin({
            // 压缩React
            'process.env': { NODE_ENV: JSON.stringify('production') },
        })
    )
}

module.exports = cfg

// const vendors = [
//   "react",
//   "react-dom",
//   "react-router",
//   "react-router-redux",
//   "redux",
//   "react-redux",
//   "redux-thunk",
//   "react-addons-css-transition-group",
//   "immutable",
//   "history",
//   "antd",
//   "history",
//   'isomorphic-fetch',
//   "fetch-jsonp",
//   "es6-promise",

//   "core-js",
//   "lodash",
//   // "babel-core",
//   // "webpack-dev-server", "webpack-hot-middleware", "react-hot-loader",
// ];
