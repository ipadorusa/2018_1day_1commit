(function($, window){
    var TOP_SEARCH = function() {
        this.init.apply(this, arguments);
    };
    TOP_SEARCH.prototype = {
        init: function() {
            this.initVariable();
            this.bindEvents();
        },

        initVariable: function() {
            this.$wrapper = document.getElementById('wrapper');
            this.$searchLayer = $('#mobile_wrap_search');
            this.$readonlyInput = document.getElementById('readonlyInput');
            this.$search_input = document.getElementById('search_input');
            this.$btn_page_close = document.getElementById('btn_page_close');
            this.$btn_del_search = document.getElementById('btn_del_search');
            this.$btn_del_cloud = document.getElementById('btn_del_cloud');
            this.$layer_auto_search = $('#layer_auto_search');
        },

        openSearchLayer: function() {
            this.$wrapper.classList.add('hide');
            this.$searchLayer.addClass('expand');
            this.$search_input.focus();
        },

        hideSearchLayer: function() {
            this.$wrapper.classList.remove('hide');
            this.$searchLayer.removeClass('expand');
        },

        openAutoLayer: function() {
            if((this.$search_input.value.length > 2) && ($('.search_dimmed').length == 0)) {
                this.$btn_del_search.classList.add('on');
                this.layer_auto_search.addClass('on');
                this.$searchLayer.append('<div class="search_dimmed"></div>');
            }else if((this.$search_input.value.length == 0 )){
                this.layer_auto_search.removeClass('on');
                $('.search_dimmed').remove();
            }
        },

        delSerachText: function() {
            alert('웹개발시 붙여 주세요 삭제해주세요')
        },

        searchCloud: function(e) {
            e.preventDefault();
            var self = this.$btn_del_cloud;
            // search cloud btn first click
            if(self.dataset.value == '') {
                self.classList.add('expand');
                self.setAttribute('data-value', 'deleting');
            }else if(self.dataset.value == 'deleting') {
                // search cloud btn 2nd click
                document.getElementById('mysearchcloud').remove();
            }
        },

        bindEvents: function() {
            this.$readonlyInput.addEventListener('click', this.openSearchLayer.bind(this));
            this.$btn_page_close.addEventListener('click', this.hideSearchLayer.bind(this));
            this.$search_input.addEventListener('keyup', this.openAutoLayer.bind(this));
            this.$btn_del_cloud.addEventListener('click', this.searchCloud.bind(this));
            this.$btn_del_search.addEventListener('click', this.delSerachText.bind(this));
        }


    };
    document.addEventListener("DOMContentLoaded", function(){
        window.TopSearch = new TOP_SEARCH();
    });
})(jQuery, window);
