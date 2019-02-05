conch.controller('blogMatter',['$scope','HttpCore','$mdDialog','$rootScope','$cookieStore','toastr','$state',
    function ($scope,HttpCore,$mdDialog,$rootScope,$cookieStore,toastr,$state) {

        $scope.blog="";
        $scope.readblog = false;

        //初始化
        $scope.Initialization = function (){
            var parm = $state.params.id;
            if(parm){
                $scope.getBlogs(parm);
            }
            HttpCore.PostBaidu();
        };

        //读取博文
        $scope.getBlogs = function (index){
            $scope.readblog = false;
            var response = HttpCore.PostPlus("Blog/BlogBody",{"data":index});
            response.then(function (resp) {
                if(resp.data && resp.data.status==1 && resp.data.data){
                    $scope.blog = resp.data.data;
                    $rootScope.$emit('readBlogStatus',$scope.blog);
                }else{
                    if(resp.data && resp.data.msg){
                        toastr.warning(resp.data.msg);
                    }else{
                        toastr.warning("读取博文失败！");
                    }
                }
                $scope.readblog = true;
            },function () {
                toastr.error("读取博文失败！");
                $scope.readblog = true;
            })
        };

        //取消编辑
        $scope.closeEdit = function(){
            $state.go("blog.matter",{blogID:$scope.readblogID});
        };

        $scope.Initialization();
    }]);