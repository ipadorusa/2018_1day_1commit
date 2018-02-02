function renderPieChart(dataset, dom_element_to_append_to, colorScheme) {

    var margin = { top: 50, bottom: 50, left: 50, right: 50 };
    var width = 500 - margin.left - margin.right,
        height = width + 100,
        radius = Math.min(width, height) / 2;
    var donutWidth = 120;
    var legendRectSize = 18;
    var legendSpacing = 4;

    dataset.forEach(function (item) {
        item.enabled = true;
    });

    var color = d3.scaleOrdinal()
        .range(colorScheme);

    var svg = d3.select(dom_element_to_append_to)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var arc = d3.arc()
        .padAngle(0.01)
        .outerRadius(radius - 10)
        .innerRadius(radius - donutWidth);

    var pie = d3.pie()
        .sort(function(a,b){
            return b.value - a.value
        })
        .value(function (d) { return d.value; });

    var tooltip = d3.select(dom_element_to_append_to)
        .append('div')
        .attr('class', 'pie_tooltip');


    tooltip.append('div')
        .attr('class', 'label');

    tooltip.append('div')
        .attr('class', 'count');

    tooltip.append('div')
        .attr('class', 'percent');

    var path = svg.selectAll('path')
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
            console.log(d.enabled, d.value)
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

    var legend = svg.selectAll('.legend')
        .data(color.domain())
        .enter()
        .append('g')
        .attr('class', 'legend')
        .attr('transform', function (d, i) {
            var height = legendRectSize + legendSpacing;
            var offset = height * color.domain().length / 2;
            var horz = -2 * legendRectSize;
            var vert = i * height - offset;
            return 'translate(' + horz + ',' + vert + ')';
        });

    legend.append('rect')
        .attr('width', legendRectSize)
        .attr('height', legendRectSize)
        .style('fill', color)
        .style('stroke', color)
        .on('click', function (label) {
            var rect = d3.select(this);
            var enabled = true;
            var totalEnabled = d3.sum(dataset.map(function (d) {
                return (d.enabled) ? 1 : 0;
            }));

            if (rect.attr('class') === 'disabled') {
                rect.attr('class', '');
            } else {
                if (totalEnabled < 2) return;
                rect.attr('class', 'disabled');
                enabled = false;
            }

            pie.value(function (d) {
                if (d.label === label) d.enabled = enabled;
                return (d.enabled) ? d.value : 0;
            });

            path = path.data(pie(dataset));

            path.transition()
                .duration(750)
                .attrTween('d', function (d) {
                    var interpolate = d3.interpolate(this._current, d);
                    this._current = interpolate(0);
                    return function (t) {
                        return arc(interpolate(t));
                    };
                });
        });


    legend.append('text')
        .attr('x', legendRectSize + legendSpacing)
        .attr('y', legendRectSize - legendSpacing)
        .text(function (d) { return d; })

};