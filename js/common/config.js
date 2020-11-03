// PROJECT_NAME 有端口号时  ？ 为本地环境或者测试环境 ： 生产环境 ； 
var PROJECT_NAME = location.port && '/' || '/',
    CONTEXT_PATH = location.protocol + '//' + location.host + "/daishuWeb/";
require.config({
    baseUrl: CONTEXT_PATH,
    paths: {
        jquery: 'static/js/jquery/jquery-1.9.1.min',
        jqtmpl: 'static/common/jquery-tmpl/jquery.tmpl.min',
        bootstrap: 'static/common/bootstrap/bootstrap.min',
        layui: 'static/common/layui/layui.all',
        common: 'static/h5/js/common',
        mescroll: 'static/common/mescroll/mescroll.min',
        mobilesel: 'static/common/mobile-selector/mpicker.min',
        layermobile: 'static/common/layer_mobile/layer',
        mobileSelector: 'static/h5/js/mobileSelect',
        swipeslider: 'static/h5/js/swipeslider/swipeslider',
        jweixin: 'static/h5/js/jweixin-1.6.0/jweixin-1.6.0'
    },
    map: {
        '*': {
            'css': CONTEXT_PATH + 'static/common/require/css.min.js'
        }
    },
    shim: {
        bootstrap: {deps: ['css!' + CONTEXT_PATH + 'static/common/bootstrap/css/bootstrap.css', 'jquery',]},
        jqtmpl: {deps: ['jquery']},
        swipeslider: {deps: ['css!' + CONTEXT_PATH + 'static/h5/js/swipeslider/swipeslider.css']},
        layui: {deps: ['css!' + CONTEXT_PATH + 'static/common/layui/css/modules/layer/default/layer.css', 'css!' + CONTEXT_PATH + 'static/common/layui/css/modules/code.css']},
        mescroll: {deps: ['css!' + CONTEXT_PATH + 'static/common/mescroll/mescroll.min.css']},
        layermobile: {deps: ['css!' + CONTEXT_PATH + 'static/common/layer_mobile/need/layer.css']},
        mobilesel: {deps: ['jquery', 'css!' + CONTEXT_PATH + 'static/common/mobile-selector/css/mpicker.css']},
        mobileSelector: {deps: ['css!' + CONTEXT_PATH + 'static/h5/css/mobileSelect.css']}
    }


});

