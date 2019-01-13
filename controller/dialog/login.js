conch.controller('loginController',['$scope','HttpCore','$mdDialog','$rootScope','$cookieStore','toastr',
    function ($scope,HttpCore,$mdDialog,$rootScope,$cookieStore,toastr) {
        $scope.users = $cookieStore.get("user");
        //登录用户信息
        $scope.user={
            "userAccount":'',
            "userKey":''
        };

        //登录验证码图片
        $scope.checkimgs;
        //验证码数据
        $scope.valiValue="";

        //登录
        $scope.Login = function () {
            var usvali={"name":$scope.valiValue,"index":$scope.checkimgs.index};
            var response = HttpCore.PostPlus('User/Login', {data:{usvalidate:usvali,date:$scope.user}});
            response.then(function(resp){
                if(resp.data !=null && resp.data.status ==1){
                    $cookieStore.put("user", resp.data.data);
                    $rootScope.$emit('login',true);
                    toastr.success("登录成功！");
                    $mdDialog.cancel();
                }else{
                    toastr.error(resp.data.msg);
                }
            },function(resp){
                toastr.error("登录失败！");
            });
        };

        //注销
        $scope.Cancellation = function(){
            $cookieStore.remove("user");
            $rootScope.$emit('logon',true);
            $mdDialog.cancel();
        };

        //获取验证码
        $scope.getValidateImg = function(){
            $scope.checkimgs ="";
            var response =  HttpCore.PostPlus("Validate/ReadImage",{data:4});
            response.then(function(resp){
                if(resp.data !=null && resp.data.status==1){
                    $scope.checkimgs = resp.data.data;

                }else{
                    toastr.error("获取验证码失败！");
                }
            },function(resp){
                toastr.error("获取验证码失败！");
            });
        };

        $scope.getValidateImg();
    }]);