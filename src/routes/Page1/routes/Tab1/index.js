module.exports = {
  path: 'Tab1',
  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Tab1'))
    })
  }
}
