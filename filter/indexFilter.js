conch.filter('pastdate',function () {
    return function (value) {
        var dateBegin = new Date(value);//将-转化为/，使用new Date
        var dateEnd = new Date();//获取当前时间
        var dateDiff = dateEnd.getTime() - dateBegin.getTime();//时间差的毫秒数
        var dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000));//计算出相差天数
        var leave1=dateDiff%(24*3600*1000);    //计算天数后剩余的毫秒数
        var hours=Math.floor(leave1/(3600*1000));//计算出小时数
        //计算相差分钟数
        var leave2=leave1%(3600*1000);    //计算小时数后剩余的毫秒数
        var minutes=Math.floor(leave2/(60*1000));//计算相差分钟数
        //计算相差秒数
        var leave3=leave2%(60*1000);     //计算分钟数后剩余的毫秒数
        var seconds=Math.round(leave3/1000);

        if(dayDiff<1){
            if(hours<1){
                if(minutes<1){
                    if(seconds<1){
                        return "刚刚";
                    }else{
                        return seconds+"秒前";
                    }
                }else{
                    return minutes+"分钟前";
                }
            }else{
                return hours+"小时前";
            }
        }else{
            return dayDiff+"天前";
        }
    }
});
