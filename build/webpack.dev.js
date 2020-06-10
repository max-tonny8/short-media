const baseConfig = require('./webpack.base')
const path = require('path')
const config = require('../config')
const HotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin')
const merge = require('webpack-merge')

const devConfig = merge(baseConfig, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [new HotModuleReplacementPlugin()],
  devServer: {
    ...config.devServer
  },
  watch: true,
  watchOptions: {
    ignored: /node_modules/,
    aggregateTimeout: 300,
    poll: 1000,
  },
})
module.exports = devConfig
