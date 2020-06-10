const path = require('path')
module.exports = {
  devServer: {
    host: 'localhost',
    port: 8080,
    hot: true,
    open: true,
    compress: true,
    historyApiFallback: true,
    overlay: false,
    contentBase: path.resolve(__dirname, '../dist'),
    quiet: true,
    proxy: {
      '/api': {
        target: 'http://weijieyue.cn',
        changeOrigin: true
      },
    },
  },
  isDll: true,
}
