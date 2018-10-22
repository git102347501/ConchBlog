conch.controller('indexController',['$scope','$ocLazyLoad','$interval','$rootScope',function ($scope,$ocLazyLoad,$interval,$rootScope) {

    $ocLazyLoad.load("css/main.css");
    $scope.navlist = [
        {"name":"INDEX","url":"index"},
        {"name":"LIFE","url":"life"},
        {"name":"BLOG","url":"blog"},
        {"name":"RESUME","url":"resume"},
    ]
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
    $scope.shiplink=[
        {
            "title":"www.baidu.com/img/baidu_jgylogo3.gif",
            "name":"百度",
            "url":"http://www.baidu.com"
        },
        {
            "title":"www.baidu.com/img/baidu_jgylogo3.gif",
            "name":"百度",
            "url":"http://www.baidu.com"
        },
        {
            "title":"www.baidu.com/img/baidu_jgylogo3.gif",
            "name":"百度",
            "url":"http://www.baidu.com"
        },
        {
            "title":"www.baidu.com/img/baidu_jgylogo3.gif",
            "name":"百度",
            "url":"http://www.baidu.com"
        },{
            "title":"www.baidu.com/img/baidu_jgylogo3.gif",
            "name":"百度",
            "url":"http://www.baidu.com"
        },{
            "title":"www.baidu.com/img/baidu_jgylogo3.gif",
            "name":"百度",
            "url":"http://www.baidu.com"
        },{
            "title":"www.baidu.com/img/baidu_jgylogo3.gif",
            "name":"百度",
            "url":"http://www.baidu.com"
        },
    ]
   // $scope.panelstyle=['main_panel1','main_panel2','main_panel3']
   //  function RandomNum(Min,Max){
   //      var Range = Max - Min;
   //      var Rand = Math.random();
   //      var num = Min + Math.round(Rand * Range);
   //      return num;
   //  }
   //
   //  $scope.timer = $interval( function(){
   //      for (var i=0;i<3;i++) {
   //          $scope.panelstyle[i] = "main_title main_panel"+RandomNum(0,2).toString();
   //      }
   //  }, 1000);

   // $scope.timer.then();
    $scope.photo = "main_photo_img";
    $scope.photos = "main_photo_imgs";
    $scope.disMask = function () {
        $scope.photo="main_photo_imgs";
    }

    $scope.navstyle ="";
    $(window).scroll(function () {
        var st = Math.max(document.body.scrollTop || document.documentElement.scrollTop);
        if (st >= 400) {
            $scope.navstyle ={"position": "fixed", "top":"0"};
        }else{
            $scope.navstyle ="";
        }
    });
}]);