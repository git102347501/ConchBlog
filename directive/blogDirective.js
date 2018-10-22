//博文菜单
conch.directive('conchmenu',function () {
    return{
        restrict:'E',
        templateUrl:'tple/blog/blogmenu.html',
        replace : true,
        controller:"blogController"
    }
})