var conch = angular.module('conch', ['ngMaterial','ui.bootstrap','ngMessages','ui.router',"oc.lazyLoad"]);
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

//主页
conch.directive('index',function(){
    return{
        restrict:'E',
        templateUrl:'view/index/main.html',
        replace : true,
        controller:'indexController'
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
        replace : true,
        controller:"blogController"
    }
});
