conch.controller('indexController',['$scope','$ocLazyLoad','$timeout','HttpCore','toastr','$cookieStore','$rootScope','DiaLog',
    function ($scope,$ocLazyLoad,$timeout,HttpCore,toastr,$cookieStore,$rootScope,DiaLog) {
    //加载控制器资源
    $ocLazyLoad.load("css/main.css");
    //登录信息
    $scope.user= $cookieStore.get("user");
    //博客个人信息
    $scope.blogUser="";
    //首页博文信息
    $scope.blogList=[];
    //导航信息对象
    $scope.navlist = [
        {"name":"INDEX","url":"index"},
        {"name":"LIFE","url":"life"},
        {"name":"BLOG","url":"blog"},
        {"name":"RESUME","url":"resume"},
    ];
    $scope.dynamicTarget=["个人动态","网站公告","重要通知"]
    //发布消息列表
    $scope.dynamicList =[];
    //发布动态对象
    $scope.dynamicEdit={
        "dynamicTitle":"",
        "dynamicTarget":"个人动态",
        "dynamicContext":""
    };
    //友情链接列表
    $scope.shiplink=[];
    //主页照片遮罩样式列表
    $scope.photpVisble=[];
    //主页照片信息列表
    $scope.photoList=[];
    //主页照片遮罩层弹出和收缩
    $scope.showMask = function(pho,ev){
        if(ev){
            pho.style.display="block";

            for(var i=0;i< $scope.photpVisble.length;i++){
                if( $scope.photpVisble[i].id!=pho.id){
                    $scope.photpVisble[i].style.display="none";
                }
            }
            $timeout(function () {
                pho.style.height="240px";
            },200);
            $timeout(function () {
                pho.display="block";
            },400);
        }else{
            pho.style.display="none";
            pho.style.height="0px";
            $timeout(function () {
                pho.style.display="none";
            },400);
        }
    }

    //初始化
    $scope.Initialization = function () {
        $scope.getUser();
        $scope.getBlogList();
        $scope.getPhotoList();
        $scope.getDynamicList();
    };

    //登录
    $scope.login = function (ev) {
        DiaLog.showAdvanced(ev,'view/index/tple/login.html');
    };

    //获取用户信息
    $scope.getUser = function(){
        var response = HttpCore.PostPlus('Config/GetUser',null);
        response.then(function(resp){
            if(resp.data !=null && resp.data.status == 1){
                $scope.blogUser = resp.data.data;
            }else{
                if(resp.data!=null){
                    toastr.error(resp.data.msg);
                }else{
                    toastr.error("获取博主信息失败！");
                }
            }
        },function(resp){
            toastr.error("获取博主信息失败！");
        })
    };

    //获取动态列表
    $scope.getDynamicList = function(){
        var response = HttpCore.PostPlus('Dynamic/QueryDynamicList',null);
        response.then(function(resp){
            if(resp.data !=null && resp.data.status == 1){
                $scope.dynamicList = resp.data.data;
            }else{
                if(resp.data!=null){
                    toastr.error(resp.data.msg);
                }else{
                    toastr.error("获取动态列表失败！");
                }
            }
        },function(resp){
            toastr.error("获取动态列表失败！");
        })
    };

    //发布个人动态
    $scope.setDynamic = function(){
        $scope.dynamicEdit.dynamicAction="发布";
        $scope.dynamicEdit.dynamicTarget="个人动态";
        var response = HttpCore.PostPlus('Dynamic/AddDynamic',{"data":$scope.dynamicEdit});
        response.then(function(resp){
            if(resp.data !=null && resp.data.status == 1){
                toastr.success("发布动态成功！");
                $scope.dynamicEdit={
                    "dynamicTitle":"",
                    "dynamicTarget":"个人动态",
                    "dynamicContext":""
                };
                $scope.getDynamicList();
            }else{
                if(resp.data!=null){
                    toastr.error(resp.data.msg);
                }else{
                    toastr.error("获取动态列表失败！");
                }
            }
        },function(resp){
            toastr.error("获取动态列表失败！");
        })
    };

    //获取博文信息
    $scope.getBlogList = function () {
        var response = HttpCore.PostPlus('Blog/BlogSyn',null);
        response.then(function(resp){
            if(resp.data !=null && resp.data.status == 1){
                $scope.blogList = resp.data.data;
            }else{
                if(resp.data!=null){
                    toastr.error(resp.data.msg);
                }else{
                    toastr.error("获取博文信息失败！");
                }
            }
        },function(resp){
            toastr.error("获取博文信息失败！");
        })
    };

    //获取相集信息
    $scope.getPhotoList = function(){
        var response = HttpCore.PostPlus('Photo/AlbumIndexLi',null);
        response.then(function(resp){
            if(resp.data !=null && resp.data.status == 1){
                $scope.photoList = resp.data.data;

                //加入相集遮罩层样式
                $scope.photpVisble =[];
                for (var i=0;i< $scope.photoList.length;i++){
                    $scope.photpVisble.push({
                        "id":i,
                        "style": {"display":"none","width":"100%"},
                        "fontstyle":{"display":"none"}
                    })
                }
            }else{
                if(resp.data!=null){
                    toastr.error(resp.data.msg);
                }else{
                    toastr.error("获取博文信息失败！");
                }
            }
        },function(resp){
            toastr.error("获取博文信息失败！");
        })
    }

    //登录回调
    $rootScope.$on('login',function (data,args) {
        if(args){
            $scope.user = $cookieStore.get("user");
        }
    });
    //注销回调
    $rootScope.$on('logon',function (data,args) {
        $scope.user = null;
    });

    $scope.Initialization();
}]);