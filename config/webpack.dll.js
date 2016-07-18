var path = require("path");
var webpack = require("webpack");


const BUILD_PATH = path.join(process.cwd(), 'build')
const nodeModulesPath = path.join(process.cwd(), 'node_modules')
const srcPath = path.join(process.cwd(), 'src')

const vendors_antd = [
]
const vendors = [
  "antd",
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
  "history",
  'isomorphic-fetch',
  "fetch-jsonp",
  "es6-promise", 

//   'core-js',
//   'lodash',
  // "babel-core",
  // "webpack-dev-server", "webpack-hot-middleware", "react-hot-loader", 
];

module.exports = {
    entry: {
        vendor: vendors,
        // antd: vendors_antd,
        // vendor: [path.join(__dirname, '..', "client", "vendors.js")]
    },
    output: {
        path: path.join(__dirname, '..', 'build', "dist", "dll"),
        filename: "dll.[name].js",
        library: "[name]"
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join(__dirname, '..', 'build', "dist", "dll", "[name]-manifest.json"),
            name: "[name]",
            context: path.resolve(__dirname, '..')
            // context: path.resolve(__dirname, '..', "client")
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        // new webpack.optimize.UglifyJsPlugin(),
        // new webpack.DefinePlugin({
        //     // 压缩React
        //     "process.env": { NODE_ENV: JSON.stringify("production")},
        // }),
        // new webpack.optimize.UglifyJsPlugin({
        //     test: /(\.jsx|\.js)$/,
        //     minimize: true,  //--optimize-minimize
        //     compress: {
        //         unused: true,
        //         dead_code: true,
        //         warnings: false
        //     },
        //     //排除混淆关键词
        //     except: ['$super', '$', 'exports', 'require'],
        // }),
    ],
    // resolve: {
    //     root: [srcPath, nodeModulesPath],
    //     // root: path.resolve(__dirname, '..', "client"),
    //     // modulesDirectories: ["node_modules"]
    // },
    // module: {
    // },
};

/* 
const babelQuery = {
    // 支持aysnc await
    plugins: ['transform-runtime'],
    //presets: ['es2015', 'react', 'stage-0']
    presets: ['es2015', 'stage-0', 'react']
    //presets: ["es2015", "react"]
}
module.exports.module.loaders =
[
    {
        test: /\.js$/,
        include: [srcPath],
        exclude: nodeModulesPath,
        loaders: ['babel'+'?'+JSON.stringify(babelQuery)],
        //loaders: ['react-hot', 'babel'+'?'+JSON.stringify(babelQuery)],
    },
    {
        test: /\.jsx$/,
        include: [srcPath],
        exclude: nodeModulesPath,
        loaders: ['babel'+'?'+JSON.stringify(babelQuery)],
        //loaders: ['react-hot', 'babel'+'?'+JSON.stringify(babelQuery)],
    },
];

//*/
