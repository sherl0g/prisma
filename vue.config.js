const webpack = require('webpack');

process.env.VUE_APP_WEBSOCKET_TEST_HOST = 'localhost:8083';
module.exports = {
  productionSourceMap: false,
  configureWebpack: {
    plugins: [
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    ],
  },
};
