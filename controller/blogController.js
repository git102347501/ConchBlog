conch.controller('blogController',['$scope','$ocLazyLoad','$timeout','$interval','HttpCore','toastr',
    function ($scope,$ocLazyLoad,$timeout,$interval,HttpCore,toastr) {
    //加载资源
    $ocLazyLoad.load([
        'css/blog/blog.css',
        'css/blog/blogmenu.css'
    ]);

    //当前博文评论列表
    $scope.commentlist =[
        {
            "name":"匿名",
            "head":"https://blog-1252305000.cos.ap-shanghai.myqcloud.com/User/default_tit.webp",
            "content":"写的真不错！",
            "date":"2018-01-01 1:11:58",
            "reply":[{
                "name":"匿名",
                "head":"https://blog-1252305000.cos.ap-shanghai.myqcloud.com/User/default_tit.webp",
                "content":"哈哈，我也是这么觉得",
                "date":"2018-01-01 1:11:58"
            },{
                "name":"匿名",
                "head":"https://blog-1252305000.cos.ap-shanghai.myqcloud.com/User/default_tit.webp",
                "content":"哈哈，我也是这么觉得",
                "date":"2018-01-01 1:11:58"
            },{
                "name":"匿名",
                "head":"https://blog-1252305000.cos.ap-shanghai.myqcloud.com/User/default_tit.webp",
                "content":"哈哈，我也是这么觉得",
                "date":"2018-01-01 1:11:58"
            }]
        }, {
            "name":"神奇的海螺",
            "head":"https://blog-1252305000.cos.ap-shanghai.myqcloud.com/User/default_tit.webp",
            "content":"写的真不错！",
            "date":"2018-01-01 1:11:58",
            "reply":[{
                "name":"匿名",
                "head":"https://blog-1252305000.cos.ap-shanghai.myqcloud.com/User/default_tit.webp",
                "content":"哈哈，我也是这么觉得",
                "date":"2018-01-01 1:11:58"
            }]
        },
    ];
    //当前博文菜单样式列表
    $scope.menuNavstyle =[];
    //当前博文菜单列表
    $scope.menulist=[];

    //展开收缩子菜单
    $scope.openNav = function (ev) {
        if(ev.height=="0px"){
            ev.height="45px";
        }else{
            ev.height="0px";
        }
    }

    $scope.Initialization = function(){
        $scope.getblogList();
    };

    //加载博文左侧菜单
    $scope.getblogList=function () {
        var response = HttpCore.PostPlus('Blog/BlogMenu',null);
        response.then(function(resp){
            if(resp.data !=null && resp.data.status == 1){
                $scope.menulist = resp.data.data;
                //赋值菜单高度样式集合
                $scope.menuNavstyle =[];
                for(var i=0;i< $scope.menulist.length;i++){
                    $scope.menuNavstyle.push({"height":"0px"});
                }
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
    }

    $scope.Initialization();
}]);