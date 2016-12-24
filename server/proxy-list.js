
module.exports = {
    // '^/api/com/ogoodo/qryList.do': '/mock/com/ogoodo/qryList.do', // rewrite path
    // '^/api/com/ogoodo/qryList.do': '/mock/com/ogoodo/test-proxy.1.do',
    '^/api/old-path': '/api/new-path', // rewrite path
    '^/api/remove/path': '/path', // remove base path
    '^/api/': '/mock/', // rewrite path
}
