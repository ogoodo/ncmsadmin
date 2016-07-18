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
  // "babel-core",
  // "webpack-dev-server", "webpack-hot-middleware", "react-hot-loader", 
];

module.exports = {
    entry: {
        vendor: vendors
        // vendor: [path.join(__dirname, "client", "vendors.js")]
    },
    output: {
        path: path.join(__dirname, 'build', "dist", "dll"),
        filename: "dll.[name].js",
        library: "[name]"
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join(__dirname, 'build', 'dist', "dll", "[name]-manifest.json"),
            name: "[name]",
            context: path.resolve(__dirname, "client")
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin()
    ],
    resolve: {
        root: path.resolve(__dirname, "client"),
        modulesDirectories: ["node_modules"]
    }
};