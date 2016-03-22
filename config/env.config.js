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
    cfg['test'] = {};
    
    cfg['dev_'].baseUrl = 'server .dev_'
    cfg['prod'].baseUrl = 'server .prod'
    cfg['test'].baseUrl = 'server .test'
    
    //console.log('===================000000000000000000000:', envName, ':',cfg[envName]);
    return cfg[envName];    
}
module.exports = init;
