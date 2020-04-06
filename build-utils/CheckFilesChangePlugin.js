var fs = require('fs');
var archiver = require('archiver');
const chalk = require('chalk');
const bump = require('json-bump');
require('dotenv').config()

class CheckFilesChangePlugin {
    constructor(options) {
        this.checkWorkingEnv(options)
        this.changeVersion(options);
    }
    apply(compiler) {
        compiler.hooks.emit.tap("CheckFilesChangePlugin", (stats, cb)=> {
           let dirFormat=false;
            fs.access("./src", function(error) {
                if (error) {
                  console.log(chalk.bold.redBright("Extension Plugin ERR: src directory is missing"));
                } else {
                    dirFormat=true;
                }
              })
              if(dirFormat && this.checkWorkingEnv()){
                  this.createzipFile();
                  this.changeVersion();
              }
        })        
    }
    checkWorkingEnv(devMode) {
        if(process.env.NODE_ENV==="production" || devMode) 
            return true;
    }
    createzipFile() {
        let output = fs.createWriteStream("prod.zip");
        let archive = archiver("zip");

        output.on("close", function(){
            console.log(chalk.bold.grey(archive.pointer() + ' total bytes'));
            console.log(chalk.bold.green('archiver has been finalized and the output file descriptor has closed.'));
        })

        archive.on("error", function(err){
            throw err;
        })

        archive.pipe(output);

        archive.directory('src/', false);
        console.log(chalk.bold.cyanBright("prod.zip file created in root directory"))
        
        archive.finalize();
    }
    changeVersion() {
        bump('src/manifest.json', { minor : 1 })
    }
    
}

module.exports = CheckFilesChangePlugin;