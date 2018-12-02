conch.controller('lifeController',['$scope','$ocLazyLoad','$state','$rootScope','$stateParams','checkService',
    function ($scope,$ocLazyLoad,$state,$rootScope,$stateParams,checkService) {
    $ocLazyLoad.load('css/life.css');
    $scope.Initialization = function(){
        //访问鉴权
        //$scope.checkPrower();
    };
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