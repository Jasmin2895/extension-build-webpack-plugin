const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpackMerge = require("webpack-merge");
require('dotenv').config()

const modeConfig = env => require(`./build-utils/webpack.${env}`)(env);
const presetConfig = require("./build-utils/loadPresets");
const MyFirstWebpackPlugin = require("./build-utils/MyFirstWebpackPlugin");
const CheckFilesChangePlugin = require("./build-utils/CheckFilesChangePlugin");

module.exports = ({ mode, presets } = { mode: "production", presets: [] }) => {
  return webpackMerge(
    {
      mode,
      watch: true,
      module: {
        rules: [
          {
            test: /\.jpe?g$/,
            use: [
              {
                loader: "url-loader",
                options: {
                  limit: 5000
                }
              }
            ]
          }
        ]
      },
      output: {
        filename: "bundle.js",
        chunkFilename: "[name].lazy-chunk.js"
      },
      plugins: [new CheckFilesChangePlugin({devMode: true}), new MyFirstWebpackPlugin,new HtmlWebpackPlugin(), new webpack.ProgressPlugin()]
    },
    modeConfig(mode),
    presetConfig({ mode, presets })
  );
};
