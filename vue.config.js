const webpack = require('webpack');

module.exports = {
  productionSourceMap: false,
  configureWebpack: {
    plugins: [
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    ],
  },
};
