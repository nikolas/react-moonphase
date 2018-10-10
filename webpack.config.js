const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './lib/main.jsx',
    mode: process.env.WEBPACK_SERVE ? 'development' : 'production',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '.js'
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: path.resolve(__dirname, 'lib'),
                exclude: /node_modules/,
                use: ['babel-loader']
            }
        ]
    }
};
