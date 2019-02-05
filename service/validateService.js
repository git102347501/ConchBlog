conch.service('validate',['$q','HttpCore',function ($q,HttpCore) {
    //请求验证码
    this.get = function () {
        var deferred = $q.defer();

        var responce = HttpCore.PostPlus("Validate/ReadImage",{"data":4});
        responce.then(function (resp) {
            if(resp.data && resp.data.status==1){
                deferred.resolve(resp.data.data);
            }else{
                deferred.resolve(null);
            }
        },function () {
            deferred.resolve(null);
        });
        return deferred.promise;
    };
}]);