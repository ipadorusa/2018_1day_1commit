(function () {

    //Function to return the data for the inset rings.
    //Probably won't need to use a funciton could just set this to a variable
    var triRadialData = [
            { index: 0, name: 'Funded', icon: "", percentage: 60 },
            { index: 1, name: 'Worked', icon: "", percentage: 44 }
    ];



    //Colors array.
    var colors = ["#938df9", "#71b5fc"];
    var config = {
        innerRadius : [100, 86],
        outerRadius : [94, 61]
    };

    //build function that creates the visuals
    function build(dataset, elementToBind,cfg) {
        var container = d3.select(elementToBind),
            width = container.node().getBoundingClientRect().width,
            height = container.node().getBoundingClientRect().height,
            tau = 2 * Math.PI;



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
        var svg = d3.select(elementToBind).append("svg")
            .attr("width", '100%')
            .attr("height", '100%')
            .attr('viewBox', '0 0 ' + Math.min(width, height) + ' ' + Math.min(width, height))
            .attr('preserveAspectRatio', 'xMinYMin')
            .append("g")
            .attr("transform", "translate(" + Math.min(width, height) / 2 + "," + Math.min(width, height) / 2 + ")");



        //enter the data set and loop through it
        var field = svg.selectAll("g")
            .data(dataset)
            .enter().append("g");

        //Attach the filled in progress path
        field.append("path").attr("class", "bg")
            .attr("fill", '#e9eef4')
            .attr("d", background);

        field.append("path")
            .attr("class", "progress")
            .style("fill", function (d) {
                return colors[d.index];
            });






        d3.transition().duration(100).each(update);

        function update() {
            field = field
                .each(function (d) {
                    this._value = d.percentage;
                })
                .data(dataset)
                .each(function (d) {
                    d.previousValue = this._value;
                });

            //Animation to paint the bars one by one
            field.selectAll("path.progress").transition().duration(750).delay(function (d, i) {
                return i * 500
            })
                .ease(d3.easeSin)
                .attrTween("d", arcTween);

            /*field.select("text.icon").text(function (d) {
                return d.icon;
            })
                .attr("transform", function (d) {
                    return "translate(5," + -((innerRadius + 7) - d.index * (30 + gap)) + ")"

                });

            field.select("text.completed").text(function (d) {
                return Math.round(d.percentage / 100 * 10);
            });*/
        }

        function arcTween(d) {
            var i = d3.interpolateNumber(0, d.percentage);
            return function (t) {
                d.percentage = i(t);
                return arc(d);
            };
        }
    }

    //Call the build function
    build(triRadialData, ".donut", config);

})()