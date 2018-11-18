conch.service('DiaLog',['$http','$q','$mdDialog', function($http,$q,$mdDialog) {

    function DialogController($scope, $mdDialog) {
        $scope.hide = function() {
            $mdDialog.hide();
        };

        $scope.cancel = function() {
            $mdDialog.cancel();
        };

        $scope.answer = function(answer) {
            $mdDialog.hide();
        };
    };

    //打开模态框
    this.showAdvanced = function(ev,name) {
        $mdDialog.show({
            controller: DialogController,
            templateUrl: name,
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true
        })
    };
}]);
