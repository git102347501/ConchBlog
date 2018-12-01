conch.service('checkService',['$filter',function ($filter) {
    var checks = [];
    this.put = function (model,value) {
        checks.push({
            model:model,value:value
        })
    }
    this.check=function(model){
        var result = checks.find(c=>c.model == model);
        if(result){
            if(result.value && Comparative(result.value)){
                return true;
            }else{
                return false;
            }
        }else{
            return false;
        }
    };
    //比较日期
    function Comparative(enddate) {
        var beginTime = $filter('date')(new Date(), "yyyy-MM-dd hh:mm:ss");
        var endTime = $filter('date')(enddate, "yyyy-MM-dd hh:mm:ss");;
        var beginTimes = beginTime.substring(0, 10).split('-');
        var endTimes = endTime.substring(0, 10).split('-');
        beginTime = beginTimes[1] + '-' + beginTimes[2] + '-' + beginTimes[0] + ' ' +beginTime.substring(10, 19);
        endTime = endTimes[1] + '-' + endTimes[2] + '-' + endTimes[0] + ' ' + endTime.substring(10, 19);
        var a = (Date.parse(endTime) - Date.parse(beginTime)) / 3600 / 1000;
        if (a > 0) {
            return true;
        } else {
            return false;
        }
    };
}]);