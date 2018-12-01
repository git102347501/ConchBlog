conch.config(['$stateProvider','$urlRouterProvider',function ($stateProvider,$urlRouterProvider) {
    $urlRouterProvider.otherwise('/index');
    $stateProvider
        .state('index',{
            url: '/index',
            templateUrl: 'view/index/main.html'
        })
        .state('blog',{
            url: '/blog',
            params:{
                blogID:''
            },
            templateUrl: 'view/blog/blog.html',
            controller:'blogController',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load('controller/blogController.js');
                }]
            }
        })
        .state('blog.matter',{
            url: '/blog.matter',
            templateUrl: 'view/blog/blogMatter.html'
        })
        .state('blog.edit',{
            url: '/blog.edit',
            templateUrl: 'view/blog/blogEdit.html',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load('ckeditor/ckeditor.js');
                }]
            }
        })
        .state('life',{
            url: '/life',
            templateUrl: 'view/life/life.html',
            controller:'lifeController',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load('controller/lifeController.js');
                }]
            }
        })
        .state('lock',{
            url: '/lock',
            params:{"modelname":null},
            templateUrl: 'view/lock.html',
            controller:'lockController',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load('controller/lockController.js');
                }]
            }
        })
        .state('resume',{
            url: '/resume',
            templateUrl: 'view/resume/resume.html',
            controller:'resumeController',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load('controller/resumeController.js');
                }]
            }
        })
}]);
