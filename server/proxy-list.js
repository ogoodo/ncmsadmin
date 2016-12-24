
module.exports = {
    '^/mock/com/ogoodo/qryList.do': '/mock/com/ogoodo/test-proxy.1.do',
    '^/api/old-path': '/api/new-path', // rewrite path
    '^/api/remove/path': '/path', // remove base path
}
