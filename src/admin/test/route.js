
module.exports = {
    path: 'test',
    getChildRoutes(location, cb) {
      // console.log('getChildRoutes->test');
      cb(null, [
        require('./testa/route.js'),
        // 新增1 此处新页面的路由
      ]);
    }
    // 动态加载, 会分得太细了, 会造成调整页面加载多个js文件
    // getChildRoutes(location, cb) {
    //   console.log('getChildRoutes->test');
    //   require.ensure([], (require) => {
    //     cb(null, [
    //      require('./testa/route.js'),
    //      // 新增1 此处新页面的路由
    //     ]);
    //   }, 'admin/test');
    // }
}
