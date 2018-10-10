const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './src/main.jsx',
    mode: process.env.WEBPACK_SERVE ? 'development' : 'production',
    output: {
        path: path.resolve(__dirname, 'docs/js'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: path.resolve(__dirname, 'src'),
                exclude: /node_modules/,
                use: ['babel-loader']
            }
        ]
    }
};
