var path = require('path');

module.exports = {
    entry: './index.js',
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
            }
        ]
    }
};