var path = require('path');
var webpack = require('webpack');


// Change index.html to use bundle.min.js instead of bundle.js
// and `export NODE_ENV='production'` to run in prod
//
// TODO  - Add the above to webpack

var PROD = process.env.NODE_ENV === 'production'
if (PROD) console.log('in production')


module.exports = {
  entry: [
    './client/index.js'
  ],
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: PROD ? 'bundle.min.js' : 'bundle.js'
  },
  plugins:
  [
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      comments: false
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ],
  // :
  // // not PROD
  // [],


  //to redirect users back to index page for React to route pages and bypass the browser making http request for such page
  // historyApiFallback: {
  // index: '/'
  // },
  historyApiFallback: true,
  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel',
      include: __dirname,
      query: {
        presets: [ 'es2015', 'react']
      }
    }]
  },
  resolve: {
     alias: {
      react: path.join(__dirname, 'node_modules', 'react')
    },
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    host: 'localhost',
    port: 8080,
    contentBase:'./client/',
    proxy: [{
      path: '/api/*',
      target: 'http://localhost:9001'
    }]
  }
};
