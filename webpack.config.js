require('webpack');
var path = require("path");
module.exports = {
  entry: [
    './src/index.js'
  ],
  devtool: '#source-map',
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: '',
    filename: 'bundle.js'
  },
  resolve: {
    extensions: [ '', '.js', '.jsx' ]
  },

  module: {
    noParse: [
      path.resolve('node_modules/quill/dist/quill.js') //npm 3
    ],
    loaders: [
    /**
     This includes modules that we create in the babel loader
     This means that we can use es6 style modules in external
     components without the need to build then.
     */
      {
        test: /\.js$/,
        include: /@cdlo/,
        loader: 'babel',
        query: {
          plugins: [ 'transform-runtime' , 'transform-decorators-legacy' ],
          presets: [ 'react', 'es2015', "react-native"] }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          plugins: [ 'transform-runtime',"babel-plugin-transform-decorators-legacy"],
          presets: [ 'react', 'es2015', "react-native"] }
      },
      { test: /bootstrap-sass\/assets\/javascripts\//, loader: 'imports?jQuery=jquery' },
      { test: /\.scss$/, loader: 'style!css!sass' },
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.(woff|woff2)$/, loader: 'url?prefix=font/&limit=5000' },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml' },
      { test: /\.json$/, loader: 'json' },
      { test: /\.(png|jpg)$/, loader: 'url?limit=25000' },
      { test: /\.html$/, loader: 'html-loader?attrs[]=video:src' },
      { test: /\.mp4$/, loader: 'url?limit=10000&mimetype=video/mp4' }
    ]
  },
  devServer: {
    contentBase: './',
    hot: true,
    port: 3000,
  }
};
