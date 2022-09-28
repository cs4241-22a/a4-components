const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./src/client/index.jsx",
  mode: "none",
  output: {
    path: path.join(__dirname, "src/client/public/js"),
    publicPath: "/assets",
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
    ],
  },
  resolve: {
    alias: { process: "process/browser" },
    extensions: ["*", ".js", ".jsx"],
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: "process/browser",
    }),
  ],
};
