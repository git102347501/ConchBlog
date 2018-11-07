var conch = angular.module('conch', ['ngMaterial','ngCookies','ngSanitize','ui.bootstrap','ngAnimate','ngMessages','ui.router','oc.lazyLoad','toastr']);
//按需加载配置
conch.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider",
    function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
        conch.controller = $controllerProvider.register;
        conch.directive = $compileProvider.directive;
        conch.filter = $filterProvider.register;
        conch.factory = $provide.factory;
        conch.service = $provide.service;
        conch.constant = $provide.constant;
    }]);
//弹窗配置
conch.config(function(toastrConfig) {
    angular.extend(toastrConfig, {
        autoDismiss: false,
        containerId: 'toast-container',
        maxOpened: 0,
        newestOnTop: true,
        positionClass: 'toast-top-center',
        preventDuplicates: false,
        timeOut:2000,
        preventOpenDuplicates: false,
        target: 'body'
    });
});
//主页
conch.directive('index',function(){
    return{
        restrict:'E',
        templateUrl:'view/index/main.html',
        replace : true
    }
});
//主页-照片模块
conch.directive('mainPhoto',function () {
    return{
        restrict:'E',
        templateUrl:'view/index/tple/mainPhoto.html',
        replace : true
    }
});
//主页-消息模块
conch.directive('conchDynamic',function () {
    return{
        restrict:'E',
        templateUrl:'view/index/tple/mainDynamic.html',
        replace : true
    }
});
//主页-博文模块
conch.directive('conchBlog',function () {
    return{
        restrict:'E',
        templateUrl:'view/index/tple/mainBlog.html',
        replace : true
    }
});
//主页-友链模块
conch.directive('conchShiplink',function () {
    return{
        restrict:'E',
        templateUrl:'view/index/tple/mainShiplink.html',
        replace : true
    }
});
//博客-左侧菜单
conch.directive('conchmenu',function () {
    return{
        restrict:'E',
        templateUrl:'view/blog/blogmenu.html',
        replace : true
    }
});
//博客-评论回复
conch.directive('conchComm',function () {
    return{
        scope:false,
        restrict:'E',
        templateUrl:'view/blog/blogcomm.html',
        replace : true
    }
});

