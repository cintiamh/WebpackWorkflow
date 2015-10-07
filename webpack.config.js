var webpack = require('webpack');
// For conveniance we create variable that holds the directory to bower_components
var bower_dir = __dirname + '/bower_components';

var config = {
  addVendor: function (name, path) {
    this.resolve.alias[name] = path;
    this.module.noParse.push(new RegExp(path));
  },
  entry: {
    app: ['./app/main.js'],
    vendors: ['react']
  },

  // The resolve.alias object takes require expressions
  // (require('react')) as keys and filepath to actual
  // module as values
  resolve: { alias: {} },

  // We add a plugin called CommonsChunkPlugin that will take the vendors chunk
  // and create a vendors.js file. As you can see the first argument matches the key
  // of the entry, "vendors"
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js')
  ],

  output: {
    path: './build',
    filename: 'bundle.js'
  },
  module: {
    // There is no reason for WebPack to parse this file
    noParse: [],
    loaders: [
      { test: /\.js$/, loader: 'jsx-loader' }
    ]
  }
};

config.addVendor('react', bower_dir + '/react/react.min.js');

module.exports = config;
