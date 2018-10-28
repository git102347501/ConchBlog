conch.controller('indexController',['$scope','$ocLazyLoad','$interval','$rootScope','$timeout',function ($scope,$ocLazyLoad,$interval,$rootScope,$timeout) {
    //加载控制器资源
    $ocLazyLoad.load("css/main.css");

    $scope.blogList=[
        {
            "title":"AngularJS开篇",
            "date":"2018-10-11 23:25:25",
            "brief":"事实上，如果从一开始谈WEB，我对于WEB的认知，仅仅是停留在静态页上面的.那个时代，属于Table布局，网络三剑客的时代。",
        },
        {
            "title":"AngularJS开篇",
            "date":"2018-10-11 23:25:25",
            "brief":"事实上，如果从一开始谈WEB，我对于WEB的认知，仅仅是停留在静态页上面的.那个时代，属于Table布局，网络三剑客的时代。",
        },
        {
            "title":"AngularJS开篇",
            "date":"2018-10-11 23:25:25",
            "brief":"事实上，如果从一开始谈WEB，我对于WEB的认知，仅仅是停留在静态页上面的.那个时代，属于Table布局，网络三剑客的时代。",
        },
        {
            "title":"AngularJS开篇",
            "date":"2018-10-11 23:25:25",
            "brief":"事实上，如果从一开始谈WEB，我对于WEB的认知，仅仅是停留在静态页上面的.那个时代，属于Table布局，网络三剑客的时代。",
        }
    ];
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
    $scope.shiplink=[
        {
            "img":"img/baidu.png",
            "name":"百度",
            "url":"http://www.baidu.com"
        },
        {
            "img":"img/baidu.png",
            "name":"百度",
            "url":"http://www.baidu.com"
        },
        {
            "img":"img/baidu.png",
            "name":"百度",
            "url":"http://www.baidu.com"
        },
        {
            "img":"img/baidu.png",
            "name":"百度",
            "url":"http://www.baidu.com"
        }
    ]

    //主页照片信息列表
    $scope.photoList=[
        {
            "id":"1",
            "url":"https://blog-1252305000.cos.ap-shanghai.myqcloud.com/Photo/%E4%B8%8A%E6%B5%B7/shanghai.webp",
            "explain":"上海之旅",
            "summary":"上海一年的时间，让我感受到了来自社会的气息......",
            "style": {"display":"none","width":"100%"},
            "fontstyle":{"display":"none"}
        },
        {
            "id":"2",
            "url":"https://blog-1252305000.cos.ap-shanghai.myqcloud.com/Photo/%E5%8C%97%E4%BA%AC/beijing.webp",
            "explain":"北京一行",
            "summary":"第一次来到社会，就看到了背景......",
            "style": {"display":"none","width":"100%"},
            "fontstyle":{"display":"none"}
        },
        {
            "id":"3",
            "url":"https://blog-1252305000.cos.ap-shanghai.myqcloud.com/Photo/%E5%B8%B8%E5%B7%9E/changzhou.webp",
            "explain":"常州旅行",
            "summary":"这是我踏入IT行业的第一年，由此开始年，由此开始打开了程年，由此开始打开了程年，由此开始打开了程打开了程序员的大门......",
            "style": {"display":"none","width":"100%"},
            "fontstyle":{"display":"none"}
        },
        {
            "id":"4",
            "url":"https://blog-1252305000.cos.ap-shanghai.myqcloud.com/Photo/%E5%BC%80%E5%B0%81/kaifeng.webp",
            "explain":"开封历程",
            "summary":"大学三年，很多事情，想起来不免感觉太多遗憾......",
            "style": {"display":"none","width":"100%"},
            "fontstyle":{"display":"none"}
        }
    ]
    //主页照片遮罩层弹出和收缩
    $scope.showMask = function(pho,ev){
        if(ev){
            pho.style.display="block";

            for(var i=0;i< $scope.photoList.length;i++){
                if( $scope.photoList[i].id!=pho.id){
                    $scope.photoList[i].style.display="none";
                }
            }
            $timeout(function () {
                pho.style.height="240px";
            },200);
            $timeout(function () {
                pho.fontstyle.display="block";
            },400);
        }else{
            pho.fontstyle.display="none";
            pho.style.height="0px";
            $timeout(function () {
                pho.style.display="none";
            },400);
        }
    }

}]);