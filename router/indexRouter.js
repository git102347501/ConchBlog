conch.config(['$stateProvider','$httpProvider',function ($stateProvider) {
    $stateProvider
        .state('index',{
            url: '/index',
            templateUrl: 'tple/index/main.html',
            controller:'indexController'
        })
        .state('blog',{
            url: '/blog',
            templateUrl: 'tple/blog/blog.html',
            controller:'blogController'
        })
        .state('life',{
            url: '/life',
            templateUrl: 'tple/life/life.html',
            controller:'lifeController'
        })
        .state('resume',{
            url: '/resume',
            templateUrl: 'tple/resume/resume.html',
            controller:'resumeController'
        })
}]);
