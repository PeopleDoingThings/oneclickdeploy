module.exports = {
  entry: [
    './client/index.js'
  ],
  output: {
    path: __dirname,
    publicPath: '/',
    filename: './client/bundle.js'
  },
  //to redirect users back to index page for React to route pages and bypass the browser making http request for such page
  // historyApiFallback: {
  // index: '/'
  // },

  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel',
      include: __dirname,
      query: {
        presets: [ 'es2015', 'react', 'react-hmre' ]
      }
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    contentBase: './client',
    historyApiFallback: true
  }
};
