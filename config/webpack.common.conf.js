const path = require('path');
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const happyPack = require("happypack");


function resolve(dir) {
  return path.join(__dirname,"..",dir)
}

module.exports = {
  entry: "./public/index.js",
  output: {
    path: path.resolve(__dirname, "../build"),
    filename: "[name][hash]1.js"
  },
  resolve: {
    extensions:[".js"],
    modules:[
      resolve("public"),
      resolve("node_modules")
    ],
    alias: {
      "assets": resolve("./public/assets")
    }
  },
  module: {
    // noParse:/node_modules/(jquery/dist)/,
    rules: [
      {
        test: /\.css$/,
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
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader", {
          loader: "postcss-loader",
          options: {
            plugins: [
              require("autoprefixer")
            ]
          }
        }]
      },
      {
        test: /\.(png|jpg|gif|jpeg)$/,
        use: [{
          loader: "file-loader",
          options: {
            name: "[path][hash]aaa.jpg",
            outputPath: "./img"
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
        include:[
          resolve("public")
        ],
        exclude: /node_modules/,
        loader:"happypack/loader?id=happyBabel",
        // use: {
        //   loader: "babel-loader?cacheDirectory=true",
        //   options: {
        //     "presets": ["@babel/preset-env"]
        //   }
        // }
      },
      {
        test: /\.(html)$/,
        use: {
          loader: "html-loader",
          options: {
            attrs: ["img:src", "img:data-src"]
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: 'webpack.html',
      minify: {
        minimise: true,
        removeAttributeQuotes: true,
        removeComments: true,
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true,
      },
      hash: true
    }),
    new happyPack({
      id:"happyBabel",
      loaders:[
        {
          loader:"babel-loader"
        }
      ]
    })

  ]
}