const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    context: __dirname,

    entry: {
        app: './client/core/main',
        login: './client/core/login',
        register: './client/core/register',
    },

    output: {
        path: path.resolve('./static/bundles/'),
        filename: '[name]-[hash].js',
    },

    externals: [], // add all vendor libs

    plugins: [
        new ExtractTextPlugin('style.css'),
    ], // add all common plugins here

    module: {
        rules: require('./webpack.loaders.js'),
    },

    resolve: {
        modules: ['node_modules', '.'],
        extensions: ['.js', '.jsx'],
    },
};
