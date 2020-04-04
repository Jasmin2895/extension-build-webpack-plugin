class CheckFilesChangePlugin {
    constructor(options) {
        // console.log("options", options)
    }
    apply(compiler) {
        compiler.plugin("emit", (compilation, cb)=> {

            compilation.chunks.forEach(element => {
                console.log("element", element)
                console.log("chunk module")
            });
            // console.log("compilation", compilation.stats, compilation.createHash);
            cb();
        })
    }
}

module.exports = CheckFilesChangePlugin;