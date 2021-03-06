module.exports = {

    chainWebpack(config){

        if(process.env.NODE_ENV == 'development') return;

        config.plugin('optimize-css').tap( args => {


            // nanocss causes problems with postcss when `calc` is minified
            Object.assign(args[0].cssnanoOptions.preset[1], {
                'calc': false,
            });
            
            return args;
            
        })
    }
}