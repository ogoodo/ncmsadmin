module.exports = {
  path: 'Page1',

  getChildRoutes(location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/Tab1'),
        require('./routes/Tab2')
      ])
    })
  },

  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Page1'))
    })
  }
}
