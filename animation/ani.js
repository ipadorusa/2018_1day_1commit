jQuery(document).ready(function(){
    var runningMan = {
        draw: function() {
            var _wrap = jQuery('#rank_run'),
                _wrap_ani = jQuery('.wrap_animation'),
                _innerbar = jQuery(".innerbar"),
                _movingObj = jQuery('.runningman', _wrap_ani);

            var startIdx = 0;
            var leftPosition = 0;
            var shiftLenth = 28;
            var totalPage = 15;
            var tl = new TimelineLite();


            function movingAct() {
                _movingObj.each(function(i){
                    tl.to(_movingObj[i], 1.1, {
                        left:jQuery(this).data("average") + '%',
                        ease:Bounce,
                        onStart: aniStart(i),
                        onComplete: barFadeUp(i)
                    });
                });
            }

            function aniStart(i) {
                var tt = TweenMax.to(_movingObj.eq(i), 1, {
                    css: {'background-position': '' + ', -37px'}
                });
            }

            function moveFnc() {
                startIdx++;
                if(startIdx < totalPage) {
                    console.log('startIdx',leftPosition)
                    leftPosition -= shiftLenth;
                    _movingObj.css("background-position", leftPosition + "px 0px" );
                    var t = setTimeout(moveFnc,100);
                }
            }


            // 바그래프업
            function barFadeUp(i) {
                return function() {
                    _movingObj.eq(i).addClass('fisish');
                    jQuery(".innerbar").eq(i).addClass('on');
                }
            }
            movingAct();

        }
    };

    runningMan.draw();

});
