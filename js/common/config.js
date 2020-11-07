 
var PROJECT_PATH = "/Users/geyao/webStorm-workspace/bbshop-client/";
require.config({
    baseUrl: PROJECT_PATH,
    paths: {
        jquery: 'js/common/jquery.min',
        jqtmpl: 'js/common/jquery.tmpl.min',
        bootstrap: 'js/common/bootstrap/bootstrap.min',
        layui: 'js/common/layui/layui.all',
        common: 'js/common/common',
        mescroll: 'js/common/mescroll/mescroll.min',
        //mobilesel: 'static/common/mobile-selector/mpicker.min',
        layermobile: 'js/common/layer_mobile/layer',
        mobileSelector: 'js/common/mobileSelect'
        //swipeslider: 'static/h5/js/swipeslider/swipeslider'    //轮播图插件
    },
    map: {
        '*': {
            'css': PROJECT_PATH + 'js/common/css.min.js'
        }
    },
    shim: {
        bootstrap: {deps: ['css!' + PROJECT_PATH + 'js/common/bootstrap/css/bootstrap.css', 'jquery',]},
        jqtmpl: {deps: ['jquery']},
        //swipeslider: {deps: ['css!' + CONTEXT_PATH + 'static/h5/js/swipeslider/swipeslider.css']},
        layui: {deps: ['css!' + PROJECT_PATH + 'js/common/layui/css/modules/layer/default/layer.css', 'css!' + PROJECT_PATH + 'js/common/layui/css/modules/code.css']},
        mescroll: {deps: ['css!' + PROJECT_PATH + 'js/common/mescroll/mescroll.min.css']},
        layermobile: {deps: ['css!' + PROJECT_PATH + 'js/common/layer_mobile/need/layer.css']},
        //mobilesel: {deps: ['jquery', 'css!' + CONTEXT_PATH + 'js/common/mobile-selector/css/mpicker.css']},
        mobileSelector: {deps: ['css!' + PROJECT_PATH + 'css/mobileSelect.css']}
    }


});

