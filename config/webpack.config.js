'use strict'

//console.log('process.env', process.env);

console.warn('webpack.config.js********** process.env.NODE_ENV=', process.env.NODE_ENV );
const isDevelopment = function () {
    // return process.env.NODE_ENV ? process.env.NODE_ENV.trim()==='development' : true;
    return process.env.NODE_ENV ? process.env.NODE_ENV.trim()!=='production' : false;
};

let cfg;
if (isDevelopment()){
    console.log('当前编译环境: development');
    let wpconfig = require('./webpack.config.dev.js')
    cfg = wpconfig;
}else{
    console.log('当前编译环境: production');
    let wpconfig = require('./webpack.config.prod.js')
    cfg = wpconfig;
}

//console.log(cfg)

module.exports = cfg;
