conch.controller('blogController',['$scope','$ocLazyLoad','$timeout','HttpCore','toastr','$state','$q','$rootScope','$stateParams','DiaLog','$cookieStore','$mdDialog','validate',
    function ($scope,$ocLazyLoad,$timeout,HttpCore,toastr,$state,$q,$rootScope,$stateParams,DiaLog,$cookieStore,$mdDialog,validate) {
    //加载资源
    $ocLazyLoad.load([
        'css/blog/blog.css',
        'css/blog/blogmenu.css'
    ]);
    //当前博文
    $scope.blog;
    //登录信息
    $scope.user= $cookieStore.get("user");
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
    //菜单搜索标题
    $scope.blogQuerytitle="";
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
    //当前博文菜单列表
    $scope.menuFilterlist=[];
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
        var params = $state.params.id;
        //加载博文左侧列表
        $scope.getblogList().then(function () {
            if(param){
                $scope.getBlog(param);
            }else if (params){
                $scope.getBlog(params);
            }else{
                if($scope.menuFilterlist && $scope.menuFilterlist.length>0){
                    //默认加载首个博文
                    var defaultlist = $scope.menuFilterlist.find(c=> c.menu && c.menu.length>0)
                    if(defaultlist){
                        $scope.getBlog(defaultlist.menu[0].id);
                    }
                }
            }
        });
        $scope.getNewBloglist();
        $scope.getValidateImg(true);//获取验证码
        $scope.closeEdit();
        HttpCore.PostBaidu();
    };

    $scope.$watch('blogQuerytitle',function () {

        if(!$scope.blogQuerytitle){
            $scope.menuFilterlist = JSON.parse(JSON.stringify($scope.menulist));
        }else{
            for (var i=0;i< $scope.menulist.length;i++){
                $scope.menulist.map((item,index)=>{
                    $scope.menuFilterlist[index].menu =[];
                    item.menu.map((item,index)=>{
                        if(item.name.indexOf($scope.blogQuerytitle)!=-1){
                            $scope.menuFilterlist[index].menu.push(Object.assign({},item));
                        }
                    })
                });
            }
        }
    });

    //编辑博文菜单
    $scope.editCate = function(ev){
        $ocLazyLoad.load("controller/dialog/blogcateDialog.js").then(function () {
            DiaLog.showAdvanced(ev,"view/blog/blogCate.html");
        });
    };

    //加载博文左侧列表
    $scope.getblogList=function () {
        var deferred = $q.defer();

        $scope.readbloglist =false;
        var response = HttpCore.PostPlus('Blog/BlogMenu',null);
        response.then(function(resp){
            if(resp.data !=null && resp.data.status == 1){
                $scope.menulist = resp.data.data;
                $scope.menuFilterlist = JSON.parse(JSON.stringify($scope.menulist));
                //赋值菜单高度样式集合
                $scope.menuNavstyle =[];
                for(var i=0;i< $scope.menuFilterlist.length;i++){
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
    };

    //加载博文
    $scope.getBlog = function(index){

        $scope.readblogID = index;
        $state.go("blog.matter",{id:$scope.readblogID});
    };

    //加载博文推荐列表
    $scope.getcommlist = function(index){
        $scope.commlist=[];
        $scope.readBlogcomm = false;
        var response = HttpCore.PostPlus("Blog/BlogComm",{"data":index});
        response.then(function (resp) {
            if(resp.data && resp.data.status==1){
                $scope.commlist = resp.data.data;
                $scope.readBlogcomm = true;
            }else{
                toastr.warning(resp.data.msg);
            }
            $scope.readBlogcomm = true;
        });
    };

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
    };

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
    };

    //获取验证码 真发表，假回复
    $scope.getValidateImg = function(model){
        if(model){
            $scope.validateImg ="";
            $scope.setCommentValue="";
        }else{
            $scope.replyValidateImg ="";
            $scope.setreplyCommentvalue="";
        }
        validate.get().then(function (data) {
            if(data){
                if(model){
                    $scope.validateImg = data;
                }else{
                    $scope.replyValidateImg = data;
                }
            }else{
                toastr.warning("获取验证码失败！");
            }
        });
    };

    //删除评论
    $scope.deteComment = function(ev,parent,index){
        var confirm = $mdDialog.confirm()
            .title('请确认要删除评论吗？')
            .textContent('删除评论')
            .targetEvent(ev)
            .ok('确定')
            .cancel('取消');

        $mdDialog.show(confirm).then(function() {
            //执行删除
            var response =  HttpCore.PostPlus("Blog/DeteComment",{data:index?index.commentID:parent.commentID});
            response.then(function(resp){
                if(resp.data !=null && resp.data.status >0){
                    toastr.success("删除评论成功！");
                    if(index){
                        parent.commentReplyList.splice(parent.commentReplyList.indexOf(index),1);
                    }else{
                        $scope.commentlist.splice($scope.commentlist.indexOf(parent),1);
                    }
                    return;
                }else{
                    toastr.error("删除评论失败！");
                }
            },function(){
                toastr.error("删除评论失败！");
            });
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
        var responce = HttpCore.PostPlus("Blog/BlogComment",{data:{ usvalidate:usvali,date:commentvalidate}});
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
    $scope.editblog = function(model){
        $scope.editBlog.blogID = model?"":$scope.blog.blogID;
        $scope.editBlog.blogBody = model?"":$scope.blog.blogBatter;
        if(!model && $scope.blog.blogCate){
            $scope.editBlog.blogCate = $scope.blog.blogCate.split(',');
        }else{
            $scope.editBlog.blogCate = [];
        }
        $scope.editBlog.blogTitle = model?"":$scope.blog.blogTitle;
        $scope.editBlog.blogDate = model?"":$scope.blog.blogCreatDate;
        $scope.editBlog.blogClass = model?"":$scope.blogCatelist.find(c=>c.name ==  $scope.blog.blogClass).id;

        $ocLazyLoad.load('ckeditor/ckeditor.js').then(function () {
            $scope.editModel = model;
            $state.go("blog.edit").then(function () {
                CKEDITOR.replace('editor1');
                CKEDITOR.instances.editor1.setData($scope.editBlog.blogBody);
            });
        },function (e) {
            toastr.error("加载编辑控件失败！错误："+e);
        });
    };

    //取消编辑
    $scope.closeEdit = function(){
        $state.go("blog.matter",{blogID:$scope.readblogID});
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
                $scope.getBlog($scope.editModel?resp.data.data:$scope.blog.blogID);
            }else{
                toastr.error("保存失败！");
            }
        },function(resp){
            toastr.error("保存失败！");
        });
    };

    //登录回调
    $rootScope.$on('login',function (data,args) {
        if(args){
            $scope.user = $cookieStore.get("user");
            $ocLazyLoad.load('ckeditor/ckeditor.js');
        }
    });

    //读取博文回调
    $rootScope.$on('readBlogStatus',function (data,args) {
        if(args){
            $scope.blog = args;
            $scope.getcommlist(args.blogID);
            $scope.getBlogCommentList(args.blogID);
            $scope.readblog = true;
        }
    });

    //注销回调
    $rootScope.$on('logon',function (data,args) {
        $scope.user = null;
    });

    $scope.Initialization();
}]);