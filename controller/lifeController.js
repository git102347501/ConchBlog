conch.controller('lifeController',['$scope','$ocLazyLoad',function ($scope,$ocLazyLoad) {
    $ocLazyLoad.load('css/life.css');


    //注销回调
    $rootScope.$on('logon',function (data,args) {
        $scope.user = null;
    });
}]);