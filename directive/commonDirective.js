/*通用按钮图标*/
conch.directive('btnIco',function () {
    return{
        scope:{
            icostyle:'@'
        },
        restrict:'E',
        template:'<span ng-class="icostyle" style="margin:0px 5px 0px 5px;color:#555555"></span>',
        replace : true
    }
});