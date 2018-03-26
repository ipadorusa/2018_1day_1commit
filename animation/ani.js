jQuery(document).ready(function(){
    var runningMan = {
        draw: function() {
            var _wrap = jQuery('#rank_run'),
                _wrap_ani = jQuery('.wrap_animation'),
                _innerbar = jQuery(".innerbar"),
                _movingObj = jQuery('.runningman', _wrap_ani);

            var tl = new TimelineLite();
            var number_graph = _movingObj.length;
            var index_graph = 0;
            var isArrival = [];
            _movingObj.each(function(i) {
                isArrival[i] = false;
            });


            // requestAnimationFrame 폴리필
            if(!Date.now){
                Date.now = function(){
                    return +new Date;
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



            function rotation() {
                if(index_graph < number_graph) {
                    movingAct(index_graph);
                    index_graph++;
                }
            }
            function movingAct(i) {
                tl.to(_movingObj[i], _movingObj.eq(i).data("average") / 55, {
                    left:_movingObj.eq(i).data("average") + '%',
                    ease:Bounce,
                    onStart: runningFnc(i, 0),
                    onComplete : function() {
                        isArrival[i] = true;
                        rotation();
                    }
                });
            }
            rotation();

            function runningFnc(objIndex, perc) {
                var cur = perc + 0.3;
                if(perc >= 11) {
                    cur = 0
                }
                var leftPosition = - (Math.floor(cur) * 28);

                if(!isArrival[objIndex]){
                    _movingObj.eq(objIndex).addClass('run');
                    _movingObj.eq(objIndex).css("background-position", leftPosition + "px 0" );
                    requestAnimationFrame(function () {
                        runningFnc(objIndex, cur )
                    });
                } else {
                    finishFnc(objIndex, 0);
                    _innerbar.eq(objIndex).addClass('on');
                }
            }

            // finish action
            function finishFnc(objIndex, perc) {
                var cur = perc + 0.2;
                var leftPosition = - (Math.floor(cur) * 28);
                if(cur < 4) {
                    _movingObj.eq(objIndex).css("background-position", leftPosition + "px -37px" );
                    requestAnimationFrame(function () {
                        finishFnc(objIndex, cur)
                    });
                }
            }
        }
    };

    runningMan.draw();

});
