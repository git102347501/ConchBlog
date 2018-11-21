conch.controller('blogController',['$scope','$ocLazyLoad','$timeout','HttpCore','toastr','$state','$q','$rootScope','$stateParams','DiaLog',
    function ($scope,$ocLazyLoad,$timeout,HttpCore,toastr,$state,$q,$rootScope,$stateParams,DiaLog) {
    //加载资源
    $ocLazyLoad.load([
        'css/blog/blog.css',
        'css/blog/blogmenu.css'
    ]);
    //当前博文
    $scope.blog;
    //编辑模式
    $scope.editModel;
    //编辑博文对象
    $scope.editBlog={
        "blogID":"",
        "blogBody":"",
        "blogCate":"",
        "blogTitle":"",
        "blogDate":"",
        "blogClass":""
    };
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
    //验证码图片
    $scope.validateImg;
    //回复验证码图片
    $scope.replyValidateImg;
    //当前博文评论列表
    $scope.commentlist =[];
    //回复状态列表
    $scope.replyComment=[];
    //发表评论对象
    $scope.setCommentValidate={
        "commentMain":"",
        "commentIndex":-1,
        "commentDate":"",
        "commentHeard":"",
        "commentName":"",
        "commentContent":""
    };
    //发表回复评论对象
    $scope.setreplyCommentValidate={
        "commentMain":"",
        "commentIndex":"",
        "commentDate":"",
        "commentHeard":"",
        "commentName":"",
        "commentContent":""
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
    };

    //初始化
    $scope.Initialization = function(){
        var param = $stateParams.blogID;
        //加载博文左侧列表
        $scope.getblogList().then(function () {
            if(param){
                $scope.getBlog(param);
            }else{
                $scope.loadDefaultBlog();//加载首个博文内容
            }
        });
        $scope.getNewBloglist();
        $scope.getValidateImg(true);//获取验证码
    };

    //编辑博文菜单
    $scope.editCate = function(ev){
        $ocLazyLoad.load("controller/dialog/blogcateDialog.js");
        $timeout(function () {
            DiaLog.showAdvanced(ev,"view/blog/blogCate.html");
        },500);

    };

    //加载首个博文
    $scope.loadDefaultBlog = function(){
        if($scope.menulist && $scope.menulist.length>0){
            //默认加载首个博文
            var defaultlist = $scope.menulist.find(c=> c.menu && c.menu.length>0)
            if(defaultlist){
                $scope.getBlog(defaultlist.menu[0].id);
            }
        }
    };
    //加载博文左侧列表
    $scope.getblogList=function () {
        var deferred = $q.defer();

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
                return deferred.resolve(true);
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
        return deferred.promise;
    }

    //加载博文
    $scope.getBlog = function(index){
        //赋值读取博文正文状态，显示加载区域
        $scope.readblog = false;

        $scope.getcommlist(index);
        $scope.getBlogCommentList(index);

        var response = HttpCore.PostPlus("Blog/BlogBody",{"data":index});
        response.then(function (resp) {
            if(resp.data && resp.data.status==1 && resp.data.data){
                $scope.blog = resp.data.data;
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

    //回复评论
    $scope.replyComments= function(ev,index){
        ev.value=!ev.value;
        $scope.setreplyCommentValidate.commentIndex = index;
        if(!$scope.replyValidateImg){
            $scope.getValidateImg(false);
        }
    };

    //加载博文评论列表
    $scope.getBlogCommentList = function(index){
        $scope.replyComment=[];
        $scope.readBlogcommlist=false;
        var responce = HttpCore.PostPlus("Blog/BlogCommList",{"data":index});
        responce.then(function (resp) {
            if(resp.data && resp.data.status==1){
                $scope.commentlist = resp.data.data;
                for (var i=0;i< $scope.commentlist.length;i++) {
                    $scope.replyComment.push({"value":false});
                }
                $scope.readBlogcommlist=true;
            }
        },function () {

        })
    }

    //获取验证码 真发表，假回复
    $scope.getValidateImg = function(model){
        if(model){
            $scope.validateImg ="";
            $scope.setCommentValue="";
        }else{
            $scope.replyValidateImg ="";
            $scope.setreplyCommentvalue="";
        }
        var responce = HttpCore.PostPlus("Validate/ReadImage",{"data":4});
        responce.then(function (resp) {
            if(resp.data && resp.data.status==1){
                if(model){
                    $scope.validateImg = resp.data.data;
                }else{
                    $scope.replyValidateImg = resp.data.data;
                }
            }
        });
    };

    //发布评论
    $scope.setComment = function(index,commentvalue){
        var commentvalidate;//评论信息对象
        var commentimg;//验证码图片
        if(index<0){
            commentvalidate = $scope.setCommentValidate;
            commentimg = $scope.validateImg;
        }else{
            commentvalidate =$scope.setreplyCommentValidate;
            commentimg = $scope.replyValidateImg;
        }
        if(!commentvalidate || !commentvalidate.commentContent || commentvalidate.commentContent.length<1){
            toastr.warning("请输入评论内容！");return;
        }
        if(commentvalue.length<1){
            toastr.warning("请输入验证码！");return;
        }
        //赋值评论属性
        commentvalidate.commentMain = $scope.blog.blogID;
        commentvalidate.commentHeard = "https://blog-1252305000.cos.ap-shanghai.myqcloud.com/User/default_tit.webp";
        commentvalidate.commentName = "匿名";
        var usvali ={"name":commentvalue,"index":commentimg.index};
        var responce = HttpCore.PostPlus("Blog/BlogComment",{data:{ usvalidate:usvali,data:commentvalidate}});
        responce.then(function (resp) {
            if(resp.data && resp.data.status==1){
                toastr.success("发表评论成功！");
                //清空评论内容
                commentvalidate.commentContent="";
                //刷新评论列表
                $scope.getBlogCommentList($scope.blog.blogID);
                //重新获取验证码
                $scope.getValidateImg(index<0);
            }else{
                if(resp.data && resp.data.msg){
                    toastr.warning(resp.data.msg);
                }else{
                    toastr.warning("发表评论失败！");
                }
            }
        },function () {
            toastr.warning("发表评论失败！");
        });
    };

    //编辑博文
    $scope.editblog = function(){
        $state.go("blog.edit");

        $scope.editBlog.blogID = $scope.blog.blogID;
        $scope.editBlog.blogBody = $scope.blog.blogBatter;
        $scope.editBlog.blogCate = $scope.blog.blogCate.split(',') ;
        $scope.editBlog.blogTitle = $scope.blog.blogTitle;
        $scope.editBlog.blogDate = $scope.blog.blogCreatDate;
        $scope.editBlog.blogClass = $scope.blog.blogClass;

        //等待控件加载完，载入内容
        $timeout(function(){
            CKEDITOR.replace('editor1');
            CKEDITOR.instances.editor1.setData($scope.editBlog.blogBody);
        },400);
    };

    //取消编辑
    $scope.closeEdit = function(){
        $state.go("blog.matter");
    };

    //保存博文
    $scope.saveBlog = function(){
        var blogvalues = CKEDITOR.instances.editor1.getData();
        $scope.editBlog.blogBody = blogvalues;
        $scope.editBlog.blogCate = $scope.editBlog.blogCate.toString();
        var response =  HttpCore.PostPlus($scope.editModel? 'Blog/AddBlog':'Blog/UpdateBlog',$scope.editBlog);
        response.then(function(resp){
            if(resp.data !=null && resp.data.status ==1){
                $state.go("blog.matter");
                toastr.success("保存成功！");
                //跳转到视图
                $scope.getblogList();
                $scope.getBlog($scope.blog.blogID);
            }else{
                toastr.error("保存失败！");
            }
        },function(resp){
            toastr.error("保存失败！");
        });
    };

    //注销回调
    $rootScope.$on('logon',function (data,args) {
        $scope.user = null;
    });

    $scope.Initialization();
}]);