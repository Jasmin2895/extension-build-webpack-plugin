var fs = require('fs');
var archiver = require('archiver');
const chalk = require('chalk');
const bump = require('json-bump');
require('dotenv').config()

class BrowserExtensionPlugin {
    constructor(options) {
        this.options = options;
        this.checkWorkingEnv(options)
    }
    apply(compiler) {
        compiler.hooks.emit.tap("BrowserExtensionPlugin", (stats, cb)=> {
           let dirFormat=false;
           let dirName = this.options.directory || "src";
            fs.access(`./${dirName}`, (error) =>{
                if (error) {
                  console.log(chalk.bold.redBright("Extension Plugin ERR: directory missing"));
                } else {
                    dirFormat=true;
                    if(dirFormat && this.checkWorkingEnv(this.options)){
                        this.createzipFile(dirName, `${this.options.name}` || "prod");
                        this.changeVersion(dirName, this.options.updateType || "minor");
                    }
                }
              })
        })        
    }
    checkWorkingEnv(options) {
        if(process.env.NODE_ENV==="production" || options.devMode) 
            return true;
    }
    createzipFile(dirName, outputFileName) {
        let output = fs.createWriteStream(outputFileName);
        let archive = archiver("zip");

        output.on("close", function(){
            console.log(chalk.bold.grey(archive.pointer() + ' total bytes'));
            console.log(chalk.bold.green('archiver has been finalized and the output file descriptor has closed.'));
        })

        archive.on("error", function(err){
            throw err;
        })

        archive.pipe(output);

        archive.directory(`${dirName}/`, false);
        console.log(chalk.bold.cyanBright(`${dirName}.zip file created in root directory`))
        
        archive.finalize();
    }
    changeVersion(dirName, versionUpdateType) {
        let updateObject = {}
        updateObject[versionUpdateType] = 1;
        bump(`${dirName}/manifest.json`, updateObject);
    }
    
}

module.exports = BrowserExtensionPlugin;