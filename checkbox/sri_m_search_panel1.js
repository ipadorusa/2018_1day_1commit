(function($, window){
    var PANEL_SEARCH = function() {
        this.init.apply(this, arguments);
    };
    PANEL_SEARCH.prototype = {
        // 클릭하면 체크, 클릭하면 리스트생성
        // 버튼 클릭하면 제거, 체크됐던 요소 체크 해제
        // 1개 이상 체크일시 레이어 
        // 6개 이상부터 경고창 
        
        
        init: function () {
            this.initVariables();
            this.bindEvents();
            $(window).trigger('resize');
        },
        initVariables: function () {
            this.$list = $("#list1");
            this.$resultBoxList = $("#result_box > ul");
            this.$btn_location_open = $('#btn_location_open');
            this.$wrapper_c = $('#wrapper');
        },

        toggleItems: function (e) {
            var $item = $(e.currentTarget),
                isChecked = $item.is(':checked'),
                itemName = $item.data('value'),
                itemCode = $item.data('code');
            (isChecked) ? this.appendItem(itemName, itemCode) : this.removeItem(itemCode);
        },

        appendItem: function (itemName, itemCode) {
            var li = $('<li\>'),
                button = $('<button><span class="blind">선택항목삭제</span></button>');

            li.attr('data-code', itemCode).text(itemName).append(button);

            this.$resultBoxList.append(li);
        },

        removeItem: function (itemCode) {
            this.$resultBoxList.find('[data-code="' + itemCode + '"]').remove();
        },

        removeItemByButton: function (e) {
            var $item = $(e.currentTarget).parents('li'),
                code = $item.data('code');

            this.$list.find('[data-code="' + code + '"]').trigger('click');
        },

        openLayerEvent: function() {
            this.$wrapper_c.css('display', 'none');
            this.$categorywrap.addClass('open');
        },
        
        bindEvents: function () {
            this.$list.on('change', 'input[type="checkbox"]', $.proxy(this.toggleItems, this));
            this.$resultBoxList.on('click', 'button', $.proxy(this.removeItemByButton, this));
            this.$btn_location_open.on('click', this.openLayerEvent);
        }

    };
    document.addEventListener("DOMContentLoaded", function(){
        window.PanelSearch = new PANEL_SEARCH();
    });
})(jQuery, window);