var fs = require('fs');
var archiver = require('archiver');
var path = require("path");
const chalk = require('chalk');


class CheckFilesChangePlugin {
    constructor(options) {
        // console.log("options", options)
    }
    apply(compiler) {
        //create a zip file of the whole directory
        compiler.hooks.emit.tapAsync("CheckFilesChangePlugin", (compilation, cb)=> {
           
            console.log( chalk.bold.red("dirname"), chalk.bold.yellow(process.env.NODE_ENV))
            fs.access("./srcvhbk", function(error) {
                if (error) {
                  console.log("Directory does not exist.")
                } else {
                  console.log("Directory exists.")
                }
              })
            // this.createzipFile();
        })
        // console.log("path", path.dirname("src"))
        
    }
    createzipFile() {
        console.log("createzipFile");
        let output = fs.createWriteStream("prod.zip");
        let archive = archiver("zip");

        output.on("close", function(){
            console.log(archive.pointer() + ' total bytes');
            console.log('archiver has been finalized and the output file descriptor has closed.');
        })

        archive.on("error", function(err){
            throw err;
        })

        archive.pipe(output);

        archive.directory('src/', false);
        
        archive.finalize();
    }
    
}

module.exports = CheckFilesChangePlugin;