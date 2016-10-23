const path = require('path')

function formatName(envName) {
    envName = envName ? envName.trim() : 'development'
    envName = envName === 'dev' ? 'dev_' : envName
    envName = envName === 'development' ? 'dev_' : envName
    envName = envName === 'production' ? 'prod' : envName
    return envName;
}

function init() {
}

// init.ROOT_PATH = path.join(process.cwd(), '..')
init.ROOT_PATH = path.join(__dirname, '..')
console.log(`项目的根目录ROOT_PATH: ${init.ROOT_PATH} ===========================`)

init.init = function (nodeEvn) {
    process.env.NODE_ENV = nodeEvn

    switch (nodeEvn) {
        case 'development':
            this.OUT_PATH = path.join(this.ROOT_PATH, 'build/development')
            break
        case 'production':
            this.OUT_PATH = path.join(this.ROOT_PATH, 'build/production')
            break
        default:
            console.error('无此环境变量分支:', nodeEvn)
    }
    this.DLL_PATH = path.join(this.OUT_PATH, 'dist/dll')
    console.log('DLL_PATH:', this.DLL_PATH)
}

// 浏览器使用的配置项
init.client = function (envName) {
    envName = formatName(envName);
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
init.server = function (envName) {
    if (envName === undefined) {
        envName = process.env.NODE_ENV ? process.env.NODE_ENV.trim() : 'development';
    }
    envName = formatName(envName);
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
