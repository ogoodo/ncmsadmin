var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('../config/webpack.config.js');


new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true
})
.listen(3001, 'localhost', function (err, result) {  
      if (err) console.log(err);  
      console.log('Listening at localhost:3000');
});