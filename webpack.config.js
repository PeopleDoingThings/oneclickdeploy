module.exports = {
  entry: [
    './client/index.js'
  ],
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: './bundle.js'
  },
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
