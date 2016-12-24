const path = require('path');
const webpack = require('webpack');
// 如何copy目录下的文件到输出目录
//const TransferWebpackPlugin = require('transfer-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const os = require('os')
const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

const cfg = require('../config/env.config.js')
const envcfg = require('../config/env.config.js').server(process.env.NODE_ENV)

//console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$scfg==', envcfg)

//const BUILD_PATH = path.resolve(__dirname, "build/dist/js/");
//const BUILD_PATH = path.resolve(__dirname, "build");
//const PUBLIC_PATH = '/';
//const PUBLIC_PATH = 'http://127.0.0.1:3001/';
//const PUBLIC_PATH = '/dist/js/';//path.resolve(__dirname, "build/dist/js/");
//const nodeModulesPath = path.join(path.resolve(__dirname, '..'), 'node_modules')
//const nodeModulesPath = path.join(path.resolve(__dirname, '../'), 'node_modules')
const ROOT_PATH = cfg.ROOT_PATH; // path.join(process.cwd(), '..')
const BUILD_PATH = cfg.OUT_PATH; // path.join(ROOT_PATH, 'build')
const nodeModulesPath = path.join(ROOT_PATH, 'node_modules')
const SRC_PATH = path.join(ROOT_PATH, 'src')
const imgPath = path.resolve(ROOT_PATH, 'src/img')
const uiPath = path.resolve(ROOT_PATH, 'src/components')
const commPath = path.resolve(ROOT_PATH, 'src/commons')
const GPagesReducer = path.resolve(ROOT_PATH, 'src/store/pages.reducer.js')
const eslintPath = path.resolve(ROOT_PATH, '.eslintrc')
const testJsonPath = path.resolve(ROOT_PATH, 'test/json')
const HAPPY_PACK_PATH = path.resolve(cfg.BUILD_PATH, '.temp/.happyPack')
//console.log('imgPath================================', imgPath)
//const isDev = true;
console.log(`webpack.config.base.js: ROOT_PATH=${ROOT_PATH}`)

const plugins = [
    // dll 可以用, 但是调试不能动态更新, 停用试试 2016-10-22
    new webpack.DllReferencePlugin({
        // scope: "dll",
        context: path.join(__dirname, '..', 'config'), // 解析dll路径的上下文
        manifest: require(path.join(cfg.DLL_PATH, 'vendor-manifest.json'))
    }),
    // new webpack.DllReferencePlugin({
    //     context: path.join(__dirname, '..', "build", 'dist'),
    //     manifest: require("../build/dist/dll/antd-manifest.json")
    // }),
    // new webpack.DllReferencePlugin({
    //     context: path.join(__dirname, "..", "dll"),
    //     manifest: require("../dll/js/alpha-manifest.json")
    // }),
    // new webpack.DllReferencePlugin({
    //     scope: "beta",
    //     manifest: require("../dll/js/beta-manifest.json")
    // }),
    // new webpack.DllReferencePlugin({
    //   // context: __dirname,
    //   context: path.join(__dirname, "../build/dist"),
    //   // manifest: require('manifest.json'),
    //   manifest: require('../build/dist/js/manifest.json'),
    // }),

    // CommonsChunkPlugin 插件会根据各个生成的模块中共用的模块，然后打包成一个common.js 文件。
    // 参考: https://github.com/webpack/webpack/tree/master/examples/common-chunk-and-vendor-chunk
// new webpack.optimize.CommonsChunkPlugin({
//     names: ['vendors' ],
//     // names: ['vendors', 'vendorAntd' ],
//     // names: ['vendors', 'vendorFetch' ],
//     // names: ['vendors', 'vendorAntd', 'vendorFetch' ],
//     minChunks: Infinity,
//     // filename: envcfg.vendorsFilename,
// }),
    // new webpack.optimize.CommonsChunkPlugin({
    //     name: 'vendors',
    //     //name: ['common', 'vendors', 'vendors2', 'vendors3'],
    //     minChunks: 2, //一个文件至少被require两次才能放在CommonChunk里
    //     filename: envcfg.vendorsFilename, //isDev?'dist/js/vendors.js':'dist/js/vendors.[hash:8].js',
    //     //filename: 'dist/js/common/vendors.[hash:8].js',
    // }),
    // new webpack.optimize.CommonsChunkPlugin({
    //     name: 'vendors1',
    //     minChunks: 2,//一个文件至少被require两次才能放在CommonChunk里
    //     chunks: ["react", "react-dom", ],
    //     filename: 'dist/js/vendors1.[hash:8].js',
    // }),
    // new webpack.optimize.CommonsChunkPlugin({
    //     name: 'vendors2',
    //     minChunks: 2,//一个文件至少被require两次才能放在CommonChunk里
    //     chunks: ["react-router", "react-router-redux", "redux",  "react-redux", ],
    //     filename: 'dist/js/vendors2.[hash:8].js',
    // }),
    // new webpack.optimize.CommonsChunkPlugin({
    //     name: 'vendors3',
    //     minChunks: 2,//一个文件至少被require两次才能放在CommonChunk里
    //     chunks: ["redux-thunk", "react-addons-css-transition-group" ],
    //     filename: 'dist/js/vendors3.[hash:8].js',
    // }),
    //分离css单独打包
    //new ExtractTextPlugin('dist/css/[name].[hash:8].css'),
    new ExtractTextPlugin(envcfg.cssFilename),
    // ProvidePlugin 插件可以定义一个共用的入口，比如 下面加的 React ,
    // 他会在每个文件自动require了react，所以你在文件中不需要 require('react')，也可以使用 React。
    // 用法 https://github.com/webpack/webpack/tree/master/examples/multi-compiler
    new webpack.ProvidePlugin({
        //__PRODUCTION__: true,
        React: 'react',
        ReactDOM: 'react-dom',
        // 使用es6-promise
        Promise: 'imports?this=>global!exports?global.Promise!es6-promise',
        //以下为了使用fetch
        //fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch',
        //以下为了使用fetch
        fetch: 'imports?this=>global!exports?global.fetch!isomorphic-fetch',
        //fetchJsonp: 'imports?this=>global!exports?global.fetchJsonp!fetch-jsonp',
        fetchJsonp: 'fetch-jsonp',
    }),
    // 模板试试用这个 https://github.com/jaketrent/html-webpack-template
    // 生成及压缩HTML  //根据模板插入css/js等生成最终HTML
    new HtmlWebpackPlugin({
        //  "files": {
        //     "js": [ "dll.vendor.js", "assets/main_bundle.js"],
        //      "chunks": {
        //         "body": {
        //             "myvendor": {
        //                 "entry": "dll.vendor.js",
        //                 "hash": "2fsdf",
        //                 "size": "122"
        //             }
        //         },
        //         "main": {
        //             "entry": "dll.vendor.js",
        //             "hash": "2fsdf",
        //             "size": "122"
        //         }
        //     },
        //  },
        title: 'ncms admin',
        //favicon:'./build/img/favicon.ico', //favicon路径
        favicon: path.join(imgPath, 'favicon.ico'), //favicon路径
        inject: false, //允许插件修改哪些内容，包括head与body
        cache: false, //如果为 true, 这是默认值 仅仅在文件修改之后才会发布文件
        // template: 'node_modules/html-webpack-template/index.ejs',
        template: path.join(BUILD_PATH, './template/index.ejs'),
        filename: './index.html',    //生成的html存放路径，相对于 path
        appMountId: 'id_root',
        baseHref: envcfg.publicPath, // 'http://example.com/awesome',
        // chunks:['my_vendor'],
        //压缩HTML文件 传递 html-minifier 选项给 minify 输出
        minify:{
            removeComments: true,    //移除HTML中的注释
            collapseWhitespace: true    //删除空白符与换行符
        },
        //devServer: 3001,
        mobile: true,
        //这里写入浏览器window的变量
        window: {
            envex: {
                apiHost: 'http://myapi.com/api/v1'
            }
        }
    }),
    new CopyWebpackPlugin([
        { from: imgPath, to: 'img', toType: 'dir' },
        { from: testJsonPath, to: 'json', toType: 'dir' },
        { from: 'src/img/favicon.ico', to: 'favicon.ico', toType: 'file' },
    ]),
    //], {ignore:[ '*.txt',]} ),
    //new CopyWebpackPlugin([ { from: 'src/img/favicon.ico', to: '/favicon.ico' },], {ignore:[ '*.txt',]} ),
];
console.log('__dirname:', __dirname);

const config = {
  entry: {
     // 打包时分离第三方库
    // vendorFetch: ["fetch-jsonp"],
    // vendorAntd: ["antd"],
//  vendors: ["react", "react-dom", "react-router", "react-router-redux", "redux",
//         "react-redux", "redux-thunk", "react-addons-css-transition-group",
//         "immutable",
//         "history"
//         // "antd", "history", "fetch-jsonp",
//         //"es6-promise",
//         // "babel-core",
//         //"webpack-dev-server", "webpack-hot-middleware", "react-hot-loader",
//         ],
    // vendors1: ["react", "react-dom",  ],
    // vendors2: [ "react-router", "react-router-redux", "redux",  "react-redux", ],
    // vendors3: ["redux-thunk", "react-addons-css-transition-group"],
    //public: ['webpack-hot-middleware/client', './src/App.js']
    // bundle: ['babel-polyfill', './src/App.js']  //IE8 支持不知道要不要这个
    // example: [ './src/example.js'],
    // app: [ './src/App.js']
    app: [path.join(SRC_PATH, 'app.js')]
  },
  output: {
    //path: path.join(__dirname, 'public/dist'),
    //path: path.join(__dirname, 'dist/'),
    path: BUILD_PATH,
    filename: envcfg.outputFilename, //isDev?'dist/js/[name].js':'dist/js/[name].[chunkhash:8].js',
    chunkFilename: envcfg.outputChunkFilename, //isDev?'dist/js/[id].chunk.js':'dist/js/[id].[chunkhash:8].chunk.js',
    //chunkFilename: debug ? '[chunkhash:8].chunk.js' : 'js/[chunkhash:8].chunk.min.js',
    //publicPath: 'public/dist'
    publicPath: envcfg.publicPath,
    //publicPath: isProduction()? 'http://******' : 'http://localhost:3000',
  },
  plugins,
  resolve: {
    root: [SRC_PATH, nodeModulesPath],
    //fallback: [path.join(__dirname, 'node_modules') ],
    //用于指明程序自动补全识别哪些后缀
    extensions: ['', '.js', '.jsx'],
    // 快捷路径，可以直接 import 该目录下的文件
	// modulesDirectories: ['node_modules', 'styles', 'static'],
    //别名, 其他可以直接用 require("js/main.js");加载
    alias: {
        // js: path.join(__dirname, "./app/components"),
        // 公共的component
        ui: uiPath,
        commPath,
        GPagesReducer,
        // 指定公共库的位置，优化webpack搜索硬盘的速度
        react: path.join(nodeModulesPath, 'react'),
        'react-dom': path.join(nodeModulesPath, 'react-dom'),
        'react-router': path.join(nodeModulesPath, 'react-router'),
        redux: path.join(nodeModulesPath, 'redux'),
        'react-redux': path.join(nodeModulesPath, 'react-redux'),
        'react-router-redux': path.join(nodeModulesPath, 'react-router-redux')
    }
  },
  //resolveLoader: {fallback: [path.join(__dirname, 'node_modules')]},
  module: {
  },
  //这些库不用打包处理，但是在html文件中还是需要自己去引用
  externals:{
    moment: true,
    jquery: 'jQuery',
    bootstrap: true,
    // 让 Webpack 知道，对于 react 这个模块就不要打包啦，直接指向 window.React 就好。不过别忘了加载 react.min.js，让全局中有 React 这个变量
    // 'react': 'window.React',
  }
};
//Eslint config
config.eslint = {
    configFile: eslintPath //'./.eslintrc' //Rules for eslint
}
// config.module.preLoaders =
// [
//     {
//         test: /\.(js|jsx)$/,
//         include: [SRC_PATH],
//         exclude: [nodeModulesPath],
//         loader: 'eslint-loader'
//     }
// ]
const babelQuery = {
    // 支持aysnc await
    plugins: ['transform-runtime', 'add-module-exports'],
    //presets: ['es2015', 'react', 'stage-0']
    presets: ['es2015', 'stage-0', 'react']
    //presets: ["es2015", "react"]
}
config.plugins.push(
    // 优化dev编译速度
    // 参考: https://github.com/amireh/happypack
    new HappyPack({
        id: 'happybabel',
        // loaders: ['babel-loader'],
        loaders: [`babel?${JSON.stringify(babelQuery)}`],
        threadPool: happyThreadPool,
        cache: true,
        verbose: true,
        tempDir: HAPPY_PACK_PATH,
    })
)
/**
 * 解决错误: Cannot define 'query' and multiple loaders in loaders list
 * https://github.com/jsdf/webpack-combine-loaders
 */
config.module.loaders =
[
    {
        test: /\.(js|jsx)$/, loader: 'react-hot-loader', exclude: nodeModulesPath
    },
    {
        test: /\.js$/,
        include: [SRC_PATH],
        exclude: nodeModulesPath,
        loaders: [`babel?${JSON.stringify(babelQuery)}`],
        // loaders: ['babel'+'?'+JSON.stringify(babelQuery)],
        //loaders: ['react-hot', 'babel'+'?'+JSON.stringify(babelQuery)],
    },
    {
        test: /\.jsx$/,
        include: [SRC_PATH],
        exclude: nodeModulesPath,
        loaders: [`babel?${JSON.stringify(babelQuery)}`],
        // loaders: ['babel'+'?'+JSON.stringify(babelQuery)],
        //loaders: ['react-hot', 'babel'+'?'+JSON.stringify(babelQuery)],
    },
    {
        test: /\.(js|jsx)$/, loader: 'eslint-loader', exclude: nodeModulesPath
    },
    {
        test: /\.less$/,
        // loaders: ['style-loader', 'css-loader', 'autoprefixer-loader', 'less-loader'],
        // 写法参考: https://github.com/webpack/extract-text-webpack-plugin#api
        loader: ExtractTextPlugin.extract('style-loader', ['css-loader', 'autoprefixer-loader', 'less-loader'])
        //loader: 'style-loader!css-loader!autoprefixer-loader!less-loader',
        //loaders: [ExtractTextPlugin.extract('style'), 'css', 'less'],
    },
    {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', ['css-loader', 'autoprefixer-loader', 'sass-loader'])
    },
    {
        test: /\.css$/,
        //loader: "style-loader!css-loader"
        //分离css单独打包
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
    },
    {
        test: /\.(png|jpg)$/,
        //loader: "url-loader?limit=8192",
        loaders: ['url-loader?limit=8192&name=img/[name].[ext]'],
        // <=8k图片被转化成 base64 格式的 dataUrl
    },
    {
		test: /\.(eot|woff|svg|ttf|woff2|gif)(\?|$)/,
		loader: 'file-loader?name=[hash].[ext]'
	},
    // {
    //     test: /\.(woff|woff2|eot|ttf|svg)(\?.*$|$)/,
    //     loader: 'url-loader?importLoaders=1&limit=1&name=/fonts/[name].[hash].[ext]'
    // },
    // {
    //     test: /\.(woff|svg|eot|ttf)\??.*$/,
    //     /*test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,*/
    //     loader: 'url',
    //     query: {
    //         limit: 1,
    //         name: 'fonts/[name].[hash:7].[ext]'
    //     }
    // },
    // {
    //     test: /\.(svg|ttf|eot|woff|woff2)$/,
    //     loader: 'file-loader?name=fonts/[name].[ext]'
    // },
    // {
    //     test: /\.(eot|svg|ttf|woff|woff2|png)\w*/,
    //     loader: 'file'
    // },
]
module.exports = config;

        // query: {
        //     //presets: ['es2015', 'react', 'stage-0']
        //     presets: ["es2015", "react"],
        //     // "env": {
        //     //     "development": {
        //     //         "presets": ["react-hmre"],
        //     //         "plugins": [
        //     //             ["react-transform", {
        //     //                 "transforms": [{
        //     //                     "transform": "react-transform-hmr",
        //     //                     "imports": ["react"],
        //     //                     "locals": ["module"]
        //     //                 }]
        //     //             }]
        //     //         ]
        //     //     }
        //     // },
        //     // 好像没效果
        //     // env: {
        //     //     development: {
        //     //         plugins: [
        //     //         ['react-transform', {
        //     //             transforms: [{
        //     //             transform: 'react-transform-hmr',
        //     //             imports: ['react'],
        //     //             locals: ['module']
        //     //             }, {
        //     //             transform: 'react-transform-catch-errors',
        //     //             imports: ['react', 'redbox-react']
        //     //             }]
        //     //         }]
        //     //         ]
        //     //     },
        //     //     production: {
        //     //         plugins: [
        //     //         'transform-react-remove-prop-types',
        //     //         'transform-react-constant-elements'
        //     //         ]
        //     //     }
        //     // }
        //     // //env end
        // }
