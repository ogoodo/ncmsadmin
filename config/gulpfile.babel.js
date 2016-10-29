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

let _nodeEnv = 'error-development'
let _isDll = true // 生成dll文件, 默认每次都新生成, 避免用户dll不是最新
let _isBuild = false // 打包到文件
let _hasDll = false // 判断是否已经有生成dll了
let _staticServer = false // 静态文件服务器 测试和生成验证用
let _memoryServer = false // 内存服务器, 开发用

program
    .version('0.0.1')
    .usage('[options] [value ...]')
    .option('--NODE_ENV, --nodeEnv <string>', 'a string argument')
    .option('--dspr, --dspr <string>', 'a string argument')
    .option('--dll, --dll <string>', '是否重新生成dll')

// 解析commandline arguments
program.parse(process.argv)
console.log('命令行参数*****************:')
console.log('  NODE_ENV:', program.nodeEnv) // 没启用
console.log('      dspr:', program.dspr)
console.log('       dll:', program.dll) // 没启用
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

// 获取用户选择的参数
function getCmdArgs(callback) {
    const info = `
    d 开发版 内存 不压缩代码
    s 测试版 文件 不压缩代码
    p 生成版 文件 压缩代码
    r 生成版 文件 压缩代码  不启动web服务器
    请选择你想编译的版本(退出ctrl＋c)
    `.substr(1)
    console.log(info)
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    })
    rl.on('line', (line) => {
        line = line.trim()
        console.log(`您选择了: ${line}`)
        if (['l', 'd', 's', 'p', 'r', 'ld', 'ls', 'lp'].indexOf(line) === -1) {
            console.log('请选择正确的版本')
        } else {
            rl.close()
            callback(line) // 如果 err 不是 null 和 undefined，流程会被结束掉，后面的任务不会被执行
        }
    })
}

gulp.task('user.select', (callback) => {
    function parserArgument(code) {
        switch (code) {
            case 'd':
                _nodeEnv = 'development'
                _memoryServer = true
                break
            case 's':
                _isBuild = true
                _nodeEnv = 'stg'
                _staticServer = true
                break
            case 'p':
                _isBuild = true
                _nodeEnv = 'production'
                _staticServer = true
                break
            case 'r':
                _isBuild = true
                _nodeEnv = 'production'
                break
            default:
                console.error('未知code:', code)
        }
    }
    function deelChoose (line) {
        for (const a of line) {
            console.log('处理:', a)
            parserArgument(a)
        }
        // 没有dll的情况下才生成dll
        _isDll = !_hasDll || _isDll
        process.env.NODE_ENV = _nodeEnv
        config.initPath(_nodeEnv)
        console.log('用户选择参数解析完成!')
        callback()
    }
    if (program.dspr) {
        deelChoose(program.dspr)
    } else {
        getCmdArgs(deelChoose)
    }
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
    .pipe(gulpif(!_isDll, gulp.dest(config.OUT_PATH)))
});

gulp.task('copy:font', ['user.select', 'clean:dll'], function () {
    return gulp
    .src(['../src/font/**'])
    .pipe(gulp.dest(config.OUT_PATH+'/font'))
    // .pipe(gulpif(!_isDll, gulp.dest(config.OUT_PATH)))
});

function getAllDllFiles() {
    let doc = '';
    try {
        const files = fs.readdirSync(config.DLL_PATH);
        files.forEach(function (item) {
            //if(item.indexOf('.js')>=0) {
            if (/^dll\..+\.js$/g.test(item)) {
                doc += `<script src="/dist/dll/${item}"></script>\r\n`;
            }
        }, this);
        console.log('gulp:替换ejs模版文件名: ', doc);
    } catch (error) {
        // console.log()
    }
    return doc;
}



gulp.task('webpack:dll', ['user.select', 'clean:dll'], (callback) => {
  if (!_isDll) {
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
    if (!_isDll) {
        return false;
    } else {
        const filenames = getAllDllFiles();
        return gulp
        .src(['../src/template/*.ejs'])
        .pipe(gulpif(_isDll, replace(/<!--dll.js.file.replace-->/g, filenames)))
        .pipe(gulp.dest(path.join(config.OUT_PATH, 'template')))
    }
});

gulp.task('webpack:build', ['webpack:dll', 'do.dll.ejs.template'], (callback) => {
    if (!_isBuild) {
        callback();
        return false;
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
    return false;
});

gulp.task('run:static.server', ['webpack:build'], function() {
    const output = path.join(config.BUILD_PATH, 'output')
    console.log('gulp启动服务器日志目录:', output)
    let cmmstr = ''
    if (_memoryServer) {
        cmmstr = 'npm run start-dev'
    } else if (_staticServer) {
        if (_nodeEnv === 'stg') {
            cmmstr = 'npm run start-stg'
        } else if (_nodeEnv === 'production') {
            cmmstr = 'npm run start-pro'
        } else {
            console.warn('启动服务器,请选择development或production')
        }
    } else {
        console.log('没有启动内存服务器也没有启动静态文件服务器')
    }
    if (cmmstr) {
        return run(cmmstr, { cwd: config.ROOT_PATH, verbosity: 3, silent: true })
        .exec()
    }
    // .pipe(gulp.dest(output)) // 这里怎么输出位置定位不准:by:chenxiaobo:2016.10.29
})

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
//   const webpackConfig  = _isDll ?
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
