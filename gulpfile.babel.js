import gulp from 'gulp';
import gutil from 'gulp-util';
import watch from 'gulp-watch';
import babel from 'gulp-babel';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

// import webpackConfigProd from './config/webpack.prod.1.config.js';
// import webpackConfigDev from './config/webpack.dev.1.config.js';
import webpackConfigProd from './config/webpack.config.js';
import webpackConfigDev  from './config/webpack.config.js';

console.log(webpackConfigDev)

console.warn('gulp********** process.env.NODE_ENV=', process.env.NODE_ENV );
const isProduction = function () {
    return process.env.NODE_ENV ? process.env.NODE_ENV.trim()==='production' : false;
};

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
  // modify some webpack config options
  var myConfig = Object.create(isProduction ? webpackConfigProd : webpackConfigDev);
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
