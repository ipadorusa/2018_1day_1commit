jQuery(document).ready(function(){
    var runningMan = {
        draw: function() {
            var _wrap = jQuery('#rank_run'),
                _wrap_ani = jQuery('.wrap_animation'),
                _innerbar = jQuery(".innerbar"),
                _movingObj = jQuery('.runningman', _wrap_ani);

            var startIdx = 0;
            var startIdx2 = 0;
            var leftPosition = 0;
            var leftPosition2 = 0;
            var shiftLenth = 28;
            var totalPage = 10;
            var tl = new TimelineLite();


            function movingAct() {
                _movingObj.each(function(i){
                    tl.to(_movingObj[i], 1, {                                                
                        delay: 0.3,
                        left:_movingObj.eq(0).data("average") + '%',
                        ease:Bounce,
                        onStart: moveFnc,
                        onComplete: finishFnc
                    });
                });
            }
            movingAct();

            // function aniStart(i) {
            //     tl.to(
            //         _movingObj.eq(i),
            //          5, {
            //             left:_movingObj.eq(i).data("average") + '%',
            //             backgroundPosition:"-392px -37px",
            //             ease:Bounce
                        
            //         }).set(_movingObj.eq(i),
            //          {
            //             backgroundPosition:"0 -37px"
            //        })
            // }
            
            
            function moveFnc(i) {
                let start = performance.now();
                console.log('start',start)
                totalPage = 10;
                startIdx++;
                if(startIdx < totalPage) {
                    leftPosition -= shiftLenth;
                    _movingObj.eq(0).css("background-position", leftPosition + "px -37px" );
                    requestAnimationFrame(moveFnc,1000 / 4);
                }
                
            }

            function finishFnc(i) {
                var totalPage2 = 4;
                console.log('bbbbbbbbbbb', totalPage2, startIdx2,leftPosition2)          
                
                startIdx2++;
                if(startIdx2 < totalPage2) {                    
                    leftPosition2 -= shiftLenth;
                    _movingObj.eq(0).css("background-position", leftPosition2 + "px -74px" );
                    requestAnimationFrame(finishFnc,100);
                }
            }

            // 바그래프업
            function barFadeUp(i) {
                return function() {
                    jQuery(".innerbar").eq(i).addClass('on');
                }
            }

        }
    };

    runningMan.draw();

});
