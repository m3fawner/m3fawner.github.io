var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: './src/index.js',
    output: {
        path: __dirname,
        filename: 'bundle.js',
        publicPath: '/',
        libraryTarget: 'umd'
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
    plugins: [new HtmlWebpackPlugin()]
};