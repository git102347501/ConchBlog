conch.controller('lockController',['$scope','$state','$ocLazyLoad','$stateParams','validate','HttpCore','toastr','$cookies',
    function ($scope,$state,$ocLazyLoad,$stateParams,validate,HttpCore,toastr,$cookies) {
    $ocLazyLoad.load('css/lock.css');
    $scope.password="";
    $scope.validate={
        name:"",
        index:""
    };
    $scope.checkimg="";
    $scope.target = $stateParams.model;

    $scope.Initialization = function(){
        $scope.getValidate();
    };

    //获取验证码
    $scope.getValidate = function(){
        validate.get().then(function (data) {
            if(data){
                $scope.checkimg = data;
                $scope.validate.index = data.index;
                $scope.validate.name = "";
            }else{
                toastr.warning("获取验证码失败！");
            }
        });
    };

    //密码校验
    $scope.checkLock = function () {
        var result = HttpCore.PostPlus("Lock/CheckLock",{data:{usvalidate: $scope.validate,data:{key: $scope.password,model:$scope.target.model}}});
        result.then(function (resp) {
            if(resp.data && resp.data.status==1){
                $state.go($scope.target.model,{check:true,date:resp.data.data.lockTerm});
            }else{
                if(resp.data.msg){
                    toastr.warning(resp.data.msg);
                }else{
                    toastr.warning("密码校验错误！");
                }
                $scope.getValidate();
            }
        })
    };

    $scope.Initialization();

}]);