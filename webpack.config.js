const path = require('path')
const BundleTracker = require('webpack-bundle-tracker')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
var webpack = require('webpack');

module.exports = {
  entry: {
    frontend: './frontend/src/index.js',
  },

  output: {
    path: path.resolve('./frontend/static/frontend/'),
    filename: '[name]-[hash].js',
    publicPath: 'static/frontend/',
  },

  plugins: [
    new CleanWebpackPlugin(),
    new BundleTracker({
      path: __dirname,
      filename: './webpack-stats.json',
    }),
    new webpack.ProvidePlugin({
      'React':     'react'
    })
  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },

  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true
  }
}