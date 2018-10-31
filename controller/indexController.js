conch.controller('indexController',['$scope','$ocLazyLoad','$timeout','HttpCore','toastr',
    function ($scope,$ocLazyLoad,$timeout,HttpCore,toastr) {
    //加载控制器资源
    $ocLazyLoad.load("css/main.css");
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
    ]
    //发布消息列表
    $scope.dynamic =[
        {
            "title":"https://blog-1252305000.cos.ap-shanghai.myqcloud.com/User/me.webp",
            "what":"发表博文：我的Net之路",
            "who":"2018-10-18 22:21:25",
            "notes":"从一开始学习Net的时候，其实本意并非是看重这门语言，而是觉得......"
        },{
            "title":"https://blog-1252305000.cos.ap-shanghai.myqcloud.com/User/me.webp",
            "what":"上传6张照片到相集：岛国收藏",
            "who":"2018-10-18 22:21:25",
            "notes":"让我悄咪咪的收藏一下各位老师的照片，嘿嘿嘿......"
        },{
            "title":"https://blog-1252305000.cos.ap-shanghai.myqcloud.com/User/me.webp",
            "what":"发表个人说说：公告，版权相关！",
            "who":"2018-10-18 22:21:25",
            "notes":"如果发现本站有侵权资源，请及时通过站内信或者邮箱联系到我，我会第一时间处理！"
        }
    ]
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

    $scope.Initialization();

}]);