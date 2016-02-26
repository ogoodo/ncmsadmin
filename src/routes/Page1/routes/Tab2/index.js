module.exports = {
  path: 'Tab2',
  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Tab2'))
    })
  }
}
