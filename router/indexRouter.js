conch.config(['$stateProvider','$httpProvider',function ($stateProvider) {
    $stateProvider
        .state('index',{
            url: '/index',
            templateUrl: 'view/index/main.html',
            controller:'indexController'
        })
        .state('blog',{
            url: '/blog',
            templateUrl: 'view/blog/blog.html',
            controller:'blogController',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load('controller/blogController.js');
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
