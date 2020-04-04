module.exports = () => ({
    resolveLoader: {
        alias: {
            "my-loader":require("./build-utils/my-loader.js")
        }
    },
    module: {
        rules: [
            {test: /\.js/, use: "my-loader"}
        ]
    }
})