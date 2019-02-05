
//生活-栏目
conch.directive('lifeLeft',function () {
    return{
        scope:{
            context:'=',
            lifetitle:'=',
            imgurl:'=',
            titleimgurl:'='
        },
        restrict:'E',
        templateUrl:'view/life/tple/lifeLeft.html',
        replace : true
    }
});
//生活-栏目
conch.directive('lifeRight',function () {
    return{
        scope:{
            context:'=',
            lifetitle:'=',
            imgurl:'=',
            titleimgurl:'='
        },
        restrict:'E',
        templateUrl:'view/life/tple/lifeRight.html',
        replace : true
    }
});