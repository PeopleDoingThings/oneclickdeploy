var path = require('path');
var webpack = require('webpack');

// and `export NODE_ENV='production'` to run in prod

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
  plugins: PROD ?
  [
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false, drop_console: true },
      comments: false,
      minimize: true
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ] : [],
  historyApiFallback: true,
  module: {
    loaders: [
      {
        exclude: /node_modules/,
        loader: 'babel',
        include: __dirname,
        query: {
          presets: [ 'es2015', 'react']
        }
      },
      { test: /\.css$/, loader: "style-loader!css-loader" },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: 'file?name=fonts/[name].[ext]'
      },
      {
        test: /.*\.(gif|png|jpe?g|svg)$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=images/[name].[ext]',
          'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'
        ]
      }
    ]
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
