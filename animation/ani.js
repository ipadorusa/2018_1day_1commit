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
                        ease:Bounce,
                        onStart: aniStart(i),
                        onComplete: barFadeUp(i)
                    });
                });
            }

            function aniStart(i) {
                tl.to(
                    _movingObj.eq(i),
                     5, {
                        left:_movingObj.eq(i).data("average") + '%',
                        backgroundPosition:"-392px -37px",
                        ease:Bounce
                        
                    }).set(_movingObj.eq(i),
                     {
                        backgroundPosition:"0 -37px"
                   })
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
                    _movingObj.eq(i).addClass('fisish').css('backgroundPosition', '0 -74px');
                    jQuery(".innerbar").eq(i).addClass('on');
                }
            }
            movingAct();

        }
    };

    runningMan.draw();

});
