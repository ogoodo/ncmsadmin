const path = require('path')

function formatName(envName) {
    envName = envName ? envName.trim() : 'development'
    envName = envName === 'dev' ? 'dev_' : envName
    envName = envName === 'development' ? 'dev_' : envName
    envName = envName === 'stg' ? 'dev_' : envName
    envName = envName === 'production' ? 'prod' : envName
    return envName;
}

function init() {
}

// // init.ROOT_PATH = path.join(process.cwd(), '..')
// // 运行 npm run cmd的目录
// init.ROOT_PATH = path.join(__dirname, '..')
// // 项目所有输出文件都在这个BUILD目录里面, 包括临时文件
// init.BUILD_PATH = path.join(init.ROOT_PATH, 'build')
// // init.OUT_PATH = path.join(init.BUILD_PATH, '') // development
// // init.DLL_PATH = path.join(OUT_PATH, '') // dist/dll
// console.log(`项目的根目录ROOT_PATH: ${init.ROOT_PATH} ===========================`)
init.checkEvn = function(nodeEnv) {
    if (['development', 'production', 'stg'].indexOf(nodeEnv) <0) {
        console.error('请输入正确的环境(如:development,production,stg): 错误环境:', nodeEnv)
        return false
    }
    return true
}
/**
 * @param {string} nodeEvn development:开发版; production:生产版; stg:测试版(生产版不压缩)
 */
init.initPath = function(nodeEnv) {
    if (!init.checkEvn(nodeEnv)) {
        nodeEnv = 'error-development'
    }
    // 运行 npm run cmd的目录
    init.ROOT_PATH = path.join(__dirname, '..')
    // 项目所有输出文件都在这个BUILD目录里面, 包括临时文件
    init.BUILD_PATH = path.join(init.ROOT_PATH, '__build')
    init.OUT_PATH = path.join(init.BUILD_PATH, nodeEnv)
    init.DLL_PATH = path.join(init.OUT_PATH, 'dist/dll')
    console.log('项目的根目录: ===========================')
    console.log(`     ROOT_PATH: ${init.ROOT_PATH}`)
    console.log(`    BUILD_PATH: ${init.BUILD_PATH}`)
    console.log(`      OUT_PATH: ${init.OUT_PATH}`)
    console.log(`      DLL_PATH: ${init.DLL_PATH}`)
    console.log('')
}
// init.init = function (nodeEvn) {
//     process.env.NODE_ENV = nodeEvn

//     switch (nodeEvn) {
//         case 'development':
//             this.OUT_PATH = path.join(this.ROOT_PATH, 'build/development')
//             break
//         case 'production':
//             this.OUT_PATH = path.join(this.ROOT_PATH, 'build/production')
//             break
//         default:
//             console.error('无此环境变量分支:', nodeEvn)
//     }
//     this.DLL_PATH = path.join(this.OUT_PATH, 'dist/dll')
//     console.log('DLL_PATH:', this.DLL_PATH)
// }

// 浏览器使用的配置项
init.client = function (nodeEnv) {
    if (!init.checkEvn(nodeEnv)) {
        nodeEnv = 'error-development'
    }
    const envName = formatName(nodeEnv);
    const cfg = {}
    cfg.dev_ = {}
    cfg.prod = {}
    cfg.test = {}

    cfg.dev_.baseUrl = 'http://dev.api.xx.com'
    cfg.prod.baseUrl = 'http://api.xx.com'
    cfg.test.baseUrl = 'http://test.api.xx.com'

    //console.log('===================000000000000000000000:', envName, ':',cfg[envName]);
    return cfg[envName]
}
//nodejs使用的配置项
init.server = function (nodeEnv) {
    // if (envName === undefined) {
    //     envName = process.env.NODE_ENV ? process.env.NODE_ENV.trim() : 'development';
    // }
    if (!init.checkEvn(nodeEnv)) {
        nodeEnv = 'error-development'
    }
    const envName = formatName(nodeEnv);
    const cfg = {}
    cfg.dev_ = {};
    cfg.prod = {};

    cfg.dev_.publicPath = '/'
    cfg.prod.publicPath = 'http://127.0.0.1:3001/'
    // cfg.prod.publicPath = 'http://www.ogoodo.com:3001/'

    // cfg.dev_.vendorsFilename = 'dist/js/[id].vendors.js'
    // cfg.prod.vendorsFilename = 'dist/js/[id].vendors.[hash:8].js'
    cfg.dev_.vendorsFilename = 'dist/js/[id].[name].js'
    cfg.prod.vendorsFilename = 'dist/js/[id].[name].[hash:8].js'

    cfg.dev_.cssFilename = 'dist/css/[id].[name].css'
    cfg.prod.cssFilename = 'dist/css/[id].[name].[hash:8].css'

    cfg.dev_.outputFilename = 'dist/js/[id].[name].js'
    cfg.prod.outputFilename = 'dist/js/[id].[name].[chunkhash:8].js'

    cfg.dev_.outputChunkFilename = 'dist/js/[id].chunk.js'
    cfg.prod.outputChunkFilename = 'dist/js/[id].[chunkhash:8].chunk.js'

    //console.log('===================000000000000000000000:', envName, ':',cfg[envName]);
    return cfg[envName]
}
module.exports = init;
