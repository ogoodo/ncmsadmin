const path = require('path');
const webpack = require('webpack');

// 运行方式
// ./node_modules/webpack/bin/webpack.js --config ./config/webpack.config.dll.js

const vendors = [
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

module.exports = {
  output: {
    path: 'build/dist/js/',
    filename: '[name].[chunkhash].js',
    library: '[name]_[chunkhash]',
  },
  entry: {
    vendors: vendors,
  },
  plugins: [
    new webpack.DllPlugin({
      path: './build/dist/js/manifest.json',
      name: '[name]_[chunkhash]',
      // context: path.join(__dirname, "../build/dist/js/"),
      context: __dirname,
    }),
  ],
};
