jQuery(document).ready(function(){
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
    var runningMan = {
        draw: function() {
            var _wrap = jQuery('#rank_run'),
                _wrap_ani = jQuery('.wrap_animation'),
                _innerbar = jQuery(".innerbar"),
                _movingObj = jQuery('.runningman', _wrap_ani),
                $row = jQuery('.row',_wrap);

            var tl = new TimelineLite();
            var number_graph = _movingObj.length;
            var index_graph = 0;
            var isArrival = [];
            _movingObj.each(function(i) {
                isArrival[i] = false;
            });

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
                        row_mouseEvent();
                    }
                });
            }
            function runningFnc(objIndex, perc) {
                var cur = perc + 0.3;
                if(perc >= 11) {
                    cur = 0;
                }
                var leftPosition = - (Math.floor(cur) * 28);

                if(!isArrival[objIndex]){
                    _movingObj.eq(objIndex).addClass('run');
                    _movingObj.eq(objIndex).css("background-position", leftPosition + "px 0" );
                    requestAnimationFrame(function () {
                        runningFnc(objIndex, cur );
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
                        finishFnc(objIndex, cur);
                    });
                }

            }
            // move action
            function row_mouseEvent() {
                $row.on('mouseenter', function () {
                    var index = jQuery(this).index();
                    jQuery(this).addClass('on');
                    _movingObj.eq(index).css("background-position", "-84px -74px");
                })
                jQuery('#rank_run, #rank_run .row').on('mouseleave', function () {
                    $row.removeClass('on');
                    _movingObj.css("background-position", "-84px -37px");
                })
            }

            rotation();
        }
    };

    runningMan.draw();

    (function salaryViewEvent () {
        var domClass = {
            body: jQuery('html, body'),
            snsList: jQuery('#expand_sns').next('.snslist'),
            wingWrap: jQuery('#wing-info-list'),
            sriSection: jQuery('#sri_section'),
            sri_banner: jQuery('#sri_banner'),
            btnTop: jQuery('#btn_go_top')
        }

        var expandTrue = false;

        function expandWing (selector) {
            expandTrue = true;
            domClass.btnTop.hide();
            jQuery(selector).closest(domClass.wingWrap).addClass('on');
            domClass.sri_banner.css('z-index', 150);
            domClass.sriSection.append('<div class=\'sri_wing_dimmed\'></div>');
            return expandTrue;
        }

        function contractWing (selector) {
            expandTrue = false
            domClass.btnTop.show()
            jQuery(selector).closest(domClass.wingWrap).removeClass('on')
            domClass.sri_banner.css('z-index', '')
            domClass.sriSection.find('.sri_wing_dimmed').remove()
            return expandTrue
        }

        jQuery('#btn_expand').on('click', function () {
            if (!expandTrue) {
                expandWing(jQuery(this));
            } else if (expandTrue) {
                contractWing(jQuery(this));
            }
        })
        jQuery('#expand_sns').on('click', function () {
            domClass.snsList.toggleClass('on');
        })

        function viewInit () {
            domClass.snsList.removeClass('on');
        }
        // tabSlide
        jQuery.fn.categoryCarosel = function () {
            return this.each(function () {
                var $this = jQuery(this),
                    $slideWrap = jQuery('.slide', $this),
                    $slide = jQuery('li', $slideWrap),
                    $item = jQuery('>a', $slide),
                    btnPrev = jQuery('.btn_prev', $this),
                    btnNext = jQuery('.btn_next', $this),
                    btnAll = jQuery('.btn_all', $this),
                    currentIdx = 1,
                    slideCount = 0,
                    slideW = 109,
                    totalW = 0,
                    movingIdx = 6;

                var pageTotal = Math.ceil($slide.length / 6);

                function calWidth() {
                    slideCount = $slide.length;
                    totalW = slideW * slideCount;
                    $slideWrap.width(totalW);
                }

                function slideInit () {
                    calWidth();
                }

                $item.on('click', function (e) {
                    e.preventDefault();
                    btnAll.removeClass('on');
                    jQuery(this).closest('li').addClass('on').siblings().removeClass('on');
                })
                btnNext.on('click', function() {
                    currentIdx++;
                    if(currentIdx <= pageTotal) {
                        move(currentIdx);
                    } else {
                        currentIdx = pageTotal;
                    }
                });
                btnPrev.on('click', function() {
                    currentIdx--;
                    if(currentIdx >= 1) {
                        move(currentIdx);
                    } else {
                        currentIdx = 1;
                    }
                });
                function move (currentIdx) {
                    $slideWrap.stop().animate({
                        left: -(slideW * (currentIdx -1) * movingIdx) + 'px'
                    }, {
                        duration: 200,
                        easing: 'linear',
                        queue: false
                    })
                }

                btnAll.on('click', function (e) {
                    e.preventDefault();
                    $slide.removeClass('on');
                    btnAll.addClass('on');
                    $slideWrap.stop().animate({
                        left: 0 + 'px'
                    }, {
                        duration: 200,
                        easing: 'linear',
                        queue: false
                    })
                });

                slideInit()

            })
        }
        jQuery('.category_head').categoryCarosel()

    }());

    (function headerScrEvent(){
        var $spy_header = jQuery('#spy_header'),
            navBtn = jQuery('.tab li a',$spy_header),
            definedH = navBtn.offset().top + (navBtn.outerHeight() / 2),
            lastId,
            scrollItems = navBtn.map(function(){
                var item = jQuery(jQuery.attr(this, 'href'));
                if(item.length) {
                    return item;
                }
            });
        navBtn.click(function(e) {
            var href = jQuery.attr(this, 'href');
            jQuery('html').animate({
                scrollTop: jQuery(href).offset().top - 135
            },{
                duration: 400,
                easing: 'easeInOutSine',
                queue: false
            });
            e.preventDefault();
        });

        function scrollSpy() {
            var scrollTop = jQuery(window).scrollTop(),
                fromTop = jQuery(this).scrollTop() + definedH,
                cur = scrollItems.map(function(){
                    if (jQuery(this).offset().top < fromTop)
                        return this;
                });

            cur = cur[cur.length-1];
            var id = cur && cur.length ? cur[0].id : "";

            if(scrollTop >= definedH) {
                $spy_header.addClass('fixed');
            }else {
                $spy_header.removeClass('fixed');
            }
            if(cur == undefined || fromTop == 200) {
                navBtn.eq(0).parent().addClass("on");
            }else if (lastId !== id) {
                lastId = id;
                navBtn
                    .parent()
                    .removeClass("on")
                    .end()
                    .filter("[href='#"+id+"']")
                    .parent()
                    .addClass("on");
            }
        }
        jQuery(window).on('scroll', function () {
            scrollSpy();
        });

    }());


});
