conch.service('HttpCore',['$http','$q','$cookieStore','$state','$httpParamSerializerJQLike','toastr',
    function ($http,$q,$cookieStore,$state,$httpParamSerializerJQLike,toastr) {

    var serviceUrl = "http://localhost:5000/api/";
    //var serviceUrl = "https://api.magicalconch.com/api/";
    this.superPost = function(url,data,success,error){
        var response = this.PostPlus(url,data);
        response.then(function (resp) {
            if(resp.data && resp.status){
                toastr.success(success);
            }else{
                if(resp.data && resp.data.msg){
                    toastr.warning(resp.data.msg);
                }else{
                    toastr.error(error);
                }
            }
        },function () {
            toastr.error(error);
        })
    };

    this.PostBaidu =function () {
        var bp = document.createElement('script');
        var curProtocol = window.location.protocol.split(':')[0];
        if (curProtocol === 'https'){
            bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
        }
        else{
            bp.src = 'http://push.zhanzhang.baidu.com/push.js';
        }
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(bp, s);
    };
    //发送请求
    this.PostPlus = function (url,data) {
        var deferred = $q.defer(); // 声明延后执行，表示要去监控后面的执行
        var user = $cookieStore.get('user');
        var date;
        if(angular.isObject(data)){
            date = $httpParamSerializerJQLike(data);
        }else{
            date = data;
        }
        var tokey='';
        if(user){
            tokey = user.userToken;
        }
        $http({
            headers:{'Content-Type':'application/x-www-form-urlencoded','Authorization':'Bearer '+ tokey},
            method:'post',
            url: serviceUrl + url,
            data: date
        }).then(function successCallback(responce) {
            return deferred.resolve(responce);
        },function errorCallback(responce) {
            if(responce.status=="401"){
                $cookieStore.remove('user');
                toastr.error("登录超时，请重新登录！");
                $state.go('login');
            }
        });
        return deferred.promise;
    }
}]);