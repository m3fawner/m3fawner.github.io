const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
module.exports = {
  entry: './src/index.js',
  devtool: '#source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
    root: [
      path.resolve('./src'),
      path.resolve('./node_modules')
    ],
    alias: {
      './~reveal/': 'reveal'
    }
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!sass-loader'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.pug$/,
        loader: 'pug'
      },
      {
        test: /\.(es6|js)$/,
        exclude: /node_modules/,
        loaders: [
          'babel'
        ]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file?name=public/fonts/[name].[ext]'
      }
    ]
  },
  devServer: {
    proxy: {}
  },
  plugins: [new HtmlWebpackPlugin({
    title: 'Evan Williams AngularJS Tutorial Site'
  }), new CopyWebpackPlugin([{
    from: './assets',
    to: './assets/'
  }]), new webpack.optimize.OccurrenceOrderPlugin(), new webpack.HotModuleReplacementPlugin()]
};
