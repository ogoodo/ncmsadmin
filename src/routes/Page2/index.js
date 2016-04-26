module.exports = {
  path: 'Page2',

  getChildRoutes(location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('../Page1/Tab1/index.js'),
        require('../Page1/Tab2')
      ])
    })
  },

  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('ui/Page2.js'))
    })
  }
}
