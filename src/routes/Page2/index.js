module.exports = {
  path: 'Page2',

  getChildRoutes(location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('../Page1/routes/Tab1/index.js'),
        require('../Page1/routes/Tab2')
      ])
    })
  },

  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Page2.js'))
    })
  }
}
