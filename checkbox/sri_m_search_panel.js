(function($, window){
    var PANEL_SEARCH = function() {
        this.init.apply(this, arguments);
    };
    PANEL_SEARCH.prototype = {
        init: function() {
            this.initVariable();
            this.loadEvent();
            this.bindEvents();
            $(window).trigger('resize');
        },

        initVariable: function() {
            this.$categorywrap = $('#mobile_wrap_category');
            this.$header_search = $('.header_search', this.$categorywrap);
            this.$area_category_button = $('#area_category_button', this.$categorywrap);
            this.headersH = this.$header_search.outerHeight() + this.$area_category_button.outerHeight();
            this.$panel_box = $('#panel_box', this.$categorywrap);
            this.$body = $('#moving_wrap');
            this.$location_list = $('#location_list', this.$categorywrap);
            this.$location_chk = this.$location_list.find('.inpChk');
            this.checkArray = [];
            this.$laeyr_select_status = $('#laeyr_select_status');
            this.$wrap_select_slide = $('#wrap_select_slide', this.$laeyr_select_status);
            this.$btn_reset = $('#btn_reset');
            this.$btn_location_open = document.getElementById('btn_location_open');
            this.$wrapper_c = document.getElementById('wrapper');
            this.$area_category_button = $('#area_category_button');
        },

        loadEvent: function() {
            this.$panel_box.css('height', $(window).height() - this.headersH);
            this.$body.css('paddingBottom', '0');
        },
        // 체크박스 클릭시 이벤트
        checkEvent: function(event) {
            var mpcheck = $(event.target);
            if(mpcheck.is(':checked')) {
                this.checkArray.push(mpcheck.val());
                if(this.checkArray.length > 5 ) {
                    alert('지역은 최대 5개까지 선택할 수 있습니다.\n' + '새로운 지역을 선택하고 싶다면, 이전에 선택하신 지역을 삭제해주세요');
                    mpcheck.prop('checked', false);
                    this.checkArray.splice(this.checkArray.indexOf(mpcheck.val()),1);
                }else if(this.checkArray.length > 0 && this.checkArray.length < 6) {
                    this.selectLayer();
                    this.$laeyr_select_status.addClass('on');
                    this.bindSlideDom(this.checkArray, mpcheck);
                    this.slideCal();
                }
            }else {
                this.checkArray = this.checkArray.filter(function(obj){
                    if(obj !== mpcheck.val()) {
                        return true;
                    }
                });
                this.bindSlideDom(this.checkArray);
                this.slideCal();
                if(this.checkArray.length == 0) {
                    this.$laeyr_select_status.removeClass('on');
                    this.$panel_box.css('height', $(window).height() - this.headersH);
                }

            }
        },

        selectLayer: function() {
            this.$panel_box.css('height', $(window).height() -( this.headersH + this.$laeyr_select_status.outerHeight() ));
        },

        resetEvent: function() {
            this.checkArray = [];
            this.$location_chk.find('input').prop('checked', false);
            this.$laeyr_select_status.removeClass('on');
        },

        bindSlideDom: function(objArray) {
            var domStr = '';
            for(var k=0;k<objArray.length;k++) {
                domStr += '<li class="swiper-slide">' + objArray[k] + '<button type="button" class="btn_select_del"><span class="blind">삭제하기</span></button></li>';
            }
            this.$wrap_select_slide.find('ul').html(domStr);
        },

        slideCal: function() {
            this.slide_select = new Swiper(this.$wrap_select_slide, {
                slidesPerView: 'auto'
            });
        },

        openLayerEvent: function() {
            this.$wrapper_c.style.display='none';
            this.$categorywrap.addClass('open');
        },

        panelShowEvent: function(e) {
            var self = $(e.target).parent('button'),
                selfId = self.attr('id');

            this.$area_category_button.find('.category').removeClass('on');
            // 임시로 넣었습니다. ajax할때 변경하세요
            console.log(self.attr('id'))
            if(selfId == 'btn_location') {
                $('#search_check_list').css('display', 'none');
                $('#list_search_panel').css('display', 'block');
            }else if(selfId == 'btn_oversea') {
                $('#search_check_list').css('display', 'block');
                $('#list_search_panel').css('display', 'none');
            }else if(selfId == 'btn_domestic') {
                $('#search_check_list').css('display', 'block');
                $('#list_search_panel').css('display', 'none');
            };

            self.addClass('on');
        },

        bindEvents: function() {
            this.$location_chk.on('change', this.checkEvent.bind(this));
            this.$btn_reset.on('click', this.resetEvent.bind(this));
            this.$btn_location_open.addEventListener('click', this.openLayerEvent.bind(this));
            this.$area_category_button.on('click', this.panelShowEvent.bind(this));
        }

    };
    document.addEventListener("DOMContentLoaded", function(){
        window.PanelSearch = new PANEL_SEARCH();
    });
})(jQuery, window);