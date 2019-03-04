const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const path = require('path');
const common = require("./webpack.common.conf.js");
const merge = require("webpack-merge");

module.exports = merge(common, {
  devtool: 'source-map',
  plugins: [
    new CleanWebpackPlugin(["build"],{
      root:path.resolve(__dirname,"../")
    }),
    new MiniCssExtractPlugin({
      filename: "./css/[name].css"
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require("cssnano"),
      cssProcessorPluginOptions: {
        preset: ["default", { "discardComments": { removeAll: true } }]
      },
      canPrint: true
    }),
    new CopyWebpackPlugin([{ 
      from: path.resolve(__dirname, "../public/assets"),
      to: path.resolve(__dirname, "../build/assets") 
    }]),

  ]
})