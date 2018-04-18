var CombinationChart = {
    draw: function(selector, data, dataRange, options, color) {
        var cfg = {
            width: 360,
            height: 240,
            mTop: 40,
            mRight: 20,
            mBottom: 20,
            mLeft: 40,
            barwidth: 30,
            ticks: 4
        };
        if ('undefined' !== typeof options) {
            for (var i in options) {
                if ('undefined' !== typeof options[i]) {
                    cfg[i] = options[i];
                }
            }
        }
        var maxCheck = d3.max(data.map(function(d){return d.salary;}));
        var allAxis = (data.map(function (i) {
            return i.salary
        }));

        // set width,height
        var width = cfg.w - (cfg.mRight + cfg.mLeft),
            height = cfg.h - (cfg.mTop + cfg.mBottom);
        // set the ranges
        var x = d3.scaleBand()
            .range([0, width])
            .padding(1);
        var y = d3.scaleLinear()
            .range([height, 0]);

        d3.select(selector).select('svg').remove();
        var svg = d3.select(selector).append('svg')
            .classed('combie_chart', true)
            .attr('width', width + cfg.mLeft + cfg.mLeft)
            .attr('height', height + cfg.mTop + cfg.mBottom )
            .append('g')
            .attr('transform', 'translate(' + cfg.mLeft + ',' + cfg.mTop + ')');

        x.domain(data.map(function (d) { return d.year; }));
        y.domain([dataRange.min,dataRange.max]);

        // Axis 선 만들기
        var xAxis = d3.axisBottom(x);
        var yAxis = d3.axisLeft(y).ticks(cfg.ticks).tickSize(-width);
        svg.append('g')
            .attr('transform', 'translate(0,' + height + ')')
            .classed('xAxis',true)
            .call(customXAxis);

        svg.append('g')
            .classed('yAxis',true)
            .call(customYAxis);

        function customXAxis(g) {
            g.call(xAxis);
            g.select('.domain').remove();
            g.selectAll('line').remove();
            g.selectAll('.tick text').attr('x', 15);
        }

        function customYAxis(g) {
            g.call(yAxis);
            g.select('.domain').remove();
            g.selectAll('.tick line').attr('stroke', '#f0f0f0');
            g.selectAll('.tick text').attr('x', 4).attr('dy', 3);
        }

        // Bar 그리기
        var bar = svg.append('g')
                    .classed('bargroup',true)
                    .selectAll('.svgbar')
                    .data(data)
                    .enter()
                    .append('rect')
                    .classed('svgbar',true)
                    .attr('x', function (d) { return x(d.year); })
                    .attr('height',0)
                    .attr('fill', function(d,i) { return color[i]})
                    .attr('width', cfg.barwidth)
                    .attr('y', function(d) { return y(d.salary)})
                    .attr('height', function (d) { return height - y(d.salary); });

        var labelTxt = svg.selectAll('.label_txt')
                        .data(data)
                        .enter()
                        .append('text')
                        .text(function (d) {
                            var formatComma = d3.format(',');
                                return formatComma(d.salary);
                        })
                        .attr('class',function (d,i) { return 'label_txt label_txt' + i;})
                        .attr('x', function (d) { return x(d.year)})
                        .attr('y', function (d) { return y(d.salary) - 5});

        var valueline = d3.line()
                        .x(function (d) { return x(d.year) + 30 / 2; })
                        .y(function (d) { return y(d.aver); });
                        svg.append('path')
                        .data([data])
                        .classed('avgline', true)
                        .attr('d', valueline);

        svg.selectAll('.dot')
            .data(data)
            .enter()
            .append('circle')
            .classed('dot', true)
            .attr('cx', function (d) { return x(d.year) + cfg.barwidth / 2 })
            .attr('cy', function (d) { return y(d.aver) })
            .attr('r', 3);

        // tooltip
        var $tooltip = jQuery('#combieTooltip'),
            $yeasTxt = jQuery('.years', $tooltip),
            $salery = jQuery('.company_diff01').find('.salary'),
            $aver = jQuery('.company_diff02').find('.salary');

        bar.on('mouseenter', function(d) {
            jQuery('#combieTooltip').css({
                'display' :'block',
                'left' : d3.select(this).attr('x') - 63 +  'px',
                'top' : d3.select(this).attr('y') - 80 + 'px'
            });
            $yeasTxt.html(d.year);
            $salery.html(d.salary);
            $aver.html(d.aver);
        });
        bar.on('mouseout', function(d) {
            jQuery('#combieTooltip').css({
                'display' :'none'
            });
        });

        function maxBold() {
            var i = allAxis.indexOf(maxCheck,0);
            labelTxt.nodes()[i].setAttribute('class', 'label_txt on');
            var textNode = d3.selectAll('.combie_chart .xAxis .tick').nodes()[i];
            textNode.setAttribute('class', 'tick on');
        }
        maxBold();
    }
};
