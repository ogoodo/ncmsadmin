

//console.log('process.env', process.env);

console.warn('webpack.config.js********** process.env.NODE_ENV=', process.env.NODE_ENV );
const isDevelopment = function () {
    return process.env.NODE_ENV ? process.env.NODE_ENV.trim()==='development' : false;
};

var cfg;
if (isDevelopment()){    
    var wpconfig2 = require('./webpack.dev.config.js')
    cfg = wpconfig2;
}else{
    var wpconfig = require('./webpack.prod.config.js')
    cfg = wpconfig;
}

//console.log(cfg)

module.exports = cfg;
