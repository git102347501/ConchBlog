conch.controller('lifeController',['$scope','$ocLazyLoad','$state','$rootScope',function ($scope,$ocLazyLoad,$state,$rootScope) {
    $ocLazyLoad.load('css/life.css');

    $state.go("lock",{modelname:"生活纪实"});

    //注销回调
    $rootScope.$on('logon',function (data,args) {
        $scope.user = null;
    });
}]);