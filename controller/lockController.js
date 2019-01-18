conch.controller('lockController',['$scope','$state','$ocLazyLoad','$stateParams','validate','HttpCore','toastr','checkService',
    function ($scope,$state,$ocLazyLoad,$stateParams,validate,HttpCore,toastr,checkService) {
    $ocLazyLoad.load('css/lock.css');
    //加密页
    $scope.lockPage=['life','resume'];
    $scope.password="";
    $scope.validate={
        name:"",
        index:""
    };
    $scope.checkimg="";
    $scope.target = $stateParams.model;

    $scope.Initialization = function(){
        if($scope.lockPage.indexOf($scope.target)!=-1){
            $scope.checkPrower();
        }else{
            $state.go($scope.target);
        }
        $scope.getValidate();
        HttpCore.PostBaidu();
    };

    $scope.checkPrower =function(){
        var check = checkService.check($scope.target);
        if(check){
            //如果存在路由权限
            $state.go($scope.target,{check:true,date:check.lockTerm});
        }
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
        var result = HttpCore.PostPlus("Lock/CheckLock",{data:{usvalidate: $scope.validate,date:{key: $scope.password,model:$scope.target}}});
        result.then(function (resp) {
            if(resp.data && resp.data.status==1){
                checkService.put($scope.target,resp.data.data);
                $state.go($scope.target,{check:true,date:resp.data.data.lockTerm});
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