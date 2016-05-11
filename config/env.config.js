'use strict'

function formatName(envName){    
    envName = envName?envName.trim():'development';
    envName = envName==='dev'?'dev_':envName;
    envName = envName==='development'?'dev_':envName;
    envName = envName==='production'?'prod':envName;
    return envName;
}

function init (envName){
}
//浏览器使用的配置项
init.client = function(envName){
    envName = formatName(envName);
    let cfg = {}
    cfg['dev_'] = {};
    cfg['prod'] = {};
    cfg['test'] = {};
    
    cfg['dev_'].baseUrl = 'http://dev.api.xx.com'
    cfg['prod'].baseUrl = 'http://api.xx.com'
    cfg['test'].baseUrl = 'http://test.api.xx.com'
    
    //console.log('===================000000000000000000000:', envName, ':',cfg[envName]);
    return cfg[envName];    
}
//nodejs使用的配置项
init.server = function(envName){
    if(envName === undefined){
        envName = process.env.NODE_ENV ? process.env.NODE_ENV.trim() : 'development';
    }
    envName = formatName(envName);
    let cfg = {}
    cfg['dev_'] = {};
    cfg['prod'] = {};
    
    cfg['dev_'].publicPath = '/'
    cfg['prod'].publicPath = 'http://127.0.0.1:3001/'
    // cfg['prod'].publicPath = 'http://www.ogoodo.com:3001/'
    
    // cfg['dev_'].vendorsFilename = 'dist/js/[id].vendors.js'
    // cfg['prod'].vendorsFilename = 'dist/js/[id].vendors.[hash:8].js'
    cfg['dev_'].vendorsFilename = 'dist/js/[id].[name].js'
    cfg['prod'].vendorsFilename = 'dist/js/[id].[name].[hash:8].js'
    
    cfg['dev_'].cssFilename = 'dist/css/[id].[name].css'
    cfg['prod'].cssFilename = 'dist/css/[id].[name].[hash:8].css'
    
    cfg['dev_'].outputFilename = 'dist/js/[id].[name].js'
    cfg['prod'].outputFilename = 'dist/js/[id].[name].[chunkhash:8].js'
    
    cfg['dev_'].outputChunkFilename = 'dist/js/[id].chunk.js'
    cfg['prod'].outputChunkFilename = 'dist/js/[id].[chunkhash:8].chunk.js'
    
    //console.log('===================000000000000000000000:', envName, ':',cfg[envName]);
    return cfg[envName];    
}
module.exports = init;
