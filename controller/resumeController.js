conch.controller('resumeController',['$scope','$ocLazyLoad','$state','$rootScope','$stateParams','checkService','$location','$anchorScroll','DiaLog','HttpCore',
    function ($scope,$ocLazyLoad,$state,$rootScope,$stateParams,checkService,$location,$anchorScroll,DiaLog,HttpCore) {
    $ocLazyLoad.load(['css/resume.css','controller/dialog/newDialog.js']);

    $scope.menu = ['求职意向','教育经历','工作经验','项目经验','个人证书','自我评价'];
    $scope.schoolList = [
        {
            name:'黄河水利职业技术学院',
            major:'会计学',
            record:'统招大专',
            date:'2012.7 - 2015.7'
        }
    ];
    $scope.companyList = [
        {
            name:'江苏爱特科技有限公司',
            url:'http://czatkj.com/',
            date:'2018.3-至今',
            station:'Net开发',
            payment:'6001-8000/月',
            duty:'负责公司OA,ERP等相关产品的研发工作'
        },
        {
            name:'常州世轩科技股份有限公司',
            url:'http://www.cnsesan.com/',
            date:'2017.1-2018.3',
            station:'Net开发',
            payment:'6001-8000/月',
            duty:'负责RIS医技产品的研发工作'
        }
    ];
    $scope.resumeList = [
        {
            name:'销售宝在线触屏销售软件项目研发',
            date:'2018.8 - 2018.9',
            context:'负责独立研发一套触屏式销售软件，分BS管理端以及CS客户端两部分，BS管理端拥有门店管理以及商品管理功能，CS端分为员工模块，订单模块以及库存三大模块，具备触摸式开单销售，库存操作等常用ERP功能。\n' +
                '                                <br />前端（BS）：SPA(bootstrap3.2+AngularJS1.6+material)\n' +
                '                                <br />前端（CS）：WinForm(DEV1.6 + Net4.5)\n' +
                '                                <br />后端：NetCore2.1+SqlServer2017+Nginx'
        },
        {
            name:'随意停收费软件研发',
            date:'2018.6 - 2018.7',
            context:'负责研发一款停车收费软件，实时显示出入口摄像头视频，根据摄像头识别到的车牌号自动判断车辆，通过数据处理自动或手动控制道闸，支持支付宝，微信，现金等常用收款结算功能，具备常用交班，结算，对账导出等功能。\n' +
                '                                <br />前端：DEV1.6+NET4.5\n' +
                '                                <br />其他支持：LED显示屏厂家DLL，道闸一体机DLL，视频摄像头DLL\n' +
                '                                <br />该收费软件前端由个人独立完成，架构为DEV+NET4.5，后端API已由其他同事完成。'
        },
        {
            name:'光谱仪控制软件研发',
            date:'2018.3 - 2018.5',
            context:'独立研发出一套能够实时显示光谱仪光谱数据和分析处理运算功能的CS软件，通过调用厂家动态链接库实时获取光谱仪数据，具备反射，透视等各项数据计算显示以及多光谱对比测算，傅里叶延伸波段，实时光谱动态三维模型等功能。\n' +
                '                                <br />前端：Net4.5+DEV\n' +
                '                                <br />其他支持：光谱仪厂家DLL\n'
        },
        {
            name:'RIS2.0版本开发',
            date:'2017.6 - 2017.12',
            context:'整体在RIS1.8的基础上进行系统性全面开发升级至2.0的大版本升级，采用全新的控件模组以及进一步优化的数据库设计，DAO访问层升级，功能改进以及历史BUG修复，整体开发周期历时4个月，至上线测试到部署完成6个月时间。（现软件已在各个省市三甲等医院均有部署使用）。\n' +
                '                                <br />个人负责软件三大模块：报告模块，统计模块，系统管理模块（B/S）开发'
        },
        {
            name:'自助打印软件开发',
            date:'2017.4 - 2017.6',
            context:'软件分三大模块。\n' +
                ' <br />打印模块：具备报告查询打印以及阅览功能，支持条码扫描，医保卡或就诊卡刷卡等多项输入方式。\n' +
                ' <br />管理模块：具备自助打印后台权限控制，功能模块化开发管理以及基础样式自定义功能。\n' +
                ' <br />服务模块：服务器后台服务负责各客户端信息交互监控调节，保证在多并发环境下稳定运行能力。\n' +
                ' <br />截止目前，该软件已在两家医院均有部署应用。\n'
        }
    ];

    $scope.certificate =["会计从业证书","计算机二级证书"];

    $scope.Initialization = function(){
        if(!$stateParams.check){
            $state.go("lock");
        }
        HttpCore.PostBaidu();
    };
    //跳转到指定锚点
    $scope.gotoCard = function(name){
        $location.hash(name);
        $anchorScroll();
    };
    //鉴权
    $scope.checkPrower =function(){
        var check = checkService.check('resume');
        if(!check){
            //如果存在路由权限
            if(!$stateParams.check){
                $state.go("lock",{model:{name:"我的简历",model:"resume"}});
            }
        }else{
            $location.hash($scope.menu[0]);
            checkService.put("resume",$stateParams.date);
        }
    };
    //打开发表留言
    $scope.goNews = function(ev){
        DiaLog.showAdvanced(ev,"view/resume/dialog/newInsert.html");
    };
    //注销回调
    $rootScope.$on('logon',function () {
        $scope.user = null;
    });

    $scope.Initialization();
}]);