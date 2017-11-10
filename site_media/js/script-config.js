(function(){
    var address = location.href.indexOf('debug=true') > 0 ? 'js' : 'js';
    var version = (+ new Date())
    //JS，css后面加上version可以在一定程度上防止缓存
    seajs.config({
        base:'/site_media/'+address,
        alias:{
            'jquery':'vendors/jquery',
            'dialog':'vendors/dialog/dialog-plus',
            'json2':'vendors/json2'
        },
        preload: [
            window.$ || window.jQuery ? '' :'jquery',
            window.dialog ? '' : 'dialog',
            window.JSON ? '' : 'json2'
        ],
        map:[
            ['.css', '.css?v=' + version],
            ['.js', '.js?v=' + version]
        ],
        charset:'utf-8'
    });
    seajs.on('exec', function(module) {
       if (module.uri === seajs.resolve('jquery')) {
            window.$ = window.jQuery = module.exports;
       }else if (module.uri === seajs.resolve('dialog')) {
            window.dialog = module.exports;
       }else if(module.uri === seajs.resolve('json2')){
            window.JSON = module.exports;
       }
    });
})();