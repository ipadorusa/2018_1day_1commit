jQuery(document).ready(function(){
    var runningMan = {
        draw: function() {
            var _wrap = jQuery('#rank_run'),
                _wrap_ani = jQuery('.wrap_animation'),
                _innerbar = jQuery(".innerbar"),
                _movingObj = jQuery('.runningman'),
                totalArray = [];


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
                        return setTimeout(func.__raf__, 1000 / 120);
                    };
                window.cancelAnimationFrame = window['webkitCancelAnimationFrame']
                    || window['mozCancelAnimationFrame']
                    || window['msCancelAnimationFrame']
                    || clearTimeout;
            }


            for(var i=0;i<_wrap_ani.length;i++) {
                totalArray.push(_wrap_ani.data("average"));
            }
            _wrap_ani.each(function (i) {
                _movingObj.eq(i).css('left', jQuery(this).data("average") + "%");
            });


        }
    };

    runningMan.draw();

});
