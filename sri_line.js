var LineChart = {
    draw: function(selector, series, dataset, dataRange, options, colorScheme) {
        var cfg = {
            width: 360,
            height: 240,
            mTop: 40,
            mRight: 20,
            mBottom: 20,
            mLeft: 40,
            barwidth: 30,
            ticks: 7,
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
        var keys = d3.keys(dataset[0]);
        var data = [];
        dataset.forEach(function(d, i) {
            data[i] = keys.map(function(key) { return {x: key, y: d[key]}; })
        });


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
            .classed("line_chart", true)
            .attr("width", width + cfg.mLeft + cfg.mLeft)
            .attr("height", height + cfg.mTop + cfg.mBottom )
            .append("g")
            .attr("transform", "translate(" + cfg.mLeft + "," + cfg.mTop + ")");

            
        x.domain(keys);
        y.domain([dataRange.min,dataRange.max]);
        var color = d3.scaleOrdinal()
            .range(colorScheme);
        
        var line = d3.line()
            .curve(d3.curveLinear)
            .x(function(d) { return x(d.x); })
            .y(function(d) { return y(d.y); });
            
        var lineG = svg.append("g")
            .selectAll("g")
            .data(data)
            .enter().append("g");

        lineG.append("path")
            .attr("class", "lineChart")
            .style("stroke", function(d, i) { return color(series[i]); })
            .attr("d", line);
        var drawDot =
            svg.selectAll('.dot')
                .data(data)
                .enter()
                .append('circle')
                .classed('dot', true)
                .attr('cx', function (d) { return x(d.x)})
                .attr('cy', function (d) { return y(d.y) })
                .attr('r', cfg.circleR)
                .attr('stroke-width', 2);
        
        // Axis 선 만들기
        var xAxis = d3.axisBottom(x);
        var yAxis = d3.axisLeft(y).ticks(cfg.ticks).tickSize(-width);
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .classed("xAxis",true)
            .call(customXAxis);

        svg.append("g")
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
            g.selectAll(".tick text").attr("x", 4).attr("dy", 3);
        }


    }
};
