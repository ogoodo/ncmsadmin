import path from 'path'
import fs from 'fs'
import readline from 'readline'
import gulp from 'gulp'
import gutil from 'gulp-util'
import watch from 'gulp-watch'
import babel from 'gulp-babel'
import replace from 'gulp-replace'
import gulpif from 'gulp-if'
import del from 'del' // rm -rf
import webpack from 'webpack'
import jsdoc from 'gulp-jsdoc3'
import WebpackDevServer from 'webpack-dev-server'
import config from './env.config.js'
import program from 'commander'
import run from 'gulp-run'

let isDll = false
let isBuild = false
let _hasDll = false // 判断是否已经有生成dll了
let _nodeEnv = 'error-development'
/*
d 开发版 内存
s 测试版 文件
p 生成版 文件
r 生成版, 但不启动web服务器
*/

program
    .version('0.0.1')
    .usage('[options] [value ...]')
    .option('--NODE_ENV, --nodeEnv <string>', 'a string argument')

// 解析commandline arguments
program.parse(process.argv)
console.log('命令行参数NODE_ENV:', program.nodeEnv)
if (program.nodeEnv) {
    config.initPath(program.nodeEnv)
}
// 判断是否有存在DLL文件
{
    const dllFiles = getAllDllFiles()
    if (dllFiles) {
        _hasDll = true;
    }
}
// 命令解析库 npm install commander --save-dev http://witcheryne.iteye.com/blog/1196170
// const outCurInfo = false;
// if (outCurInfo) {
//     console.info('gulp运行目录: ', process.cwd())
//     console.info('gulp运行参数: ', process.argv)
//     const argv = process.argv
//     argv.forEach((item) => {
//         if (item.indexOf('--NODE_ENV=')===0) {
//             const nodeenv = item.replace('--NODE_ENV=', '')
//             console.info('gulp打包版本: ', nodeenv)
//             process.env.NODE_ENV = nodeenv;
//         }
//     })
// }

gulp.task('user.select', (callback) => {
    const info = `
    l:  生成dll
    d:  开发版    注意要先编译dll
    s:  测试版    注意要先编译dll
    p:  生产版    注意要先编译dll
    ld: 开发版及dll
    ls: 
    lp: 
    请选择你想编译的版本(退出ctrl＋c)
    `.substr(1)
    console.log(info)
    function parserArgument(code) {
        switch (code) {
            case 'l':
                isDll = true
                _nodeEnv = 'development'
                break
            case 'd':
                isBuild = true
                _nodeEnv = 'development'
                break
            case 's':
                isBuild = true
                _nodeEnv = 'development'
                break
            case 'p':
                isBuild = true
                _nodeEnv = 'production'
                break
            default:
                console.error('未知code:', code)
        }
    }
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    })
    rl.on('line', (line) => {
        line = line.trim()
        console.log(`您选择了: ${line}`)
        if (['l', 'd', 's', 'p', 'ld', 'ls', 'lp'].indexOf(line) === -1) {
            console.log('请选择正确的版本')
        } else {
            rl.close()
            for (const a of line) {
                console.log('处理:', a)
                parserArgument(a)
            }
            // 没有dll的情况下才生成dll
            isDll = !_hasDll || isDll
            process.env.NODE_ENV = _nodeEnv
            config.initPath(_nodeEnv)
            console.log('用户选择参数解析完成!')
            callback() // 如果 err 不是 null 和 undefined，流程会被结束掉，后面的任务不会被执行
        }
    })
})

gulp.task('clean:dll', ['user.select'], function (callback) {
    // del([`${config.OUT_PATH}/**/*`], { force: true }, () => {
    //     console.log('删除文件:', `${config.OUT_PATH}/**/*`)
    //     callback()
    // })
    // 这里好像是同步的, 异步不行
    console.log('删除文件:', `${config.OUT_PATH}/**/*`)
    del([`${config.OUT_PATH}/**/*`], { force: true })
    .then(() => {
        callback()
    })
});


gulp.task('html', ['user.select', 'clean:dll'], function () {
    return gulp
    .src(['../src/template/*.html'])
    .pipe(gulpif(!isDll, gulp.dest(config.OUT_PATH)))
});

gulp.task('copy:font', ['user.select', 'clean:dll'], function () {
    return gulp
    .src(['../src/font/**'])
    .pipe(gulp.dest(config.OUT_PATH+'/font'))
    // .pipe(gulpif(!isDll, gulp.dest(config.OUT_PATH)))
});

function getAllDllFiles() {
    let doc = '';
    const files = fs.readdirSync(config.DLL_PATH);
    files.forEach(function (item) {
        //if(item.indexOf('.js')>=0) {
        if (/^dll\..+\.js$/g.test(item)) {
            doc += `<script src="/dist/dll/${item}"></script>\r\n`;
        }
    }, this);
    console.log('gulp:替换ejs模版文件名: ', doc);
    return doc;
}



gulp.task('webpack:dll', ['user.select', 'clean:dll'], (callback) => {
  if (!isDll) {
      callback()
      return;
  }
  const webpackConfig  = require('../config/webpack.config.dll.js')
  const myConfig = Object.create(webpackConfig);
    webpack(myConfig, (err, stats) => {
        if (err) {
            throw new gutil.PluginError('webpack:build', err);
        }
        gutil.log('[webpack:build]', stats.toString({
            colors: true
        }));
        callback();
    });
});

/**
 * 生成dll后生成ejs模板, 将dll的js写入ejs模板
 */
gulp.task('do.dll.ejs.template', ['user.select', 'webpack:dll'], function () {
    if (!isDll) {
        return false;
    } else {
        const filenames = getAllDllFiles();
        return gulp
        .src(['../src/template/*.ejs'])
        .pipe(gulpif(isDll, replace(/<!--dll.js.file.replace-->/g, filenames)))
        .pipe(gulp.dest(path.join(config.OUT_PATH, 'template')))
    }
});

gulp.task('webpack:build', ['webpack:dll', 'do.dll.ejs.template'], (callback) => {
  if (!isBuild) {
      return;
  }
  const webpackConfig  = require('../config/webpack.config.js')
  const myConfig = Object.create(webpackConfig);
    webpack(myConfig, (err, stats) => {
        if (err) {
            throw new gutil.PluginError('webpack:build', err);
        }
        gutil.log('[webpack:build]', stats.toString({
            colors: true
        }));
        callback();
    });
});

// 执行 gulp prod 打包到dist目录， 部署直接部署dist目录即可
gulp.task('prod', [
    'user.select',
    'clean:dll',
    'html',
    'webpack:dll',
    'do.dll.ejs.template',
    'copy:font',
    'webpack:build',
    'run:static.server'
    ]);
//, 'transform', 'watch-transform'
// gulp.task('prod', ['html', 'webpack:build']);//, 'transform', 'watch-transform'


/**
 * 如果js文件格式不合要求生成jsdoc的时候会报错误(esprima), 但是又不会提出什么错误
 * jsdoc估计是基于AST的, 如果js有错误， 他生成就会报错:ogoodo.com:2016.3.30
 * jsdoc3支持es6，jsx
 * 参考: https://github.com/jsdoc3/jsdoc
 */
gulp.task('make:jsdoc', function() {
    const cfg = require('../config/jsdoc.config.json')
    return gulp
    //.src(['./src/*.js', './src/*.jsx'])
    // .src(['../src/*.js', '../jsdoc3/*.js'])
    .src(['../src/*.js'])
    .pipe(jsdoc(cfg))
    //.pipe(jsdoc('./doc-output'))
})

// 生成jsdoc帮助文档
gulp.task('jsdoc', ['make:jsdoc'])

gulp.task('run:static.server', function() {
    const output = path.join(config.BUILD_PATH, 'output')
    console.log('gulp启动服务器日志目录:', output)
    return run('npm run dev', { cwd: config.ROOT_PATH, verbosity: 3, silent: true })
    .exec()
    // .pipe(gulp.dest(output)) // 这里怎么输出位置定位不准:by:chenxiaobo:2016.10.29
})
gulp.task('runcmd', ['run:static.server'])

// transform
gulp.task('transform', () => {
  return gulp.src('../server/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('lib'));
});

// watch transform
gulp.task('watch-transform', () => {
  return gulp.src('../server/**/*.js')
    .pipe(watch('../server/**/*.js', {
      verbose: true
    }))
    .pipe(babel())
    .pipe(gulp.dest('lib'));
});

// gulp.task('webpack-dev-server', (callback) => {
//   const webpackConfig  = isDll ?
//     require('../config/webpack.config.dll.js') :
//     require('../config/webpack.config.js')
//     console.log(webpackConfig)
//   // modify some webpack config options
//   const myConfig = Object.create(webpackConfig);
//    myConfig.devtool = 'eval';
//    myConfig.debug = true;

//   // Start a webpack-dev-server
//   new WebpackDevServer(webpack(myConfig), {
//     publicPath:  myConfig.output.publicPath,
//     stats: {
//       colors: true
//     }
//   }).listen(3001, 'localhost', (err) => {
//     if (err) throw new gutil.PluginError('webpack-dev-server', err);
//     gutil.log('[webpack-dev-server]', 'http://localhost:3001/');
//   });
// });


// gulp.task('default', ['watch-transform', 'webpack-dev-server']);


// function readSyncByfs(tips) {
//     var response;

//     tips = tips || '> ';
//     process.stdout.write(tips);
//     process.stdin.pause();
//     response = fs.readSync(process.stdin.fd, 1000, 0, 'utf8');
//     process.stdin.end();
//     return response[0].trim();
// }
// console.log(readSyncByfs('请输入任意字符：'));

//
// var ttt = 3
// const buf = new Buffer(50)
// function readSyn() {
//     // process.stdin.resume()
//     process.stdin.pause()
//     const res = fs.readSync(process.stdin.fd, buf, 10, 0, 'utf-8')
//     process.stdin.resume()
//     console.log(buf, res)
//     // return res[0].trim()
// }
// console.log('请选择: ');
// console.log('你选择了: ', readSyn());

// return;
// import webpackConfigProd from './config/webpack.prod.1.config.js';
// import webpackConfigDev from './config/webpack.dev.1.config.js';
//import webpackConfigProd from './config/webpack.config.js';
//import webpackConfig  from './config/webpack.config.js'

//console.log(webpackConfigDev)

// console.warn('gulp********** process.env.NODE_ENV=', process.env.NODE_ENV );
// const isDevelopment = function () {
//     return process.env.NODE_ENV ? process.env.NODE_ENV.trim()==='development' : false;
// };
