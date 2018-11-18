conch.controller('blogcateDialog',['$scope','HttpCore','$mdDialog','$rootScope','$cookieStore','toastr',
    function ($scope,HttpCore,$mdDialog,$rootScope,$cookieStore,toastr) {
        //博文列表
        $scope.blogCate=[];
        //添加博文对象
        $scope.insertCate={
            "name":""
        };
        //获取类别列表
        $scope.getCatelist = function(){
            var response =  HttpCore.PostPlus("Blog/BlogCate",null);
            response.then(function(resp){
                if(resp.data !=null && resp.data.status==1){
                    $scope.blogCate = resp.data.data;
                }else{
                    toastr.error("获取类别列表失败！");
                }
            },function(){
                toastr.error("获取类别列表失败！");
            });
        };

        //添加类别
        $scope.addBlogCate =function () {
            var response =  HttpCore.PostPlus("Blog/AddBlogCate",{data: $scope.insertCate});
            response.then(function(resp){
                if(resp.data !=null && resp.data.status>0){
                    $scope.blogCate.push({
                        "id":resp.data.status,
                        "name":$scope.insertCate.name
                    });
                    $scope.insertCate.name="";
                }else{
                    toastr.error("添加类别失败！");
                }
            },function(){
                toastr.error("添加类别失败！");
            });
        };
        //更新类别
        $scope.updateBlogCate = function (cate) {
            var cates = $scope.blogCate.find(c=>c.id==cate.id);
            if(cate.name == cates.name){
                return;
            }
            var response =  HttpCore.PostPlus("Blog/UpdateBlogCate",{data:cate});
            response.then(function(resp){
                if(resp.data !=null && resp.data.status==1){
                    cates.name = cate.name;
                }else{
                    toastr.error("更新类别失败！");
                }
            },function(resp){
                toastr.error("更新类别失败！");
            });
        };
        //删除类别
        $scope.deteBlogCate = function (cate) {
            var response =  HttpCore.PostPlus("Blog/DeteBlogCate",{data:cate.id});
            response.then(function(resp){
                if(resp.data !=null && resp.data.status==1){
                    $scope.blogCate.splice($scope.blogCate.indexOf(cate));
                }else{
                    toastr.error("删除类别失败！");
                }
            },function(resp){
                toastr.error("删除类别失败！");
            });
        }

        $scope.getCatelist();
    }]);