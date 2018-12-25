conch.controller('lifeController',['$scope','$ocLazyLoad','$state','$rootScope','$stateParams','checkService',
    function ($scope,$ocLazyLoad,$state,$rootScope,$stateParams,checkService) {
    $ocLazyLoad.load('css/life.css');
    $scope.Initialization = function(){
        if(!$stateParams.check){
            $state.go("lock");
        }
    };

    $scope.lifelist = [
        {
            context:"总有一个地方，能够让你感觉到，记忆已经沉淀了很多难以忘怀的过去......",
            lifetitle:"故乡",
            imgurl:{'background-image':'url(img/timg.jpg)'},
            titleimgurl:{'background-image':'url(img/111.png)'}
        },
        {
            context:"总有一所校园，能够让你回忆起，那些曾经在岁月年轮上奋斗的青春......",
            lifetitle:"校园",
            imgurl:{'background-image':'url(img/hignschools.jpg)'},
            titleimgurl:{'background-image':'url(img/hignschool.png)'}
        }
    ];
    $scope.checkPrower =function(){
        var check = checkService.check('life');
        if(!check){
            //如果存在路由权限
            if(!$stateParams.check){
                $state.go("lock",{model:{name:"生活纪实",model:"life"}});
            }else{
                checkService.put("life",$stateParams.date);
            }
        }
    };
    //注销回调
    $rootScope.$on('logon',function () {
        $scope.user = null;
    });

    $scope.Initialization();
}]);