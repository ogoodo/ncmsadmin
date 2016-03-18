'use strict'
const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

//const BUILD_PATH = path.resolve(__dirname, "build/dist/js/");
const BUILD_PATH = path.resolve(__dirname, "build");
const PUBLIC_PATH = '/';
//const PUBLIC_PATH = '/dist/js/';//path.resolve(__dirname, "build/dist/js/");
const minSize = 500*1000;

console.warn('********** process.env.NODE_ENV=', process.env.NODE_ENV );
// 定义函数判断是否是在当前生产环境，这个很重要，开发环境和生产环境配置上有一些区别
const isProduction = function () {
    const prod = process.env.NODE_ENV?process.env.NODE_ENV.trim():'';
    return prod === 'production';
};
/** 定义插件
 *  CommonsChunkPlugin 插件会根据各个生成的模块中共用的模块，然后打包成一个common.js 文件。
 *  ProvidePlugin 插件可以定义一个共用的入口，比如 下面加的 React ,他会在每个文件自动require了react，所以你在文件中不需要 require('react')，也可以使用 React。
 */
let plugins = [
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendors',
        minChunks: 2,//一个文件至少被require两次才能放在CommonChunk里
        filename: 'dist/js/common/vendors.js',
    }),
    new webpack.ProvidePlugin({
        React: 'react',
        ReactDOM: 'react-dom',
        reqwest: 'reqwest',
        //以下两项为了使用fetch
        Promise: 'imports?this=>global!exports?global.Promise!es6-promise',
        fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch',
    }),
    // 使用whatwg-fetch在webpack的
    //new webpack.ProvidePlugin({'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'}),
    //维持构建编译代码
    //new webpack.optimize.OccurenceOrderPlugin(),
    //热替换，热替换和dev-server的hot有什么区别？不用刷新页面，可用于生产环境
    new webpack.HotModuleReplacementPlugin(),
    // 保证编译后的代码永远是对的，因为不对的话会自动停掉
    new webpack.NoErrorsPlugin(),
    new CopyWebpackPlugin([
            //{ from: 'src/index.html', to: '../../to/test.html' },
            { from: 'src/index.html', to: '/test.html' },
            ],
            {ignore:[ '*.txt',]}
     ),
];
if( isProduction() ) {
    console.warn('********** isProduction()=', isProduction() );
    plugins.push(
        new webpack.optimize.UglifyJsPlugin({
        test: /(\.jsx|\.js)$/,
        compress: {
            warnings: false
        },
        })
    );
    plugins.push(
        new webpack.DefinePlugin({ "process.env": { NODE_ENV: JSON.stringify("production")} })
    );
    //plugins.push(  new webpack.optimize.MinChunkSizePlugin(minSize)  );
}

let config = {
  //devtool: 'eval',
  devtool: 'cheap-module-eval-source-map',
  //devtool: isProduction()?null:'source-map',//规定了在开发环境下才使用 source-map
  entry: {
    vendors: ["react", "react-dom"],
    //public: ['webpack-hot-middleware/client', './src/App.js']
    public: ['webpack/hot/dev-server', './src/App.js']
  },
  output: {
    //path: path.join(__dirname, 'public/dist'),
    //path: path.join(__dirname, 'dist/'),
    path: BUILD_PATH,
    filename: 'dist/js/bundle.js',
    chunkFilename: 'dist/js/[chunkhash:8].[id].chunk.js',
    //chunkFilename: debug ? '[chunkhash:8].chunk.js' : 'js/[chunkhash:8].chunk.min.js',
    //publicPath: 'public/dist'
    publicPath: PUBLIC_PATH,
    //publicPath: isProduction()? 'http://******' : 'http://localhost:3000',
  },
  plugins: plugins,
  resolve: {
    root: [process.cwd() + '/src', process.cwd() + '/node_modules'],
    //fallback: [path.join(__dirname, 'node_modules') ],
    //用于指明程序自动补全识别哪些后缀
    extensions: ['', '.js', '.jsx'],
    //别名, 其他可以直接用 require("js/main.js");加载
    alias: {
        js: path.join(__dirname, "./app/components")
    }
  },
  //resolveLoader: {fallback: [path.join(__dirname, 'node_modules')]},
  module: {
    loaders: [
        {
            test: /\.js$/,
            include: [path.join(__dirname, '/src')],
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                //presets: ['react', 'es2015']  
                presets: ["es2015", "react"]
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
            loader: 'style-loader!css-loader!autoprefixer-loader!less-loader'
            // require('./MyComponent.less');
            // 文件可以这样引用less
        },
        {
            test: /\.css$/, 
            loader: "style!css"
        },
        {
            test: /\.(png|jpg)$/, 
            loader: "url-loader?limit=8192"
            // <=8k图片被转化成 base64 格式的 dataUrl
        }
    ]
  },
  // 配置webpack-dev-server  当代码更新的时候自动刷新浏览器
  devServer: { 
      historyApiFallback: true, 
      hot: true, 
      inline: true, 
      progress: true, 
  },
};
module.exports = config;
