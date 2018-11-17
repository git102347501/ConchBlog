conch.controller('resumeController',['$scope','$ocLazyLoad',function ($scope,$ocLazyLoad) {
    $ocLazyLoad.load('css/resume.css');


    //注销回调
    $rootScope.$on('logon',function (data,args) {
        $scope.user = null;
    });
}]);