const base = require('./webpack.config');
module.exports = Object.assign(base, {
    mode: 'production',
    optimization: {
        splitChunks: {
            chunks: 'all'
        },
        nodeEnv: 'production'
    }
});