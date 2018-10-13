var conch = angular.module('conch', ['ngMaterial','ui.bootstrap','ngMessages','ui.router',"oc.lazyLoad"]);
//主页
conch.directive('index',function(){
    return{
        restrict:'E',
        templateUrl:'tple/index/main.html',
        replace : true,
        controller:'indexController'
    }
});