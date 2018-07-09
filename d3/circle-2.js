(function () {

    var triRadialData = [
            { index: 0, name: 'Funded', percentage: 60 },
            { index: 1, name: 'Worked', percentage: 44 }
    ];


    var colors = ['#938df9', '#71b5fc'];
    var config = {
        innerRadius : [100, 86],
        outerRadius : [94, 61]
    };

    //build function that creates the visuals
    function build(dataset, elementToBind, cfg) {
        var container = d3.select(elementToBind),
            width = container.node().getBoundingClientRect().width,
            height = container.node().getBoundingClientRect().height,
            tau = 2 * Math.PI,
            formatPercent = d3.format(".0%");



        var data = dataset;
        var arc = d3.arc()
                    .startAngle(0)
                    .endAngle(function (d) {
                        return d.percentage / 100 * tau;
                    })
                    .innerRadius(function (d) {
                        return config.innerRadius[d.index];
                    })
                    .outerRadius(function (d) {
                        return config.outerRadius[d.index];
                    });

        //Create the opaque background ring
        var background = d3.arc()
                            .startAngle(0)
                            .endAngle(tau)
                            .innerRadius(function (d, i) {
                                return config.innerRadius[i];
                            })
                            .outerRadius(function (d, i) {
                                return config.outerRadius[i];
                            });

        //Append the background ring to the body
        var svg = d3.select(elementToBind)
                    .append('svg')
                    .attr('width', '100%')
                    .attr('height', '100%')
                    .attr('viewBox', '0 0 ' + Math.min(width, height) + ' ' + Math.min(width, height))
                    .attr('preserveAspectRatio', 'xMinYMin')
                    .append('g')
                    .attr('transform', 'translate(' + Math.min(width, height) / 2 + ',' + Math.min(width, height) / 2 + ')');



        //enter the data set and loop through it
        var field = svg.selectAll('g')
            .data(dataset)
            .enter().append('g');

        //Attach the filled in progress path
        field.append('path').attr('class', 'bg')
            .attr("fill", '#e9eef4')
            .attr("d", background);

        field.append('path')
            .attr('class', 'progress')
            .style("fill", function (d) {
                return colors[d.index];
            });

        var description1 = field.append('text')
            .attr('text-anchor', 'middle')
            .attr('class', 'description_text description_text_01')
            .attr('dx', '4px')
            .attr('dy', '-5px');

        var description2 = field.append('text')
            .attr('text-anchor', 'middle')
            .attr('class', 'description_text description_text_02')
            .attr('dx', '4px')
            .attr('dy', '25px');


<<<<<<< HEAD
=======


        d3.transition().duration(100).each(update);

>>>>>>> d552c6707482fc37d30430e1aa112c6d7bd5de95
        function update() {
            field = field
                    .each(function (d) {
                        this._value = d.percentage;
                    })
                    .data(dataset)
                    .each(function (d) {
                        d.previousValue = this._value;
                    });
            field.selectAll('path.progress')
                .transition()
                .duration(function(d) {
                    return d.percentage * 25
                })
                .delay(50)
                .ease(d3.easeSin)
                .attrTween("d", arcTween);
        }

        function arcTween(d) {
            var i = d3.interpolateNumber(0, d.percentage);
            return function (t) {
                d.percentage = i(t);
                description1.text(formatPercent(data[0].percentage / 100));
                description2.text(formatPercent(data[1].percentage / 100));
                return arc(d);
            };
        }
        update();
    }

    //Call the build function
    build(triRadialData, '.donut', config);

})()