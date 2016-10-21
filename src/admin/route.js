module.exports = {
  path: 'admin',
  getChildRoutes(location, cb) {
    console.log('getChildRoutes->testa');
    require.ensure([], (require) => {
      cb(null, [
        require('./test/route.js'),
      ]);
    });
  },
}
