conch.controller('blogController',['$scope','$ocLazyLoad','$timeout','$interval',function ($scope,$ocLazyLoad,$timeout,$interval) {
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
    $scope.demoIco ="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PGcgaWQ9ImNha2UiPjxwYXRoIGQ9Ik0xMiA2YzEuMTEgMCAyLS45IDItMiAwLS4zOC0uMS0uNzMtLjI5LTEuMDNMMTIgMGwtMS43MSAyLjk3Yy0uMTkuMy0uMjkuNjUtLjI5IDEuMDMgMCAxLjEuOSAyIDIgMnptNC42IDkuOTlsLTEuMDctMS4wNy0xLjA4IDEuMDdjLTEuMyAxLjMtMy41OCAxLjMxLTQuODkgMGwtMS4wNy0xLjA3LTEuMDkgMS4wN0M2Ljc1IDE2LjY0IDUuODggMTcgNC45NiAxN2MtLjczIDAtMS40LS4yMy0xLjk2LS42MVYyMWMwIC41NS40NSAxIDEgMWgxNmMuNTUgMCAxLS40NSAxLTF2LTQuNjFjLS41Ni4zOC0xLjIzLjYxLTEuOTYuNjEtLjkyIDAtMS43OS0uMzYtMi40NC0xLjAxek0xOCA5aC01VjdoLTJ2Mkg2Yy0xLjY2IDAtMyAxLjM0LTMgM3YxLjU0YzAgMS4wOC44OCAxLjk2IDEuOTYgMS45Ni41MiAwIDEuMDItLjIgMS4zOC0uNTdsMi4xNC0yLjEzIDIuMTMgMi4xM2MuNzQuNzQgMi4wMy43NCAyLjc3IDBsMi4xNC0yLjEzIDIuMTMgMi4xM2MuMzcuMzcuODYuNTcgMS4zOC41NyAxLjA4IDAgMS45Ni0uODggMS45Ni0xLjk2VjEyQzIxIDEwLjM0IDE5LjY2IDkgMTggOXoiLz48L2c+PC9zdmc+";
    $scope.menulist=[
        {
            "name":"大陆无码",
            "ico":$scope.demoIco,
            "nav":{"height":"0px"},
            "menu":[
                {"name":"我的小姨子","ico":$scope.demoIco},
                {"name":"我的小舅子","ico":$scope.demoIco}
            ]
        },
        {
            "name":"高清日韩",
            "ico":$scope.demoIco,
            "nav":{"height":"0px"},
            "menu":[
                {"name":"波多老师","ico":$scope.demoIco},
                {"name":"苍老师","ico":$scope.demoIco}
            ]
        },
        {
            "name":"欧美风情",
            "ico":$scope.demoIco,
            "nav":{"height":"0px"},
            "menu":[
                {"name":"大洋马系列","ico":$scope.demoIco},
                {"name":"白黑系列","ico":$scope.demoIco}
            ]
        },
        {
            "name":"个人心得",
            "ico":$scope.demoIco,
            "nav":{"height":"0px"},
            "menu":[
                {"name":"子业务7","ico":$scope.demoIco},
                {"name":"子业务8","ico":$scope.demoIco}
            ]
        },
    ];
    $scope.menuStyle={"width":"300px"};
    $scope.openMenu = function () {
        $timeout(function () {
            $scope.menuStyle.width="300px";
        },500);
    }

    $scope.closeMenu = function () {
        for (var i=0;i<$scope.menulist.length;i++) {
            $scope.menulist[i].nav = {"height":"0px"};
        }
        $scope.menuStyle.width="45px";
    }

    $scope.openNav = function (ev) {
        if(ev.nav.height=="0px"){
            ev.nav.height="45px";
        }else{
            ev.nav ={"height":"0px"};
        }
    }
}]);