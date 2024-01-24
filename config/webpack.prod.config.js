const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const baseConfig = require('./webpack.base.config.js');

const prodConfig = {
  mode: 'production',
  plugins: [new CleanWebpackPlugin()],
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          compress: {
            drop_console: true,
          },
        },
        exclude: [/\/background/],
      }),
    ],
  },
};

module.exports = () => merge(baseConfig, prodConfig);
