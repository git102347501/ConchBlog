conch.service('HttpCore',['$http','$q','$cookieStore','$state',function ($http,$q,$cookieStore,$state) {
    //服务地址
    var serviceUrl = "http://localhost:31126/api/";

    //发送请求
    this.PostPlus = function (url,data) {
        var deferred = $q.defer(); // 声明延后执行，表示要去监控后面的执行
        var user = $cookieStore.get('user');
        var date;
        if(typeof(data)=="string"){
            date = data;
        }else{
            date = data?$.param(data):null;
        }
        var tokey='';
        if(user){
            tokey = user.tokey;
        }
        $http({
            headers:{'Content-Type':'application/x-www-form-urlencoded','Authorization':'Bearer '+ tokey},
            method:'post',
            url: serviceUrl + url,
            data: date
        }).then(function successCallback(responce) {
            console.log(responce);
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