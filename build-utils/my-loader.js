function myloader(source) {
    if(this.resource === "/Users/jasmin.virdi/webpack-plugin/src/index.js"){
        source+="; console.log('checkthisstring')"
    }
    return source;
}

module.exports = myloader;