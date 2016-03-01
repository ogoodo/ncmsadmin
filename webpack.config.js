'use strict'
const path = require('path');
const webpack = require('webpack');


// 定义函数判断是否是在当前生产环境，这个很重要，开发环境和生产环境配置上有一些区别
const isProduction = function () {
   // return false;
  return process.env.NODE_ENV === 'production';
};
/** 定义插件
 *  CommonsChunkPlugin 插件会根据各个生成的模块中共用的模块，然后打包成一个common.js 文件。
 *  ProvidePlugin 插件可以定义一个共用的入口，比如 下面加的 React ,他会在每个文件自动require了react，所以你在文件中不需要 require('react')，也可以使用 React。
 */
let plugins = [
    new webpack.optimize.CommonsChunkPlugin({
        name: 'commons',
        filename: 'common/commons.js',
    }),
    new webpack.ProvidePlugin({
        React: 'react',
        ReactDOM: 'react-dom',
        reqwest: 'reqwest',
    }),
    //维持构建编译代码
    new webpack.optimize.OccurenceOrderPlugin(),
    //热替换，热替换和dev-server的hot有什么区别？不用刷新页面，可用于生产环境
    new webpack.HotModuleReplacementPlugin(),
    // 保证编译后的代码永远是对的，因为不对的话会自动停掉
    new webpack.NoErrorsPlugin(),
];
if( isProduction() ) {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      test: /(\.jsx|\.js)$/,
      compress: {
        warnings: false
      },
    })
  );
}


let config = {
  //devtool: 'eval',
  devtool: 'cheap-module-eval-source-map',
  //devtool: isProduction()?null:'source-map',//规定了在开发环境下才使用 source-map
  entry: {
    public: ['webpack-hot-middleware/client', './src/App.js']
  },
  output: {
    //path: path.join(__dirname, 'public/dist'),
    //path: path.join(__dirname, 'dist/'),
    path: path.resolve(__dirname, "build/dist/js/"),
    filename: 'bundle.js',
    chunkFilename: '[chunkhash:8].[id].chunk.js',
    //chunkFilename: debug ? '[chunkhash:8].chunk.js' : 'js/[chunkhash:8].chunk.min.js',
    //publicPath: 'public/dist'
    publicPath: '/dist/js/'
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
            loader: 'babel',
            query: {
                presets: ['react', 'es2015']
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
  }
};
module.exports = config;