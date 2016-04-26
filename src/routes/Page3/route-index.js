module.exports = {
  path: 'Page3',


  getComponent(location, cb) {
      cb(null, require('ui/Page3.js'))
  }
}
