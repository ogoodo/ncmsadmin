const path = require('path');
const webpack = require('webpack');

// 运行方式
// ./node_modules/webpack/bin/webpack.js --config ./config/webpack.config.dll.js
// 参考: https://segmentfault.com/a/1190000005969643
// https://github.com/webpack/webpack/tree/master/examples/dll
// https://github.com/webpack/webpack/tree/master/examples/dll-user
const vendors2 = [
  'antd',
  'isomorphic-fetch',
  'react',
  'react-dom',
  'react-redux',
  'react-router',
  'redux',
  // 'redux-promise-middleware',
  'redux-thunk',
  // 'superagent',
];
const vendors = [
  "react",
  "react-dom",
  "react-router",
  "react-router-redux",
  "redux",
  "react-redux",
  "redux-thunk",
  "react-addons-css-transition-group",
  "immutable",
  "history",
  "antd",
  "history",
  'isomorphic-fetch',
  "fetch-jsonp",
  "es6-promise", 
  // "babel-core",
  // "webpack-dev-server", "webpack-hot-middleware", "react-hot-loader", 
];

// module.exports = {
//   output: {
//     path: 'build/dist/js/',
//     filename: '[name].[chunkhash].js',
//     library: '[name]_[chunkhash]',
//   },
//   entry: {
//     vendors: vendors,
//   },
//   plugins: [
//     new webpack.DllPlugin({
//       path: './build/dist/js/manifest.json',
//       name: '[name]_[chunkhash]',
//       // context: path.join(__dirname, "../build/dist/js/"),
//       // context: __dirname,
//     }),
//   ],
// };

const vendors3 = [
  'antd',
];
const vendors4 = [
  'isomorphic-fetch',
  'react',
  'react-dom',
  'react-redux',
  'react-router',
  'redux',
  // 'redux-promise-middleware',
  'redux-thunk',
  // 'superagent',
];
module.exports = {
    entry: {
        alpha: vendors4,
        beta: vendors3
    },
    output: {
        path: path.join(__dirname, "js"),
        filename: "MyDll.[name].js",
        library: "[name]_[hash]"
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join(__dirname, "js", "[name]-manifest.json"),
            name: "[name]_[hash]"
        })
    ]
};


