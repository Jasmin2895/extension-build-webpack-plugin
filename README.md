# 📦 Webpack plugin for extension build
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

This plugin helps to create a production ready build for chrome extension. This helps in updating the version of manifest.json file and create a zip folder of the source code.


## Installation

```
npm i extension-build-webpack-plugin
```

This extenion uses src directory to create a zip folder. In order to use this plugin make sure all the browser extension files are in src directory including the manifest.json file.

## Usage

In your `webpack.config.js` file add the following code.

```javascript
const BrowserExtensionPlugin = require("extension-build-webpack-plugin");

module.exports = {
  entry: './path/to/my/entry/file.js',
  output: {
    filename: 'my-first-webpack.bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader'
      }
    ]
  },
  plugins: [
    new BrowserExtensionPlugin({devMode: false, name: "my-first-webpack.zip", directory: "src", updateType: "minor"})
  ]
};
```
## Custom Options

You can add custom options to modify the behaviour of plugin.

1. `devMode`: Enables the plugin to work in local development mode. This plugin by default runs in production mode, to enable this plugin in development mode set this flag to **true**.
2. `directory`: To modify the name of the output zip directory. If not given a definite name it will create a zip file with a name **prod.zip**. The zip file will be created in the root directory.
3. `directory`: Name of the directory which contains the `manifest.json` file. If not defined it will assume **src**.
4. `updateType`: Defines the type of version update which can be `major` or `minor`. This flag is set to `minor` by default.
