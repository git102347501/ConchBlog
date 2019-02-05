//博客-左侧菜单
conch.directive('blogMenu',function () {
    return{
        restrict:'E',
        templateUrl:'view/blog/blogmenu.html',
        replace : true
    }
});
//博客-评论回复
conch.directive('blogComm',function () {
    return{
        restrict:'E',
        templateUrl:'view/blog/blogcomm.html',
        replace : true
    }
});
//博客-博文内容
conch.directive('blogMatter',function () {
    return{
        restrict:'E',
        templateUrl:'view/blog/blogMatter.html',
        replace : true
    }
});
//博客-编辑博文
conch.directive('blogEdit',function () {
    return{
        restrict:'E',
        templateUrl:'view/blog/blogEdit.html',
        replace : true
    }
});