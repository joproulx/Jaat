require.config({
    paths: {
        'matrix': 'libs/sylvester/sylvester',
        'underscore' : 'libs/underscore/underscore'
        //'vector': 'libs/sylvester/sylvester'
    },
    shim: {
        'matrix': {
            exports: '$M'
        },
        'underscore': {
            exports: '_'
        }//,
//        'vector': {
//            exports: '$V'
//        }
    }
});


require(['jquery',
    'matrix',
    'underscore',
    //'vector',
    'app'],function($, $M, _, /*Vector,*/ App){
    App.initialize();


});
