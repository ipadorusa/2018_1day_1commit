var DonutChart = {
    draw: function(selector, dataset, options, colorScheme) {
        var cfg = {
            width: 300,
            height: 300,
            padAngle: 0.01,
            outerRadius: 100,
            innerRadius: 50,
            labelSize: 14
        };
        if ('undefined' !== typeof options) {
            for (var i in options) {
                if ('undefined' !== typeof options[i]) {
                    cfg[i] = options[i];
                }
            }
        }
        dataset.forEach(function (item) {
            item.enabled = true;
        });

        var color = d3.scaleOrdinal()
            .range(colorScheme);

        d3.select(selector).select("svg").remove();
        var g = d3.select(selector)
                .append("svg")
                .attr("class","dounut_chart")
                .attr("width", cfg.w)
                .attr("height", cfg.h)
                .append("g")
                .attr("transform", "translate(" + cfg.TranslateX + "," + cfg.TranslateY + ")");

        var arc = d3.arc()
            .padAngle(cfg.padAngle)
            .outerRadius(cfg.outerRadius)
            .innerRadius(cfg.innerRadius);

        var pie = d3.pie()
            .sort(null)
            .value(function (d) { return d.value; });

        var tooltip = d3.select(selector)
            .append('div')
            .attr('class', 'pie_tooltip');

        tooltip.append('div')
            .attr('class', 'percent');
        tooltip.append('div')
            .attr('class', 'label');


        var path = g.selectAll('path')
            .data(pie(dataset))
            .enter()
            .append('path')
            .attr('d', arc)
            .attr('fill', function (d, i) {
                return color(d.data.label);
            })
            .each(function (d) { this._current = d; });


        var labels = g.selectAll('.label')
            .data(pie(dataset))
            .enter()
            .append('text')
            .attr('class', 'label')
            .attr('dy', '10')
            .attr('font-size', cfg.labelSize)
            .attr('text-anchor', 'middle')
            .text(function(d) {
                var total = d3.sum(dataset.map(function (d) {
                    return (d.enabled) ? d.value : 0;
                }));
                var percent = Math.round(1000 * d.data.value / total) / 10;
                return percent + '%';
            })
            .attr('transform', function (d) {
                return 'translate(' + arc.centroid(d) + ')';
            });

        labels.on('mouseover', function (d) {
            var total = d3.sum(dataset.map(function (d) {
                return (d.enabled) ? d.value : 0;
            }));
            var percent = Math.round(1000 * d.data.value / total) / 10;
            tooltip.select('.percent').html(percent + '%').style('color',color(d.data.label));
            tooltip.select('.label').html(d.data.label.toUpperCase());
            tooltip.style('display','block');
        });


        labels.on('mousemove', function (d) {
            var _tooltip = jQuery(tooltip.node());
            _tooltip.css('transform','translate('+ arc.centroid(d)[0] + 'px,' + arc.centroid(d)[1] + 'px)');
        });

        labels.on('mouseout', function () {
            tooltip.style('display','none');
        });

    }
};