const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpackMerge = require("webpack-merge");

const modeConfig = env => require(`./config/webpack.${env}`)(env);
const presetConfig = require("./config/loadPresets");
const BrowserExtensionPlugin = require("./config");

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
          },
          {
            test: /\.(scss|css)$/,
            use: [
              'style-loader',
              { loader: 'css-loader', options: { sourceMap: true, importLoaders: 1 } },
              { loader: 'sass-loader', options: { sourceMap: true } },
            ],
          },
        ]
      },
      output: {
        filename: "bundle.js",
        chunkFilename: "[name].lazy-chunk.js"
      },
      plugins: [new BrowserExtensionPlugin({devMode:true}),new HtmlWebpackPlugin(), new webpack.ProgressPlugin()]
    },
    modeConfig(mode),
    presetConfig({ mode, presets })
  );
};
