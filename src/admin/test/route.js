
export default {
    path: 'test',
    getChildRoutes(location, cb) {
      require.ensure([], (require) => {
        cb(null, [
         require('./testa/route.js'),
         // 新增1 此处新页面的路由
        ]);
      }, 'admin/test/testa');
    }
}
