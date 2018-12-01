conch.controller('lockController',['$scope','$state','$ocLazyLoad','$stateParams',function ($scope,$state,$ocLazyLoad,$stateParams) {
    $ocLazyLoad.load('css/lock.css');

    $scope.model = $stateParams.modelname;
}]);