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
        templateUrl:'tple/index/main.html',
        replace : true,
        controller:'indexController'
    }
});
conch.directive('conchmenu',function () {
    return{
        restrict:'E',
        templateUrl:'tple/blog/blogmenu.html',
        replace : true,
        controller:"blogController"
    }
});