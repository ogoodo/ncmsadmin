
/**
 * 这个配置有点麻烦, 以后可以根据pathRewrite动态生成router和pathRewrite两个对象
 */
const config = {
    router: {
        '/api/com/ogoodo/qryList.do' : 'http://localhost:3012', // 这里配置接口走的域名
        '/api/com'                   : 'http://localhost:3011', // 多个域名则配置多个
        '/api'                       : 'http://localhost:3011', // 多个域名则配置多个

        // // when request.headers.host == 'dev.localhost:3000',
        // // override target 'http://www.example.org' to 'http://localhost:8000'
        // 'dev.localhost:3000'         : 'http://localhost:8000',
        // 'integration.localhost:3000' : 'http://localhost:8001',    // host only
        // 'staging.localhost:3000'     : 'http://localhost:8002',    // host only
        // 'localhost:3000/api'         : 'http://localhost:8003',    // host + path
        // '/rest'                      : 'http://localhost:8004',    // path only
    },
    pathRewrite: {
        // // '^/api/com/ogoodo/qryList.do': '/mock/com/ogoodo/qryList.do', // rewrite path
        // // '^/api/com/ogoodo/qryList.do': '/mock/com/ogoodo/test-proxy.1.do',
        // '^/api/com/ogoodo/test-proxy.do': 'http://localhost:3001/mock/com/ogoodo/test-proxy.do',
        // '^/api/com/ogoodo/test-proxy.1.do': 'http://localhost:3011/mock/com/ogoodo/test-proxy.2.do',
        // '/api/com/ogoodo/qryList2.do' : 'http://localhost:3001/mock/com/ogoodo/test-proxy.do',
        // '^/api/old-path': '/api/new-path', // rewrite path
        // '^/api/remove/path': '/path', // remove base path
        '^/api/': '/mock/', // rewrite path
    },
}


module.exports = config;
