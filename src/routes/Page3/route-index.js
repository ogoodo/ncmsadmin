module.exports = {
  path: 'Page3',


  getComponent(location, cb) {
      cb(null, require('ui/test/Page3.js'))
  }
}
