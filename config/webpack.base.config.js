'use strict'
const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin')

//const BUILD_PATH = path.resolve(__dirname, "build/dist/js/");
//const BUILD_PATH = path.resolve(__dirname, "build");
const BUILD_PATH = path.join(process.cwd(), 'build')
//const PUBLIC_PATH = '/';
const PUBLIC_PATH = 'http://127.0.0.1:3001/';
//const PUBLIC_PATH = '/dist/js/';//path.resolve(__dirname, "build/dist/js/");
const minSize = 500*1000;
//const nodeModulesPath = path.join(path.resolve(__dirname, '..'), 'node_modules')
//const nodeModulesPath = path.join(path.resolve(__dirname, '../'), 'node_modules')
const nodeModulesPath = path.join(process.cwd(), 'node_modules')
const srcPath = path.join(process.cwd(), 'src')
//console.log('================================', nodeModulesPath2)
const isDev = true;

let plugins = [
    // CommonsChunkPlugin 插件会根据各个生成的模块中共用的模块，然后打包成一个common.js 文件。
    // 参考: https://github.com/webpack/webpack/tree/master/examples/common-chunk-and-vendor-chunk
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendors',
        //name: ['common', 'vendors', 'vendors2', 'vendors3'],
        minChunks: 2,//一个文件至少被require两次才能放在CommonChunk里
        filename: isDev?'dist/js/vendors.js':'dist/js/vendors.[hash:8].js',
        //filename: 'dist/js/common/vendors.[hash:8].js',
    }),
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
    new ExtractTextPlugin('dist/css/[name].css'),
    // ProvidePlugin 插件可以定义一个共用的入口，比如 下面加的 React ,
    // 他会在每个文件自动require了react，所以你在文件中不需要 require('react')，也可以使用 React。
    // 用法 https://github.com/webpack/webpack/tree/master/examples/multi-compiler
    new webpack.ProvidePlugin({
        __PRODUCTION__: true,
        React: 'react',
        ReactDOM: 'react-dom',
        //以下两项为了使用fetch
        Promise: 'imports?this=>global!exports?global.Promise!es6-promise',
        fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch',
    }),
    // 使用whatwg-fetch在webpack的
    //new webpack.ProvidePlugin({'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'}),
    //维持构建编译代码
    //new webpack.optimize.OccurenceOrderPlugin(),
    //热替换，热替换和dev-server的hot有什么区别？不用刷新页面，可用于生产环境
    //new webpack.HotModuleReplacementPlugin(),
    // 保证编译后的代码永远是对的，因为不对的话会自动停掉
    //new webpack.NoErrorsPlugin(),
    // new CopyWebpackPlugin([
    //         //{ from: 'src/index.html', to: '../../to/test.html' },
    //         { from: 'src/index.html', to: '/test.html' },
    //         ],
    //         {ignore:[ '*.txt',]}
    //  ),
     
    // 模板试试用这个 https://github.com/jaketrent/html-webpack-template
    // 生成及压缩HTML  //根据模板插入css/js等生成最终HTML
    new HtmlWebpackPlugin({
        title: 'ncms admin',
        //favicon:'./src/img/favicon.ico', //favicon路径
        inject: false, //允许插件修改哪些内容，包括head与body
        cache: false, //如果为 true, 这是默认值 仅仅在文件修改之后才会发布文件
        template: 'node_modules/html-webpack-template/index.ejs',
        filename: './index.html',    //生成的html存放路径，相对于 path
        appMountId: 'id_root',
        baseHref: PUBLIC_PATH, // 'http://example.com/awesome',
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
    })
];


let config = {
  entry: {
     // 打包时分离第三方库
     vendors: ["react", "react-dom", "react-router", "react-router-redux", "redux",
            "react-redux", "redux-thunk", "react-addons-css-transition-group"
            ],
    // vendors1: ["react", "react-dom",  ],
    // vendors2: [ "react-router", "react-router-redux", "redux",  "react-redux", ],
    // vendors3: ["redux-thunk", "react-addons-css-transition-group"],
    //public: ['webpack-hot-middleware/client', './src/App.js']
    bundle: [ './src/App.js']
  },
  output: {
    //path: path.join(__dirname, 'public/dist'),
    //path: path.join(__dirname, 'dist/'),
    path: BUILD_PATH,
    filename: isDev?'dist/js/[name].js':'dist/js/[name].[chunkhash:8].js',
    chunkFilename: isDev?'dist/js/[id].chunk.js':'dist/js/[id].[chunkhash:8].chunk.js',
    //chunkFilename: debug ? '[chunkhash:8].chunk.js' : 'js/[chunkhash:8].chunk.min.js',
    //publicPath: 'public/dist'
    publicPath: PUBLIC_PATH,
    //publicPath: isProduction()? 'http://******' : 'http://localhost:3000',
  },
  plugins: plugins,
  resolve: {
    root: [srcPath, nodeModulesPath],
    //fallback: [path.join(__dirname, 'node_modules') ],
    //用于指明程序自动补全识别哪些后缀
    extensions: ['', '.js', '.jsx'],
    // 快捷路径，可以直接 import 该目录下的文件
	// modulesDirectories: ['node_modules', 'styles', 'static'],
    //别名, 其他可以直接用 require("js/main.js");加载
    alias: {
        // js: path.join(__dirname, "./app/components"),
        // 指定公共库的位置，优化webpack搜索硬盘的速度
        'react': path.join(nodeModulesPath, 'react'),
        'react-dom': path.join(nodeModulesPath, 'react-dom'),
        'react-router': path.join(nodeModulesPath, 'react-router'),
        'redux': path.join(nodeModulesPath, 'redux'),
        'react-redux': path.join(nodeModulesPath, 'react-redux'),
        'react-router-redux': path.join(nodeModulesPath, 'react-router-redux')
    }
  },
  //resolveLoader: {fallback: [path.join(__dirname, 'node_modules')]},
  module: {
  },
  //这些库不用打包处理，但是在html文件中还是需要自己去引用
  externals:{
    'moment': true,
    'jquery':'jQuery',
    'bootstrap':true,
  }
};

config.module.loaders = 
[
    {
        test: /\.js$/,
        include: [srcPath],
        exclude: nodeModulesPath,
        loader: ['babel'],
        //loader: ['react-hot', 'babel'],
        query: {
            //presets: ['es2015', 'react', 'stage-0']  
            presets: ["es2015", "react"],
            "env": {
                "development": {
                    "presets": ["react-hmre"],
                    "plugins": [
                        ["react-transform", {
                            "transforms": [{
                                "transform": "react-transform-hmr",
                                "imports": ["react"],
                                "locals": ["module"]
                            }]
                        }]
                    ]
                }
            },
            // 好像没效果
            // env: {
            //     development: {
            //         plugins: [
            //         ['react-transform', {
            //             transforms: [{
            //             transform: 'react-transform-hmr',
            //             imports: ['react'],
            //             locals: ['module']
            //             }, {
            //             transform: 'react-transform-catch-errors',
            //             imports: ['react', 'redbox-react']
            //             }]
            //         }]
            //         ]
            //     },
            //     production: {
            //         plugins: [
            //         'transform-react-remove-prop-types',
            //         'transform-react-constant-elements'
            //         ]
            //     }
            // }
            // //env end
        }
    },
    // {
    //     test: /\.js$/,
    //     loader: 'babel-loader'
    // }, 
    {
        test: /\.jsx$/,
        loader: 'babel-loader!jsx-loader?harmony'
        //先jsx-loader处理，再babel-loader
    },
    {
        test: /\.less$/,
        loader: 'style-loader!css-loader!autoprefixer-loader!less-loader',
        //loaders: [ExtractTextPlugin.extract('style'), 'css', 'less'],
        // require('./MyComponent.less');
        // 文件可以这样引用less
    },
    {
        test: /\.css$/, 
        //loader: "style!css"
        //分离css单独打包
        loader: ExtractTextPlugin.extract("style-loader", "css-loader")
    },
    {
        test: /\.(png|jpg)$/, 
        //loader: "url-loader?limit=8192",
        loaders: ['url?limit=8192&name=img/[name].[ext]'],
        // <=8k图片被转化成 base64 格式的 dataUrl
    },
    {
        test: /\.(woff|woff2|eot|ttf|svg)(\?.*$|$)/,
        loader: 'url-loader?importLoaders=1&limit=1000&name=/fonts/[name].[ext]'
    }
]
module.exports = config;