// const ui = require('./index.js')
// import position from './index.js'

// console.log('ui:::', ui, position)

export default {
  path: 'testa', // 改动1:  路由名称, 这个要改成和路由一致
  // component: require('./index.js'),
  getComponent(nextState, cb) {
    // console.log('getComponent->testa')
    // cb(null, require('./index.js'));
    require.ensure([], (require) => {
      // console.log('getComponent->testa->ensure');
      cb(null, require('./index.js'));
      // cb(null, require('./PageView.jsx'));
    }, 'admin/test/testa') // 改动2:  打包生成到文件目录, 这个要改成和路由一致
  },
}
