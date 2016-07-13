module.exports = {
  path: 'Page1',

  getChildRoutes(location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./Tab1'),
        require('./Tab2')
      ])
    })
  },

  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('ui/test/Page1'))
    })
  }
}
