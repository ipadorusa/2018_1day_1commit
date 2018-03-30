var LineChart = {
    draw: function(selector, data, dataRange, options, color) {
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

        x.domain([20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50]);
        y.domain([dataRange.min,dataRange.max]);

        var finaldata = [];
        for(keys in data) {
            var tmp = {};
            for(i = 0;i < data[keys].length ; i++) {
                var key = i + 20;
                Object.defineProperty(tmp, key, {
                    value : data[keys][i]
                });
            }
            finaldata.push(tmp);
        }

        var keys = d3.keys(finaldata[0]);

        var realFinalData = [];
        finaldata.forEach(function(d, i) {
            realFinalData[i] = keys.map(function(key) {
                return {x: key, y: d[key]};
            })
        });

        console.log(finaldata);
        var line = d3.line()
            .x(function(d) {
                return x(d.x);
            })
            .y(function(d) {
                return y(d.y);
            });


        svg.append("path")
            .data(realFinalData)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("stroke-width", 1.5)
            .attr("d", line);

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
