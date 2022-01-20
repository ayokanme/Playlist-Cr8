const path = require("path");
const webpack = require("webpack");
var SRC_DIR = path.join(__dirname, "/client/src");
var DIST_DIR = path.join(__dirname, "/client/dist");
// path.join takes mucltiple args and doesn't require / separators...


module.exports = {
  entry: `${SRC_DIR}/index.jsx`,
  output: {
    filename: "bundle.js",
    path: DIST_DIR,
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: { presets: ["@babel/env", "@babel/preset-react"] }
      },
    ],
  },
  // plugins: [new HtmlWebpackPlugin({ template: './client/public/index.html' })],
  // resolve: { extensions: ["*", ".js", ".jsx"] },
  // devServer: {
  //   contentBase: path.join(__dirname, "/client/public/"),
  //   port: 3000,
  //   publicPath: "http://localhost:3000/dist/"
  // }
};
