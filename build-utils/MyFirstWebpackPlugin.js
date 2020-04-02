class MyFirstWebpackPlugin {
    apply(compiler) {
        compiler.hooks.done.tapAsync("MyFirstWebpackPlugin",(stats, cb)=> {
            console.log(stats);
            debugger;
            cb();
        })
    }
}



module.exports= MyFirstWebpackPlugin;