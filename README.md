# Webpack plugin for extension build
This plugin helps to create a production ready build for chrome extension. This helps in updating the version of manifest.json file and create a zip folder of the source code.

  ### Installation
  
```npm i extension-build-webpack-plugin```

This extenion uses src directory to create a zip folder. In order to use this plugin make sure all the browser extension files are in src directory including the manifest.json file.

### Usage

In your `webpack.config.js` file add the following code.

```
const BrowserExtensionPlugin = require("./config");

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
    new BrowserExtensionPlugin({devMode: false}),
    new HtmlWebpackPlugin({template: './src/index.html'})
  ]
};
```

##### Note: devMode=true is used for creating a zip file and updating version in dev environment by default it is set to false.
