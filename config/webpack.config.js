
//console.log('process.env', process.env);

console.warn('webpack.config.js********** process.env.NODE_ENV=', process.env.NODE_ENV)
const isDevelopment = function () {
    const env = process.env.NODE_ENV || ''
    if (env.trim()==='production') {
        return false
    } else if (env.trim()==='stg') {
        return true
    } else if (env.trim()==='development') {
        return true
    } else {
        console.error('无此分支啊:', process.env.NODE_ENV)
    }
    return false
};

let cfg;
if (isDevelopment()) {
    console.log('当前编译环境: development');
    const wpconfig = require('./webpack.config.dev.js')
    cfg = wpconfig;
} else {
    console.log('当前编译环境: production');
    const wpconfig = require('./webpack.config.prod.js')
    cfg = wpconfig;
}

//console.log(cfg)

module.exports = cfg;
