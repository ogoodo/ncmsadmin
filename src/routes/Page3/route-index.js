module.exports = {
  path: 'Page3',


  getComponent(location, cb) {
      cb(null, require('./components/Page3.js'))
  }
}
