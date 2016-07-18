var path = require("path");
var webpack = require("webpack");


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
  
  "core-js",
  "lodash",
  // "babel-core",
  // "webpack-dev-server", "webpack-hot-middleware", "react-hot-loader", 
];

module.exports = {
    entry: {
        // vendor: vendors
        vendor: [path.join(__dirname, "webpack.config.dll.vendors.js")]
        // vendor: [path.join(__dirname, "client", "vendors.js")]
    },
    output: {
        path: path.join(__dirname, '..', 'build', "dist", "dll"),
        filename: "dll.[name].[hash].js",
        library: "[name]_[hash]"
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join(__dirname, '..', 'build', 'dist', "dll", "[name]-manifest.json"),
            name: "[name]_[hash]",
            context: path.resolve(__dirname, '..', "client")
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.DefinePlugin({
            // 压缩React
            "process.env": { NODE_ENV: JSON.stringify("production")},
        })
    ],
    resolve: {
        root: path.resolve(__dirname, '..', "client"),
        modulesDirectories: ["../node_modules"]
    },  
    //这些库不用打包处理，但是在html文件中还是需要自己去引用
    // externals:{
    //     'react': true,
    //     'react-dom': true,
    // }
};
