const path = require('path');
const rootDir = path.resolve(__dirname, '..');
const HtmlWebpack = require('html-webpack-plugin');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

const loaders = [
  {
    loader: 'css-loader',
  },
  {
    loader: 'sass-loader'
  }
];
module.exports = {
    entry: {
        app: [ path.resolve(rootDir, 'client', 'bootstrap') ],
        vendor: [ path.resolve(rootDir, 'client', 'vendor') ]
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(rootDir, '../dist/public'),
        sourceMapFilename: '[name].map'
    },
    module: {
        loaders: [
            { loader: 'raw-loader', test: /\.(css|html|ico|jpg)$/ },
            {
               test: /\.scss$/,
               exclude: /node_modules/,
               loader: ExtractTextPlugin.extract({
                   fallback: 'style-loader',
                   use: loaders,
               }),
            },
            { exclude: /node_modules/, loader: 'ts-loader', test: /\.ts$/ }
        ]
    },
    plugins: [
       new webpack.optimize.CommonsChunkPlugin({
           filename: 'vendor.bundle.js',
           minChunks: Infinity,
           name: 'vendor'
       }),
       new HtmlWebpack({
           filename: 'index.html',
           inject: 'body',
           template: path.resolve(rootDir, 'client', 'index.html')
       }),
       new ExtractTextPlugin("site.css"),
       new CopyWebpackPlugin([
           // Copy directory contents to {output}/to/directory/
            { from: './src/client/public' }
       ], {
            // By default, we only copy modified files during
            // a watch or webpack-dev-server build. Setting this
            // to `true` copies all files.
            copyUnmodified: true
        })
    ],
   resolve: {
       extensions: [ '.js', '.ts','.scss' ]
   }
};
