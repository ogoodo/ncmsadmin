import gulp from 'gulp'
import gutil from 'gulp-util'
import watch from 'gulp-watch'
import babel from 'gulp-babel'
import webpack from 'webpack'
import jsdoc from 'gulp-jsdoc3'
import WebpackDevServer from 'webpack-dev-server'

// import webpackConfigProd from './config/webpack.prod.1.config.js';
// import webpackConfigDev from './config/webpack.dev.1.config.js';
//import webpackConfigProd from './config/webpack.config.js';
//import webpackConfig  from './config/webpack.config.js'

//console.log(webpackConfigDev)

// console.warn('gulp********** process.env.NODE_ENV=', process.env.NODE_ENV );
// const isDevelopment = function () {
//     return process.env.NODE_ENV ? process.env.NODE_ENV.trim()==='development' : false;
// };

/**
 * 如果js文件格式不合要求生成jsdoc的时候会报错误(esprima), 但是又不会提出什么错误
 * jsdoc估计是基于AST的, 如果js有错误， 他生成就会报错:ogoodo.com:2016.3.30
 * jsdoc3支持es6，jsx
 * 参考: https://github.com/jsdoc3/jsdoc
 */
gulp.task('make:jsdoc', function () {
    const config = require('./config/jsdoc.config.json');
    return gulp
    //.src(['./src/*.js', './src/*.jsx'])
    .src(['./src/*.js', './jsdoc3/*.js'])
    .pipe(jsdoc(config))
    //.pipe(jsdoc('./doc-output'))
})

gulp.task('html', function () {  
    return gulp
    .src(['./src/*.html'])
    .pipe(gulp.dest('./build/'));  
});

// transform
gulp.task('transform', () => {
  return gulp.src('server/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('lib'));
});

// watch transform
gulp.task('watch-transform', () => {
  return gulp.src('server/**/*.js')
    .pipe(watch('server/**/*.js', {
      verbose: true
    }))
    .pipe(babel())
    .pipe(gulp.dest('lib'));
});

gulp.task('webpack:build', (callback) => {
  const webpackConfig  = require('./config/webpack.config.js')
  // modify some webpack config options
  var myConfig = Object.create( webpackConfig);
//   myConfig.plugins = myConfig.plugins.concat(
//     new webpack.DefinePlugin({
//       'process.env': {
//         // This has effect on the react lib size
//         'NODE_ENV': JSON.stringify('production')
//       }
//     }),
//     new webpack.optimize.DedupePlugin(),
//     new webpack.optimize.UglifyJsPlugin()
//   );

  // run webpack
    webpack(myConfig, (err, stats) => {
        if (err){
            throw new gutil.PluginError('webpack:build', err);
        }
        gutil.log('[webpack:build]', stats.toString({
            colors: true
        }));
        callback();
    });
});

gulp.task('webpack-dev-server', (callback) => {
  const webpackConfig  = require('./config/webpack.config.js')
  // modify some webpack config options
  var myConfig = Object.create(webpackConfig);
  myConfig.devtool = 'eval';
  myConfig.debug = true;

  // Start a webpack-dev-server
  new WebpackDevServer(webpack(myConfig), {
    publicPath:  myConfig.output.publicPath,
    stats: {
      colors: true
    }
  }).listen(3001, 'localhost', (err) => {
    if (err) throw new gutil.PluginError('webpack-dev-server', err);
    gutil.log('[webpack-dev-server]', 'http://localhost:3001/');
  });
});


gulp.task('default', ['watch-transform', 'webpack-dev-server']);

//执行 gulp prod 打包到dist目录， 部署直接部署dist目录即可
gulp.task('prod', ['html', 'webpack:build']);//, 'transform', 'watch-transform'

// 生成jsdoc帮助文档
gulp.task('jsdoc', ['make:jsdoc'])
