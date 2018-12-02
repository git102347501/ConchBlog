conch.controller('resumeController',['$scope','$ocLazyLoad','$state','$rootScope','$stateParams','checkService',
    function ($scope,$ocLazyLoad,$state,$rootScope,$stateParams,checkService) {
    $ocLazyLoad.load('css/resume.css');

    $scope.Initialization = function(){
        //访问鉴权
        //$scope.checkPrower();
    };
    $scope.checkPrower =function(){
        var check = checkService.check('resume');
        if(!check){
            //如果存在路由权限
            if(!$stateParams.check){
                $state.go("lock",{model:{name:"我的简历",model:"resume"}});
            }else{
                checkService.put("resume",$stateParams.date);
            }
        }
    };
    //注销回调
    $rootScope.$on('logon',function () {
        $scope.user = null;
    });

    $scope.Initialization();
}]);