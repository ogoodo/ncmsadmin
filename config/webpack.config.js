



console.warn('gulp********** process.env.NODE_ENV=', process.env.NODE_ENV );
const isProduction = function () {
    return process.env.NODE_ENV ? process.env.NODE_ENV.trim()==='production' : false;
};

//console.log(wpconfig)
var cfg;
if (isProduction()){    
    var wpconfig = require('./webpack.prod.config.js')
    cfg = wpconfig;
}else{
    var wpconfig2 = require('./webpack.dev.config.js')
    cfg = wpconfig2;
}

module.exports = cfg;
