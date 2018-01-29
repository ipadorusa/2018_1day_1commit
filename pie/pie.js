var PieChart = {
    draw: function (selector, d, options) {
        
        
        var cfg = {
            radius: 5,
            w: 300,
            h: 300, 
            color: []
        };
        if ('undefined' !== typeof options) {
            for (var i in options) {
                if ('undefined' !== typeof options[i]) {
                    cfg[i] = options[i];
                }
            }
        }
        d3.select(selector).select("svg").remove();
        var g = d3.select(selector)
            .append("svg")
            .attr("width", cfg.w + cfg.ExtraWidthX)
            .attr("height", cfg.h + cfg.ExtraWidthY)
            .append("g")
            .attr("transform", "translate(" + cfg.TranslateX + "," + cfg.TranslateY + ")");

    }
};