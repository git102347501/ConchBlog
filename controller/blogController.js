conch.controller('blogController',['$scope','$ocLazyLoad','$timeout','$interval','HttpCore','toastr',
    function ($scope,$ocLazyLoad,$timeout,$interval,HttpCore,toastr) {
    //加载资源
    $ocLazyLoad.load([
        'css/blog/blog.css',
        'css/blog/blogmenu.css'
    ]);
    //当前博文
    $scope.blog;
    //读取推荐列表
    $scope.readBlogcomm=false;
    //读取博文对象
    $scope.readblog=false;
    //读取博文列表对象
    $scope.readbloglist = false;
    //读取最新列表对象
    $scope.readBlogNew=false;
    //读取博文评论对象
    $scope.readBlogcommlist=false;
    //当前博文评论列表
    $scope.commentlist =[];
    //发表评论对象
    $scope.setComment={
        "usvalidate":{
            "commentMain":"",
            "commentIndex":"",
            "commentDate":"",
            "commentHeard":"",
            "commentName":"",
            "commentContent":""
        },
        "data":""
    };
    //当前推荐博文列表
    $scope.commlist=[];
    //当前最新更新博文列表
    $scope.newlist=[];
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
        $scope.getNewBloglist();

    };

    //加载博文左侧列表
    $scope.getblogList=function () {
        $scope.readbloglist =false;
        var response = HttpCore.PostPlus('Blog/BlogMenu',null);
        response.then(function(resp){
            if(resp.data !=null && resp.data.status == 1){
                $scope.menulist = resp.data.data;
                //赋值菜单高度样式集合
                $scope.menuNavstyle =[];
                for(var i=0;i< $scope.menulist.length;i++){
                    $scope.menuNavstyle.push({"height":"0px"});
                }
                $scope.readbloglist =true;
                if($scope.menulist && $scope.menulist.length>0){
                    $scope.getBlog($scope.menulist[0].menu[0]);
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

    //加载博文
    $scope.getBlog = function(ev){
        //赋值读取博文正文状态，显示加载区域
        $scope.readblog = false;
        //赋值当前读取博文对象
        $scope.blog={
            "id":ev.id,
            "name":ev.name,
            "cate":ev.cate && ev.cate.indexOf(",")>0?ev.cate.split(","):ev.cate,
            "creatDate":ev.creatDate,
            "visit":ev.visit,
            "batter":"",
        };
        $scope.getcommlist(ev.id);
        $scope.getBlogCommentList(ev.id);
        var response = HttpCore.PostPlus("Blog/BlogBody",{"data":ev.id});
        response.then(function (resp) {
            if(resp.data && resp.data.status==1 && resp.data.data){
                $scope.blog.batter = resp.data.data.blogBatter;
                $scope.blog.visit = resp.data.data.blogVisit;
                //赋值读取博文正文状态，显示博文
                $scope.readblog = true;
            }else{
                if(resp.data && resp.data.msg){
                    toastr.warning(resp.data.msg);
                }else{
                    toastr.warning("读取博文失败！");
                }
            }
        },function () {
            toastr.error("读取博文失败！");
        })
    }

    //加载博文推荐列表
    $scope.getcommlist = function(index){
        $scope.commlist=[];
        $scope.readBlogcomm = false;
        var response = HttpCore.PostPlus("Blog/BlogComm",{"data":index});
        response.then(function (resp) {
            if(resp.data && resp.data.status==1){
                $scope.commlist = resp.data.data;
                $scope.readBlogcomm = true;
            }
        });
    }

    //加载最新博文列表
    $scope.getNewBloglist = function(){
        $scope.newlist=[];
        $scope.readBlogNew=false;
        var response = HttpCore.PostPlus("Blog/BlogNew", null);
        response.then(function (resp) {
            if(resp.data && resp.data.status==1){
                $scope.newlist = resp.data.data;
                $scope.readBlogNew=true
            }
        })
    }

    //加载博文评论列表
    $scope.getBlogCommentList = function(index){
        $scope.readBlogcommlist=false;
        var responce = HttpCore.PostPlus("Blog/BlogCommList",{"data":index});
        responce.then(function (resp) {
            if(resp.data && resp.data.status==1){
                $scope.commentlist = resp.data.data;
                $scope.readBlogcommlist=true;
            }
        },function () {

        })
    }

    //获取验证码
    $scope.getValidateImg = function(){

    };

    //发布评论
    $scope.setComment = function(){
        if(!$scope.setComment.usvalidate || angular.equals({},$scope.setComment.usvalidate.commentContent)){
            toastr.warning("请输入评论内容！");return;
        }
        if(!$scope.setComment || !$scope.setComment.data){
            toastr.warning("请输入验证码！");return;
        }
        //赋值评论属性
        $scope.setComment.usvalidate.commentIndex = $scope.blog.blogID;
        $scope.setComment.usvalidate.commentHeard = "https://blog-1252305000.cos.ap-shanghai.myqcloud.com/User/default_tit.webp";
        $scope.setComment.usvalidate.commentName = "匿名";
        HttpCore.superPost("Blog/BlogComment",$scope.setComment,"发表评论成功！","发表评论失败！");
    };

    $scope.Initialization();
}]);