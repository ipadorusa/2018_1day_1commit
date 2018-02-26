jQuery(document).ready(function(){
    (function() {
        if(!Date.now){
            Date.now = function(){
                return + new Date;
            };
        }
        if(!window['performance']) window.performance = {};
        if(!performance.now) performance.now = (function(){
            var offset = Date.now(); //브라우저의 실행시점을 기억한다.
            return function(){
                return Date.now() - offset; //경과시간을 반환한다.
            };
        })();
        if(!window['requestAnimationFrame']){
            window.requestAnimationFrame = window['webkitRequestAnimationFrame']
                || window['mozRequestAnimationFrame']
                || window['msRequestAnimationFrame']
                || function(func) {
                    if(!func.__raf__){
                        func.__raf__ = function(){
                            func(performance.now());
                        };
                    }
                    return setTimeout(func.__raf__, 1000 / 60);
                };
            window.cancelAnimationFrame = window['webkitCancelAnimationFrame']
                || window['mozCancelAnimationFrame']
                || window['msCancelAnimationFrame']
                || clearTimeout;
        }
        var runningHuman = {
            //준비
            //달리기
            //도착
            //마우스오버
            //remove
        };
        function runInit(selector) {
            jQuery(selector).remove();
        }
        functin runActive() {
            
        }
    }());
});
