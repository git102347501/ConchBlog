conch.controller('newDialog',['$scope','HttpCore','$mdDialog','$rootScope','$cookieStore','toastr','validate',
    function ($scope,HttpCore,$mdDialog,$rootScope,$cookieStore,toastr,validate) {
    //留言类型
    $scope.newCate =["网站建议","内容投诉","版权通知","其他留言"];
    //验证码图片
    $scope.checkimgs='';
    //当前留言信息对象
    $scope.news={
        usvalidate:{
            index:'',
            name:''
        },
        date:{
            "newTitle":"",
            "newType":"其他留言",
            "newBody":"",
        }
    };

    //获取验证码
    $scope.getValidate = function(){
        validate.get().then(function (data) {
            if(data){
                $scope.checkimgs = data;
                $scope.news.usvalidate.index = data.index;
                $scope.news.usvalidate.name = "";
            }else{
                toastr.warning("获取验证码失败！");
            }
        });
    };

    //添加留言
    $scope.addNews= function () {
        var responce = HttpCore.PostPlus("Lock/AddNew",{data:$scope.news});
        responce.then(function (resp) {
            if(resp.data && resp.data.status==1){
                toastr.success("留言成功！");
                $mdDialog.cancel();
            }else{
                toastr.warning(resp.data.msg?resp.data.msg:"留言失败！");
            }
        },function () {
            toastr.warning("留言失败！");
        })
    };

    $scope.getValidate();
}]);