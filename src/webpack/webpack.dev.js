const path = require('path');
const rootDir = path.resolve(__dirname, '..');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

module.exports = function(env) {
    return webpackMerge(commonConfig, {
        devServer: {
            contentBase: path.resolve(rootDir, 'public'),
            port: 9000,
            historyApiFallback: true,
            proxy: {
              "/api": "http://localhost:3000" // proxy all api calls to proper dev port
            }
        },
        devtool: 'source-map'
    })
}
