var DonutChart = {
    draw: function(selector, dataset, options, colorScheme) {
        var cfg = {
            width: 300,
            height: 300,
            padAngle: 0.01,
            outerRadius: 100,
            innerRadius: 50
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
        var color = d3.scale.ordinal()
                    .range(colorScheme);
        var legendRectSize = 18;
        var legendSpacing = 4;
        d3.select(selector).select("svg").remove();
        var g = d3.select(selector)
            .append("svg")
            .attr("class","dounut_chart")
            .attr("width", cfg.w)
            .attr("height", cfg.h)
            .append("g")
            .attr("transform", "translate(" + cfg.TranslateX + "," + cfg.TranslateY + ")");
        var arc = d3.svg.arc()
            .padAngle(cfg.padAngle)
            .outerRadius(cfg.outerRadius)
            .innerRadius(cfg.innerRadius);

        var pie = d3.layout.pie()
            .sort(function (a, b) {
                return b.value - a.value
            })
            .value(function (d) { return d.value; });

        var tooltip = d3.select(selector)
            .append('div')
            .attr('class', 'pie_tooltip');


        tooltip.append('div')
            .attr('class', 'label');

        tooltip.append('div')
            .attr('class', 'count');

        tooltip.append('div')
            .attr('class', 'percent');

        var path = g.selectAll('path')
            .data(pie(dataset))
            .enter()
            .append('path')
            .attr('d', arc)
            .attr('fill', function (d, i) {
                return color(d.data.label);
            })
            .each(function (d) { this._current = d; });
        path.on('mouseover', function (d) {
            var total = d3.sum(dataset.map(function (d) {
                return (d.enabled) ? d.value : 0;
            }));

            var percent = Math.round(1000 * d.data.value / total) / 10;
            tooltip.select('.label').html(d.data.label.toUpperCase()).style('color', 'black');
            tooltip.select('.count').html(d.data.value);
            tooltip.select('.percent').html(percent + '%');

            tooltip.style('display', 'block');
            tooltip.style('opacity', 2);

        });


        path.on('mousemove', function (d) {
            tooltip.style('top', (d3.event.layerY + 10) + 'px')
                .style('left', (d3.event.layerX - 25) + 'px');
        });

        path.on('mouseout', function () {
            tooltip.style('display', 'none');
            tooltip.style('opacity', 0);
        });
        
        var labels = g.selectAll('.label')
                    .data(pie(dataset))
                    .enter()
                    .append('text')
                    .attr('class', 'label')
                    .attr('dy', '.4em')
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


        var legend = g.selectAll('.legend')
            .data(color.domain())
            .enter()            
            .append('g')
            .attr('class', 'legend')
            .attr('transform', function (d, i) {
                var height = legendRectSize + legendSpacing;
                var offset = height * color.domain().length / 2;
                var horz = 150;
                var vert = i * height - offset;
                return 'translate(' + horz + ',' + vert + ')';
            });

        legend.append('rect')
            .attr('width', legendRectSize)
            .attr('height', legendRectSize)
            .style('fill', color)
            .style('stroke', color);
            


        legend.append('text')
            .attr('x', legendRectSize + legendSpacing)
            .attr('y', legendRectSize - legendSpacing)
            .text(function (d) { return d; })
    }
};