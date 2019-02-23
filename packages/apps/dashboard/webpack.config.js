const dev = process.env.NODE_ENV !== "production";
const webpack = require('webpack');
const path = require('path');

const SRC_DIR = path.resolve(__dirname, './src/');
const DIST_DIR = path.resolve(__dirname, '.');

module.exports = {
    mode: dev ? 'development' : 'production',
    context: __dirname,
    devtool: dev ? "inline-source-map" : null,
    cache: true,
    entry:  SRC_DIR + "/main.js",
    module: {
        rules: [{
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader',
            query: {
                presets: ['@babel/react', '@babel/env']
                          }
        }]
    },
    output: {
        path: DIST_DIR,
        filename: "./app.min.js"
    },
    plugins: dev ? [] : [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin(),
    ],
};
