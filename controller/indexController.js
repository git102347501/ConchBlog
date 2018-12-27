conch.controller('indexController',['$scope','$ocLazyLoad','$timeout','HttpCore','toastr','$cookieStore','$rootScope','DiaLog','$state',
    function ($scope,$ocLazyLoad,$timeout,HttpCore,toastr,$cookieStore,$rootScope,DiaLog,$state) {
    //加载控制器资源
    $ocLazyLoad.load(["css/main.css","controller/lockController.js"]);
    //登录信息
    $scope.user= $cookieStore.get("user");
    //博客个人信息
    $scope.blogUser="";
    //首页博文信息
    $scope.blogList=[];
    //读取博文信息进度
    $scope.readBlogList=false;
    //读取博文类别进度
    $scope.readBlogCate = false;
    //导航信息对象
    $scope.navlist = [
        {"name":"INDEX","url":"index"},
        {"name":"LIFE","url":"life"},
        {"name":"BLOG","url":"blog"},
        {"name":"RESUME","url":"resume"},
    ];
    $scope.blogKind=["最近更新","热门推荐","人气排行"];
    //首页博文查询条件
    $scope.queryBrief = {
        "model":0,
        "cate":0
    };
    //首页博文类别列表
    $scope.blogCatelist=[];
    $scope.dynamicTarget=["个人动态","网站公告","重要通知"]
    //发布消息列表
    $scope.dynamicList =[];
    //读取动态列表进度
    $scope.readDynamic=false;
    //发布动态对象
    $scope.dynamicEdit={
        "dynamicTitle":"",
        "dynamicTarget":"个人动态",
        "dynamicContext":""
    };
    //导航样式
    $scope.navstyle ="con_nav";
    $scope.navstyles ="navbar navbar-default";
    //友情链接列表
    $scope.shiplink=[];
    //读取友联进度
    $scope.readShipList=false;
    //主页照片遮罩样式列表
    $scope.photpVisble=[];
    //主页照片信息列表
    $scope.photoList=[];
    //读取照片列表
    $scope.readPhotoList=false;
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
        $scope.getBlogCate();
        $scope.getPhotoList();
        $scope.getDynamicList();
        window.onscroll = function () {
            var t = document.documentElement.scrollTop || document.body.scrollTop;
            if (t > 345) {
                if($scope.navstyle !="con_navs")
                {
                    $scope.$apply(function(){
                        $scope.navstyles ="con_navs navbar navbar-default";
                        $scope.navstyle ="con_navs";
                    });
                }
            }else{
                if($scope.navstyle !="con_nav")
                {
                    $scope.$apply(function(){
                        $scope.navstyles ="navbar navbar-default";
                        $scope.navstyle ="con_nav";
                    });
                }
            }
        }
    };
    //登录
    $scope.login = function (ev) {
        DiaLog.showAdvanced(ev,'view/index/tple/login.html');
    };

    //路由跳转
    $scope.goPage = function(ev){
        $state.go('lock',{model:ev});
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
        $scope.readDynamic = false;
        var response = HttpCore.PostPlus('Dynamic/QueryDynamicList',null);
        response.then(function(resp){
            if(resp.data !=null && resp.data.status == 1){
                $scope.dynamicList = resp.data.data;
                $scope.readDynamic = true;
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

    //设置博文查询模式
    $scope.setQueryBlogModel = function(model){
        $scope.queryBrief.model = model;
        $scope.getBlogList();
    };

    //设置博文查询类别
    $scope.setQueryBlogCate = function(model){
        $scope.queryBrief.cate = model;
        $scope.getBlogList();
    };

    //获取博文类别列表
    $scope.getBlogCate = function(){
        $scope.readBlogCate=false;
        var response = HttpCore.PostPlus('Blog/BlogCate',null);
        response.then(function(resp){
            if(resp.data !=null && resp.data.status == 1){
                $scope.blogCatelist = resp.data.data;
                if($scope.blogCatelist.length>0){
                    $scope.readBlogCate=true;
                    $scope.queryBrief.cate = $scope.blogCatelist[0].id;
                    //获取第一个类别的最新更新博文列表
                    $scope.getBlogList();
                }
            }else{
                if(resp.data!=null){
                    toastr.error(resp.data.msg);
                }else{
                    toastr.error("获取博文类别失败！");
                }
            }
        },function(){
            toastr.error("获取博文类别失败！");
        })
    };

    //获取博文列表信息
    $scope.getBlogList = function () {
        $scope.readBlogList=false;
        var response = HttpCore.PostPlus('Blog/BlogSyn',{data:$scope.queryBrief});
        response.then(function(resp){
            if(resp.data !=null && resp.data.status == 1){
                $scope.blogList = resp.data.data;
                $scope.readBlogList=true;
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
        $scope.readPhotoList=false;
        var response = HttpCore.PostPlus('Photo/AlbumIndexLi',null);
        response.then(function(resp){
            if(resp.data !=null && resp.data.status == 1){
                $scope.photoList = resp.data.data;
                $scope.readPhotoList = true;
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