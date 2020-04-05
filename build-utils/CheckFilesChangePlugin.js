var fs = require('fs');
var archiver = require('archiver');
var path = ""


class CheckFilesChangePlugin {
    constructor(options) {
        // console.log("options", options)
    }
    apply(compiler) {
        //create a zip file of the whole directory
        compiler.hooks.emit.tapAsync("CheckFilesChangePlugin", (compilation, cb)=> {
            console.log("compiler", compilation.assets)
            this.createzipFile(compilation.assets);
        })
        console.log("__dirname", __dirname)
        
    }
    createzipFile(data) {
        console.log("createzipFile")
        let output = fs.createWriteStream(data);
        output.on("data",function(chunk){
            console.log("New Chunk Received");
            console.log(chunk);
        })
        // let archive = archiver("zip", {
        //     zlib: {level:9}
        // })
        // archive.pipe(output);
    }
    
}

module.exports = CheckFilesChangePlugin;