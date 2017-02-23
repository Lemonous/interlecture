const path = require('path');
const webpack = require('webpack');
const BundleTracker = require('webpack-bundle-tracker');

const config = require('./webpack.base.config.js');

config.devtool = '#eval-source-map';

config.plugins = config.plugins.concat([
  new BundleTracker({ filename: './webpack-stats.json' }),
]);

module.exports = config;
