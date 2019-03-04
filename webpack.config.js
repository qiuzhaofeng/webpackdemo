const path = require('path');
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const ExtractTextPlugin = require("extract-text-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
module.exports = {
  entry: "./public/index.js",
  // entry: ["./public/index.js", "./public/index2.js"],
  // entry: {
  //   pageOne:"./public/pageOne/index.js",
  //   pageTwo: "./public/pageTwo/index.js"
  // },
  devtool: 'cheap-module-eval-source-map',
  output: {
    path:path.resolve(__dirname,"build"),
    // filename:"bundle.js"
    filename: "[name][hash]1.js"
  },
  devServer: {
    contentBase: './build',  //设置服务器访问的基本目录
    host: 'localhost', //服务器的ip地址
    port: 8080, //端口
    open: true, //自动打开页面
    hot: true,
    hotOnly: true
  },
  module: {
    rules: [
      // {
      //   test: /\.css$/,
      //   // use: ["style-loader", "css-loader"]
      //   use: ExtractTextPlugin.extract({
      //     fallback:"style-loader",
      //     use:"css-loader"
      //   })
      // },
      {
        test: /\.css$/,
        // use: ["style-loader", "css-loader"]
        // use: [MiniCssExtractPlugin.loader, "css-loader", {
        use: ["style-loader", "css-loader", {
          loader: "postcss-loader",
          options: {
            plugins: [
              require("autoprefixer")
            ],
            sourceMap: true //在option选项中添加此项
          }
        }]
      },
      // {
      //   test:/\.less$/,
      //   use:["style-loader","css-loader","less-loader"]
      // },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader",{
          loader: "postcss-loader",
          options:{
            plugins:[
              require("autoprefixer")
            ]
          } 
        }]
      },
      {
        test:/\.(png|jpg|gif|jpeg)$/, 
        use: [{
          loader:"file-loader",
          options:{
            name:"[path][hash]aaa.jpg",
            // context:"../"
            // publicPath:"http://www.abc.com/img",
            outputPath:"./img"
          }
        }]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: [{
          loader: "file-loader",
          options: {
            outputPath: "./font"
          }
        }]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader:"babel-loader",
          options: {
            "presets": ["@babel/preset-env"]
          }
        }
      },
      {
        test:/\.(html)$/,
        use:{
          loader:"html-loader",
          options:{
            attrs:["img:src","img:data-src"]
          }
        }
      }
    ]
  },
  // resolve: {
  //   alias: {
  //     jQuery:path.resolve(__dirname,"public/js/jquery.min.js")
  //   }
  // },
  // plugins: [
  //   new webpack.ProvidePlugin({
  //     $:"jquery"
  //   })
  // ],
  plugins:[
    new CleanWebpackPlugin(["build"]),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template:"./public/index.html",
      filename:'webpack.html',
      minify:{
        minimise:true,
        removeAttributeQuotes:true,
        removeComments:true,
        collapseWhitespace:true,
        minifyCSS:true,
        minifyJS:true,
        // removeEmptyElements: true
      },
      hash:true
    }),
    // new ExtractTextPlugin("./css/index.css"),
    new MiniCssExtractPlugin({
      filename: "./css/[name].css"
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp:/\.css$/g,
      cssProcessor:require("cssnano"),
      cssProcessorPluginOptions:{
        preset:["default",{"discardComments":{removeAll:true}}]
      },
      canPrint:true
    }),
    new CopyWebpackPlugin([{
      from:__dirname+"/public/assets",
      to: __dirname + "/build/assets"
    }]),
    
  ]
}