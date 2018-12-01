conch.controller('resumeController',['$scope','$ocLazyLoad','$state','$rootScope',function ($scope,$ocLazyLoad,$state,$rootScope) {
    $ocLazyLoad.load('css/resume.css');

    $state.go("lock",{"modelname":"我的简历"})
    //注销回调
    $rootScope.$on('logon',function (data,args) {
        $scope.user = null;
    });
}]);