var StackedAreaChart = {
    draw: function(selector, data, dataRange, options, color) {
        var cfg = {
            width: 360,
            height: 240,
            mTop: 40,
            mRight: 20,
            mBottom: 20,
            mLeft: 40,
            barwidth: 30,
            ticks: 8,
            circleR: 5
        };
        if ('undefined' !== typeof options) {
            for (var i in options) {
                if ('undefined' !== typeof options[i]) {
                    cfg[i] = options[i];
                }
            }
        }
        // set width,height
        var width = cfg.w - (cfg.mRight + cfg.mLeft),
            height = cfg.h - (cfg.mTop + cfg.mBottom);

        // set the ranges
        var x = d3.scaleBand()
            .range([0, width])
            .padding(1);
        var y = d3.scaleLinear()
            .range([height, 0]);

        d3.select(selector).select("svg").remove();
        var svg = d3.select(selector).append("svg")
            .classed("stack_chart", true)
            .attr("width", width + cfg.mLeft + cfg.mLeft)
            .attr("height", height + cfg.mTop + cfg.mBottom )
            .append("g")
            .attr("transform", "translate(" + cfg.mLeft + "," + cfg.mTop + ")");

        x.domain(data.map(function (d) { return d.year; }));
        y.domain([dataRange.min,dataRange.max]);

        // Axis 선 만들기
        var xAxis = d3.axisBottom(x);
        var yAxis = d3.axisLeft(y).ticks(cfg.ticks).tickSize(-width);
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .classed("xAxis",true)
            .call(customXAxis);

        svg.append("g")
            .attr("transform", "translate(10,0)")
            .classed("yAxis",true)
            .call(customYAxis);

        function customXAxis(g) {
            g.call(xAxis);
            g.select(".domain").remove();
            g.selectAll("line").remove();
        }

        function customYAxis(g) {
            g.call(yAxis);
            g.select(".domain").remove();
            g.selectAll(".tick line").attr("stroke", "#f0f0f0");
            g.selectAll(".tick text").attr("x", -8).attr("dy", 2);
        }



        var area = d3.area()
            .x(function(d) { return x(d.year); })
            .y1(function(d) { return y(d.salary); })
            .y0(height);


        var valueline = d3.line()
            .x(function(d) { return x(d.year); })
            .y(function(d) { return y(d.salary); });

        var labelTxt =
            svg.selectAll('.label_txt')
                .data(data)
                .enter()
                .append('text')
                .text(function (d,i) {
                    var formatComma = d3.format(",");
                    return formatComma(d.salary);
                })
                .classed('label_txt', true)
                .attr('x', function (d) { return x(d.year) - cfg.barwidth/2})
                .attr('y', function (d) { return y(d.salary) - 15});


        svg.append("path")
            .data([data])
            .classed("area", true)
            .attr("d", area);
        svg.append("path")
            .data([data])
            .attr("class", "line")
            .attr("d", valueline);

        //circle 그리기
        var drawDot =
            svg.selectAll('.dot')
                .data(data)
                .enter()
                .append('circle')
                .classed('dot', true)
                .attr('cx', function (d) { return x(d.year)})
                .attr('cy', function (d) { return y(d.salary) })
                .attr('r', cfg.circleR)
                .attr('stroke-width', 2);


        // tooltip
        var $tooltip = jQuery('#statckedTooltip'),
            $yeasTxt = jQuery('.years', $tooltip),
            $salery = jQuery('.company_diff01').find('.salary');




        drawDot.on("mouseenter", function(d,i) {
            d3.select(labelTxt.nodes()[i])
                .style('font-weight', 'bold');
            d3.select(this)
                .attr('r', 7)
                .attr('stroke-width', 6);
            var textnode = d3.selectAll('.stack_chart .xAxis .tick').nodes()[i];
            textnode.setAttribute("class", "tick on");

            jQuery('#statckedTooltip').css({
                "display" :'block',
                'left' : d3.select(this).attr("cx") - 63 +  'px',
                'top' : d3.select(this).attr("cy") - 80 + 'px'
            });
            $yeasTxt.html(d.year);
            $salery.html(d.salary);
        });

        drawDot.on("mouseout", function(d, i) {
            d3.select(this)
                .attr('r', cfg.circleR)
                .attr('stroke-width', 2);

            d3.select(labelTxt.nodes()[i])
                .style('font-weight', 'normal');

            jQuery('#statckedTooltip').css({
                "display" :'none'
            });

            d3.selectAll('.stack_chart .xAxis .tick')
                .attr('class', 'tick');
        });
    }
};
