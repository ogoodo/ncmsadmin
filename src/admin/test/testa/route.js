

export default {
  path: 'testa', // 改动1:  路由名称, 这个要改成和路由一致
  getComponent(nextState, cb) {
    console.log('getComponent->testa');
    require.ensure([], (require) => {
      cb(null, require('./index.js'));
    }, 'admin/test/testa') // 改动2:  打包生成到文件目录, 这个要改成和路由一致
  },
}
