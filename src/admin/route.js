module.exports = {
  path: 'admin',
  // component: require('./PageView.jsx'),
  getChildRoutes(location, cb) {
    // console.log('getChildRoutes->admin');
    require.ensure([], (require) => {
      // console.log('getChildRoutes->admin->ensure');
      cb(null, [
        require('./test/route.js'),
      ]);
    }, 'admin');
  },
}
